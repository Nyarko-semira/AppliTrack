import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getApplicationById } from "../api/applicationApi";
import { Briefcase, Calendar, StickyNote, ArrowLeft } from "lucide-react";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  INTERVIEW: "bg-blue-100 text-blue-800",
  OFFER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const JobPreview = () => {
  const { id } = useParams();
  const {
    data: application,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplicationById(id),
    enabled: !!id,
  });


  if (isLoading) {
    return (
      <div className="text-center mt-20">
        Loading application...
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-gray-500">
        <p className="text-xl font-semibold mb-2">
          ⚠️ Application not found
        </p>

        <p className="text-sm mb-6">
          The application you're looking for doesn't exist.
        </p>

        <Link
          to="/home"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Job Role & Company */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-blue-700">{application.job.title}</h2>
          <p className="text-sm text-gray-500 mt-1">at {application.job.company}</p>
        </div>

        <div className="space-y-6 text-sm text-gray-700">
          {/* Status */}
          <div className="flex items-center gap-3">
            <Briefcase className="text-blue-500" size={20} />
            <span className="font-semibold text-gray-600">Status:</span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[application.status]
                }`}
            >
              {application.status}
            </span>
          </div>

          {/* Date Applied */}
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-500" size={20} />
            <span className="font-semibold text-gray-600">Date Applied:</span>
            <span>{application.appliedAt
              ? new Date(application.appliedAt).toLocaleDateString()
              : "Not specified"}</span>
          </div>

          <div className="flex items-start gap-3">
            <StickyNote className="text-blue-500 mt-1" size={20} />

            <div>
              <p className="font-semibold text-gray-600">Skills:</p>

              <p className="mt-1 text-gray-800">
                {application.skills || "No skills specified."}
              </p>
            </div>
          </div>

          {/* Notes */}
          {/* <div className="flex items-start gap-3">
            <StickyNote className="text-blue-500 mt-1" size={20} />
            <div>
              <p className="font-semibold text-gray-600">Notes:</p>
              <p className="mt-1 whitespace-pre-wrap text-gray-800">
                {job.notes || "No additional notes."}
              </p>
            </div>
          </div> */}
        </div>

        {/* Back Button */}
        <div className="mt-10 text-right">
          <Link
            to="/home"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
