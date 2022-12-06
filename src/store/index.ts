import {configureStore} from "@reduxjs/toolkit";
import requestSlice from "./requestSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        requests: requestSlice,
        user: userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;