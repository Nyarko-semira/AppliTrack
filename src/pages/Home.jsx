import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import { Briefcase, Layers, Plus, ArrowRight, Activity, Award, BookmarkCheck } from "lucide-react";

const Home = () => {
  const { data: jobs = [], isLoading, isError, } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  const [trackedCount, setTrackedCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("jobApplications");
    if (stored) {
      try {
        setTrackedCount(JSON.parse(stored).length);
      } catch (e) {
        console.error("Error parsing job applications", e);
      }
    }
  }, []);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isError) {
    return <div>Failed to load jobs.</div>;
  }

  return (
    <div className="bg-gray-50/50 min-h-screen font-sans">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-800 text-white py-20 px-6">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-300 via-pink-500 to-purple-800 pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-blue-100 mb-6 border border-white/10 uppercase tracking-wider">
            <Activity size={12} className="animate-pulse" /> The Ultimate Job Search Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-6 leading-tight">
            Elevate Your Career Tracker
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 font-light">
            Stay organized, monitor your progress, and apply to top opportunities directly from our interactive job portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/add">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <Plus size={18} /> Track Application
              </button>
            </Link>
            <Link to="/all-jobs">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/45 text-white border border-white/20 font-semibold px-8 py-3.5 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                View My Tracker <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Widget */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Job Openings */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/80 flex items-center justify-between hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-blue-50 text-blue-600">
                <Briefcase size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Active Openings</p>
                <h3 className="text-3xl font-display font-bold text-gray-800 mt-1">{jobs.length}</h3>
              </div>
            </div>
            <Link to="/addjobs" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
              Explore Jobs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Tracked Applications */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/80 flex items-center justify-between hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 text-indigo-600">
                <BookmarkCheck size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Your Tracked Apps</p>
                <h3 className="text-3xl font-display font-bold text-gray-800 mt-1">{trackedCount}</h3>
              </div>
            </div>
            <Link to="/all-jobs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
              Manage Tracker <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-extrabold text-gray-800 mb-4">
            Why AppliTrack?
          </h2>
          <p className="text-gray-500">
            Everything you need to land your next role, fully organized and in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Layers size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Stay Organized</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Keep a complete log of your applications. Save job roles, salaries, status, and custom follow-up notes effortlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
              <Activity size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Visual Pipelines</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Know where you stand in a single glance. Instantly check status indicators for Interviews, Offers, or Pending responses.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <Award size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Live Portal</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Apply to active job posts created by verified hiring teams on the platform, and automatically monitor your application status.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Jobs Listings */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-gray-800">
              Recent Job Listings
            </h2>
            <p className="text-gray-500 text-sm mt-1">Direct opportunities available on the platform</p>
          </div>
          <Link
            to="/addjobs"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
          >
            View all jobs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} from="home" />
            ))}
          </div>
        ) : (
          <div className="bg-white text-center py-16 px-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Briefcase size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Jobs Posted Yet</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
              There are currently no job opportunities posted. Check back later or add a manual entry to your personal tracker.
            </p>
            <Link to="/add">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow">
                Add Manual Application
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
