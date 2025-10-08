import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const JobCard = ({ job, from }) => {
  const { jobs } = useContext(AppContext);

  return (
    <div
      key={job.id}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
    >
      <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <Link
        to={`/Jobpreview/${job.id}`}
        state={{ from }}
        className="text-blue-600 text-sm mt-2 inline-block"
      >
        View details →
      </Link>
    </div>
  );
};

export default JobCard;
