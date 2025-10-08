import React, { useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  interview: "bg-blue-100 text-blue-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const JobDetail = () => {
  const { id } = useParams(); // get job ID from URL
  const { jobs, applications } = useContext(AppContext);
  const location = useLocation();
  const fromPage = location.state?.from;

  // Find the job that matches the ID
  const job = jobs.find((job) => job.id === id);

  //Filter applications  for this job
  const jobApplications = applications.filter((application) => {
    return application.jobId === id;
  });

  if (!job) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Job not found</h2>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-5">
      <h1 className="text-2xl  border-b font-bold mb-2 text-blue-700">
        {job.title}
      </h1>
      <p className="text-gray-600 mb-2">
        {job.company || "Company not specified"}
      </p>
      <p className="text-gray-500 mb-2">
        {job.location || "Location not specified"}
      </p>
      <p className="mb-2">
        <strong>Department:</strong> {job.department || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Job Type:</strong> {job.type || "N/A"}
      </p>
      <p className="mb-2">
        <strong>Salary:</strong> {job.salary || "N/A"}
      </p>
      <p className="mb-4">
        <strong>Description:</strong>{" "}
        {job.description || "No description provided"}
      </p>
      <p className="text-gray-400 text-sm mb-4">
        Posted on:{" "}
        {job.datePosted
          ? new Date(job.datePosted).toDateString()
          : "Date not available"}
      </p>

      {/* Status */}
      {/* <div className="flex items-center gap-3">
           
            <span className="font-semibold text-gray-600">Status:</span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                statusColors[job.status]
              }`}
            >
              {job.status}
            </span>
          </div> */}

      {/* Application Section */}
      {fromPage === "home" ? (
        <></>
      ) : (
        <div className="bg-gray p-4 rounded-xl shadoow">
          <h2 className="text-xl font-semibold mb-2">
            Applicants ({jobApplications.length})
          </h2>
          {jobApplications.length === 0 ? (
            <p className="text-gray-500">No applicants yet !</p>
          ) : (
            <ul className="space-y-2">
              {jobApplications.map((app) => (
                <li
                  key={app.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <Link
                    to={`/applications/${app.id}`}
                    className="text-blue-600 "
                  >
                    <div>
                      <p className="font-medium text-gray-800">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {fromPage === "home" ? (
        <div className="mt-10 flex justify-between align-items-center">
          <div>
            <Link
              to={`/applyjob/${job.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Apply For Job
            </Link>
          </div>
          <div>
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 text-right">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
