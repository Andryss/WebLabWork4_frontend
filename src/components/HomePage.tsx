import React from 'react';
import {Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";

const HomePage = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const isMobile = useMediaQuery(theme.breakpoints.up("mobile"));


    return (
        <Container maxWidth="fullsize">
            <Paper elevation={3}>
                <Container sx={{ padding: "20px" }}>
                    <Typography
                        variant="h4"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        Home page
                    </Typography>
                    <Container sx={{ marginTop: "20px" }}>
                        <Container>
                            <img
                                src="/pictures/welcome.gif"
                                alt="the best dance in the world"
                                height={isDesktop ? 450 : isTablet ? 350 : isMobile ? 250 : 0}
                                style={{ margin:"auto", display:"block" }}/>
                            <audio controls src="/audio/welcome.mp3" style={{ margin:"auto", display:"block" }}/>
                        </Container>
                    </Container>
                </Container>
            </Paper>
            <Container maxWidth="tablet" sx={{ marginTop: "50px" }}>
                <Paper elevation={5}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        rowSpacing={3}
                        columnSpacing={3}
                    >
                        <Grid item mobile={12} tablet={12} desktop={6}>
                            <Container sx={{ padding: "10px"}}>
                                <Typography
                                    variant="h4"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    Creative producer
                                </Typography>
                                <Typography
                                    variant="h6"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    Krivosheev Andrey Aleksandrovich
                                </Typography>
                            </Container>
                        </Grid>
                        <Grid item mobile={12} tablet={12} desktop={6}>
                            <Container sx={{ padding: "10px"}}>
                                <Typography
                                    variant="h4"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    With the participation
                                </Typography>
                                <Typography
                                    variant="h6"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    P32111, case 113138
                                </Typography>
                            </Container>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Container>
    );
};

export default HomePage;