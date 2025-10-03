import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { registerUserApi } from "../../api/auth/auth.api";


// 1 registering a user with redux
export const registerUserThroughRedux = createAsyncThunk(
    "auth/register",
    async(data, { rejectWithValue }) => {
        try {

            const res = await registerUserApi(data);
            return res;

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    token: "",
    isLoading: false,
    isError: false,
}

const authSlice = createSlice(
    {
        name: 'Authentication',
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            // 1. registering the user 
            builder
            .addCase(registerUserThroughRedux.pending,(state) => {
                state.isLoading = true;
            }) 
            .addCase(registerUserThroughRedux.fulfilled,(state,action) => {
                console.log("action.payload in user data",action.payload);
                state.isLoading = false;
                state.msg = "";
            })          
            .addCase(registerUserThroughRedux.rejected, (state,action) => {
                console.log("action.payload in user registration rejected", action.payload);
                state.isLoading = false;
                state.isError = true;
            })
        }
    }
)

export default authSlice.reducer;