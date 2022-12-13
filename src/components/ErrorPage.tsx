import React from 'react';
import {Alert, AlertTitle, Container} from "@mui/material";

export interface ErrorPageProperties {
    text: string
}

const ErrorPage = (props: ErrorPageProperties) => {
    return (
        <Container maxWidth="tablet">
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {props.text}
            </Alert>
        </Container>
    );
};

export default ErrorPage;