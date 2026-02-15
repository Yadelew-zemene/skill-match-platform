import db from "../config/db.js";

const calculateScore = (resumeSkills, jobSkills) => {
  const resumeSet = new Set(resumeSkills.map(s => s.toLowerCase().trim()));
  const jobSet = new Set(jobSkills.map(s => s.toLowerCase().trim()));

  const matched = [...jobSet].filter(skill => resumeSet.has(skill));
  const score =
    jobSet.size > 0
      ? Math.round((matched.length / jobSet.size) * 100)
      : 0;

  return score;
};
export const matchResumeToAllJobs = async (resumeId) => {
  // Get resume skills
  const [resumeSkillsRows] = await db.query(
    "SELECT skill FROM resume_skills WHERE resume_id = ?",
    [resumeId]
  );

  const resumeSkills = resumeSkillsRows.map(r => r.skill);

  // Get ALL jobs
  const [jobs] = await db.query("SELECT id FROM jobs");

  for (const job of jobs) {
    const [jobSkillsRows] = await db.query(
      "SELECT skill FROM job_skills WHERE job_id = ?",
      [job.id]
    );

    const jobSkills = jobSkillsRows.map(j => j.skill);

    const score = calculateScore(resumeSkills, jobSkills);

    await db.query(
      `
      INSERT INTO match_scores (resume_id, job_id, score)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE score = VALUES(score)
      `,
      [resumeId, job.id, score]
    );
  }
};
export const matchJobToAllResumes = async (jobId) => {
  // Get job skills
  const [jobSkillsRows] = await db.query(
    "SELECT skill FROM job_skills WHERE job_id = ?",
    [jobId]
  );

  const jobSkills = jobSkillsRows.map(j => j.skill);

  // Get ALL resumes
  const [resumes] = await db.query("SELECT id FROM resumes");

  for (const resume of resumes) {
    const [resumeSkillsRows] = await db.query(
      "SELECT skill FROM resume_skills WHERE resume_id = ?",
      [resume.id]
    );

    const resumeSkills = resumeSkillsRows.map(r => r.skill);

    const score = calculateScore(resumeSkills, jobSkills);

    await db.query(
      `
      INSERT INTO match_scores (resume_id, job_id, score)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE score = VALUES(score)
      `,
      [resume.id, jobId, score]
    );
  }
};
export const getCandidatesForJob = async (jobId) => {
  const [rows] = await db.query(
    `SELECT u.id AS user_id, u.name, u.email, MAX(m.score) AS score
     FROM resumes r
     JOIN users u ON r.user_id = u.id
     JOIN match_scores m ON r.id = m.resume_id
     WHERE m.job_id = ?
     GROUP BY u.id, u.name, u.email
     ORDER BY score DESC`,
    [jobId]
  );
  return rows;
};
