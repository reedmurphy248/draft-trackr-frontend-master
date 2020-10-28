import React, { useState, useEffect } from "react";
import axios from "axios";
import base64 from "base-64";

import { Container, CssBaseline, Button, Grid, Typography, TextField } from "@material-ui/core";
import 'fontsource-roboto';

import encryptWithPublicKey from "../services/emailSecurity";
import getAuthHeader from "../services/tokenService";
import isIn from "../services/isIn";

import { makeStyles } from '@material-ui/core/styles';

import DataTable from "./Table";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'Center',
    },
    topHalf: {
        justifyContent: 'Center',
        maxWidth: '80%',
    },
    passwordSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'Center',
    },
    buttons: {
        minWidth: '100%', 
        minHeight: '10vh'
    },
    bottomHalf: {
        maxWidth: '85%',
        marginTop: '3vh'
    }
}));

export default function MainPage() {
    const classes = useStyles();

    const [contacts, changeContacts] = useState([]);
    const [emailInfo, changeInfo] = useState({
        emailBody: "",
        userEmailPassword: ""
    });
    const [selectedContacts, changeSelected] = useState([]);
    const [loggedIn, changeStatus] = useState(false);

    const [checked, changeChecked] = useState(false);

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
        const contactID = event.target.parentElement.parentElement.parentElement.parentElement.id;

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
        console.log("Sent email");

        const emailbody = {
            email: emailInfo.emailBody,
            selectedContacts: selectedContacts,
            userEmailPassword: emailInfo.userEmailPassword
        }
        // Send over the token to know who is the sender, the contacts they wish to send to, and the draft
        axios.post('http://localhost:5000/contacts/send', emailbody, { headers: getAuthHeader() })
            .then(res => {
                console.log(res)
                changeInfo(prevValue => {
                    return {
                        emailBody: "",
                        userEmailPassword: prevValue.userEmailPassword
                    }
                })
            })
            .catch(err => console.log("Error: " + err));
    }

    function mainPageAccess() {
        return (
            <Container>
            <CssBaseline />
                <div className={classes.paper}>
                    <Grid container className={classes.topHalf} lg={10} spacing={2}>
                        <Grid item lg={7} >
                            <Typography variant="h4">Write Draft</Typography>
                            <textarea 
                                name="emailBody" value={emailInfo.emailBody} onChange={handleChange} 
                                cols="70" rows="12" required style={{borderRadius: "10px"}}
                            />
                        </Grid>
                        <Grid item container lg={5}>
                            <Grid item container lg={12} className={classes.passwordSection} >
                                <Typography variant="h4" style={{marginBottom: "2vh"}}>Email Password</Typography>
                                <Typography variant="body2">Your password will be encrypted and never saved on file so no one anyone will ever have access to it</Typography>
                                <Grid container item style={{marginTop: "3vh"}}>
                                    <Grid item lg={6}>
                                        <TextField 
                                        name="userEmailPassword" value={emailInfo.userEmailPassword} onChange={handleChange} 
                                        variant="outlined" type="password" label="Account Password"
                                        required
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Button onClick={encryptPassword} style={{minHeight: '8.25vh'}} variant="contained" color="primary">Encrypt Password</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={12} >
                                <Button onClick={sendEmail} className={classes.buttons} size="large" variant="contained" color="primary">Send Email</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Container className={classes.bottomHalf}>
                        <Typography variant="h3">Select Contacts</Typography>
                        <DataTable type="add" checked={isIn()} selectContacts={selectContacts} rows={contacts}/>
                    </Container>
                </div>
            </Container>
        )
    }

    return (
        <div>{loggedIn ? mainPageAccess() : <h1>Not Logged In</h1> }</div>
    )
}