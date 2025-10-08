import { createContext, useState, useEffect } from "react";
import jobsData from "../Components/Data/Jobs";
import applicationsData from "../Components/Data/ApplicationsData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : jobsData;
  });

  const [applications, setApplications] = useState(() => {
    const savedApps = localStorage.getItem("applications");
    return savedApps ? JSON.parse(savedApps) : applicationsData;
  });

  const [user, setUser] = useState({ name: "HR Manager" });

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const addApplication = (application) => {
    setApplications((prev) => [...prev, application]);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        applications,
        user,
        addJob,
        addApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
