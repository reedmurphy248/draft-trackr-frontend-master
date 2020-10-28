import React from "react";
import { Button, Typography, Grid } from "@material-ui/core";

import 'fontsource-roboto';

export default function SelectedFile(props) {
    return (
        <Grid container spacing={2} style={{borderBottom: 'solid 1px black', marginTop: '3px', marginBottom: '5px'}}>
            <Grid item>
                <Typography variant="h6">{props.fileName}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={props.removeFile} variant="contained" color="secondary" size="sm" name={props.fileName}>
                    x
                </Button>
            </Grid>
        </Grid>
    )
}