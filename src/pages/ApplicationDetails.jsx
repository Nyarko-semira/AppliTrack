import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  interview: "bg-blue-100 text-blue-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const { applications, jobs } = useContext(AppContext);

  //  IDs must  be  strings
  const application = applications.find((app) => app.id === id);
  const job = jobs.find((job) => job.id === application.jobId) || {
    title: "Unknown Position",
  };
  console.log("Application:", application);
  console.log("Jobs:", jobs);

  if (!application) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Application not found</h2>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg mt-8 border border-gray-200">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Application Details
        </h1>
        <p className="text-gray-500 mt-1">
          Detailed information about the applicant
        </p>
      </div>

      {/* Applicant Info */}
      <div className="space-y-4 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {application.name}
          </h2>
          <p className="text-sm text-gray-500">Applicant Name</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Email:</span>
          <span className="text-gray-600">{application.email}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Applied For:</span>
          <span className="text-gray-600">{job.title}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Applied On:</span>
          <span className="text-gray-600">{application.appliedDate}</span>
        </div>

        {/* Coverletter */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Cover Letter:</span>
          {application.coverLetter ? (
            <a
              href={application.coverLetter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {application.coverLetter.fileName}
            </a>
          ) : (
            <span className="text-gray-600">Not uploaded</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Experience:</span>
          <span className="text-gray-600">
            {application.experience || "N/A"}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="font-medium">Skills:</span>
          <span className="text-gray-600">
            {application.skiils || "Not provided"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Status:</span>
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm ${
              statusColors[application.status]
            }`}
          >
            {application.status.charAt(0).toUpperCase() +
              application.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-right">
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ApplicationDetails;
