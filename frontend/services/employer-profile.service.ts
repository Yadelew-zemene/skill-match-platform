import api from "./api";

import type {
    EmployerProfileResponse,
    UpdateEmployerProfileData,
} from "@/types/employer-profile";

export const getEmployerProfile =
    async (): Promise<EmployerProfileResponse> => {
        const response = await api.get<EmployerProfileResponse>(
            "/api/employer/profile",
        );

        return response.data;
    };

export const updateEmployerProfile = async (
    data: UpdateEmployerProfileData,
): Promise<EmployerProfileResponse> => {
    const response = await api.patch<EmployerProfileResponse>(
        "/api/employer/profile",
        data,
    );

    return response.data;
};