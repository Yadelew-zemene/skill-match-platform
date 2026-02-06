import db from "../config/db.js";

export const matchResumeToJob = async (resumeId, jobId) => {
  const [resumeSkills] = await db.query(
    "SELECT skill FROM resume_skills WHERE resume_id = ?",
    [resumeId]
  );

  const [jobSkills] = await db.query(
    "SELECT skill FROM job_skills WHERE job_id = ?",
    [jobId]
  );

  const resumeSet = new Set(resumeSkills.map(s => s.skill));
  const jobSet = new Set(jobSkills.map(s => s.skill));

  const matched = [...jobSet].filter(skill => resumeSet.has(skill));
  const score = Math.round((matched.length / jobSet.size) * 100);

  return { matched, score };
};
