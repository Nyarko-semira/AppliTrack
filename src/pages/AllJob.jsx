import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Search, Trash2, Calendar, SlidersHorizontal, Plus, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

const statusColors = {
  pending: {
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    glow: "hover:border-amber-300",
    bg: "bg-amber-500",
  },
  interview: {
    badge: "bg-blue-50 text-blue-800 border-blue-200",
    glow: "hover:border-blue-300",
    bg: "bg-blue-500",
  },
  offer: {
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    glow: "hover:border-emerald-300",
    bg: "bg-emerald-500",
  },
  rejected: {
    badge: "bg-rose-50 text-rose-800 border-rose-200",
    glow: "hover:border-rose-300",
    bg: "bg-rose-500",
  },
};

const AllJob = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("jobApplications");
    if (stored) {
      try {
        setApplications(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing stored applications", e);
      }
    }
  }, []);

  const handleDelete = (id, e) => {
    e.preventDefault(); // prevent navigation
    if (window.confirm("Are you sure you want to delete this tracked application?")) {
      const updated = applications.filter((app) => app.id !== id);
      setApplications(updated);
      localStorage.setItem("jobApplications", JSON.stringify(updated));
      toast.success("Application removed from tracker!");
    }
  };

  
  const counts = {
    all: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    interview: applications.filter((app) => app.status === "interview").length,
    offer: applications.filter((app) => app.status === "offer").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

 
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      (app.role || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || app.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
              📂 My Application Tracker
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and track jobs you have applied to across the web
            </p>
          </div>
          {/* <Link to="/add">
            <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow transition duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <Plus size={16} /> Track New Job
            </button>
          </Link> */}
        </div>

        {/* Filter Toolbar (Search + Status Tabs) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-xs font-semibold uppercase tracking-wider">
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
            {Object.keys(counts).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <span className="capitalize">{tab}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {counts[tab]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results / Cards */}
        {filteredApps.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm max-w-lg mx-auto mt-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Briefcase size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Applications Found</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
              {applications.length === 0
                ? "You haven't tracked any applications yet. Click below to add your first one!"
                : "No applications match your search query or status filter."}
            </p>
            <Link to="/add">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow">
                ➕ Add New Application
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredApps.map((app) => {
              const styling = statusColors[app.status] || statusColors.pending;
              return (
                <div
                  key={app.id}
                  className={`bg-white shadow-sm border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-md ${styling.glow} relative flex flex-col justify-between`}
                >
                  <div>
                    {/* Top block */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-gray-800 text-lg leading-snug">
                          {app.role}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 mt-0.5">at {app.company}</p>
                      </div>
                      
                      {/* Delete button */}
                      <button
                        onClick={(e) => handleDelete(app.id, e)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${styling.badge} uppercase tracking-wider mb-4`}
                    >
                      {app.status}
                    </span>

                    {/* Notes preview */}
                    {app.notes && (
                      <p className="text-xs text-gray-500 line-clamp-2 italic mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
                        "{app.notes}"
                      </p>
                    )}
                  </div>

                  {/* Date and CTA */}
                  <div className="border-t border-gray-50 pt-4 flex items-center justify-between text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      {app.dateApplied ? new Date(app.dateApplied).toLocaleDateString() : "Not specified"}
                    </span>

                    <Link
                      to={`/preview/${app.id}`}
                      className="inline-flex items-center gap-0.5 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition"
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJob;
