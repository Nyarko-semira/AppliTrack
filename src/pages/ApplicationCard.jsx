import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Building2,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const statusStyles = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  INTERVIEW: "bg-blue-50 text-blue-700 border-blue-200",
  OFFER: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};

function ApplicationCard({ applicationDetail }) {
  const applicant = applicationDetail?.applicant;
  const job = applicationDetail?.job;

  const status =
    applicationDetail?.status || "PENDING";

  const appliedDate = applicationDetail?.appliedAt
    ? new Date(applicationDetail.appliedAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    )
    : "Recently";

  return (
    <Link
      to={`/applications/${applicationDetail?.id}`}
      className="group block bg-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
    >

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">

          <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">
            {applicant?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">
              {applicant?.name || "Unknown Applicant"}
            </h3>

            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
              <Mail size={14} />
              <span className="truncate">
                {applicant?.email || "No email available"}
              </span>
            </div>
          </div>
        </div>


        <span
          className={`shrink-0 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusStyles[status] ||
            "bg-gray-50 text-gray-600 border-gray-200"
            }`}
        >
          {status}
        </span>
      </div>


      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
          Applied for
        </p>

        <h4 className="font-semibold text-gray-800 text-base">
          {job?.title || "Job title unavailable"}
        </h4>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
          {job?.company && (
            <span className="flex items-center gap-1.5">
              <Building2 size={14} />
              {job.company}
            </span>
          )}

          {job?.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {job.location}
            </span>
          )}
        </div>
      </div>


      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <CalendarDays size={14} />
          <span>Applied {appliedDate}</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
          View
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export default ApplicationCard;