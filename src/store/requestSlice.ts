import {createSlice} from "@reduxjs/toolkit";
import {RequestState} from "../types/request";
import {addRequest, fetchRequests} from "./action-creator/requests";

const initialState : RequestState = {
    requests: [
        // {id: 1, createdTime: "12;12;12;1;212;", x: 1, y: 1, r: 1, result: true },
        // {id: 2, createdTime: "12;12;12;1;212;", x: 2, y: 1, r: 1, result: false },
        // {id: 3, createdTime: "12;12;12;1;212;", x: 3, y: 1, r: 2, result: true },
        // {id: 4, createdTime: "12;12;12;1;212;", x: 4, y: 1, r: 2, result: true },
        // {id: 5, createdTime: "12;12;12;1;212;", x: 1, y: 2, r: 3, result: true },
        // {id: 6, createdTime: "12;12;12;1;212;", x: 1, y: 3, r: 1, result: true }
    ],
    loading: false,
    error: null
}

const requestSlice = createSlice({
    name: 'requests',
    initialState: initialState,
    reducers: {
        clearRequests: (state) => {
            state.requests = [];
        }
    },
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
                state.error = (action.payload ? action.payload : "Some error occurred");
            })


            .addCase(addRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRequest.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(addRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload ? action.payload : "Some error occurred");
            })
    }

})

export const { clearRequests } = requestSlice.actions;

export default requestSlice.reducer;