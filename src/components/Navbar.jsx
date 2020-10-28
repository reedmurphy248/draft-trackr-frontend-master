import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import axios from "axios";

import getAuthHeader from "../services/tokenService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(10),
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    MenuLinks: {
        color: 'white'
    },
}));

export default function Navbar(props) {
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
        if (props.currentPage === "http://localhost:3000/main") {
            return (
                <div>
                    <Link to="/upload" className="navbar-brand">
                        <Typography variant="subtitle1" className={classes.MenuLinks}>
                                Upload
                        </Typography>
                    </Link>
                    <Link to="/remove" className="navbar-brand">
                        <Typography variant="subtitle1" className={classes.MenuLinks}>
                                Remove
                        </Typography>
                    </Link>
                </div>
            )
        } else if (props.currentPage === "http://localhost:3000/remove") {
            return (
                <div>
                    <Link to="/main" className="navbar-brand">
                        <Typography variant="subtitle1" className={classes.MenuLinks}>
                                Main
                        </Typography>
                    </Link>
                    <Link to="/upload" className="navbar-brand">
                        <Typography variant="subtitle1" className={classes.MenuLinks}>
                                Upload
                        </Typography>
                    </Link>
                </div>
            )
        } else if (props.currentPage === "http://localhost:3000/upload") {
            return (
                <div>
                    <Link to="/main" className="navbar-brand">
                        <Typography variant="subtitle1" className={classes.MenuLinks}>
                                Main
                        </Typography>
                    </Link>
                    <Link to="/remove" className="navbar-brand">
                        <Typography variant="subtitle1" className={classes.MenuLinks}>
                                Remove
                        </Typography>
                    </Link>
                </div>
            )
        }
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

        <AppBar position="static" className={classes.root}>
            <Toolbar>
                {loggedIn ? accessAllRoutes() : null}
                <Typography variant="h5" className={classes.title}>
                    DraftTrackr
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}