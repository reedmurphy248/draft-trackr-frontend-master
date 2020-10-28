import React from "react";

import { Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Typography from '@material-ui/core/Typography';

import Form from "./Form";


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        // maxWidth: '35%',
    },
    header: {
        backgroundColor: '#3f51b5',
        color: 'white',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
    }
}));

export default function WelcomePage() {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container spacing={8} style={{justifyContent: 'center'}}>
                <Grid item lg={4} style={{marginTop: '6vh'}}>
                    <Card className={classes.card}>
                        <CardHeader
                            className={classes.header}
                            avatar={
                                <ContactMailIcon />
                            }
                            titleTypographyProps={{ variant: 'h4' }}
                            style={{ textAlign: "center" }}
                            title="Welcome to DraftTrackr"
                        />
                        <CardContent style={{ minHeight: '40vh', marginTop: '5%' }}>
                            <Typography variant="h6">
                                DraftTrackr is an email taskmanager that helps you send personalized
                                email blasts to your contacts all while keeping track of who you've
                                been emailing and how many times.
                    </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4}>
                    <Form header="Sign Up" />
                </Grid>
            </Grid>
        </div>
    )
}