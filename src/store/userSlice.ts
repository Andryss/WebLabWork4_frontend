import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "../types/user";
import {loginUser} from "./action-creator/user";

const initialState : UserState = {
    user: {
        username: null,
        password: null,
        isLoggedIn: false
    },
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.isLoggedIn = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.error.message ? action.error.message : "Error");
            })
    }

})

export default userSlice.reducer;