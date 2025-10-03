import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi } from "../../api/auth/auth.api";

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

// 2 loging a user with redux and storing the token in local storage
export const loginUserThroughRedux = createAsyncThunk(
    "auth/login",
    async(data, { rejectWithValue }) => {
        try {
            
            const res = await loginUserApi(data)
            console.log("res in loging user in redux:",res)
            return res;

        } catch (error) {
            console.log("error in loginUserThroughRedux:",error)
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    token: localStorage.getItem("token"),
    isLoading: false,
    isError: false,
    role: "",
    id: ""
}

const authSlice = createSlice(
    {
        name: 'Authentication',
        initialState,
        reducers: {
            logout: (state) => {
                state.id = "";
                state.token = "";
                state.role = ""
            }
        },
        extraReducers: (builder) => {
            // 1. registering the user 
            builder
            .addCase(registerUserThroughRedux.pending,(state) => {
                state.isLoading = true;
            }) 
            .addCase(registerUserThroughRedux.fulfilled,(state,action) => {
                state.isLoading = false;
            })          
            .addCase(registerUserThroughRedux.rejected, (state,action) => {
                console.log("action.payload in user registration rejected", action.payload);
                state.isLoading = false;
                state.isError = true;
            })

            // 2. logging the user 
            .addCase(loginUserThroughRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserThroughRedux.fulfilled, (state, action) => {
                console.log("action.payload in login user data",action.payload);
                state.isLoading = false;
                state.token = action.payload.token;
                state.id = action.payload.id
                state.role = action.payload.role
                localStorage.setItem("token",state.token)
            })
            .addCase(loginUserThroughRedux.rejected, (state,action) => {
                console.log("action.payload in user login rejected", action.payload);
                state.isLoading = false;
                state.isError = true;
            })
        }
    }
)

export const { logout } = authSlice.actions

export default authSlice.reducer;