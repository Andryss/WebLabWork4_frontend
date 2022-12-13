import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserState} from "../types/user";
import {loginUser, logoutUser} from "./action-creator/user";

const initialState : UserState = {
    user: {
        username: "",
        isLoggedIn: false,
        authorities: []
    },
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.user.username = action.payload;
        },
        resetError(state) {
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.isLoggedIn = true;
                state.user.username = action.payload.username;
                state.user.authorities = action.payload.authorities;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload ? action.payload : "Some error occurred");
            })


            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user.isLoggedIn = false;
                state.user.username = "";
                state.user.authorities = [];
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload ? action.payload : "Some error occurred");
            })
    }

});

export const {setUsername, resetError} = userSlice.actions;

export default userSlice.reducer;