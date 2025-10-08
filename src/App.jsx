import React from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/preview/:id" element={<JobPreview />} />
          <Route path="/all-jobs" element={<AllJob />} /> {/* ✅ New Route */}
          <Route path="/dashboard" element={<HrDashboard />}></Route>
          <Route path="/addHr" element={<JobForm />} />
          <Route path="/Jobpreview/:id" element={<JobDetail />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/addjobs" element={<AllAddedJob />} />
          <Route path="/addapps" element={<AllAddedApps />} />
          <Route path="/applyjob/:id" element={<ApplyJobForm />} />
        </Routes>
      </main>
      {/* Footer should be outside of the main content to ensure it stays at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
