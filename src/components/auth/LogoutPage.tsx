import React, {FormEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {logoutUser} from "../../store/action-creator/user";
import {resetError} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {Container, Grid, Paper, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import ErrorPage from "../ErrorPage";
import {clearRequests} from "../../store/requestSlice";

const LogoutPage = () => {

    const {user, error, loading} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetError())
    }, [dispatch]);

    if (!user.isLoggedIn) {
        return (<ErrorPage text={"Please log in to log out :)"} />);
    }

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(logoutUser())
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(clearRequests());
                    navigate("/login");
                }
            });
    };

    return (
        <Container maxWidth="tablet">
            <Paper elevation={3}>
                <Container maxWidth="tablet" sx={{ padding: "20px" }}>
                    <Typography
                        variant="h4"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        Are you sure to log out?
                    </Typography>
                    <Container
                        component="form"
                        onSubmit={formSubmitHandler}
                        sx={{ marginTop: "50px" }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            rowSpacing={2}
                        >
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    By clicking on this button you give up all responsibilities!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    variant="outlined"
                                    type="submit"
                                    loading={loading}
                                >
                                    Yes, I understand
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

export default LogoutPage;