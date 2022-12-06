import {createAsyncThunk} from "@reduxjs/toolkit";
import {Request} from "../../types/request";
import axios from "axios";


export const fetchRequests = createAsyncThunk<Request[], void, {rejectValue: string}>(
    "request/fetchRequests",
    async function (_, {rejectWithValue}) {
        try {
            const response = await axios.get("http://localhost:33880/history");

            if (response.status !== 200) {
                return rejectWithValue("Error: " + (response.data ? response.data : response.statusText));
            }

            return response.data;
        } catch (e) {
            return rejectWithValue("Some error occurred during requests fetch");
        }
    }
);