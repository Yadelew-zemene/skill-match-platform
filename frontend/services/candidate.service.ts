import api from "./api";

export const getCandidateDashboard = async (token: string) => {
  const response = await api.get("/candidate/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};