import React from 'react';
import {Button, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

export interface EasterEggProperties {
    eggSrc: string,
    eggNum: number,
    returnAddress: string
}

const EasterEgg = (props: EasterEggProperties) => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const isMobile = useMediaQuery(theme.breakpoints.up("mobile"));

    return (
        <Container maxWidth="desktop">
            <Paper elevation={3}>
                <Container sx={{ padding: "20px" }}>
                    <Typography
                        variant="h4"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        Easter egg #{props.eggNum}
                    </Typography>
                    <Container sx={{ marginTop: "20px" }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            rowSpacing={3}
                        >
                            <Grid item>
                                <img
                                    src={props.eggSrc}
                                    alt="easter egg"
                                    height={isDesktop ? 550 : isTablet ? 450 : isMobile ? 300 : 0}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h6"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    Congratulation! You found it!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => {navigate(props.returnAddress)}}>
                                    Return to the main page
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
            </Paper>
        </Container>
    );
};

export default EasterEgg;