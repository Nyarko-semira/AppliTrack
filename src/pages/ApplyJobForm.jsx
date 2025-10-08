import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const ApplyJobForm = () => {
  const { addApplication, jobs } = useContext(AppContext);
  const { id } = useParams(); // get job ID from URL
  const jobb = jobs.find((job) => job.id === id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   const handleApply = (data) => {
  //     console.log("Form submitted:", data);
  //     alert("Application submitted successfully!");
  //   };

  const onSubmit = (data) => {
    const newApplication = {
      id: Date.now().toString(),
      ...data,
      jobId: id,
      status: "pending",
      appliedDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    };
    addApplication(newApplication);
    alert("Application submitted successfully!");
    console.log("Form submitted:", data);
    reset();
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-1 mt-5"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Apply for this <span className="text-blue-500"> {jobb.title} </span>
        </h2>
        <p className="text-sm text-gray-500">
          Fill out the form below to submit your application
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          {...register("name", { required: true })}
          className={`w-full border p-2 rounded-md focus:outline-none 
            ${errors.name ? "border-red-500" : "border-gray-300"}`}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Skills</label>
        <input
          {...register("skills", { required: true })}
          className={`w-full border p-2 rounded-md focus:outline-none 
            ${errors.skills ? "border-red-500" : "border-gray-300"}`}
          placeholder="Enter Skills, separated by comma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className={`w-full border p-2 rounded-md focus:outline-none 
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
          placeholder="ama@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resume</label>
        <input
          type="file"
          {...register("resume", { required: true })}
          className={`w-full border p-2 rounded-md focus:outline-none 
            ${errors.resume ? "border-red-500" : "border-gray-300"}`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Letter</label>
        <textarea
          {...register("coverLetter", { required: true })}
          rows="4"
          className={`w-full border p-2 rounded-md focus:outline-none 
            ${errors.coverLetter ? "border-red-500" : "border-gray-300"}`}
          placeholder="Write your cover letter"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplyJobForm;
