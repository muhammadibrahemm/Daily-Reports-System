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

// 2. logging the user
export const loginUserApi = async (data) => {
  try {
    const res = await api.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Inside login api success:", res.data);
    return res.data;

  } catch (error) {
    console.log("error in loginUser Api:", error);

    if (error.response && error.response.data) {
      return error.response.data; 
    }
    return { message: "Something went wrong", statusCode: 500 };
  }
}

// 3. verfying user when token is saved in local storage and take out the role
export const verifyUserTokenApi = async (token) => {
  try {
    const res = await api.get("profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    console.log("res in verifyUserTokenApi:",res.data);
    return res.data;
    
  } catch (error) {
    console.log("error is in verify user token api:",error);
  }
} 
  