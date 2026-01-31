import db from "../config/db.js";

export const saveResumeSkills = async (resumeId, skills) => {
  const values = skills.map(skill => [resumeId, skill]);

  if (values.length === 0) return;

  await db.query(
    "INSERT INTO resume_skills (resume_id, skill) VALUES ?",
    [values]
  );
};
