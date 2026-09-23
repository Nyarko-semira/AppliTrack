import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getJobById } from "../api/jobApi";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { applyForJob } from "../api/applicationApi";

const ApplyJobForm = () => {
  const { id } = useParams(); // get job ID from URL
  const { data: job, isError, isLoading } = useQuery({ queryKey: ["job", id], queryFn: () => getJobById(id) });
  const navigate = useNavigate();


  if (isError) {
    toast.error("Something went wrong.Please try again later.");
    navigate("/home");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const applyMutation = useMutation({
  mutationFn: applyForJob,
  onSuccess: () => {
    toast.success("Application submitted successfully!");
    reset();
    navigate("/home");
  },
  onError: (error) => {
    console.error("Application submission failed:", error);

    toast.error(
      error.response?.data?.message ||
        "Failed to submit application. Please try again."
    );
  },
});



 const onSubmit = async (data) => {
  const applicationData = {
    skills: data.skills,
    resumeUrl: data.resume[0]?.name || "",
    resumeFileName: data.resume[0]?.name || "No file uploaded",
    coverLetter: data.coverLetter,
  };

  await applyMutation.mutateAsync({
    jobId: id,
    applicationData,
  });
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-1 mt-5 h-full"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Apply for this <span className="text-blue-500"> {job.title} </span>
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
          accept=".pdf,.doc,.docx"
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
          placeholder="cover letter, not more than 150 words"
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
