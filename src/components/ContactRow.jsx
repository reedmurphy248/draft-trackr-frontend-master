import React from "react";

export default function ContactRow(props) {
        return (
            <div id={props.id}>
                <input type="checkbox" onClick={props.selectContacts}/>
                <p>{props.company} | {props.firstName} | {props.lastName} | {props.email}</p>
            </div>
        )
}