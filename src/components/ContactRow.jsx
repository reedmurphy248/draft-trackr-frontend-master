import React, { Component } from "react";

import isIn from "../services/isIn";

class ContactRow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div key={this.props.key}>
                <input checked={this.props.checked} onClick={this.props.selectContacts}  id={this.props.id} type="checkbox"></input>
                <p>
                    {this.props.company} | {this.props.firstName} | {this.props.lastName} | {this.props.email}
                </p>
            </div>
        )
    }

}

export default ContactRow;