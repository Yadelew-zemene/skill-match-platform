import type { ResumeStatus } from "./resume";

export interface CandidateProfile {
    id: number | null;
    name: string;
    email: string;
    profile_image_path: string | null;

    professional_title: string | null;
    bio: string | null;
    phone: string | null;
    location: string | null;
    linkedin_url: string | null;
    github_url: string | null;

    skills: string[];

    resume: {
        id: number;
        original_filename: string;
        status: ResumeStatus;
        is_active: boolean;
    } | null;
}

export interface CandidateProfileResponse {
    profile: CandidateProfile;
}

export interface UpdateCandidateProfileData {
    name: string;
    professional_title: string | null;
    bio: string | null;
    phone: string | null;
    location: string | null;
    linkedin_url: string | null;
    github_url: string | null;
}