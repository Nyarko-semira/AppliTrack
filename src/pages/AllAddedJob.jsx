import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobApi";
import { Link } from "react-router-dom";
import { Eye, MapPin, Briefcase, Clock, Users, ArrowRight } from "lucide-react";

const AllAddedJob = () => {
  const {data: jobs = [], isLoading, isError,} = useQuery({
  queryKey: ["jobs"],
  queryFn: getJobs,
});

if (isLoading) {
  return <div>Loading jobs...</div>;
}

if (isError) {
  return <div>Failed to load jobs.</div>;
}

  const role = localStorage.getItem("role");

  
  const colors = [
    "bg-blue-50 text-blue-600 border-blue-100",
    "bg-indigo-50 text-indigo-600 border-indigo-100",
    "bg-purple-50 text-purple-600 border-purple-100",
    "bg-emerald-50 text-emerald-600 border-emerald-100",
    "bg-amber-50 text-amber-600 border-amber-100",
  ];

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-extrabold text-gray-800 mb-2">
          {role === "hr" ? "📢 Managed Openings" : "💼 Explore Careers"}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {role === "hr"
            ? "Review and manage all job openings posted on the platform"
            : "Browse and apply to active positions across the organization"}
        </p>

        {jobs.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm max-w-md mx-auto mt-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Briefcase size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Jobs Posted Yet</h3>
            <p className="text-gray-500 text-sm">
              {role === "hr"
                ? "Click 'Post Job' in the navigation bar to list your first opening."
                : "Active openings will appear here once recruiters post them."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const firstLetter = job.company ? job.company.charAt(0).toUpperCase() : "J";
              const colorIndex = (job.company || "").length % colors.length;
              const logoColorClass = colors[colorIndex];

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Brand header */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className={`w-11 h-11 rounded-xl font-display font-bold text-base flex items-center justify-center border ${logoColorClass}`}>
                        {firstLetter}
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-gray-800 text-base leading-tight">
                          {job.title}
                        </h2>
                        <p className="text-xs font-semibold text-gray-500 mt-1">{job.company}</p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {job.location && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                          <MapPin size={12} />
                          {job.location}
                        </span>
                      )}
                      {job.type && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-50">
                          <Clock size={12} />
                          {job.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {job.department || "General"}
                    </span>
                    
                    <Link
                      to={`/Jobpreview/${job.id}`}
                      state={role !== "hr" ? { from: "home" } : undefined}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
                    >
                      {role === "hr" ? (
                        <>
                          <Users size={14} />
                          <span>Review Applicants</span>
                        </>
                      ) : (
                        <>
                          <Eye size={14} />
                          <span>View & Apply</span>
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAddedJob;
