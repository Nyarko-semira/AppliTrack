import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobById, closeJob } from "../api/jobApi";
import { getHrApplications } from "../api/applicationApi";
import { useParams, Link, useLocation } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Clock, Calendar, ArrowLeft, Users, Mail, CheckCircle2 } from "lucide-react";

const statusColors = {
  PENDING: "bg-amber-50 text-amber-800 border-amber-200",
  INTERVIEW: "bg-blue-50 text-blue-800 border-blue-200",
  OFFER: "bg-emerald-50 text-emerald-800 border-emerald-200",
  REJECTED: "bg-rose-50 text-rose-800 border-rose-200",
};

const JobDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const fromPage = location.state?.from;

  const role = localStorage.getItem("role");
  const isHr = role === "HR";

  const queryClient = useQueryClient();

  const closeJobMutation = useMutation({
    mutationFn: closeJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });

  const { data: job, isLoading, isError, } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
  });

  const {
    data: applications = [],
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useQuery({
    queryKey: ["hrApplications"],
    queryFn: getHrApplications,
    enabled: isHr,
  });


  if (isLoading || applicationsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading job details...</p>
        </div>
      </div>
    );
  }

  const jobApplications = applications.filter(
    (app) => String(app.jobId) === String(id)
  );

  if (isError || !job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50/50">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center max-w-sm">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The job you are trying to view does not exist or has been removed.</p>
          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition"
          >
            <ArrowLeft size={16} /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isCandidateView = fromPage === "home";

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to={isCandidateView ? "/home" : "/dashboard"}
            className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to {isCandidateView ? "Home" : "Dashboard"}
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Info (Left Col) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider mb-4">
                {job.department || "General"}
              </span>
              <h1 className="text-3xl font-display font-extrabold text-gray-800 tracking-tight leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 mt-4 border-b border-gray-100 pb-6">
                <span className="font-semibold text-gray-700 text-base">{job.company}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location || "Remote"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} />
                  Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently"}
                </span>
              </div>

              {/* Job Description */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Job Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {job.description || "No description provided. Please reach out for more details."}
                </p>
              </div>
            </div>

            {/* HR Status Control */}
            {isHr && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Job Status
                </p>

                <button
                  type="button"
                  onClick={() => closeJobMutation.mutate(id)}
                  disabled={closeJobMutation.isPending || job.status === "CLOSED"}
                  className="w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-semibold py-3 px-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {closeJobMutation.isPending
                    ? "Closing..."
                    : job.status === "CLOSED"
                      ? "Job Closed"
                      : "Close Job"}
                </button>
              </div>
            )}

            {/* Recruiter View: Applicants List */}
            {!isCandidateView && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <h2 className="text-xl font-display font-extrabold text-gray-800 flex items-center gap-2">
                    <Users size={20} className="text-indigo-600" />
                    Applicants ({jobApplications.length})
                  </h2>
                </div>

                {jobApplications.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 text-sm">No applications have been submitted for this position yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobApplications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:border-indigo-100 hover:bg-white transition-all flex flex-col justify-between"
                      >
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 text-base leading-snug">{app.applicant?.name}</h4>
                          <span className="inline-flex items-center gap-1 text-gray-500 text-xs mt-1">
                            <Mail size={12} />
                            {app.applicant?.email}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100/50">
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}>
                            {app.status}
                          </span>
                          <Link
                            to={`/applications/${app.id}`}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            Review Details →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}


          </div>

          {/* Sidebar Info (Right Col) */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Job Overview</h3>

              <div className="space-y-4">
                {/* Department */}
                <div className="flex items-start gap-3 text-sm">
                  <Briefcase className="text-indigo-500 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Department</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{job.department || "Not Specified"}</p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="text-indigo-500 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Job Type</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{job.jobType || "Full-time"}</p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-start gap-3 text-sm">
                  <DollarSign className="text-indigo-500 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Salary Range</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{job.salary || "Competitive"}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="text-indigo-500 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{job.location || "Remote"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Candidates */}
              {isCandidateView && (
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to={`/applyjob/${job.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <CheckCircle2 size={18} />
                    Apply For Job
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetail;
