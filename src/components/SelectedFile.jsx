import React from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

import 'fontsource-roboto';

export default function SelectedFile(props) {
    return (
        <Grid container spacing={2}>
            <Grid item>
                <Typography style={{paddingTop: '2.5%'}} variant="h6">{props.fileName}</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={props.removeFile} variant="contained" style={{color: '#e50f0f'}} size="sm" name={props.fileName}>
                    <CancelIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}