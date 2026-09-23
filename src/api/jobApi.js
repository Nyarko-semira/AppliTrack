import api from "./axios"


export const getJobs = async () => {
    const response = await api.get("/jobs");
    return response.data.jobs;
};

export const getHrJobs = async () => {
  const response = await api.get("/hr/jobs");
  return response.data.jobs;
};

export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);

  return response.data.job;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);

  return response.data.job;
}

export const closeJob = async (id) => {
  const response = await api.patch(`/jobs/${id}/close`);

  console.log("Hello world");
  return response.data.job;
  
};
