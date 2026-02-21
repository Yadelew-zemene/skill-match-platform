import axios from "axios";

export const fetchEmployerJobs = async (employerId: number) => {
  const res = await axios.get(`/jobs/employer/${employerId}`);
  return res.data; // [{id, title, description, created_at}, ...]
};