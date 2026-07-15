import React from "react";
import { useState } from "react";

const AddForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "pending",
    dateApplied: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      company: "",
      role: "",
      status: "pending",
      dateApplied: "",
      notes: "",
    });
  };

  return (
    // <form
    //   onSubmit={handleSubmit}
    //   className="space-y-4 bg-white shadow-md p-6 rounded-xl w-full max-w-lg mt-0"
    // >
    //   <div className="mb-1">
    //     <label className="block  font-lg text-lg">Company</label>
    //     <input
    //       type="text"
    //       name="company"
    //       value={formData.company}
    //       onChange={handleChange}
    //       className="w-full border text-sm py-1 px-1 leading-tight"
    //       required
    //     />
    //   </div>

    //   <div className="mb-1">
    //     <label className="block font-lg text-lg">Role</label>
    //     <input
    //       type="text"
    //       name="role"
    //       value={formData.role}
    //       onChange={handleChange}
    //       className="w-full border text-sm py-1 px-1 leading-tight"
    //       required
    //     />
    //   </div>

    //   <div className="mb-1">
    //     <label className="block mb-1 font-sm text-xs">Status</label>
    //     <select
    //       name="status"
    //       value={formData.status}
    //       onChange={handleChange}
    //       className="w-full border text-xs py-0.5 px-1 leading-tight"
    //     >
    //       <option value="pending">Pending</option>
    //       <option value="interview">Interview</option>
    //       <option value="offer">Offer</option>
    //       <option value="rejected">Rejected</option>
    //     </select>
    //   </div>

    //   <div className="mb-1">
    //     <label className="block font-sm text-xs">Date Applied</label>
    //     <input
    //       type="date"
    //       name="dateApplied"
    //       value={formData.dateApplied}
    //       onChange={handleChange}
    //       className="w-full border text-xs py-0.5 px-1 leading-tight"
    //     />
    //   </div>

    //   <div className="mb-1">
    //     <label className="block  font-sm text-xs">Notes</label>
    //     <textarea
    //       name="notes"
    //       value={formData.notes}
    //       onChange={handleChange}
    //       className="w-full border text-xs py-0.5 px-1 leading-tight"
    //       rows={3}
    //     />
    //   </div>

    //   <div className="flex justify-center">
    //     <button
    //       type="submit"
    //       className="bg-blue-600 text-white py-1 text-xs px-2 rounded hover:bg-blue-700"
    //     >
    //       Save Application
    //     </button>
    //   </div>
    // </form>
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g. Google"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Applied
        </label>
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Add notes about the application..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.99]"
      >
        Save Application
      </button>
    </form>
  );
};

export default AddForm;
