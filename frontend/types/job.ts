
export interface MatchedJob {
  jobId: number;
  title: string;
  company?: string; 
  description: string;
  application_link: string;
  score: number;
  // matched_skills: string[];
}