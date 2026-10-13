import api from "./api";

import type {
    CandidateProfileResponse,
    UpdateCandidateProfileData,
} from "@/types/candidate-profile";

export const getCandidateProfile =
    async (): Promise<CandidateProfileResponse> => {
        const response = await api.get<CandidateProfileResponse>(
            "/api/candidate/profile"
        );

        return response.data;
    };

export const updateCandidateProfile = async (
    data: UpdateCandidateProfileData
): Promise<CandidateProfileResponse> => {
    const response = await api.patch<CandidateProfileResponse>(
        "/api/candidate/profile",
        data
    );

    return response.data;
};
export const uploadCandidateProfilePhoto = async (
    file: File
): Promise<CandidateProfileResponse> => {
    const formData = new FormData();

    formData.append("photo", file);

    const response = await api.post<CandidateProfileResponse>(
        "/api/candidate/profile/photo",
        formData
    );

    return response.data;
};

export const deleteCandidateProfilePhoto =
    async (): Promise<CandidateProfileResponse> => {
        const response = await api.delete<CandidateProfileResponse>(
            "/api/candidate/profile/photo"
        );

        return response.data;
    };
 export const getCandidateProfilePhoto = async (): Promise<string> => {
  const response = await api.get(
    "/api/candidate/profile/photo",
    {
      responseType: "blob",
    }
  );

  return URL.createObjectURL(response.data);
};