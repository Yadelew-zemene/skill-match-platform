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
