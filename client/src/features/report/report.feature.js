import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { canCreateReportApi, createReportApi, fetchAllReportsApi } from "../../api/report/report.api";



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

// 2 can create the report
export const canCreateReportThroughRedux = createAsyncThunk(
    "reports/can-create",
    async(token, {rejectWithValue}) => {
        try {
            const res = await canCreateReportApi(token);
            console.log("res in redux:",res);
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

// 3 create the report now
export const createReportThroughRedux = createAsyncThunk(
    "reports/create",
    async ({ token, data }, { rejectWithValue }) => {
      try {

        const response = await createReportApi(token, data);
        console.log("response is in report:",response);
        return response; 

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
  );

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
            // 2. can create report 
            .addCase(canCreateReportThroughRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(canCreateReportThroughRedux.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log("action in reducer:",action.payload);
            })
            .addCase(canCreateReportThroughRedux.rejected, (state, action) => {
                console.log("action.payload in user reports rejected", action.payload);
                state.isLoading = false;
                state.isError = true;
            })
            // 3. now finally creating the report
            .addCase(createReportThroughRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createReportThroughRedux.fulfilled, (state, action) => {
                state.isLoading = false;
                const {_id, date, startTime, endTime} = action.payload.data
                const report = {
                    _id
                    ,date: new Date(date).toISOString().split("T")[0]
                    ,task
                    ,startTime
                    ,endTime
                }
                state.reports.push(report);
                console.log("action in reducer:",action.payload);
            })
            .addCase(createReportThroughRedux.rejected, (state, action) => {
                console.log("action.payload in user reports rejected", action.payload);
                state.isLoading = false;
                state.isError = true;
            })
        }
    }
)

export default reportSlice.reducer