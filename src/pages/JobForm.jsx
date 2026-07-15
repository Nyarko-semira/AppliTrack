import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JobForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { addJob } = useContext(AppContext); // get global addJob
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newJob = {
      id: Date.now().toString(),
      ...data,
      datePosted: new Date().toISOString(),
    };
    addJob(newJob); // add job to global state
    toast.success("New job opening posted successfully!");
    reset();
    navigate("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Job</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border p-1 rounded focus:outline-blue-500"
            placeholder="Software Engineer"
          />
        </div>

        <div className=" flex gap-2">
          <div className="flex-1">
            <label className=" mb-1 font-medium">Company</label>
            <input
              {...register("company")}
              className="w-full border p-1 rounded focus:outline-blue-500"
              placeholder="apptel"
            />
          </div>
          <div className="flex-1">
            <label className=" mb-1 font-medium">Department</label>
            <input
              {...register("department")}
              className="w-full border p-1 rounded focus:outline-blue-500"
              placeholder="IT / HR / Marketing"
            />
          </div>
        </div>

        <div className=" flex gap-2">
          <div className="flex-1">
            <label className=" font-medium">Location</label>
            <input
              {...register("location")}
              className="w-full border p-1 rounded focus:outline-blue-500"
              placeholder="Accra, Ghana"
            />
          </div>

          <div className="flex-1">
            <label className=" font-medium">Job Type</label>
            <select
              {...register("type")}
              className="w-full border p-1 rounded focus:outline-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Salary Range</label>
          <input
            {...register("salary")}
            className="w-full border p-1 rounded focus:outline-blue-500"
            placeholder="$1000 - $2000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-1 rounded focus:outline-blue-500"
            rows="4"
            placeholder="Job responsibilities and requirements..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
