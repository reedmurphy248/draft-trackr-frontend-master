import React, { Component } from "react";

export default class TextArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: ""
        };

    }
    handleChange(event) {
        this.setState({
            body: event.target.value
        })
    }
    render() {
        return (
            <textarea cols="90" rows="12"></textarea>
        )
    }
}