import api from "./api";

/* -------------------------------------------------------------------------- */
/* Shared Types                                                               */
/* -------------------------------------------------------------------------- */

export type ApplicationStatus =
    | "pending"
    | "reviewing"
    | "shortlisted"
    | "rejected"
    | "accepted";

/* -------------------------------------------------------------------------- */
/* Candidate - Submit Application                                             */
/* -------------------------------------------------------------------------- */

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
    payload: SubmitApplicationPayload,
): Promise<SubmitApplicationResponse> => {
    const response = await api.post<SubmitApplicationResponse>(
        "/api/applications",
        payload,
    );

    return response.data;
};

/* -------------------------------------------------------------------------- */
/* Candidate - My Applications                                                */
/* -------------------------------------------------------------------------- */

export interface CandidateApplication {
    application_id: number;
    job_id: number;
    candidate_id: number;
    resume_id: number;

    cover_letter: string | null;

    status: ApplicationStatus;

    applied_at: string;
    updated_at: string;

    job_title: string;
    company: string;

    match_score: number | null;

    original_filename: string | null;
}

export interface CandidateApplicationsResponse {
    applications: CandidateApplication[];
}

export const getCandidateApplications = async (): Promise<
    CandidateApplicationsResponse
> => {
    const response = await api.get<CandidateApplicationsResponse>(
        "/api/applications",
    );

    return response.data;
};

/* -------------------------------------------------------------------------- */
/* Employer - Applications                                                   */
/* -------------------------------------------------------------------------- */

// export interface EmployerApplication {
//     application_id: number;
//     job_id: number;
//     candidate_id: number;
//     resume_id: number;

//     cover_letter: string | null;

//     status: ApplicationStatus;

//     applied_at: string;
//     updated_at: string;

//     candidate_name: string;
//     candidate_email: string;

//     original_filename: string | null;

//     match_score: number | null;
// }
export interface EmployerApplication {
    application_id: number;
    job_id: number;
    candidate_id: number;
    resume_id: number;

    cover_letter: string | null;

    status: ApplicationStatus;

    applied_at: string;
    updated_at: string;

    candidate_name: string;
    candidate_email: string;

    original_filename: string | null;

    match_score: number | null;

    has_profile_image: boolean;
}

export interface EmployerApplicationsResponse {
    applications: EmployerApplication[];
}

export const fetchEmployerApplications = async (
    jobId: number,
): Promise<EmployerApplicationsResponse> => {
    const response = await api.get<EmployerApplicationsResponse>(
        `/api/employer/jobs/${jobId}/applications`,
    );

    return response.data;
};

/* -------------------------------------------------------------------------- */
/* Employer - Update Application Status                                       */
/* -------------------------------------------------------------------------- */

export interface UpdateApplicationStatusResponse {
    message: string;
    application: {
        id: number;
        job_id: number;
        candidate_id: number;
        resume_id: number;

        cover_letter: string | null;

        status: ApplicationStatus;

        applied_at: string;
        updated_at: string;
    };
}

export const updateEmployerApplicationStatus = async (
    applicationId: number,
    status: ApplicationStatus,
): Promise<UpdateApplicationStatusResponse> => {
    const response =
        await api.patch<UpdateApplicationStatusResponse>(
            `/api/employer/applications/${applicationId}/status`,
            {
                status,
            },
        );

    return response.data;
};