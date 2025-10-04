import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllReportsApi } from "../../api/report/report.api";



// 1 fetching all reports
export const fetchAllReportsThroughRedux = createAsyncThunk(
    "reports/fetch",
    async (token, { rejectWithValue }) => {
        try {
            const res = await fetchAllReportsApi(token);
            console.log("res:",res);
            return res;
        } catch (error) {
            if (error === "TOKEN_EXPIRED") {
                const errObj = {
                    statusCode: 404,
                    msg: "Token expired. Please login again."
                }
                return rejectWithValue(errObj);
            }
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    reports: [],
    isLoading: false,
    isError: false,
}


const reportSlice = createSlice(
    {
        name: "Reports",
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder
            // 1. get all reports
            .addCase(fetchAllReportsThroughRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllReportsThroughRedux.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload.data
            })
            .addCase(fetchAllReportsThroughRedux.rejected, (state,action) => {
                console.log("action.payload in user reports rejected", action.payload);
                state.isLoading = false;
                state.isError = true;
            })
            
        }
    }
)

export default reportSlice.reducer