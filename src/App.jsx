
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Home from "./pages/Home";
import AddJob from "./Components/FormContanier/AddJob";
import Footer from "./Components/Footer/Footer";
import JobPreview from "./pages/JobPreview";
import AllJob from "./pages/AllJob";
import HrDashboard from "./pages/HrDashboard";
import JobForm from "./pages/JobForm";
import JobDetail from "./pages/JobDetails";
import AllAddedJob from "./pages/AllAddedJob";
import ApplicationDetails from "./pages/ApplicationDetails";
import AllAddedApps from "./pages/AllAddedApps";
import ApplyJobForm from "./pages/ApplyJobForm";
import SignIn from "./pages/SignUpIns/SignIn";
import SignUp from "./pages/SignUpIns/SignUp";
import { Toaster } from "react-hot-toast";
import ActiveJobs from "./pages/AllActivejobs";


const App = () => {
  const location = useLocation();

 

  const hideLayout =
    ["/signin", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Toaster position="top-center" toastOptions={{ className: 'font-sans' }} />
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>

          <Route path="/" element={<Navigate to="/signin" replace />} />

          {/* Auth Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main App Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/preview/:id" element={<JobPreview />} />
          <Route path="/all-jobs" element={<AllJob />} />
          <Route path="/dashboard" element={<HrDashboard />} />
          <Route path="/addHr" element={<JobForm />} />
          <Route path="/Jobpreview/:id" element={<JobDetail />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/addjobs" element={<AllAddedJob />} />
          <Route path="/addapps" element={<AllAddedApps />} />
          <Route path="/applyjob/:id" element={<ApplyJobForm />} />
          <Route path="/jobs" element={<ActiveJobs />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
