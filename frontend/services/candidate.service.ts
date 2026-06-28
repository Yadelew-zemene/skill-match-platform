
import api from "./api";
import { CandidateDashboardResponse } from "@/types/candidateDashboard";

export const getCandidateDashboard = async (
  token: string
): Promise<CandidateDashboardResponse> => {
  const response = await api.get<CandidateDashboardResponse>(
    "/candidate/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};