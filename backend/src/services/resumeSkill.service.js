import db from "../config/db.js";

export const saveResumeSkills = async (resumeId, skills) => {
  console.log("Saving resume skills:", resumeId, skills);

  if (!Array.isArray(skills) || skills.length === 0) {
    console.log("No resume skills to save");
    return;
  }

  const values = skills.map(skill => [resumeId, skill]);

  try {
    const [result] = await db.query(
      "INSERT INTO resume_skills (resume_id, skill) VALUES ?",
      [values]
    );

    console.log("Resume skills insert result:", result);
  } catch (err) {
    console.error("Failed to save resume skills:", err);
    throw err;
  }
};
