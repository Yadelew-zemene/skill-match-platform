import api from "./api";
import {
  Resume,
  ResumeMatch,
  UploadResumeResponse,
} from "@/types/resume";

export const uploadResume = async (
  file: File
): Promise<UploadResumeResponse> => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post<UploadResumeResponse>(
    "/resumes/upload",
    formData
  );

  return response.data;
};

export const getMyResumes = async (): Promise<Resume[]> => {
  const response = await api.get<Resume[]>("/resumes");

  return response.data;
};

export const getResume = async (
  resumeId: number
): Promise<Resume> => {
  const response = await api.get<Resume>(
    `/resumes/${resumeId}`
  );

  return response.data;
};

export const getResumeMatches = async (
  resumeId: number
): Promise<ResumeMatch[]> => {
  const response = await api.get<ResumeMatch[]>(
    `/resumes/${resumeId}/matches`
  );

  return response.data;
};
export const activateResume = async (
  resumeId: number
): Promise<Resume> => {
  const response = await api.patch<{
    message: string;
    resume: Resume;
  }>(`/resumes/${resumeId}/activate`);

  return response.data.resume;
};

export const deleteResume = async (
  resumeId: number
): Promise<void> => {
  await api.delete(`/resumes/${resumeId}`);
};