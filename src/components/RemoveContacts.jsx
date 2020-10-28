import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';

import getAuthHeader from "../services/tokenService";
import { Container, CssBaseline } from "@material-ui/core";

import DataTable from "./Table";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        border: '#9198e5 2px solid',
        borderRadius: '5px',
        background: 'linear-gradient(90deg, #f09e71 10%, #9198e5 90%)',
        minHeight: '100vh'
    },
    contacts: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        marginTop: theme.spacing(3),
    }
}));

export default function RemoveContacts(props) {
    const classes = useStyles();

    const [contacts, changeContacts] = useState([]);
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
    function removeContactData(event) {
        axios.delete(`http://localhost:5000/contacts/${event.target.parentElement.parentElement.parentElement.id}`)
            // .then(() => window.location = "/remove")
            .catch(err => console.log(err))
    }
    
    function pageAccess() {
        return (
            <Container maxWidth="md" component="main">
                <CssBaseline />
                <h1 className={classes.title}>Contacts</h1>
                <DataTable type="remove" rows={contacts} removeContactData={removeContactData}></DataTable>
            </Container>
        )
    }

    return (
        <div>{loggedIn ? pageAccess() : <h1>Not Logged In</h1>}</div>
    )

}