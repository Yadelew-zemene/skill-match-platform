import api from "./api";

export interface JobPayload {
  id: number;
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
export const fetchCandidateMatches = async (id: number) => {
  const res = await api.get(`/employer/candidates/${id}`);
  return res.data;
}