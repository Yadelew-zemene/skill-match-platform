import api from "./api";

export interface JobPayload {
  title: string;
  company: string;
  description: string;
  application_link: string;
}



export const postJobs = async (jobData: JobPayload) => {
  const res = await api.post("/employer/post-jobs", jobData);
  return res.data;
};

export const fetchEmployerJobs = async (employerId: number) => {
  const res = await api.get(`/jobs/employer/${employerId}`);
  return res.data;
};