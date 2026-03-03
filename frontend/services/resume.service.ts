import api from "./api";


export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await api.post("/resumes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data
}

// // Get matches for a specific resume
// export const fetchResumeMatches = async (resumeId: number) => {
//   const res = await api.get(`/resumes/${resumeId}/matches`);
//   return res.data; 
// };