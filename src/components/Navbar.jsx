import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">DraftTrackr</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/" className="navbar-brand">Home</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                        <Link to="/main" className="navbar-brand">Main Page</Link>
                        <Link to="/logout" className="navbar-brand">Logout</Link>
                        <Link to="/upload" className="navbar-brand">Upload Contacts</Link>
                    </div>
                </div>
            </nav>
        )
    }
}