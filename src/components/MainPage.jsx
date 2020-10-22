import React, { Component } from "react";
import axios from "axios";
import base64 from "base-64";

import ContactRow from "./ContactRow";
import encryptWithPublicKey from "../services/emailSecurity";
import getAuthHeader from "../services/tokenService";

import isIn from "../services/isIn";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        
        this.produceContactData = this.produceContactData.bind(this);
        this.selectContacts = this.selectContacts.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.encryptPassword = this.encryptPassword.bind(this);

        this.state = {
            contacts: [],
            // List of contact _id's
            selectedContacts: [],
            email: "",
            userEmailPassword: ""
        }
    }
    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo !== null) {
            axios.get('http://localhost:5000/contacts/all', { headers: getAuthHeader() })
                .then(res => {
                    this.setState({
                        contacts: res.data
                    });
                })
                .catch(err => {
                    console.log("Error: " + err);
                    // window.location = "/"
                })
        } else {
            // window.location = "/";
        }
        
    }
    produceContactData() {
        return (this.state.contacts.map((contact)=>{
            return <ContactRow selectContacts={this.selectContacts} key={contact._id} id={contact._id} checked={isIn(contact._id, this.state.selectedContacts)} company={contact.company} firstName={contact.firstName} lastName={contact.lastName} email={contact.email}/>
        }))
    }
    selectContacts(event) {
        event.preventDefault();

        const contacts = this.state.selectedContacts
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i] === event.target.id) {
                this.setState({
                    selectedContacts: contacts.filter(contact => contact !== event.target.id)
                })
                console.log(this.state.selectedContacts);
                return;
            }
        }
        this.setState({selectedContacts: this.state.selectedContacts.concat(event.target.id)});
        console.log(this.state.selectedContacts);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    encryptPassword() {
        axios.get('http://localhost:5000/security/', { headers: getAuthHeader() })
            .then(key => {
                const encryptedMessage = encryptWithPublicKey(key.data, this.state.userEmailPassword);
                const jsonObj = JSON.stringify(encryptedMessage);
                const b64encode = base64.encode(jsonObj);
                this.setState({ userEmailPassword: b64encode });
            })
            .catch(err => console.log(err));
    }
    sendEmail(event) {
        event.preventDefault();

        const emailbody = {
            email: this.state.email,
            selectedContacts: this.state.selectedContacts,
            userEmailPassword: this.state.userEmailPassword
        }
        // Send over the token to know who is the sender, the contacts they wish to send to, and the draft
        axios.post('http://localhost:5000/contacts/send', emailbody, { headers: getAuthHeader() })
            .then(res => console.log(res))
            .catch(err => console.log("Error: " + err));
    }
    render() {
        return (
            <div className="container">
                <h1>Write Draft</h1>
                <textarea name="email" value={this.state.email} onChange={this.handleChange} cols="90" rows="12"></textarea>
                <h2>Email Password</h2>
                <small>Needed to send emails via your account</small>
                <br/>
                <small>Your email will be encrypted and never saved on file so no one anyone will ever have access to it</small>
                <br />
                <input name="userEmailPassword" value={this.state.userEmailPassword} onChange={this.handleChange} type="password" placeholder="Account Password"></input>
                <button onClick={this.encryptPassword} className="btn btn-primary">Encrypt Password</button>
                <br/>
                <button onClick={this.sendEmail} type="submit" className="btn btn-primary">Submit</button>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Contacts</h1>
                        <div>{this.produceContactData()}</div>
                    </div>
                </div>
            </div>
        )
    }
}