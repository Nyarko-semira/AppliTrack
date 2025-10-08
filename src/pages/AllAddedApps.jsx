import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Eye } from "lucide-react";

const AllAddedApps = () => {
  const { applications, jobs } = useContext(AppContext);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-blue-600 font-bold mb-6">
        All Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app) => {
            const job = jobs.find((job) => job.id === app.jobId);
            return (
              <div
                key={app.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="font-bold text-lg text-gray-800">{app.name}</h2>
                <p className="text-gray-600">
                  Applied for: <span className="font-medium">{job?.title}</span>
                </p>
                <p className="text-gray-500">{app.email}</p>
                <p
                  className={`mt-2 inline-block px-2 py-1 rounded text-sm ${
                    {
                      pending: "bg-yellow-100 text-yellow-800",
                      interview: "bg-blue-100 text-blue-800",
                      offer: "bg-green-100 text-green-800",
                      rejected: "bg-red-100 text-red-800",
                    }[app.status]
                  }`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </p>
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllAddedApps;
