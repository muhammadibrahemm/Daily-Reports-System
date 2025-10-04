import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.feature"
import reportSlice from "../features/report/report.feature"

const store = configureStore(
    {
        reducer: {
            authSlice,
            reportSlice,
        }
    }
);


export default store;