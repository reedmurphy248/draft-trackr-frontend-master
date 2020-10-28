import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from "axios";

import getAuthHeader from "../services/tokenService";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    }
}));

export default function Navbar() {
    const classes = useStyles();

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
    })
    function accessAllRoutes() {
        return (
            <div>
                <Link to="/main" className="navbar-brand">Main Page</Link>
                <Link to="/logout" className="navbar-brand">Logout</Link>
                <Link to="/upload" className="navbar-brand">Upload Contacts</Link>
                <Link to="/remove" className="navbar-brand">Remove Contacts</Link>
            </div>
        )
    }
    return (
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //     <Link to="/" className="navbar-brand">DraftTrackr</Link>
        //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //         <div className="navbar-nav">
        //             <Link to="/login" className="navbar-brand">Login</Link>
        //             <Link to="/register" className="navbar-brand">Register</Link>
        //             {loggedIn ? accessAllRoutes() : null}
        //         </div>
        //     </div>
        // </nav>

        <AppBar position="static">
            <Toolbar>
                <Grid container className={classes.container}>
                    <Grid item >
                        <Link to="/upload" className="navbar-brand"><Typography variant="h6">
                            Upload Contacts
                        </Typography></Link>
                        <Link to="/remove" className="navbar-brand"><Typography variant="h6">
                            Remove Contacts
                        </Typography></Link>
                    </Grid>
                    <Grid item >
                        <Typography variant="h5">
                            DraftTrackr
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Link to="/remove" className="navbar-brand"><Typography variant="h6">
                            Login
                        </Typography></Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}