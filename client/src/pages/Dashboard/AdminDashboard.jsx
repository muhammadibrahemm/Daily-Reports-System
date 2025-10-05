import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReportsThroughRedux } from "../../features/report/report.feature";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const fetchReportsForAdmin = async (token) => {
    const res = await dispatch(fetchAllReportsThroughRedux(token));
    console.log("res.payload", res.payload.data);
    setReports(res.payload.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReportsForAdmin(token);
  }, [token]);

  const exportToExcel = () => {
    if (reports.length === 0) {
      alert("No reports available to export!");
      return;
    }

    // Convert reports to a clean JSON array for Excel
    const formattedData = reports.map((r) => ({
      "User Name": r.user?.name || "Unknown",
      "Email": r.user?.email || "N/A",
      "Task": r.task,
      "Date": new Date(r.date).toLocaleDateString(),
      "Start Time": r.startTime,
      "End Time": r.endTime,
      "Created At": new Date(r.createdAt).toLocaleString(),
      "Updated At": new Date(r.updatedAt).toLocaleString(),
    }));

    console.log("formatted Data:",formattedData);

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");

    // Convert to a Blob and download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Reports_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading Reports...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={exportToExcel}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
        >
          Export as Excel
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {report.user?.name || "Unknown User"}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(report.date).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-4">
              <span className="font-medium text-gray-800">Task:</span> {report.task}
            </p>

            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-4">
              <div>
                <p className="text-sm font-medium text-blue-700">Start Time</p>
                <p className="text-gray-800 font-semibold">{report.startTime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">End Time</p>
                <p className="text-gray-800 font-semibold">{report.endTime}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-3 text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-700">Created At:</span>{" "}
                {new Date(report.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-gray-700">Updated At:</span>{" "}
                {new Date(report.updatedAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {report.user?.email || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
