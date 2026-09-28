import api from "./api";

export interface UploadResumeResponse {
  message: string;
  resumeId: number;
  skills: string[];
  status: "completed" | "processing" | "failed";
}

export interface Resume {
  id: number;
  user_id: number;
  file_path: string;
  original_filename: string | null;
  mime_type: string | null;
  file_size: number | null;
  extracted_text: string | null;
  status: "processing" | "completed" | "failed";
  is_active: boolean;
  processing_error: string | null;
  created_at: string;
}

export const uploadResume = async (
  file: File
): Promise<UploadResumeResponse> => {
  const formData = new FormData();

  formData.append("resume", file);

  const res = await api.post<UploadResumeResponse>(
    "/resumes/upload",
    formData
  );

  return res.data;
};

export const getMyResumes = async (): Promise<Resume[]> => {
  const res = await api.get<Resume[]>("/resumes");

  return res.data;
};