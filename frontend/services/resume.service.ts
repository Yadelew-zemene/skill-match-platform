import api from "./api";

// Upload resume file
export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await api.post("/resumes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // { id, file_path, extracted_text, created_at }
};

// Get all resumes for the candidate
export const fetchResumes = async () => {
  const res = await api.get("/resumes/me");
  return res.data; 
};

// Get matches for a specific resume
export const fetchResumeMatches = async (resumeId: number) => {
  const res = await api.get(`/resumes/${resumeId}/matches`);
  return res.data; 
};