import {createAsyncThunk} from "@reduxjs/toolkit";
import {Request} from "../../types/request";
import HttpStatusCode from "../../types/httpStatusCodes";
import {API_URL} from "./common";

export const fetchRequests = createAsyncThunk<Request[], void, {rejectValue: string}>(
    "request/fetchRequests",
    async function (_, {rejectWithValue}) {

        const response = await fetch(API_URL + "/history");

        if (response.ok) return await response.json();

        if (response.status === HttpStatusCode.UNAUTHORIZED) return rejectWithValue("Unauthorized");

        return rejectWithValue("Some error occurred");
    }
);


export const addRequest = createAsyncThunk<Request[], {x: number, y: number, r: number}, {rejectValue: string}>(
    "request/addRequest",
    async function (request, {rejectWithValue}) {

        const response = await fetch(API_URL + "/history/new", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                x: request.x,
                y: request.y,
                r: request.r
            })
        });

        if (response.ok) return await response.json();

        if (response.status === HttpStatusCode.UNAUTHORIZED) return rejectWithValue("Unauthorized");

        return rejectWithValue("Some error occurred");
    }
);