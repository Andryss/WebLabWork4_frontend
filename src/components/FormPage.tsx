import React, {ChangeEvent, FormEvent, MouseEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {addRequest, fetchRequests} from "../store/action-creator/requests";
import ErrorPage from "./ErrorPage";
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Autocomplete,
    useTheme, useMediaQuery
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";

const floatNumberPattern = /^((-?[1-9]\d*([,.]\d+)?)|(0([,.]\d+)?)|(-0[,.]\d+))$/
const integerNumberPattern = /^((-?[1-9]\d*)|(0))$/

const FormPage = () => {

    const {user} = useAppSelector(state => state.user);
    const {requests, loading, error} = useAppSelector(state => state.requests);
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const isMobile = useMediaQuery(theme.breakpoints.up("mobile"));

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchRequests());

        const fetching = setInterval(() => {
            dispatch(fetchRequests());
        }, 5000);

        return () => {clearInterval(fetching)};
    }, [dispatch]);

    const [x, setX] = useState<string>("");
    const [xVal, setXVal] = useState<number>(0);
    const [xError, setXError] = useState<boolean>(false);
    const [xMessage, setXMessage] = useState<string | null>(null);

    const [y, setY] = useState<string>("");
    const [yVal, setYVal] = useState<number>(0);
    const [yError, setYError] = useState<boolean>(false);
    const [yMessage, setYMessage] = useState<string | null>(null);

    const [r, setR] = useState<string>("");
    const [rVal, setRVal] = useState<number>(0);
    const [rError, setRError] = useState<boolean>(false);
    const [rMessage, setRMessage] = useState<string | null>(null);

    const [xPoint, setXPoint] = useState<number | null>(null);
    const [yPoint, setYPoint] = useState<number | null>(null);

    const [selectedRequest, setSelectedRequest] = useState<number | null>(null);


    const xAutocomplete = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"];
    const rAutocomplete = xAutocomplete;


    // @ts-ignore
    const canvas: HTMLCanvasElement = document.getElementById("plotCanvas");
    const width = (isDesktop ? 450 : isTablet ? 350 : isMobile ? 250 : 0),
        center = width / 2,
        unit = width / 10,

        axisWidth = width / 100,
        axisWidthOffset = (axisWidth - 1) / 2,
        axisMargin = width / 60,

        arrowLength = width / 20,
        arrowWidth = arrowLength / 3,

        streakLengthOffset = axisWidth,
        streakLength = 2 * streakLengthOffset + 1,
        streakWidth = axisWidth,
        streakWidthOffset = axisWidthOffset,

        fontSize = width / 15,
        fontSizeStr = "px",
        fontFamily = "Comic Sans MS",
        fontStr = fontSizeStr + " " + fontFamily;

    const xPointRoundParam = 1e2,
        yPointRoundParam = 1e2;


    const setXPointExt = (newValue: number | null) => {
        setXPoint(newValue ?
            Math.min(Math.max(Math.round(newValue * xPointRoundParam) / xPointRoundParam, -5), 3)
            :
            null
        );
    }

    const setYPointExt = (newValue: number | null) => {
        setYPoint(newValue ?
            Math.min(Math.max(Math.round(newValue * yPointRoundParam) / yPointRoundParam, -5), 3)
            :
            null
        )
    }

    const drawPlotOnCanvas = (rValue: number | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0,0,width,width);

        // ctx.strokeRect(0,0,width,height);

        if (rValue && rValue > 0) {
            const rValueHalf = rValue / 2;

            ctx.fillStyle = "lightblue";
            // area
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(center + rValue * unit, center);
            ctx.lineTo(center + rValue * unit, center - rValue * unit);
            ctx.lineTo(center, center - rValue * unit);
            ctx.lineTo(center, center - rValueHalf * unit);
            ctx.lineTo(center - rValueHalf * unit, center);
            ctx.lineTo(center - rValue * unit, center);
            ctx.arcTo(center - rValue * unit, center + rValue * unit, center, center + rValue * unit, rValue * unit);
            ctx.fill();
        }

        ctx.fillStyle = "black";
        // OX
        ctx.fillRect(axisMargin, center - axisWidthOffset, width - 2 * axisMargin, axisWidth);
        ctx.beginPath();
        ctx.moveTo(width, center);
        ctx.lineTo(width - arrowLength, center - arrowWidth);
        ctx.lineTo(width - arrowLength, center + arrowWidth + 1);
        ctx.lineTo(width, center + 1);
        ctx.fill();

        // OY
        ctx.fillRect(center - axisWidthOffset, axisMargin, axisWidth, width - 2 * axisMargin);
        ctx.beginPath();
        ctx.moveTo(center, 0);
        ctx.lineTo(center - arrowWidth, arrowLength);
        ctx.lineTo(center + arrowWidth + 1, arrowLength);
        ctx.lineTo(center + 1, 0)
        ctx.fill();

        // lines
        ctx.fillRect(center - streakLengthOffset, center + 4 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center + 3 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center + 2 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center + unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - 2 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - 3 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center - streakLengthOffset, center - 4 * unit - streakWidthOffset, streakLength, streakWidth);
        ctx.fillRect(center + 4 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center + 3 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center + 2 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center + unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - 2 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - 3 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);
        ctx.fillRect(center - 4 * unit - streakWidthOffset, center - streakLengthOffset, streakWidth, streakLength);

        // text OX
        ctx.font = fontSize + fontStr;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("-4", center - 4 * unit, center - streakWidth);
        ctx.fillText("-3", center - 3 * unit, center - streakWidth);
        ctx.fillText("-2", center - 2 * unit, center - streakWidth);
        ctx.fillText("-1", center - unit, center - streakWidth);
        ctx.fillText("1", center + unit, center - streakWidth);
        ctx.fillText("2", center + 2 * unit, center - streakWidth);
        ctx.fillText("3", center + 3 * unit, center - streakWidth);
        ctx.fillText("4", center + 4 * unit, center - streakWidth);

        // text OY
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("-4", center + streakLength, center + 4 * unit);
        ctx.fillText("-3", center + streakLength, center + 3 * unit);
        ctx.fillText("-2", center + streakLength, center + 2 * unit);
        ctx.fillText("-1", center + streakLength, center + unit);
        ctx.fillText("1", center + streakLength, center - unit);
        ctx.fillText("2", center + streakLength, center - 2 * unit);
        ctx.fillText("3", center + streakLength, center - 3 * unit);
        ctx.fillText("4", center + streakLength, center - 4 * unit);

        // X
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("X", width - arrowLength - arrowWidth, center + arrowWidth * 2);

        // Y
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText("Y", center - arrowWidth * 2, fontSize + arrowWidth);

        // history points
        requests.forEach((request) => {
            ctx.fillStyle = (request.r === rValue) ? ((request.result) ? "green" : "orange") : ("grey");
            ctx.beginPath();
            const pointScale = (request.id === selectedRequest) ? 1.5 : 1;
            ctx.arc(center + unit * request.x, center - unit * request.y, streakWidth * 1.5 * pointScale, 0, 2 * Math.PI, false);
            ctx.fill();
        })

        // red point
        if (xPoint != null && yPoint != null) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(center + unit * xPoint, center - unit * yPoint, streakWidth, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.font = (fontSize * 0.8) + fontStr;
            ctx.textAlign = (xPoint > 0) ? "end" : "start";
            ctx.textBaseline = (yPoint > 0) ? "top" : "bottom";
            ctx.fillText(" " + xPoint + ", " + yPoint + " ", center + unit * xPoint, center - unit * yPoint);
        }
    }

    useEffect(() => {
        drawPlotOnCanvas(((!rError) ? rVal : null));
    }, [drawPlotOnCanvas, rError, rVal]);

    const getXCoordinateOrConvert = (xOffset: number) => {
        return (x.length !== 0 && !xError ? xVal : ((xOffset - center) / unit));
    }

    const getYCoordinateOrConvert = (yOffset: number) => {
        return (y.length !== 0 && !yError ? yVal : (- (yOffset - center) / unit));
    }

    const onMouseMoveHandler = (event: MouseEvent<HTMLCanvasElement>) => {
        const bound = canvas.getBoundingClientRect();
        setXPointExt(getXCoordinateOrConvert(event.clientX - bound.x));
        setYPointExt(getYCoordinateOrConvert(event.clientY - bound.y));
    }

    const onMouseLeaveHandler = () => {
        setXPointExt(null);
        setYPointExt(null);
    }

    const onClickHandler = () => {
        if (!validateR(r)) return;
        dispatch(addRequest({
            x: (xPoint ? xPoint : xVal),
            y: (yPoint ? yPoint : yVal),
            r: rVal
        }))
    }


    if (!user.isLoggedIn) {
        return (<ErrorPage text={"Please log in to see this page"} />);
    }


    const validateX: (x: string) => boolean = (x) => {
        if (x.length === 0) {
            setXMessage("X can't be blank");
            setXError(true);
            return false;
        }
        if (!floatNumberPattern.test(x)) {
            setXMessage("X must be a number");
            setXError(true);
            return false;
        }
        const value = parseFloat(x);
        if (value < -5 || value > 3) {
            setXMessage("X must be in range (-5..3)");
            setXError(true);
            return false;
        }
        setXMessage(null);
        setXError(false);
        setXVal(value);
        return true;
    };

    const validateY: (y: string) => boolean = (y) => {
        if (y.length === 0) {
            setYMessage("Y can't be blank");
            setYError(true);
            return false;
        }
        if (!floatNumberPattern.test(y)) {
            setYMessage("Y must be a number");
            setYError(true);
            return false;
        }
        const value = parseFloat(y.replaceAll(",", "."));
        if (value < -5 || value > 3) {
            setYMessage("Y must be in range (-5..3)");
            setYError(true);
            return false;
        }
        setYMessage(null);
        setYError(false);
        setYVal(value);
        return true;
    };

    const validateR: (r: string) => boolean = (r) => {
        if (r.length === 0) {
            setRMessage("R can't be blank");
            setRError(true);
            return false;
        }
        if (!floatNumberPattern.test(r)) {
            setRMessage("R must be a number");
            setRError(true);
            return false;
        }
        if (!integerNumberPattern.test(r)) {
            setRMessage("R must be an integer number");
            setRError(true);
            return false;
        }
        const value = parseInt(r);
        if (value <= 0) {
            setRMessage("R must be positive");
            setRError(true);
            return false;
        }
        if (value > 3) {
            setRMessage("R must be less than 3");
            setRError(true);
            return false;
        }
        setRMessage(null);
        setRError(false);
        setRVal(value);
        return true;
    };

    const validateAll: () => boolean = () => {
        let res = true;
        res = validateX(x) && res;
        res = validateY(y) && res;
        res = validateR(r) && res;
        return res;
    }

    const xChangeHandler = (value: string | null) => {
        setX((value ? value : ""));
        validateX((value ? value : ""));
    };

    const yChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setY(e.target.value);
        validateY(e.target.value);
    };

    const rChangeHandler = (value: string | null) => {
        setR((value ? value : ""));
        validateR((value ? value : ""));
    };

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (y === "big fly" && x.length !== 0 && r.length !== 0) {
            setTimeout(() => {
                navigate("/easter-egg/2");
            }, 2000)
            return;
        }

        if (validateAll()) {
            dispatch(addRequest({
                    x: xVal,
                    y: yVal,
                    r: rVal
                }));
        }
    };

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
                        Form page
                    </Typography>
                    <Container>
                        <Grid
                            container
                            direction={isTablet ? "row" : "column"}
                            justifyContent="center"
                            alignItems="center"
                            columnSpacing={3}
                            rowSpacing={3}
                        >
                            <Grid item mobile={12} tablet={7} desktop={7}>
                                <canvas
                                    id="plotCanvas"
                                    width={width}
                                    height={width}
                                    style={{ margin: "auto", display: "block" }}

                                    onMouseMove={onMouseMoveHandler}
                                    onMouseLeave={onMouseLeaveHandler}
                                    onClick={onClickHandler}
                                />
                            </Grid>
                            <Grid item mobile={12} tablet={5} desktop={5}>
                                <Container
                                    component="form"
                                    onSubmit={formSubmitHandler}
                                >
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        rowSpacing={2}
                                    >
                                        <Grid item width={200}>
                                            <Autocomplete
                                                options={xAutocomplete}
                                                onChange={(event, value) => {
                                                    xChangeHandler(value);
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        id="x-field"
                                                        label="X"
                                                        variant="outlined"
                                                        disabled={loading}

                                                        // onChange={xChangeHandler}

                                                        error={xError}
                                                        helperText={xMessage}

                                                        inputProps={{ ...params.inputProps, maxLength: 15 }}
                                                    />
                                                }
                                            />
                                        </Grid>
                                        <Grid item width={200}>
                                            <TextField
                                                id="y-field"
                                                label="Y"
                                                variant="outlined"
                                                disabled={loading}

                                                onChange={yChangeHandler}

                                                error={yError}
                                                helperText={yMessage}

                                                inputProps={{ maxLength: 7 }}
                                            />
                                        </Grid>
                                        <Grid item width={200}>
                                            <Autocomplete
                                                options={rAutocomplete}
                                                onChange={(event, value) => {
                                                    rChangeHandler(value);
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        id="r-field"
                                                        label="R"
                                                        variant="outlined"
                                                        disabled={loading}

                                                        error={rError}
                                                        helperText={rMessage}

                                                        inputProps={{ ...params.inputProps, maxLength: 15 }}
                                                    />
                                                }
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
                            </Grid>
                        </Grid>
                        <Box style={{ marginTop: "20px" }}>
                            <Typography
                                variant="h6"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                History
                            </Typography>
                            <Box style={{ marginTop: "10px" }}>
                                { requests.length === 0 ? (
                                    <Typography
                                        variant="subtitle1"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        History is empty :(
                                    </Typography>
                                ) : (
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        columnSpacing={3}
                                        rowSpacing={3}
                                    >
                                        {requests.map((request, index) =>
                                            <Grid item key={request.id} desktop={4} tablet={6} mobile={12}>
                                                <Card
                                                    elevation={(request.id === selectedRequest) ? 14 : 3}
                                                    onMouseEnter={() => {setSelectedRequest(request.id)}}
                                                    onMouseLeave={() => {setSelectedRequest(null)}}
                                                >
                                                    <CardContent>
                                                        <Typography variant="h6" display="flex">
                                                            {index + 1}
                                                        </Typography>
                                                        <Typography variant="subtitle1" display="flex">
                                                            Time: {request.createdTime}
                                                        </Typography>
                                                        <Typography variant="subtitle1" display="flex">
                                                            X: {request.x}
                                                        </Typography>
                                                        <Typography variant="subtitle1" display="flex">
                                                            Y: {request.y}
                                                        </Typography>
                                                        <Typography variant="subtitle1" display="flex">
                                                            R: {request.r}
                                                        </Typography>
                                                        <Typography variant="subtitle1" display="flex" color={request.result ? "green" : "red"}>
                                                            Result: {request.result ? "In the area" : "Not in the area"}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        )}
                                    </Grid>
                                )}
                            </Box>
                        </Box>
                    </Container>
                </Container>
            </Paper>
        </Container>

    );
};

export default FormPage;