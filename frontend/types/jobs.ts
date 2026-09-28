export interface CandidateJob {
    id: number;
    title: string;
    description: string;
    company: string | null;
    application_link: string;
    created_at: string;
    match_score: number;
}

export interface CandidateJobsResponse {
    jobs: CandidateJob[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}