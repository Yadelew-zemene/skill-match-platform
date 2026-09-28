export type ResumeStatus = "processing" | "completed" | "failed";

export interface Resume {
    id: number;
    user_id: number;
    file_path: string;
    original_filename: string | null;
    mime_type: string | null;
    file_size: number | null;
    extracted_text: string | null;
    status: ResumeStatus;
    is_active: boolean;
    processing_error: string | null;
    created_at: string;
    skills: string[];
}


export interface ResumeMatch {
    score: number;
    job_id: number;
    title: string;
    description: string;
}

export interface UploadResumeResponse {
    message: string;
    resumeId: number;
    skills: string[];
    status: ResumeStatus;
}