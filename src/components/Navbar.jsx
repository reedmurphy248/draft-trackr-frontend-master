import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import getAuthHeader from "../services/tokenService";

export default function Navbar() {
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">DraftTrackr</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/login" className="navbar-brand">Login</Link>
                    <Link to="/register" className="navbar-brand">Register</Link>
                    {loggedIn ? accessAllRoutes() : null}
                </div>
            </div>
        </nav>
    )
}