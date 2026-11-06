
import api from "./api";

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

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const res = await api.patch("/auth/change-password", {
    currentPassword,
    newPassword,
  });

  return res.data;
};
export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (
  token: string,
  newPassword: string,
) => {
  const response = await api.post("/auth/reset-password", {
    token,
    newPassword,
  });

  return response.data;
};