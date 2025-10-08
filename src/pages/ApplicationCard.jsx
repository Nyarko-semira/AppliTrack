import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  interview: "bg-blue-100 text-blue-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

function ApplicationCard({ applicationDetail }) {
  const { jobs } = useContext(AppContext);
  const job = jobs.find((job) => job.id === applicationDetail.jobId);
  return (
    <Link
      to={`/applications/${applicationDetail?.id}`}
      key={applicationDetail?.id}
      className="block  rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
    >
      <h3 className="font-bold text-lg text-gray-800">
        {applicationDetail.name}
      </h3>
      <p className="text-gray-600 text-sm">
        Applied for: <span className="font-medium">{job?.title}</span>
      </p>
      {/* Status  here */}
      <p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusColors[applicationDetail?.status]
          }`}
        >
          {applicationDetail?.status}
        </span>
      </p>

      <p className="text-gray-500 text-sm">{applicationDetail?.email}</p>
      <p className="text-gray-400 text-xs mt-2">
        Applied on {applicationDetail?.appliedDate}
      </p>
    </Link>
  );
}

export default ApplicationCard;
