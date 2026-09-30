import api from "./api";
import { CandidateJobsResponse, CandidateJob } from "@/types/jobs";

export interface JobPayload {
  title: string;
  company: string;
  description: string;
  application_link: string;
}

export interface EmployerJob {
  id: number;
  employer_id: number;
  title: string;
  company: string;
  description: string;
  application_link: string;
  status: "active" | "closed";
  created_at: string;
  applicants: number;
  pending_applications: number;
  reviewing_applications: number;
  shortlisted_applications: number;
}

export interface EmployerJobsResponse {
  jobs: EmployerJob[];
}
export const postJobs = async (jobData: JobPayload) => {
  const res = await api.post("/employer/post-jobs", jobData);
  return res.data;
};

export const fetchEmployerJobs = async (): Promise<EmployerJob[]> => {
  const res = await api.get<EmployerJobsResponse>("/employer/jobs");

  return res.data.jobs ?? [];
};

export const fetchEmployerJob = async (
  jobId: number,
): Promise<EmployerJob> => {
  const res = await api.get<{ job: EmployerJob }>(
    `/employer/jobs/${jobId}`,
  );

  return res.data.job;
};

export const updateEmployerJob = async (
  jobId: number,
  jobData: JobPayload,
): Promise<EmployerJob> => {
  const res = await api.patch<{ job: EmployerJob }>(
    `/employer/jobs/${jobId}`,
    jobData,
  );

  return res.data.job;
};

export const updateEmployerJobStatus = async (
  jobId: number,
  status: "active" | "closed",
): Promise<EmployerJob> => {
  const res = await api.patch<{ job: EmployerJob }>(
    `/employer/jobs/${jobId}/status`,
    { status },
  );

  return res.data.job;
};

export const deleteEmployerJob = async (
  jobId: number,
): Promise<void> => {
  await api.delete(`/employer/jobs/${jobId}`);
};

export const fetchCandidateMatches = async (id: number) => {
  const res = await api.get(`/employer/candidates/${id}`);
  return res.data;
};

export const fetchCandidateJobs = async (
  page = 1,
  limit = 10,
): Promise<CandidateJobsResponse> => {
  const res = await api.get<CandidateJobsResponse>("/jobs", {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};

export const fetchCandidateJob = async (
  jobId: number,
): Promise<CandidateJob> => {
  const res = await api.get<{ job: CandidateJob }>(
    `/jobs/${jobId}`,
  );

  return res.data.job;
};