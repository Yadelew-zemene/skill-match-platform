export const matchResumeToJob = async (resumeId, jobId) => {
  const [resumeSkills] = await db.query(
    "SELECT skill FROM resume_skills WHERE resume_id = ?",
    [resumeId]
  );

  const [jobSkills] = await db.query(
    "SELECT skill FROM job_skills WHERE job_id = ?",
    [jobId]
  );

  const resumeSet = new Set(resumeSkills.map(s => s.skill.toLowerCase()));
  const jobSet = new Set(jobSkills.map(s => s.skill.toLowerCase()));

  let score = 0;
  const matched = [...jobSet].filter(skill => resumeSet.has(skill));

  if (jobSet.size > 0) {
    score = Math.round((matched.length / jobSet.size) * 100);
  }

  await db.query(
    "INSERT INTO match_scores (resume_id, job_id, score) VALUES (?, ?, ?)",
    [resumeId, jobId, score]
  );

  return { matched, score };
};
