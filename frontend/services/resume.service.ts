import api from "./api";

export interface UploadResumeResponse {
  message: string;
  resumeId: number;
  skills: string[];
}

export const uploadResume = async (
  file: File
): Promise<UploadResumeResponse> => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await api.post<UploadResumeResponse>(
    "/resumes/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};