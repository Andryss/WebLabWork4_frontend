import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios/index";
import {User} from "../../types/user";


export const loginUser = createAsyncThunk<boolean, User, {rejectValue: string}>(
    "request/loginUser",
    async function (user, {rejectWithValue}) {
        try {
            const response = await axios.postForm("http://localhost:33880/auth/login", {
                username: user.username,
                password: user.password
            });

            if (response.status !== 200) {
                return rejectWithValue("Error: " + (response.data ? response.data : response.statusText));
            }

            return true;
        } catch (e) {
            return rejectWithValue("Some error occurred during user logging in");
        }
    }
);