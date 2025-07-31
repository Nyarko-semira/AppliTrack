import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Briefcase, Calendar, StickyNote, ArrowLeft } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  interview: "bg-blue-100 text-blue-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const JobPreview = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("jobApplications");
    if (stored) {
      const all = JSON.parse(stored);
      const match = all.find((j) => j.id === id);
      setJob(match);
    }
  }, [id]);

  if (!job) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-gray-500 ">
        <p className="text-xl font-semibold mb-2">⚠️ Job not found</p>
        <p className="text-sm mb-6">
          The job you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="max-w-2xl mx-auto mt-16 bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-blue-700">{job.role}</h2>
          <p className="text-gray-500 text-sm mt-1">at {job.company}</p>
        </div>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center gap-3">
            <Briefcase size={18} className="text-blue-500" />
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                statusColors[job.status]
              }`}
            >
              {job.status}
            </span>
          </div>

          {/* Date Applied */}
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-blue-500" />
            <span className="font-medium text-gray-600">Date Applied:</span>
            <span className="text-sm text-gray-800">
              {job.dateApplied || "Not specified"}
            </span>
          </div>

          {/* Notes */}
          <div className="flex items-start gap-3">
            <StickyNote size={18} className="text-blue-500 mt-1" />
            <div>
              <span className="font-medium text-gray-600">Notes:</span>
              <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                {job.notes || "No additional notes."}
              </p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 border-t pt-4 text-right">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft size={14} className="mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
