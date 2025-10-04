import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { editReportThroughRedux } from "../../features/report/report.feature";
import { logout } from "../../features/auth/auth.feature";


function EditSingleReport(){

    const navigate = useNavigate(); 
    const { id } = useParams();               // This gets report._id from URL
    const location = useLocation();           // This gets the state
    const report = location.state?.report;    // Full report object (if passed)

    console.log("id",id)

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.authSlice)

    const [reportInfo, setReportInfo] = useState({
        task: report?.task || "",
        date: report?.date ? new Date(report.date).toISOString().split("T")[0] : "",
        startTime: report?.startTime || "",
        endTime: report?.endTime || ""
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportInfo(
            {
                ...reportInfo,[name]:value
            }
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("report Info:",reportInfo);
        const res = await dispatch(editReportThroughRedux({token:token, data: reportInfo, id:id}))
        console.log("res in edit page:",res.payload);

        const { statusCode, msg, message, success } = res.payload;
        if(statusCode === 404){
          toast.error(msg);
          dispatch(logout());
          navigate("/login")
        } 

        if(success){
          toast.success(message);
          navigate('/user-dashboard')
        }
    }

     return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-8">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Report</h1>
    
            <form className="space-y-8" >
              {/* Date Input */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={reportInfo.date}
                  className="w-full px-5 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>
    
              {/* Start Time Input */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={reportInfo.startTime}
                  className="w-full px-5 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="startTime"
                  onChange={handleChange}
                  required
                />
              </div>
    
              {/* End Time Input */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={reportInfo.endTime}
                  className="w-full px-5 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="endTime"
                  onChange={handleChange}
                  required
                />
              </div>
    
              {/* Task Input */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Task
                </label>
                <input
                  type="text"
                  value={reportInfo.task}
                  className="w-full px-5 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="task"
                  onChange={handleChange}
                  required
                />
              </div>
    
              {/* Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="px-6 py-3 text-base bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                
                onClick={handleSubmit}
                >
                  Update Report
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    export default EditSingleReport;