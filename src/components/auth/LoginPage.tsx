import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {loginUser} from "../../store/action-creator/user";
import {useNavigate} from "react-router-dom";
import {Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import ErrorPage from "../ErrorPage";
import {resetError} from "../../store/userSlice";

const LoginPage = () => {

    const {user, error, loading} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [usernameMessage, setUsernameMessage] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string>("");

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    if (user.isLoggedIn) {
        return (<ErrorPage text={"Please log out to log in :)"} />);
    }

    const validateUsername: (username: string) => boolean = (username) => {
        if (username.length === 0) {
            setUsernameMessage("Username must not be empty");
            setUsernameError(true);
            return false;
        }
        setUsernameMessage("");
        setUsernameError(false);
        return true;
    };

    const validatePassword: (password: string) => boolean = (password) => {
        if (password.length === 0) {
            setPasswordMessage("Password must not be empty");
            setPasswordError(true);
            return false;
        }
        setPasswordMessage("");
        setPasswordError(false);
        return true;
    };

    const validateAll: () => boolean = () => {
        let res = true;
        res = validateUsername(username) && res;
        res = validatePassword(password) && res;
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

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === "big striped fly" && password.length !== 0) {
            setTimeout(() => {navigate("/easter-egg/1")}, 2000);
            return;
        }
        if (validateAll()) {
            dispatch(loginUser({username: username, password: password}))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        navigate("/profile");
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
                        Login form
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
                            <Grid item>
                                <LoadingButton
                                    variant="outlined"
                                    type="submit"
                                    loading={loading}
                                >
                                    I'm lucky!
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

export default LoginPage;