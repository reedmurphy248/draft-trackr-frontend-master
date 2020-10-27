import React, { useState } from "react";
import axios from "axios";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AlertDismissable from "./AlertDismissable";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Form(props) {
    const classes = useStyles();

    const [user, updateUser] = useState({
        email: "",
        password: ""
    })
    const [isAlert, setAlert] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        updateUser(prevValue => {
            if (name === "email") {
                return {
                    email: value,
                    password: prevValue.password
                }
            } else if (name === "password") {
                return {
                    email: prevValue.email,
                    password: value
                }
            }
        })
    }

    function setShow() {
        this.setState({ alert: true });
    }

    function onSubmit(event) {
        event.preventDefault();

        console.log("Clicked");

        const User = {
            username: user.email,
            password: user.password
        }

        if (props.header === 'Sign Up') {
            axios.post('http://localhost:5000/users/signup', User)
                .then(() => {
                    window.location = "/postRegistration";
                })
                .catch(() => {
                    setAlert(true);
                    updateUser({
                        email: "",
                        password: ""
                    });
                });
        }

        if (props.header === 'Sign In') {
            axios.post('http://localhost:5000/users/signin', User)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res));
                    window.location = "/main";
                })
                .catch(() => {
                    setAlert(true);
                    updateUser({
                        email: "",
                        password: ""
                    });
                });
        }

    }

    function createAlert() {
        if (!isAlert) {
            return <h1></h1>;
        } else if (isAlert && props.header === 'Register') {
            return (
                <AlertDismissable
                    error="Username Already Exists"
                    explanation="The email you entered for your username has already been taken"
                    onClose={() => setAlert(false)}
                />
            )
        } else if (isAlert && props.header === 'Login') {
            return (
                <AlertDismissable
                    error="Invalid Login"
                    explanation="The username or password you entered is incorrect"
                    onClose={() => setAlert(false)}
                />
            )
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    {props.header}
                </Typography>
                <form className={classes.form}>
                    <TextField
                        onChange={handleChange}
                        type="email" name="email" value={user.email}
                        label="Email Address" variant="outlined" margin="normal"
                        required fullWidth autoFocus
                    />
                    <div>{createAlert()}</div>
                    <TextField
                        onChange={handleChange}
                        type="password" name="password" value={user.password}
                        label="Password" variant="outlined"
                        required fullWidth
                    />
                    <Button
                        onClick={onSubmit} type="submit"
                        variant="contained" color="primary" size="large"
                        fullWidth
                        className={classes.submit}
                    >
                        {props.header}
                    </Button>
                </form>
            </div>
        </Container>
    )
}