import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { createReportThroughRedux } from "../../features/report/report.feature";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/auth.feature";

function CreateReport() {

    const dispatch = useDispatch();
    const { token, isLoading } = useSelector((state) => state.authSlice )
    const navigate = useNavigate();

    const [reportDetailsObj, setReportDetailsObj] = useState(
        {
            date: "",
            task: "",
            startTime: "",
            endTime: ""
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportDetailsObj(
            {
                ...reportDetailsObj,[name]:value
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Report Details:", reportDetailsObj);
        const res = await dispatch(createReportThroughRedux({ token: token, data: reportDetailsObj }))
        const { msg, statusCode, success, message } = res.payload
        console.log("res is in handle submit:",res.payload);

        if(statusCode === 404){
            toast.error(msg);
            dispatch(logout());
            navigate('/login');
        }

        if(success){
            toast.success(message);
            navigate('/user-dashboard')
        }
    }

    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <section className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Report</h1>
  
          <form className="space-y-5" onSubmit={handleSubmit}>
            <fieldset className="space-y-4">
              <legend className="sr-only">Report Details</legend>
  
              {/* Date Input */}
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={reportDetailsObj.date}
                  onChange={handleChange}
                  required
                />
              </div>
  
              {/* Task Input */}
              <div>
                <label htmlFor="task" className="block text-gray-700 font-medium mb-1">
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  placeholder="Enter your task"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={reportDetailsObj.task}
                  onChange={handleChange}
                  required
                />
              </div>
  
              {/* Start Time Input */}
              <div>
                <label htmlFor="startTime" className="block text-gray-700 font-medium mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={reportDetailsObj.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
  
              {/* End Time Input */}
              <div>
                <label htmlFor="endTime" className="block text-gray-700 font-medium mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={reportDetailsObj.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </fieldset>
  
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Report
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }
  
  export default CreateReport;
  