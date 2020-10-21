import React, { Component } from "react";
import axios from "axios";

import ContactRow from "./ContactRow";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        
        this.produceContactData = this.produceContactData.bind(this);
        this.selectContacts = this.selectContacts.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

        this.state = {
            contacts: [],
            // List of contact _id's
            selectedContacts: [],
            email: ""
        }
    }
    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo !== null) {
            const token = userInfo.data.accessToken;
            const authHeader = { "x-access-token": token };
            axios.get('http://localhost:5000/contacts/all', { headers: authHeader })
                .then(res => {
                    this.setState({
                        contacts: res.data
                    });
                })
                .catch(err => {
                    console.log("Error: " + err);
                    window.location = "/"
                })
        } else {
            window.location = "/";
        }
        
    }
    produceContactData() {
        return (this.state.contacts.map((contact)=>{
            return <ContactRow selectContacts={this.selectContacts} key={contact._id} id={contact._id} company={contact.company} firstName={contact.firstName} lastName={contact.lastName} email={contact.email}/>
        }))
    }
    selectContacts(event) {
        event.preventDefault();
        const contacts = this.state.selectedContacts
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i] === event.target.id) {
                this.setState({
                    selectedContacts: contacts.filter(contact => contact !== event.target.id)
                })
                console.log(this.state.selectedContacts);
                return;
            }
        }
        this.state.selectedContacts.push(event.target.id);
        console.log(this.state.selectedContacts);
    }
    handleChange(event) {
        this.setState({
            email: event.target.value
        })
    }
    sendEmail(event) {
        event.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem('user'));
        const token = userInfo.data.accessToken;
        const authHeader = { "x-access-token": token };

        const emailbody = {
            email: this.state.email,
            selectedContacts: this.state.selectedContacts
        }
        // Send over the token to know who is the sender, the contacts they wish to send to, and the draft
        axios.post('http://localhost:5000/contacts/send', emailbody, { headers: authHeader })
            .then(res => console.log(res))
            .catch(err => console.log("Error: " + err));
    }
    render() {
        return (
            <div className="container">
                <h1>Write Draft</h1>
                <textarea onChange={this.handleChange} cols="90" rows="12"></textarea>
                <br/>
                <button onClick={this.sendEmail} type="submit" className="btn btn-primary">Submit</button>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Contacts</h1>
                        <div>{this.produceContactData()}</div>
                    </div>
                </div>
            </div>
        )
    }
}