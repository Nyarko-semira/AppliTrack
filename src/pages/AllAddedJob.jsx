import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { Eye } from "lucide-react";

const AllAddedJob = () => {
  const { jobs } = useContext(AppContext);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-blue-600  font-bold mb-6">All Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <div className="mt-4 text-right">
                <Link
                  to={`/Jobpreview/${job.id}`}
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
  );
};

export default AllAddedJob;
