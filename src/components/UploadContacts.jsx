import React, { Component } from "react";
import axios from "axios";

import ReactFileReader from "react-file-reader";
import SelectedFile from "./SelectedFile";

import getAuthHeader from "../services/tokenService";

export default class UploadContacts extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.pageAccess = this.pageAccess.bind(this);

        this.state = {
            files: [],
            loggedIn: false
        }
    }
    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo !== null) {
            axios.get('http://localhost:5000/contacts/all', { headers: getAuthHeader() })
                .then(() => {
                    this.setState({loggedIn: true});
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
        }
    }
    handleFiles = files => {
        const inputArr = files.base64.split(",");

        this.setState({files: this.state.files.concat([[files.fileList[0].name, inputArr[1]]])})
    }
    removeFile(event) {
        this.setState({files: this.state.files.filter(x => x[0] !== event.target.name)});
    }
    uploadFiles(event) {
        event.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem('user'));
        const token = userInfo.data.accessToken;
        const authHeader = { "x-access-token": token };

        const fileValues = []
        for (var i = 0; i < this.state.files.length; i++) {
            fileValues.push(this.state.files[i][1]);
        }

        axios.post('http://localhost:5000/contacts/add', fileValues, { headers: authHeader })
            .then(() => window.location="/main")
            .catch(err => console.log("Error: " + err))

    }
    pageAccess() {
        return (
            <div>
                <h1>Upload Files</h1>
                <h3>Upload Contact Data as CSV files</h3>
                <ReactFileReader fileTypes={".csv"} base64={true} handleFiles={this.handleFiles}>
                    <button className='btn btn-primary'>Select Files</button>
                </ReactFileReader>
                <button onClick={this.uploadFiles} className='btn btn-primary'>Upload Files</button>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Selected Files</h1>
                        <div>{this.state.files.map(file => <SelectedFile removeFile={this.removeFile} fileName={file[0]}/>)}</div>
                    </div>
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

