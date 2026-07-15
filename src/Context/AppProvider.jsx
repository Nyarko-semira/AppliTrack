import { useState, useEffect } from "react";
import jobsData from "../Components/Data/Jobs";
import applicationsData from "../Components/Data/ApplicationsData";
import {AppContext} from "./AppContext"


export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : jobsData;
  });

  const [show, setShow] = useState({
    password: false,
    confirmPaassword: false
  })

  const [applications, setApplications] = useState(() => {
    const savedApps = localStorage.getItem("applications");
    return savedApps ? JSON.parse(savedApps) : applicationsData;
  });

  const [user] = useState({ name: "HR Manager" });


  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);


  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const addApplication = (application) => {
    setApplications((prev) => [...prev, application]);
  };

  const updateApplicationStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    // Also update candidate's personal tracker if it exists in jobApplications
    try {
      const stored = localStorage.getItem("jobApplications");
      if (stored) {
        const localTrackerApps = JSON.parse(stored);
        const updatedTrackerApps = localTrackerApps.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        );
        localStorage.setItem("jobApplications", JSON.stringify(updatedTrackerApps));
      }
    } catch (e) {
      console.error("Error syncing status update to candidate tracker", e);
    }
  };


  return (
    <AppContext.Provider
      value={{
        jobs,
        applications,
        user,
        addJob,
        addApplication,
        updateApplicationStatus,
        show,
        setShow
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
