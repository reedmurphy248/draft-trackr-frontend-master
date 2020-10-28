import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, CssBaseline, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';

import ReactFileReader from "react-file-reader";
import SelectedFile from "./SelectedFile";

import getAuthHeader from "../services/tokenService";

// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     paper: {
//         display: 'flex',
//         flexDirection: 'column',
//         borderRadius: '8px',
//         // boxShadow: '1px 1px 5px black',
//         minHeight: '70vh',
//         alignItems: 'center',
//         margin: '50px',
//         border: '#323aa8 solid 1px',
//         minWidth: '40%',
//         // background: 'linear-gradient(55deg, #e5e3ea 30%, #91e7ea 90%)',
//         backgroundColor: '#4361ee'
//     },
//     grid: {
//         justifyContent: 'center',
//         maxWidth: '40%',
//         marginTop: '1vh'
//     },
//     selectedPanel: {
//         borderRadius: '5px',
//         minWidth: '50%',
//         // minHeight: '40vh',
//         alignItems: 'center',
//         display: 'flex',
//         flexDirection: 'column',
//         margin: '10px'
//     }
// }));

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
            // <Container className={classes.container}>
            // <CssBaseline />
            //     <div className={classes.paper}>
            //         <Typography variant="h3" style={{marginTop: "3vh"}}>Upload Files</Typography>
            //         <Container className={classes.selectedPanel}>
            //             <div>{files.map((file, index) => <SelectedFile key={index} removeFile={removeFile} fileName={file[0]} />)}</div>
            //         </Container>
            //         <Grid container className={classes.grid} spacing={3}>
            //             <Grid item>
            //                 <ReactFileReader fileTypes={".csv"} base64={true} handleFiles={handleFiles}>
            //                     <Button color='primary' variant="contained">Select Files</Button>
            //                 </ReactFileReader>
            //             </Grid>
            //             <Grid item>
            //                 <Button onClick={uploadFiles} size="md" color='primary' variant="contained">Upload Files</Button>
            //             </Grid>
            //         </Grid>
            //     </div>
            // </Container>
        )
    }
    return (
        <div>{loggedIn ? pageAccess() : <h1>Not Logged In</h1>}</div>
    )
}

