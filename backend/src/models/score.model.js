import db from "../config/db.js";

class Score {
  static async upsert({ resumeId, jobId, score }) {
    const [result] = await db.execute(
      `
      INSERT INTO match_scores (resume_id, job_id, score)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        score = VALUES(score)
      `,
      [resumeId, jobId, score],
    );

    return result;
  }

  static async findByResumeId(resumeId) {
    const sql = `
      SELECT
        m.score,
        j.id AS job_id,
        j.title,
        j.description
      FROM match_scores m
      JOIN jobs j ON j.id = m.job_id
      WHERE m.resume_id = ?
        AND j.status = 'active'
      ORDER BY m.score DESC
    `;

    const [rows] = await db.execute(sql, [resumeId]);

    return rows;
  }
}

export default Score;
