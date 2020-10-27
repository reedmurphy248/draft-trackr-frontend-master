import React from "react";

import {Button, ButtonGroup} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: '90%',
        maxWidth: '90%'
    },
}));

export default function ContactRowDelete(props) {
    const classes = useStyles();

        return (
            <div id={props.id} onClick={props.removeContactData} className={classes.paper}>
                <ButtonGroup color="primary" size="medium" aria-label="outlined primary button group">
                    <Button>{props.company}</Button>
                    <Button>{props.firstName}</Button>
                    <Button>{props.lastName}</Button>
                    <Button>{props.email}</Button>
                </ButtonGroup>
                <Button style={{marginLeft: '5px'}} size="small" color="secondary" variant="contained">Delete</Button>
            </div>
        )
}