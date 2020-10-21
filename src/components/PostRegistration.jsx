import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PostRegistration extends Component {
    render() {
        return (
            <div>
                <h1>Thanks for Registering!</h1>
                <h2>Continue to <Link to="/">Login</Link></h2>
            </div>
        )
    }
}