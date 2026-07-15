import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Building2, ChevronRight, Briefcase } from "lucide-react";

const JobCard = ({ job, from }) => {
  const firstLetter = job.company ? job.company.charAt(0).toUpperCase() : "J";
  
  // Dynamic subtle background colors for company logo placeholder
  const colors = [
    "bg-blue-50 text-blue-600",
    "bg-indigo-50 text-indigo-600",
    "bg-purple-50 text-purple-600",
    "bg-emerald-50 text-emerald-600",
    "bg-amber-50 text-amber-600",
  ];
  const colorIndex = (job.company || "").length % colors.length;
  const logoColorClass = colors[colorIndex];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl font-display font-bold text-lg flex items-center justify-center ${logoColorClass}`}>
            {firstLetter}
          </div>
          <div>
            <h4 className="font-display font-bold text-gray-800 text-lg leading-tight hover:text-indigo-600 transition-colors">
              {job.title}
            </h4>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
              <Building2 size={14} />
              <span>{job.company}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
              <MapPin size={12} />
              {job.location}
            </span>
          )}
          {job.department && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50/50 text-indigo-700 border border-indigo-50">
              <Briefcase size={12} />
              {job.department}
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {job.type || "Full-time"}
        </span>
        <Link
          to={`/Jobpreview/${job.id}`}
          state={{ from }}
          className="inline-flex items-center gap-0.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
        >
          View Details 
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
