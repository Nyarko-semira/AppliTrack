import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  interview: "bg-blue-100 text-blue-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AllJob = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("jobApplications");
    if (stored) {
      setJobs(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          📂 All Job Applications
        </h2>

        {jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-gray-500 text-center">
            <p className="text-lg">No applications yet.</p>
            <Link to="/add">
              <button className="bg-blue-220 text-white-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                ➕ Add a New Application
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.role}
                  </h3>
                  <p className="text-sm text-gray-500">at {job.company}</p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    statusColors[job.status]
                  }`}
                >
                  {job.status}
                </span>

                <p className="text-xs text-gray-500 mt-2">
                  Applied on: {job.dateApplied || "Not specified"}
                </p>

                <div className="mt-4 text-right">
                  <Link
                    to={`/preview/${job.id}`}
                    className="text-blue-600 text-sm inline-flex items-center gap-1 hover:underline"
                  >
                    <Eye size={14} />
                    Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJob;
