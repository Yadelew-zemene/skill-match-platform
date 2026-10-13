import api from "./api";
import {
  CandidateJobsResponse,
  CandidateJob,
} from "@/types/jobs";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface JobPayload {
  title: string;
  company: string;
  description: string;
  application_link: string;
}

export type JobStatus = "active" | "closed";

export interface EmployerJob {
  id: number;
  employer_id?: number;
  title: string;
  company: string;
  description: string;
  application_link: string;
  status: JobStatus;
  created_at: string;
  applicants: number;
  pending_applications: number;
  reviewing_applications: number;
  shortlisted_applications: number;
}

export interface EmployerJobDetail {
  id: number;
  employer_id: number;
  title: string;
  company: string;
  description: string;
  application_link: string;
  status: JobStatus;
  created_at: string;
  applicants: number;
  pending_applications: number;
  reviewing_applications: number;
  shortlisted_applications: number;
}

export interface EmployerJobsResponse {
  jobs: EmployerJob[];
}

export interface EmployerJobResponse {
  job: EmployerJobDetail;
}

export interface UpdateJobResponse {
  message: string;
  job: EmployerJobDetail;
}

export interface UpdateJobStatusResponse {
  message: string;
  job: EmployerJobDetail;
}

export interface DeleteJobResponse {
  message: string;
}

/*
|--------------------------------------------------------------------------
| Employer Job Management
|--------------------------------------------------------------------------
*/

/**
 * Create a new employer job.
 */
export const postJobs = async (jobData: JobPayload) => {
  const res = await api.post("/employer/post-jobs", jobData);

  return res.data;
};

/**
 * Get all jobs belonging to the authenticated employer.
 */
export const fetchEmployerJobs = async (): Promise<EmployerJobsResponse> => {
  const res = await api.get<EmployerJobsResponse>(
    "/employer/jobs",
  );

  return res.data;
};

/**
 * Get one employer job.
 */
export const fetchEmployerJob = async (
  jobId: number,
): Promise<EmployerJobDetail> => {
  const res = await api.get<EmployerJobResponse>(
    `/employer/jobs/${jobId}`,
  );

  return res.data.job;
};

/**
 * Update employer job details.
 */
export const updateEmployerJob = async (
  jobId: number,
  jobData: JobPayload,
): Promise<UpdateJobResponse> => {
  const res = await api.patch<UpdateJobResponse>(
    `/employer/jobs/${jobId}`,
    jobData,
  );

  return res.data;
};

/**
 * Open or close an employer job.
 */
export const updateEmployerJobStatus = async (
  jobId: number,
  status: JobStatus,
): Promise<UpdateJobStatusResponse> => {
  const res = await api.patch<UpdateJobStatusResponse>(
    `/employer/jobs/${jobId}/status`,
    { status },
  );

  return res.data;
};

/**
 * Delete an employer job.
 */
export const deleteEmployerJob = async (
  jobId: number,
): Promise<DeleteJobResponse> => {
  const res = await api.delete<DeleteJobResponse>(
    `/employer/jobs/${jobId}`,
  );

  return res.data;
};

/*
|--------------------------------------------------------------------------
| Employer Candidate Inspection
|--------------------------------------------------------------------------
*/

export interface EmployerCandidate {
  application_id: number;
  job_id: number;
  candidate_id: number;
  resume_id: number;

  candidate_name: string;
  candidate_email: string;

  original_filename: string | null;

  cover_letter: string | null;

  application_status:
  | "pending"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "accepted";

  applied_at: string;
  updated_at: string;

  match_score: number;
}

export interface EmployerCandidatesResponse {
  job: {
    id: number;
    title: string;
    company: string;
    status: JobStatus;
  };
  candidates: EmployerCandidate[];
}

export interface EmployerCandidateDetail
  extends EmployerCandidate {
  mime_type: string | null;
  file_size: number | null;
  resume_status: string;

  professional_title: string | null;
  bio: string | null;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  has_profile_image: boolean;

  skills: string[];
}

export interface EmployerCandidateDetailResponse {
  job: {
    id: number;
    title: string;
    company: string;
    status: JobStatus;
  };
  candidate: EmployerCandidateDetail;
}

/**
 * Get ranked candidates for one employer job.
 */
