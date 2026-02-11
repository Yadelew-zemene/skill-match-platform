import db from "../config/db.js";

class Score {
  static async create({resumeId, jobId, score }) {
    const [result] = await db.query(
  "INSERT INTO match_scores (resume_id, job_id, score) VALUES (?, ?, ?)",
  [resumeId, jobId, score]

    );
    return result.id;
  }
}

export default Score;
