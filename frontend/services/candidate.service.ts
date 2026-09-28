import api from "./api";
import { CandidateDashboardResponse } from "@/types/candidateDashboard";

export const getCandidateDashboard =
  async (): Promise<CandidateDashboardResponse> => {
    const response = await api.get<CandidateDashboardResponse>(
      "/candidate/dashboard"
    );

    return response.data;
  };