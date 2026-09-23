import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHrApplications, updateApplicationStatus } from "../api/applicationApi";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  INTERVIEW: "bg-blue-100 text-blue-800",
  OFFER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};


const ApplicationDetails = () => {
  const { id } = useParams();

  const {
    data: applications = [], isLoading, isError, } = useQuery({
      queryKey: ["hrApplications"],
      queryFn: getHrApplications,
    });

  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: updateApplicationStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hrApplications"],
      });

      toast.success("Application status updated successfully!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Failed to update application status."
      );
    },
  });


  const handleStatusChange = (id, newStatus) => {
    statusMutation.mutate({
      id,
      status: newStatus,
    });
  };


  const application = applications.find(
    (app) => String(app.id) === String(id)
  );

  const job = application?.job || {
    title: "Unknown Position",
  };

  console.log("Application:", application);
  console.log("Job:", job);

  if (isLoading) {
    return <div>Loading application...</div>;
  }

  if (isError) {
    return <div>Failed to load application.</div>;
  }


  if (!application) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Application not found
        </h2>
        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline text-sm sm:text-base"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg mt-6 sm:mt-8 border border-gray-200">

      <div className="border-b pb-0 sm:pb-2 mb-2 sm:mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-left">
          Application Details
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base text-center sm:text-left mb-0">
          Detailed information about the applicant
        </p>
      </div>


      <div className="space-y-4 text-gray-700 text-sm sm:text-base">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 break-words text-center sm:text-left">
            {application.applicant?.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Applicant Name
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="font-medium">Email:</span>
          <span className="text-gray-600 break-all">{application.applicant?.email}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="font-medium">Applied For:</span>
          <span className="text-gray-600">{job.title}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="font-medium">Applied On:</span>
          <span className="text-gray-600">{application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "Recently"}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <span className="font-medium">Resume:</span>
          {application?.resumeUrl ? (
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {application.resumeFileName || "View Resume"}
            </a>
          ) : (
            <span className="text-gray-600">Not uploaded</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className="font-medium">Skills:</span>
          <span className="text-gray-600 break-words">
            {application.skills || "Not provided"}
          </span>
        </div>

        <div className="mb-4">
          <span className="font-medium block mb-1">Cover Letter:</span>
          {application.coverLetter ? (
            <p className="whitespace-pre-wrap text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200 leading-relaxed text-sm sm:text-base overflow-auto max-h-60 sm:max-h-96">
              {application.coverLetter}
            </p>
          ) : (
            <span className="text-gray-600">Not uploaded</span>
          )}
        </div>


        <div className="mt-3  flex  justify-between items-center">
          <label className="text-sm font-medium text-gray-700 mr-2">
            Status:
          </label>
          <select
            value={application.status}
            onChange={(e) => handleStatusChange(application.id, e.target.value)}
            className={`px-2 py-1 rounded text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColors[application.status]}`}
          >
            <option value="PENDING">Pending</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>


      </div>


      <div className="mt-6 sm:mt-8 text-center sm:text-right">
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white font-medium px-5 sm:px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ApplicationDetails;
