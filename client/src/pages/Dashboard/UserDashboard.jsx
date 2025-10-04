import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { canCreateReportThroughRedux, fetchAllReportsThroughRedux } from "../../features/report/report.feature";
import { logout } from "../../features/auth/auth.feature";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function UserDashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token =  useSelector((state) => state.authSlice.token)    

    const handleViewReports = async () => {
        navigate('view-report')
        const res = await dispatch(fetchAllReportsThroughRedux(token));
        const {msg, statusCode} = res.payload;

        if(statusCode === 404){
          dispatch(logout())
          toast.error(msg);
          navigate("/login")
        }
    }

    const handleCreateReports =  async () => {
      const res = await dispatch(canCreateReportThroughRedux(token));
      const { success, message, msg, statusCode} = res.payload;
      console.log("res.payload",res.payload)
      if(success){
        toast.success(message);
        navigate('create-report')
      }
      if(!success){
        toast.error(message);
      }

      if(statusCode === 404){
        dispatch(logout())
        navigate("/login")
        toast.error(msg);
      }
    }

    const handleEditReports = async () => {
      navigate('edit-report')
      const res = await dispatch(fetchAllReportsThroughRedux(token));
      const {msg, statusCode} = res.payload;

      if(statusCode === 404){
        dispatch(logout())
        toast.error(msg);
        navigate("/login")
      }
    }

    return (
      <main className="px-8 py-16 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          User Dashboard
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Create Report Card */}
          <article className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                Create Report
              </h3>
              <p className="text-gray-600 mb-6">
                Start a new daily report quickly and efficiently. This helps you
                capture key activities, progress, and updates for the day.
              </p>
  
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  Add important highlights from your workday.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  Include pending tasks and next steps for tomorrow.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  Share challenges or blockers for better tracking.
                </li>
              </ul>
  
              <p className="text-gray-500 text-sm">
                Creating reports regularly helps you stay organized and provides a
                clear history of your daily progress.
              </p>
            </div>
  
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleCreateReports}
              >
                Create Report
              </button>
            </div>
          </article>
  
          {/* View Reports Card */}
          <article className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-700">
                View Reports
              </h3>
              <p className="text-gray-600 mb-6">
                Quickly access your recent reports and review their details.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-t">
                      <td className="px-4 py-2">Daily Progress</td>
                      <td className="px-4 py-2">Oct 3, 2025</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Client Meeting Notes</td>
                      <td className="px-4 py-2">Oct 2, 2025</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Weekly Summary</td>
                      <td className="px-4 py-2">Sep 30, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={handleViewReports}
              >
                View All Reports
              </button>
            </div>
          </article>
  
          {/* Edit Reports Card */}
          <article className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-700">
                Edit Reports
              </h3>
              <p className="text-gray-600 mb-6">
                Update your existing reports to make sure they stay accurate and
                reflect the latest information.
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
                  <h4 className="font-medium text-gray-800">Project Alpha Report</h4>
                  <p className="text-sm text-gray-500">Last updated: Sep 28, 2025</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
                  <h4 className="font-medium text-gray-800">Team Meeting Notes</h4>
                  <p className="text-sm text-gray-500">Last updated: Sep 25, 2025</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={handleEditReports}
              >
                Edit Reports
              </button>
            </div>
          </article>
        </div>
      </main>
    );
  }
  
  export default UserDashboard;
  