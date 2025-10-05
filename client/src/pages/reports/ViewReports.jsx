import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ViewReport() {
  const { reports, isLoading } = useSelector((state) => state.reportSlice);
  const navigate = useNavigate();

  console.log("isLoading:", isLoading);
  console.log("reports:", reports);

  const handleDownloadExcel = () => {
    if (!reports || reports.length === 0) {
      alert("No reports available to download.");
      return;
    }

    // Prepare data for Excel
    const data = reports.map((report) => ({
      Date: new Date(report.date).toLocaleDateString(),
      "Start Time": report.startTime,
      "End Time": report.endTime,
      Task: report.task,
    }));

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "Daily_Reports.xlsx");
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
      <main className="flex-1 p-6 bg-gray-50">
        {/* Buttons Row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
          >
            Go Back
          </button>

          <button
            onClick={handleDownloadExcel}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Download Excel
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Reports</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report._id}
                className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition min-h-[220px] flex flex-col justify-between"
              >
                <div>
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

export default ViewReport;
