import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';

export default class AlertDismissible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: true
        }
    }

    render() {
        return (
            <Alert variant="danger" onClose={this.props.onClose} dismissible>
                <Alert.Heading>{this.props.error}</Alert.Heading>
                <p>
                {this.props.explanation}. Please enter a different one.
                </p>
            </Alert>
            );
    }
}