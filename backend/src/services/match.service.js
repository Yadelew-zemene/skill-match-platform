import db from "../config/db.js";
import Score from "../models/score.model.js";

const normalizeSkills = (skills) => {
  if (!Array.isArray(skills)) {
    return [];
  }

  return [
    ...new Set(
      skills
        .filter((skill) => typeof skill === "string")
        .map((skill) => skill.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];
};

const calculateScore = (resumeSkills, jobSkills) => {
  const resumeSet = new Set(normalizeSkills(resumeSkills));
  const jobSet = new Set(normalizeSkills(jobSkills));

  if (jobSet.size === 0) {
    return 0;
  }

  const matchedSkills = [...jobSet].filter((skill) => resumeSet.has(skill));

  return Math.round((matchedSkills.length / jobSet.size) * 100);
};

const getResumeSkills = async (resumeId) => {
  const [rows] = await db.execute(
    `
      SELECT skill
      FROM resume_skills
      WHERE resume_id = ?
    `,
    [resumeId],
  );

  return rows.map((row) => row.skill);
};

const getJobSkills = async (jobId) => {
  const [rows] = await db.execute(
    `
      SELECT skill
      FROM job_skills
      WHERE job_id = ?
    `,
    [jobId],
  );

  return rows.map((row) => row.skill);
};

/**
 * Match one completed resume against all active jobs.
 */
export const matchResumeToAllJobs = async (resumeId) => {
  const [resumeRows] = await db.execute(
    `
      SELECT id
      FROM resumes
      WHERE id = ?
        AND status = 'completed'
      LIMIT 1
    `,
    [resumeId],
  );

  if (!resumeRows.length) {
    throw new Error("Resume is not completed");
  }

  const resumeSkills = await getResumeSkills(resumeId);

  const [jobs] = await db.execute(
    `
      SELECT id
      FROM jobs
      WHERE status = 'active'
    `,
  );

  for (const job of jobs) {
    const jobSkills = await getJobSkills(job.id);

    const score = calculateScore(resumeSkills, jobSkills);
    await Score.upsert({
      resumeId,
      jobId: job.id,
      score,
    });
  }

  return {
    resumeId,
    jobsMatched: jobs.length,
  };
};

/**
 * Match one active job against all eligible candidate resumes.
 */
export const matchJobToAllResumes = async (jobId) => {
  const [jobRows] = await db.query(
    `
    SELECT id
    FROM jobs
    WHERE id = ?
      AND status = 'active'
    LIMIT 1
    `,
    [jobId],
  );

  if (!jobRows.length) {
    return;
  }

  const [jobSkillsRows] = await db.query(
    `
    SELECT skill
    FROM job_skills
    WHERE job_id = ?
    `,
    [jobId],
  );

  const jobSkills = jobSkillsRows.map((row) => row.skill);

  const [resumes] = await db.query(
    `
    SELECT id
    FROM resumes
    WHERE status = 'completed'
      AND is_active = TRUE
    `,
  );

  for (const resume of resumes) {
    const [resumeSkillsRows] = await db.query(
      `
      SELECT skill
      FROM resume_skills
      WHERE resume_id = ?
      `,
      [resume.id],
    );

    const resumeSkills = resumeSkillsRows.map((row) => row.skill);

    const score = calculateScore(resumeSkills, jobSkills);

    await Score.upsert({
      resumeId: resume.id,
      jobId,
      score,
    });
  }
};