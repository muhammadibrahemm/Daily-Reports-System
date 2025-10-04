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

// 2. can create the report
// which checks the logic one report per day and if it is okay then move the user to create form
// if not then user will stay on his / her dashboard

export const canCreateReportApi = async(token) => {
    try {
        const res = await api.get("/can-create", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        console.log("res in api:",res);
        console.log("res.api in api:",res.data);

        return res.data;

    } catch (error) {

        console.log("error:",error)
        console.log("error.response:",error.response)
        
        if (error.response && error.response.status === 401) {
          return Promise.reject("TOKEN_EXPIRED");
        }
        return Promise.reject(error.message || "Something went wrong");
    }
}

// 3 finally create the report 
export const createReportApi = async(token, data) => {
    try {
        
        const res = await api.post("/create", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("res in api:",res);
        console.log("res.data in api:",res.data);

        return res.data;
        
    } catch (error) {
        console.log("error:",error)
        console.log("error.response:",error.response)
        
        if (error.response && error.response.status === 401) {
          return Promise.reject("TOKEN_EXPIRED");
        }
        return Promise.reject(error.message || "Something went wrong");
    }
}

// 4 edit the report
export const editReportApi = async(token, data, id) => {
    try {

        console.log("id in edit api:",id);
        const res = await api.patch(`/edit/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("res in api:",res);
        console.log("res.data in api:",res.data);

        return res.data;
        
    } catch (error) {
        console.log("error:",error)
        console.log("error.response:",error.response)
        
        if (error.response && error.response.status === 401) {
          return Promise.reject("TOKEN_EXPIRED");
        }
        return Promise.reject(error.message || "Something went wrong");
    }
}