export const fetchEmployerCandidates = async (
  jobId: number,
): Promise<EmployerCandidatesResponse> => {
  const res = await api.get<EmployerCandidatesResponse>(
    `/employer/candidates/${jobId}`,
  );

  return res.data;
};

/**
 * Get detailed information about one candidate
 * who applied to an employer's job.
 */
export const fetchEmployerCandidate = async (
  jobId: number,
  candidateId: number,
): Promise<EmployerCandidateDetailResponse> => {
  const res = await api.get<EmployerCandidateDetailResponse>(
    `/employer/candidates/${jobId}/${candidateId}`,
  );

  return res.data;
};
/**
 * Fetch a candidate's protected profile photo.
 *
 * The endpoint requires the employer JWT, so we fetch it
 * through Axios instead of using a normal <img src="...">.
 */
export const fetchEmployerCandidatePhoto = async (
  jobId: number,
  candidateId: number,
): Promise<string> => {
  const res = await api.get(
    `/employer/candidates/${jobId}/${candidateId}/photo`,
    {
      responseType: "blob",
    },
  );

  return window.URL.createObjectURL(res.data);
};

/**
 * Build the authorized resume endpoint.
 *
 * The endpoint itself is protected by the backend.
 * Do not expose the physical file path.
 */
export const getCandidateResumeUrl = (
  jobId: number,
  candidateId: number,
  download = false,
): string => {
  const baseUrl =
    api.defaults.baseURL?.replace(/\/$/, "") ?? "";

  const url =
    `${baseUrl}/employer/candidates/${jobId}/${candidateId}/resume`;

  return download
    ? `${url}?download=true`
    : url;
};

export interface CandidateResumeBlob {
  blob: Blob;
  filename: string;
  mimeType: string;
}

/**
 * Fetch a candidate resume using the authenticated Axios client.
 *
 * This is intentionally not a normal <a href> request because
 * the backend requires the JWT Authorization header.
 */
export const fetchCandidateResume = async (
  jobId: number,
  candidateId: number,
): Promise<CandidateResumeBlob> => {
  const res = await api.get(
    `/employer/candidates/${jobId}/${candidateId}/resume`,
    {
      responseType: "blob",
    },
  );

  const contentType =
    res.headers["content-type"] ||
    "application/octet-stream";

  const contentDisposition =
    res.headers["content-disposition"] || "";

  const filenameMatch =
    contentDisposition.match(
      /filename="?([^"]+)"?/i,
    );

  const filename =
    filenameMatch?.[1] ||
    `resume-${candidateId}`;

  return {
    blob: res.data,
    filename,
    mimeType: contentType,
  };
};

/**
 * Fetch a candidate resume and create a temporary
 * browser URL for inline viewing.
 *
 * The returned URL must eventually be revoked
 * with URL.revokeObjectURL().
 */
export const createCandidateResumePreviewUrl = async (
  jobId: number,
  candidateId: number,
): Promise<{
  url: string;
  filename: string;
  mimeType: string;
}> => {
  const resume = await fetchCandidateResume(
    jobId,
    candidateId,
  );

  const url = window.URL.createObjectURL(
    resume.blob,
  );

  return {
    url,
    filename: resume.filename,
    mimeType: resume.mimeType,
  };
};

/**
 * Fetch a candidate resume and trigger a browser download.
 */
export const downloadCandidateResume = async (
  jobId: number,
  candidateId: number,
): Promise<void> => {
  const resume = await fetchCandidateResume(
    jobId,
    candidateId,
  );

  const url = window.URL.createObjectURL(
    resume.blob,
  );

  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = resume.filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(url);
};
/*
|--------------------------------------------------------------------------
| Candidate Job Browsing
|--------------------------------------------------------------------------
*/

export const fetchCandidateMatches = async (
  id: number,
) => {
  const res = await api.get(
    `/employer/jobs/:jobId/candidates`,
  );

  return res.data;
};

export const fetchCandidateJobs = async (
  page = 1,
  limit = 10,
): Promise<CandidateJobsResponse> => {
  const res = await api.get<CandidateJobsResponse>(
    "/jobs",
    {
      params: {
        page,
        limit,
      },
    },
  );

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