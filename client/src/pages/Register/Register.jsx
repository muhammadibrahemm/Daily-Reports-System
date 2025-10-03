import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { registerUserThroughRedux } from "../../features/auth/auth.feature";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Register() {

  const isLoading = useSelector((state) => state.authSlice.isLoading)
  console.log("is Loading:",isLoading)

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(
    {
      name: "",
      email: "",
      password: ""
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
    const res = await dispatch(registerUserThroughRedux(userData));
    console.log("res:",res.payload);
    const { message, statusCode } = res.payload;

    if(statusCode === 409){
      toast.error(message)
    }

    if(statusCode === 201){
      toast.success(message)
    }
    
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <section className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Register
        </h2>
        <form className="space-y-4" onSubmit={submitFormDataBtn}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              value={userData.name}
              onChange={handleChangeUserData}
              name="name"
            />
          </div>

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
              value={userData.email}
              onChange={handleChangeUserData}
              name="email"
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
              value={userData.password}
              onChange={handleChangeUserData}
              name="password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        {/* Login Redirect Button */}
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:underline">
            Already have an account? Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default Register;
