import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHrApplications } from "../api/applicationApi";
import { getHrJobs } from "../api/jobApi";
import { Briefcase, FileText, Users, Clock } from "lucide-react"; // icons
import { Link } from "react-router-dom";
import ApplicationCard from "./ApplicationCard";
import JobCard from "./JobCard";

const HrDashboard = () => {
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["hrJobs"],
    queryFn: getHrJobs,
  });

  const {
    data: applications = [], isLoading: applicationsLoading, isError: applicationsError, } = useQuery({
      queryKey: ["hrApplications"],
      queryFn: getHrApplications,
    });

  if (isLoading || applicationsLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (isError || applicationsError) {
    return <div>Failed to load dashboard data.</div>;
  }

  // Stats
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const newJobsThisWeek = jobs.filter((job) => {
    const posted = new Date(job.datePosted);
    const now = new Date();
    const diff = (now - posted) / (1000 * 60 * 60 * 24); // days
    return diff <= 7;
  }).length;

  const newApplicationsThisWeek = applications.filter((app) => {
    const applied = new Date(app.dateApplied);
    const now = new Date();
    const diff = (now - applied) / (1000 * 60 * 60 * 24); // days
    return diff <= 7;
  }).length;

  return (
    <div className=" bg-gray-50">
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          🎯 Welcome to AppliTrack HR Dashboard
        </h1>
        <p className="text-lg mb-6">
          Manage job postings and track candidate applications all in one place.
        </p>
        <Link to="/addHr">
          <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
            ➕ Post a New Job
          </button>
        </Link>
      </section>

      <div className="p-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white shadow p-4 rounded-2xl flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Jobs</p>
              <h2 className="text-xl font-semibold">{totalJobs}</h2>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded-2xl flex items-center gap-3">
            <Users className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Applications</p>
              <h2 className="text-xl font-semibold">{totalApplications}</h2>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded-2xl flex items-center gap-3">
            <Clock className="text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">New Jobs </p>
              <h2 className="text-xl font-semibold">{newJobsThisWeek}</h2>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded-2xl flex items-center gap-3">
            <FileText className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">New Applications</p>
              <h2 className="text-xl font-semibold">
                {newApplicationsThisWeek}
              </h2>
            </div>
          </div>
        </div>

        {/* Job Posted Section */}
        <section className="m-10">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-semibold text-gray-700">Jobs Posted</h2>
            <Link
              to="/hr-jobs"
              className="text-blue-600 hover:underline text-sm"
            >
              View all jobs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {jobs
              .filter((job) => job.status === "OPEN")
              .slice(0, 8)
              .map((job) => (
                <JobCard key={job.id} job={job} from="dashboard" />
              ))}
          </div>
        </section>

        <section className="m-10">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-semibold text-gray-700">
              Recent Applications
            </h2>
            <Link
              to="/addapps"
              className="text-blue-600 hover:underline text-sm"
            >
              View all applications →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.slice(0, 6).map((application) => (
              <ApplicationCard
                key={application.id}
                applicationDetail={application}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HrDashboard;
