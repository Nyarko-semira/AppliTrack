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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted:", formData);
  // };

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md p-6 rounded-xl w-full max-w-sm  mt-0"
    >
      <div className="mb-1">
        <label className="block  font-sm text-xs">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border text-xs py-0.5 px-1 leading-tight"
          required
        />
      </div>

      <div className="mb-1">
        <label className="block font-sm text-xs">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border text-xs py-0.5 px-1 leading-tight"
          required
        />
      </div>

      <div className="mb-1">
        <label className="block mb-1 font-sm text-xs">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border text-xs py-0.5 px-1 leading-tight"
        >
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="mb-1">
        <label className="block font-sm text-xs">Date Applied</label>
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          className="w-full border text-xs py-0.5 px-1 leading-tight"
        />
      </div>

      <div className="mb-1">
        <label className="block  font-sm text-xs">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border text-xs py-0.5 px-1 leading-tight"
          rows={3}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white py-1 text-xs px-2 rounded hover:bg-blue-700"
        >
          Save Application
        </button>
      </div>
    </form>
  );
};

export default AddForm;
