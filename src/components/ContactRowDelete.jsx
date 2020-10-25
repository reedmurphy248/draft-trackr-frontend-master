import React from "react";

export default function ContactRowDelete(props) {
        return (
            <div id={props.id} onClick={props.removeContactData}>
                <p>{props.company} | {props.firstName} | {props.lastName} | {props.email}</p>
                <button className="btn btn-danger btn-sml">Remove Contact</button>
            </div>
        )
}