import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPreview = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("jobApplications");
    if (stored) {
      const all = JSON.parse(stored);
      const match = all.find((job) => job.id === id);
      setJob(match);
      
    }
  }, [id]);

  if (!job) {
    return <div className="text-xenter text-gray-600 mt-10">Job not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{job.role}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Company:</span> {job.company}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Status:</span> {job.status}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Date Applied:</span> {job.dateApplied}
      </p>
      <p className="text-gray-600 mt-4">
        <span className="font-semibold">Notes:</span>
        <br />
        {job.notes || "No additional notes."}
      </p>
    </div>
  );
};

export default JobPreview;
