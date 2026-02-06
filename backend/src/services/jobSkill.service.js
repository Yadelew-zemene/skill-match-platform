import db from "../config/db.js";

export const saveJobSkills = async (jobId, skills) => {
  const values = skills.map(skill => [jobId, skill]);
  if (!values.length) return;

  await db.query(
    "INSERT INTO job_skills (job_id, skill) VALUES ?",
    [values]
  );
};
