import axios from 'axios'

// creating the api commom for register and login
const api = axios.create(
    {
        baseURL: "http://localhost:3000/auth"
    }
)

// 1. registering a new user
export const registerUserApi = async (data) => {
    try {
      const res = await api.post("/register", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Inside register api success:", res.data);
      return res.data;
      
    } catch (error) {

      if (error.response) {
        console.log("Inside register api error:", error.response.data);
        throw error.response.data;
      }

      throw { message: error.message };
    }
  };
  