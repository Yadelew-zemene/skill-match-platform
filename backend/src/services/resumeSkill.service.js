import db from "../config/db.js";

export const saveResumeSkills = async (resumeId, skills) => {
  

  if (!Array.isArray(skills) || skills.length === 0) {
  
    return;
  }

  const values = skills.map(skill => [resumeId, skill]);

  try {
    const [result] = await db.query(
      "INSERT INTO resume_skills (resume_id, skill) VALUES ?",
      [values]
    );

  } catch (err) {
    console.error("Failed to save resume skills:", err);
    throw err;
  }
};
