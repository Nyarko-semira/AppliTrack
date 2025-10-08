import React from "react";

const JobList = ({ applications }) => {
  return (
    <div className="mt-1 max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-blue-50 text-left sticky top-0 z-10">
            <tr className=" cursor-pointer">
              <th className="p-3 bg-blue-50">Company</th>
              <th className="p-3 bg-blue-50">Role</th>
              <th className="p-3 bg-blue-50">Status</th>
              <th className="p-3 bg-blue-50">Date</th>
              <th className="p-3 bg-blue-50">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {applications.map((app, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3">{app.company}</td>
                <td className="p-3">{app.role}</td>
                <td className="p-3 capitalize">{app.status}</td>
                <td className="p-3">{app.dateApplied}</td>
                <td className="p-3 text-gray-600">{app.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
