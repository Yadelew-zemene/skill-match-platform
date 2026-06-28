export interface MatchedJob {
  jobId: number;
  title: string;
  company: string | null;
  description: string;
  applicationLink: string;
  score: number;
}

export interface CandidateDashboardResponse {
  matchedJobs: MatchedJob[];
}