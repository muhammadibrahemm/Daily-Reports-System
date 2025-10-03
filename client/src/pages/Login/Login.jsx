import React, { useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginUserThroughRedux } from "../../features/auth/auth.feature";

function Login() {

  const isLoading = useSelector((state) => state.authSlice.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(
    {
      email:"",
      password:""
    }
  )

  const handleChangeUserData = (e) => {
    const {name,value} = e.target
    setUserData(
      {
        ...userData,[name]:value
      }
    )
  }

  const submitFormDataBtn = async (e) => {
    e.preventDefault();
    console.log("userData:",userData);
    const res = await dispatch(loginUserThroughRedux(userData));
    const { statusCode } = res.payload
    console.log("payload:",res.payload)
    if(statusCode === 200){
      toast.success("Login Successfull")
      if(res.payload.role === "admin"){
        navigate("/admin-dashboard")
      }else{
        navigate("/user-dashboard")
      }
      
    }else{
      toast.error("Invalid credentials")
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <section className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Login
        </h2>
        <form className="space-y-4" onSubmit={submitFormDataBtn}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              name="email"
              value={userData.email}
              onChange={handleChangeUserData}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              name="password"
              value={userData.password}
              onChange={handleChangeUserData}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
