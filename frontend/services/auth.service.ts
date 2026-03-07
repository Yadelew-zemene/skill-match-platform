import api from "./api";
const API_URL = "http://localhost:5000";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post(`${API_URL}/auth/login`, { email, password });
  return res.data; 
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
    role,
  });

  return res.data;
};