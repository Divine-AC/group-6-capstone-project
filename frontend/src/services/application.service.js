import api from "./api";

export const createApplication = async (applicationData) => {
  const response = await api.post("/applications", applicationData);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my-applications");
  return response.data;
};

export const getApplicationById = async (applicationId) => {
  const response = await api.get(`/applications/${applicationId}`);
  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status,
) => {
  const response = await api.patch(
    `/applications/${applicationId}/status`,
    { status },
  );
  return response.data;
};

export const getJobApplications = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};