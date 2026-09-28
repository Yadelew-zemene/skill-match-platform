import api from "./api";
import { CandidateJobsResponse } from "@/types/jobs";

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

export const fetchCandidateMatches = async (id: number) => {
  const res = await api.get(`/employer/candidates/${id}`);
  return res.data;
};

export const fetchCandidateJobs = async (
  page = 1,
  limit = 10
): Promise<CandidateJobsResponse> => {
  const res = await api.get<CandidateJobsResponse>("/jobs", {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};