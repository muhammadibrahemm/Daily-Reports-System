import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditReport() {
  const { reports, isLoading } = useSelector((state) => state.reportSlice);
  const navigate = useNavigate();

  console.log("isLoading:", isLoading);
  console.log("reports:", reports);

  const handleEditReportBtn = (report) => {
    console.log("report:", report);
  
    // Navigate with param AND state
    navigate(`/user-dashboard/edit-report/${report._id}`, {
      state: { report }
    });
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
        >
          Go Back
        </button>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Reports</h1>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report._id}
                className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="font-medium text-gray-800">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Start Time:{" "}
                    <span className="font-medium">{report.startTime}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    End Time:{" "}
                    <span className="font-medium">{report.endTime}</span>
                  </p>
                </div>

                <h2 className="mt-4 text-lg font-semibold text-blue-600">
                  {report.task}
                </h2>

                {/* Edit Button (smaller size) */}
                <div className="mt-4">
                  <button
                    className="px-6 py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
                  onClick={() => handleEditReportBtn(report)}
                  >
                    Edit Report
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reports found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default EditReport;
