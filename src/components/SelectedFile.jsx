import React, { Component } from "react";

export default class SelectedFile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>{this.props.fileName}</p>
                <button onClick={this.props.removeFile} name={this.props.fileName} className="btn btn-danger">Remove File</button>
            </div>
        )
    }
}