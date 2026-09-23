import api from "./axios";

export const getHrApplications = async () => {
  const response = await api.get("/hr/applications");

  return response.data.applications;
};


export const updateApplicationStatus = async ({ id, status }) => {
  const response = await api.patch(
    `/applications/${id}/status`,
    { status }
  );

  return response.data.application;
};

export const applyForJob = async ({ jobId, applicationData }) => {
  const response = await api.post(
    `/jobs/${jobId}/apply`,
    applicationData
  );

  return response.data.application;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");

  return response.data.applications;
};