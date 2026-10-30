export interface EmployerProfile {
    id: number | null;
    employer_id: number;
    company_name: string | null;
    company_description: string | null;
    industry: string | null;
    company_size: string | null;
    location: string | null;
    phone: string | null;
    website_url: string | null;
    linkedin_url: string | null;
    profile_image_path: string | null;
}

export interface EmployerProfileResponse {
    profile: EmployerProfile;
    message?: string;
}

export interface UpdateEmployerProfileData {
    company_name: string;
    company_description: string | null;
    industry: string | null;
    company_size: string | null;
    location: string | null;
    phone: string | null;
    website_url: string | null;
    linkedin_url: string | null;
}