import db from "../config/db.js";

await db.execute(
  "INSERT INTO resume_skills (resume_id, skill) VALUES (?, ?)",
  [1, "Python"]
);
