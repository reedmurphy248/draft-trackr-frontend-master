import React, { Component } from "react";

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.removeItem('user');
        window.location = "/";
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Logout</h1>
                    <button onClick={this.onLogout} type="submit" className="btn btn-primary">Logout</button>
                </div>
            </div>
        )
    }
}