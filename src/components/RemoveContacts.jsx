import React, { Component } from "react";
import axios from "axios";

import ContactRowDelete from "./ContactRowDelete";

import getAuthHeader from "../services/tokenService";

export default class RemoveContacts extends Component {
    constructor(props) {
        super(props);
        this.removeContactData = this.removeContactData.bind(this);
        this.produceContactData = this.produceContactData.bind(this);
        this.pageAccess = this.pageAccess.bind(this);
        this.state = {
            contacts: [],
            loggedIn: false
        }
    }
    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo !== null) {
            axios.get('http://localhost:5000/contacts/all', { headers: getAuthHeader() })
                .then(res => {
                    this.setState({
                        contacts: res.data
                    });
                    this.setState({
                        loggedIn: true
                    });
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
        }

    }
    removeContactData(event) {
        axios.delete(`http://localhost:5000/contacts/${event.target.parentElement.id}`)
            .then(() => window.location = "/remove")
            .catch(err => console.log(err))
    }
    produceContactData() {
        return (this.state.contacts.map((contact, index) => {
            return <ContactRowDelete removeContactData={this.removeContactData} key={index} id={contact._id} company={contact.company} firstName={contact.firstName} lastName={contact.lastName} email={contact.email} />
        }));
    }
    pageAccess() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Contacts</h1>
                    <div>{this.produceContactData()}</div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>{this.state.loggedIn ? this.pageAccess() : <h1>Not Logged In</h1>}</div>
        )
    }
}