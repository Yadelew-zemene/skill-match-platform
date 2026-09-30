import api from "./api";

export interface SubmitApplicationPayload {
    jobId: number;
    resumeId: number;
    coverLetter?: string;
}

export interface SubmitApplicationResponse {
    message: string;
    applicationId: number;
}

export const submitApplication = async (
    payload: SubmitApplicationPayload
): Promise<SubmitApplicationResponse> => {
    const response = await api.post<SubmitApplicationResponse>(
        "/api/applications",
        payload
    );

    return response.data;
};