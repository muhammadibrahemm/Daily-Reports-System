import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth.feature"

const store = configureStore(
    {
        reducer: {
            authSlice,
        }
    }
);


export default store;