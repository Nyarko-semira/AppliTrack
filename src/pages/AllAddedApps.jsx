import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHrApplications } from "../api/applicationApi";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const AllAddedApps = () => {
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hrApplications"],
    queryFn: getHrApplications,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl text-blue-600 font-bold mb-6">
          All Applications
        </h1>

        <p className="text-gray-500">
          Loading applications...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl text-blue-600 font-bold mb-6">
          All Applications
        </h1>

        <p className="text-red-500">
          Failed to load applications.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <h1 className="text-3xl text-blue-600 font-bold mb-6">
        All Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications yet.
        </p>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {applications.map((app) => (

            <div
              key={app.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >

              {/* Applicant Name */}
              <h2 className="font-bold text-lg text-gray-800">
                {app.applicant?.name || "Unknown Applicant"}
              </h2>

              {/* Job */}
              <p className="text-gray-600">
                Applied for:{" "}
                <span className="font-medium">
                  {app.job?.title || "Job title unavailable"}
                </span>
              </p>

              {/* Email */}
              <p className="text-gray-500">
                {app.applicant?.email || "No email available"}
              </p>

              {/* Application Status */}
              <p
                className={`mt-2 inline-block px-2 py-1 rounded text-sm ${{
                    PENDING:
                      "bg-yellow-100 text-yellow-800",
                    INTERVIEW:
                      "bg-blue-100 text-blue-800",
                    OFFER:
                      "bg-green-100 text-green-800",
                    REJECTED:
                      "bg-red-100 text-red-800",
                  }[app.status] ||
                  "bg-gray-100 text-gray-800"
                  }`}
              >
                {app.status}
              </p>

              {/* View Details */}
              <div className="mt-4 text-right">
                <Link
                  to={`/applications/${app.id}`}
                  className="text-blue-600 text-sm inline-flex items-center gap-1 hover:underline"
                >
                  <Eye size={14} />
                  View Details
                </Link>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AllAddedApps;