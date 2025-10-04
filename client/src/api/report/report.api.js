import axios from "axios";

// creating common end point for report
const api = axios.create(
    {
        baseURL: "http://localhost:3000/reports"
    }
)

// 1. fetching all reports
export const fetchAllReportsApi = async(token) => {
    try {
        const res = await api.get("/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        
        return res.data;

    } catch (error) {
        if (error.response && error.response.status === 401) {
          // return a plain value instead of throwing Error object
          return Promise.reject("TOKEN_EXPIRED");
        }
        return Promise.reject(error.message || "Something went wrong");
      }
}