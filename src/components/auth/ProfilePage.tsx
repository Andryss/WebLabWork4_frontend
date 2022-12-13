import React from 'react';
import {useAppSelector} from "../../hooks";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import ErrorPage from "../ErrorPage";
import {getProfileIconName} from "../../services/userService";

const ProfilePage = () => {

    const {user} = useAppSelector(state => state.user);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

    if (!user.isLoggedIn) {
        return (<ErrorPage text={"Please log in to see this page"} />);
    }

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
                        Personal page
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        columnSpacing={3}
                        sx={{ marginTop : "20px" }}
                    >
                        <Grid item mobile={6} tablet={4}>
                            <img
                                src={getProfileIconName(user)}
                                alt="your avatar"
                                height={isDesktop ? 200 : 150}
                                style={{ margin: "auto", display: "block" }}
                            />
                        </Grid>
                        <Grid item mobile={6} tablet={8}>
                            <Grid
                                container
                                direction="column"
                                rowSpacing={2}
                            >
                                <Grid item>
                                    <Typography variant="h6">
                                        Username:
                                    </Typography>
                                    <Box marginLeft="20px">
                                        <Typography variant="subtitle1">
                                            {user.username}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        Authorities:
                                    </Typography>
                                    <Box marginLeft="20px">
                                        {user.authorities.map((authority, index) =>
                                            <Typography key={index} variant="subtitle1">
                                                {authority}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </Container>
    );
};

export default ProfilePage;