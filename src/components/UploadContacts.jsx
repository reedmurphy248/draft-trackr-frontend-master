import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import ReactFileReader from "react-file-reader";
import SelectedFile from "./SelectedFile";

import getAuthHeader from "../services/tokenService";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10vh',
    },
    root: {
        minWidth: '40%',
    },
    header: {
        backgroundColor: '#3f51b5',
        color: 'white',
    }
}));

export default function UploadContacts() {
    const classes = useStyles();

    const [files, updateFiles] = useState([]);
    const [loggedIn, changeStatus] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo !== null) {
            axios.get('http://localhost:5000/contacts/all', { headers: getAuthHeader() })
                .then(() => {
                    changeStatus(true);
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
        }
    });
    const handleFiles = files => {
        const inputArr = files.base64.split(",");

        updateFiles(prevValue => {
            return [...prevValue, [files.fileList[0].name, inputArr[1]]]
        })
    }
    function removeFile(event) {
        updateFiles(prevValue => {
            return prevValue.filter(x => x[0] !== event.currentTarget.name);
        });
    }
    function uploadFiles(event) {
        event.preventDefault();

        const fileValues = []
        for (var i = 0; i < files.length; i++) {
            fileValues.push(files[i][1]);
        }

        axios.post('http://localhost:5000/contacts/add', fileValues, { headers: getAuthHeader() })
            .then(() => window.location = "/main")
            .catch(err => console.log("Error: " + err))

    }
    function pageAccess() {
        return (
            <div className={classes.paper}>
                <Card className={classes.root}>
                    <CardHeader
                        className={classes.header}
                        avatar={
                            <ContactMailIcon />
                        }
                        titleTypographyProps={{variant:'h5' }}
                        style={{textAlign: "left"}}
                        title="Select Contacts"
                    />
                    <CardContent style={{minHeight: '40vh'}}>
                        <div>{files.map((file, index) => <SelectedFile key={index} removeFile={removeFile} fileName={file[0]} />)}</div>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Grid container spacing={2} style={{marginLeft: '1%'}}>
                            <Grid item lg={4}>
                                <ReactFileReader fileTypes={".csv"} base64={true} handleFiles={handleFiles}>
                                    <Button fullWidth color='primary' size="large" variant="contained">Select</Button>
                                </ReactFileReader>
                            </Grid>
                            <Grid item lg={4}>
                                <Button onClick={uploadFiles} fullWidth color="primary" size="large" variant="contained">
                                    Upload
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </div>
        )
    }
    return (
        <div>{loggedIn ? pageAccess() : <h1>Not Logged In</h1>}</div>
    )
}

