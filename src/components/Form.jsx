import React, { Component } from "react";
import axios from "axios";

import AlertDismissable from "./AlertDismissable";

export default class Form extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setShow = this.setShow.bind(this);
        this.createAlert = this.createAlert.bind(this);

        this.state = {
            email: "",
            password: "",
            alert: false,
            error: ""
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    setShow() {
        this.setState({alert: true});
    }

    onSubmit(event) {
        event.preventDefault();

        const User = {
            username: this.state.email,
            password: this.state.password
        }

        if (this.props.header === 'Register') {
            axios.post('http://localhost:5000/users/signup', User)
                .then((res) => {
                    window.location = "/postRegistration";
                })
                .catch((err) => {
                    this.setState({ alert: true, email: "" });
                });
        }
        
        if (this.props.header === 'Login') {
            axios.post('http://localhost:5000/users/signin', User)
                .then(res => {
                    console.log("posted");
                    localStorage.setItem('user', JSON.stringify(res));
                    console.log("Changing");
                    window.location = "/main";
                    console.log("Changed");
                })
                .catch(err => {
                    this.setState({ alert: true, email: "", password: "" });
                });
        }

    }

    createAlert() {
        if (this.state.alert === false) {
            return <h1></h1>;
        } else if (this.state.alert === true && this.props.header === 'Register') {
            return (
                <AlertDismissable 
                    error="Username Already Exists" 
                    explanation="The email you entered for your username has already been taken"
                    onClose={() => this.setState({alert: false})} 
                />
            )
        } else if (this.state.alert === true && this.props.header === 'Login') {
            return (
                <AlertDismissable 
                error="Invalid Login" 
                explanation="The username or password you entered is incorrect"
                onClose={() => this.setState({alert: false})} 
                />
            )
        }
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.header}</h1>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onChange={this.handleChange} type="email" name="email" value={this.state.email} className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                    </div>
                    <div>{this.createAlert()}</div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}