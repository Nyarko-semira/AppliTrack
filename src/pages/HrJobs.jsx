import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHrJobs } from "../api/jobApi";
import { Link } from "react-router-dom";
import { Eye, MapPin, Clock, Briefcase } from "lucide-react";

const HrJobs = () => {
    const { data: jobs, isLoading, isError } = useQuery({
        queryKey: ["hrJobs"],
        queryFn: getHrJobs,
    });

    if (isLoading) {
        return (
            <h1 className="text-3xl font-display font-extrabold text-gray-800 mb-2 text-center">
                Loading...
            </h1>
        );
    }

    if (isError) {
        return (
            <h1 className="text-3xl font-display font-extrabold text-gray-800 mb-2 text-center">
                Failed to load the page
            </h1>
        );
    }

    const colors = [
        "bg-blue-50 text-blue-600 border-blue-100",
        "bg-indigo-50 text-indigo-600 border-indigo-100",
        "bg-purple-50 text-purple-600 border-purple-100",
        "bg-emerald-50 text-emerald-600 border-emerald-100",
        "bg-amber-50 text-amber-600 border-amber-100",
    ];

    return (
        <div className="p-8 bg-gray-50/50 min-h-screen font-sans">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <h1 className="text-3xl font-display font-extrabold text-gray-800 mb-2">
                    💼 All Jobs
                </h1>

                <p className="text-gray-500 text-sm mb-8">
                    View all jobs posted across the organization.
                </p>

                {jobs.length === 0 ? (

                    <div className="bg-white p-12 rounded-2xl border text-center shadow-sm">
                        <Briefcase
                            size={35}
                            className="mx-auto text-gray-400 mb-3"
                        />

                        <h3 className="font-bold text-gray-700">
                            No Jobs Posted
                        </h3>

                        <p className="text-sm text-gray-500">
                            Jobs will appear here once they are posted.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {jobs.map((job) => {

                            const firstLetter =
                                job.company
                                    ? job.company.charAt(0).toUpperCase()
                                    : "J";

                            const colorIndex =
                                (job.company || "").length % colors.length;

                            return (

                                <div
                                    key={job.id}
                                    className="
                                        bg-white
                                        rounded-2xl
                                        border border-gray-100
                                        p-6
                                        shadow-sm
                                        hover:shadow-md
                                        transition-all
                                        flex
                                        flex-col
                                        justify-between
                                    "
                                >

                                    {/* Job Information */}
                                    <div>

                                        <div className="flex items-center gap-3 mb-4">

                                            <div
                                                className={`
                                                    w-11 h-11 rounded-xl
                                                    flex items-center justify-center
                                                    font-bold border
                                                    ${colors[colorIndex]}
                                                `}
                                            >
                                                {firstLetter}
                                            </div>

                                            <div>

                                                <h2 className="font-bold text-gray-800">
                                                    {job.title}
                                                </h2>

                                                <p className="text-xs text-gray-500">
                                                    {job.company}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Details */}
                                        <div className="space-y-2 text-sm text-gray-600">

                                            {job.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={14} />
                                                    {job.location}
                                                </div>
                                            )}

                                            {job.jobType && (
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} />
                                                    {job.jobType}
                                                </div>
                                            )}

                                        </div>

                                        {/* Department */}
                                        <span
                                            className="
                                                inline-block
                                                mt-4
                                                px-3 py-1
                                                text-xs
                                                font-semibold
                                                rounded-full
                                                bg-indigo-50
                                                text-indigo-600
                                            "
                                        >
                                            {job.department || "General"}
                                        </span>

                                        {/* Job Status */}
                                        <span
                                            className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${job.status === "OPEN"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-red-50 text-red-600"
                                                }`}
                                        >
                                            {job.status}
                                        </span>

                                    </div>

                                    {/* Action */}
                                    <div className="border-t border-gray-100 pt-4 mt-6 flex justify-end">

                                        <Link
                                            to={`/Jobpreview/${job.id}`}
                                            state={{ from: "hr-jobs" }}
                                            className="
                                                flex items-center gap-1
                                                text-indigo-600
                                                hover:text-indigo-700
                                                font-semibold
                                                text-sm
                                            "
                                        >
                                            <Eye size={14} />

                                            <span>
                                                View Job
                                            </span>

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

export default HrJobs;