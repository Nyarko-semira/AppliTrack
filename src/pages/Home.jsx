import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import JobCard from "./JobCard";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  interview: "bg-blue-100 text-blue-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const Home = () => {
  const { jobs, applications, setJobs, setApplications } =
    useContext(AppContext);

  return (
    <div className=" bg-gray-50">
      {/* ✅ Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">🎯 Welcome to AppliTrack</h1>
        <p className="text-lg mb-6">
          Your personal job application tracker — organized, simple, and always
          with you.
        </p>
        <Link to="/add">
          <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
            ➕ Add a New Application
          </button>
        </Link>
      </section>

      {/* ✅ Features Section */}
      <section className="max-w-5xl mx-auto py-12 px-4 text-center ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Why use AppliTrack?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-600">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">📌 Stay Organized</h3>
            <p>Track every job you apply to in one clean dashboard.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">📊 Visual Progress</h3>
            <p>See your status at a glance — pending, interview, or offer!</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">📁 Easy Access</h3>
            <p>Update, view, or delete applications whenever you want.</p>
          </div>
        </div>
      </section>

      {/* ✅ Recent Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📋 Recent Job Listing
        </h2>
        {jobs.length > 0 ? (
          <section className="m-10">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xl font-semibold text-gray-700">
                Jobs Posted
              </h2>
              <Link
                to="/addjobs"
                className="text-blue-600 hover:underline text-sm"
              >
                View all jobs →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {jobs.slice(0, 8).map((job) => (
                // TODO: Turn this into a component
                <JobCard key={job.id} job={job} from="home" />
              ))}
            </div>
          </section>
        ) : (
          <div className="bg-white text-center text-gray-500 py-12 rounded-xl shadow-md">
            <p className="text-lg font-medium mb-2">No applications yet.</p>
            <p className="text-sm">
              Click the button above to add your first one!☝️☝️.
            </p>
            <p className="text-4xl mb-2">😴</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
