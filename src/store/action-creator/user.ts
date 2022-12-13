import {createAsyncThunk} from "@reduxjs/toolkit";
import HttpStatusCode from "../../types/httpStatusCodes";
import {RequestErrorResponse} from "../../types/errors";
import { API_URL } from "./common";

export const loginUser = createAsyncThunk<
    {username: string, authorities: string[]},
    {username: string, password: string},
    {rejectValue: string}>
(
    "auth/loginUser",
    async function (user, {rejectWithValue}) {

        const form = new FormData();
        form.append("username", user.username);
        form.append("password", user.password);
        const response = await fetch(API_URL + "/auth/login", {
            method: "POST",
            body: form
        });

        if (response.ok) return {username: user.username, authorities: await response.json()};

        if (response.status === HttpStatusCode.UNAUTHORIZED) return rejectWithValue("Invalid username or password");

        return rejectWithValue("Some error occurred");
    }
);


export const registerUser = createAsyncThunk<boolean, {username: string, password: string}, {rejectValue: string}>(
    "auth/registerUser",
    async function (user, {rejectWithValue}) {

        const response = await fetch(API_URL + "/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        });

        if (response.ok) return true;

        if (response.status === HttpStatusCode.BAD_REQUEST) {
            const errorResponse: RequestErrorResponse = await response.json();
            return rejectWithValue(errorResponse.error);
        }

        return rejectWithValue("Some error occurred");
    }
);


export const logoutUser = createAsyncThunk<boolean, void, {rejectValue: string}>(
    "auth/logoutUser",
    async function (_, {rejectWithValue}) {

        const response = await fetch(API_URL + "/auth/logout", {
            method: "POST",
        });

        if (response.ok) return true;

        return rejectWithValue("Some error occurred");
    }
);
