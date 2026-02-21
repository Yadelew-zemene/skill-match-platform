import db from "../config/db.js";

class Score {
  static async create({resumeId, jobId, score }) {
    const [result] = await db.query(
  "INSERT INTO match_scores (resume_id, job_id, score) VALUES (?, ?, ?)",
  [resumeId, jobId, score]

    );
    return result.id;
  }
  static async findByResumeId(resumeId) {
    const sql = `
      SELECT m.score, j.id AS job_id, j.title, j.description
      FROM match_scores m
      JOIN jobs j ON j.id = m.job_id
      WHERE m.resume_id = ?
      ORDER BY m.score DESC
    `;
    const [rows] = await db.execute(sql, [resumeId]);
    return rows;
  }
}

export default Score;
