import React from "react";
import Box from "@material-ui/core/Box";
import { Container, Grid } from '@material-ui/core';

export default function WelcomePage() {
    return (
        <div>
            <Container maxWidth="sm">
                <Grid spacing={2}>
                    <h1>Welcome to DraftTrackr</h1>
                    <h3>DraftTrackr is an email taskmanager that helps you send personalized email blasts to your contacts all while keeping track of who you've been emailing and how many times.</h3>
                </Grid>
            </Container>
        </div>
    )
}