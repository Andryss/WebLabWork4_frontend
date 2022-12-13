import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {registerUser} from "../../store/action-creator/user";
import {useNavigate} from "react-router-dom";
import {Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import ErrorPage from "../ErrorPage";

const RegisterPage = () => {

    const {user} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [usernameMessage, setUsernameMessage] = useState<string | null>(null);

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    if (user.isLoggedIn) {
        return (<ErrorPage text={"Please log out to register new user"} />);
    }

    const validateUsername: (username: string) => boolean = (username) => {
        if (username.length < 3 || username.length > 20) {
            setUsernameMessage("Username must contain from 3 to 20 characters");
            setUsernameError(true);
            return false;
        }
        if (username === "big striped fly") {
            setUsernameMessage("This username is forbidden");
            setUsernameError(true);
            return false;
        }
        setUsernameMessage(null);
        setUsernameError(false);
        return true;
    };

    const validatePassword: (password: string) => boolean = (password) => {
        if (password.length < 3 || password.length > 20) {
            setPasswordMessage("Password must contain from 3 to 20 characters");
            setPasswordError(true);
            return false;
        }
        setPasswordMessage(null);
        setPasswordError(false);
        return true;
    };

    const validateConfirmPassword: (confirmPassword: string) => boolean = (confirmPassword) => {
        if (confirmPassword.length === 0) {
            setConfirmPasswordMessage("Password can't be empty");
            setConfirmPasswordError(true);
            return false;
        }
        if (confirmPassword !== password) {
            setConfirmPasswordMessage("Passwords must be equals");
            setConfirmPasswordError(true);
            return false;
        }
        setConfirmPasswordMessage(null);
        setConfirmPasswordError(false);
        return true;
    };

    const validateAll: () => boolean = () => {
        let res = true;
        res = validateUsername(username) && res;
        res = validatePassword(password) && res;
        res = validateConfirmPassword(confirmPassword) && res;
        return res;
    }

    const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        validateUsername(e.target.value);
    };

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const confirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        validateConfirmPassword(e.target.value);
    };

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateAll()) {
            setLoading(true);
            setError(null);
            dispatch(
                registerUser({
                    username: username,
                    password: password
                }))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        navigate("/login");
                    } else if (res.meta.requestStatus === "rejected") {
                        setLoading(false);
                        if (!res.payload || res.payload === true) setError("Some error occurred");
                        else setError(res.payload);
                    }
                });
        }
    };

    return (
        <Container maxWidth="tablet">
            <Paper elevation={3}>
                <Container sx={{ padding: "20px" }}>
                    <Typography
                        variant="h4"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        Register form
                    </Typography>
                    <Container
                        component="form"
                        onSubmit={formSubmitHandler}
                        sx={{ marginTop: "20px" }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            rowSpacing={3}
                        >
                            <Grid item width={320}>
                                <TextField
                                    id="username-field"
                                    label="Username"
                                    variant="outlined"
                                    disabled={loading}
                                    fullWidth={true}

                                    onChange={usernameChangeHandler}

                                    error={usernameError}
                                    helperText={usernameMessage}
                                />
                            </Grid>
                            <Grid item width={320}>
                                <TextField
                                    id="password-field"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    disabled={loading}
                                    fullWidth={true}

                                    onChange={passwordChangeHandler}

                                    error={passwordError}
                                    helperText={passwordMessage}
                                />
                            </Grid>
                            <Grid item width={320}>
                                <TextField
                                    id="confirm-password-field"
                                    label="Confirm password"
                                    type="password"
                                    variant="outlined"
                                    disabled={loading}
                                    fullWidth={true}

                                    onChange={confirmPasswordChangeHandler}

                                    error={confirmPasswordError}
                                    helperText={confirmPasswordMessage}
                                />
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    variant="outlined"
                                    type="submit"
                                    loading={loading}
                                >
                                    I'm a new guy!
                                </LoadingButton>
                            </Grid>
                            <Grid item hidden={!error}>
                                <Typography
                                    variant="h6"
                                    color="error"
                                >
                                    {error}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
            </Paper>
        </Container>
    );
};

export default RegisterPage;