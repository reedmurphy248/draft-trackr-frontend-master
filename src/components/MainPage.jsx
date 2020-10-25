import React, { useState, useEffect } from "react";
import axios from "axios";
import base64 from "base-64";

import encryptWithPublicKey from "../services/emailSecurity";
import getAuthHeader from "../services/tokenService";
import isIn from "../services/isIn";

import ContactRow from "./ContactRow";

export default function MainPage() {

    const [contacts, changeContacts] = useState([]);
    const [emailInfo, changeInfo] = useState({
        emailBody: "",
        userEmailPassword: ""
    });
    const [selectedContacts, changeSelected] = useState([]);
    const [loggedIn, changeStatus] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo !== null) {
            axios.get('http://localhost:5000/contacts/all', { headers: getAuthHeader() })
                .then(res => {
                    changeContacts(res.data);
                    changeStatus(true);
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
        }

    });
    function handleChange(event) {
        const { name, value } = event.target;
        changeInfo(prevValue => {
            if (name === "emailBody") {
                return {
                    emailBody: value,
                    userEmailPassword: prevValue.userEmailPassword
                }
            } else if (name === "userEmailPassword") {
                return {
                    emailBody: prevValue.emailBody,
                    userEmailPassword: value
                }
            }
        })
    }
    function selectContacts(event) {

        const contactID = event.target.parentElement.id;

        if (!isIn(contactID, selectedContacts)) {
            changeSelected(prevValue => {
                return [...prevValue, contactID];
            });
        } else {
            changeSelected(prevValue => {
                return prevValue.filter(contact => contact !== contactID);
            });
        }

    }
    function encryptPassword() {
        axios.get('http://localhost:5000/security/', { headers: getAuthHeader() })
            .then(key => {
                const encryptedMessage = encryptWithPublicKey(key.data, emailInfo.userEmailPassword);
                const jsonObj = JSON.stringify(encryptedMessage);
                const b64encode = base64.encode(jsonObj);
                changeInfo(prevValue => {
                    return {
                        emailBody: prevValue.emailBody,
                        userEmailPassword: b64encode
                    }
                })
            })
            .catch(err => console.log(err));
    }
    function sendEmail(event) {
        event.preventDefault();

        const emailbody = {
            email: emailInfo.emailBody,
            selectedContacts: selectedContacts,
            userEmailPassword: emailInfo.userEmailPassword
        }
        // Send over the token to know who is the sender, the contacts they wish to send to, and the draft
        axios.post('http://localhost:5000/contacts/send', emailbody, { headers: getAuthHeader() })
            .then(res => console.log(res))
            .catch(err => console.log("Error: " + err));
    }

    function mainPageAccess() {
        return (
            <div className="container">
                <h1>Write Draft</h1>
                <textarea name="emailBody" value={emailInfo.emailBody} onChange={handleChange} cols="90" rows="12"></textarea>
                <h2>Email Password</h2>
                <small>Needed to send emails via your account</small>
                <br />
                <small>Your email will be encrypted and never saved on file so no one anyone will ever have access to it</small>
                <br />
                <input name="userEmailPassword" value={emailInfo.userEmailPassword} onChange={handleChange} type="password" placeholder="Account Password"></input>
                <button onClick={encryptPassword} className="btn btn-primary">Encrypt Password</button>
                <br />
                <button onClick={sendEmail} type="submit" className="btn btn-primary">Submit</button>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Contacts</h1>
                        <div>{contacts.map((contact, index) => <ContactRow selectContacts={selectContacts} key={index} id={contact._id} company={contact.company} firstName={contact.firstName} lastName={contact.lastName} email={contact.email} />)}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>{loggedIn ? mainPageAccess() : <h1>Not Logged In</h1> }</div>
    )
}