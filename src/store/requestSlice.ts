import {createSlice} from "@reduxjs/toolkit";
import {RequestState} from "../types/request";
import {fetchRequests} from "./action-creator/requests";

const initialState : RequestState = {
    requests: [],
    loading: false,
    error: null
}

const requestSlice = createSlice({
    name: 'requests',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.error.message ? action.error.message : "Error");
            })
    }

})

export default requestSlice.reducer;