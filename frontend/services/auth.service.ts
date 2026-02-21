import axios from "axios";

const API_URL = "http://localhost:5000";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data; // { token, user }
};

export const registerUser = async (email: string, password: string, name: string, role: string) => {
  const res = await axios.post(`${API_URL}/auth/register`, { email, password, name, role });
  return res.data;
};