import React, { Component } from "react";
import axios from "axios";

import ReactFileReader from "react-file-reader";

import SelectedFile from "./SelectedFile";

export default class UploadContacts extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.state = {
            files: {}
        }
    }
    handleFiles = files => {
        const inputArr = files.base64.split(",");
        this.state.files[files.fileList[0].name] = inputArr[1];
    }
    uploadFiles(event) {
        event.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem('user'));
        const token = userInfo.data.accessToken;
        const authHeader = { "x-access-token": token };

        axios.post('http://localhost:5000/contacts/add', Object.values(this.state.files), { headers: authHeader })
            .then(res => console.log(res))
            .catch(err => console.log("Error: " + err))

    }
    render() {
        return (
            <div>
                <h1>Upload Files</h1>
                <ReactFileReader fileTypes={".csv"} base64={true} handleFiles={this.handleFiles}>
                    <button className='btn btn-primary'>Select Files</button>
                </ReactFileReader>
                <button onClick={this.uploadFiles} className='btn btn-primary'>Upload Files</button>
            </div>
        )
    }
}

