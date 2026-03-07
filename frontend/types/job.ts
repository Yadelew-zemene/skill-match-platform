
export interface MatchedJob {
  jobId: number;
  title: string;
  company?: string; 
  description: string;
  applicationLink: string;
  score: number;
  // matched_skills: string[];
}