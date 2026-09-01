// import React, { useEffect } from "react";
// import AddForm from "./AddForm";
// import JobList from "./JobList";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const AddJob = () => {
//   const [applications, setApplications] = useState([]);

//   const location = useLocation();

//   // load data from localStorage when the component mounts

//   useEffect(() => {
//     const stored = localStorage.getItem("jobApplications");
//     if (stored) {
//       setApplications(JSON.parse(stored));
//     }
//   }, [location]);

//   const navigate = useNavigate();

//   // save to localStorage when there is a change
//   const handleAdd = (newApp) => {
//     const appId = { ...newApp, id: uuidv4() };
//     const updated = [...applications, appId];
//     setApplications(updated);
//     localStorage.setItem("jobApplications", JSON.stringify(updated));
//     toast.success("Application added to tracker successfully!");
//     navigate("/home");
//   };

//   return (
//     <div className="p-3 max-w-7xl mx-auto bg-blue-300 mt-10">
//       <h2 className="text-3xl font-bold tracking-tight mb-6 text-center text-gray-500 ">
//         Track a New Application
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
//         <AddForm onSubmit={handleAdd} />

//         {applications.length > 0 ? (
//           <JobList applications={applications} />
//         ) : (
//           <div className="bg-white p-6 shadow rounded-lg h-fit text-gray-500 text-center">
//             No applications yet
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddJob;
