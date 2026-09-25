import db from "../config/db.js";

class Application {
  static async create({ jobId, candidateId, resumeId, coverLetter = null }) {
    const [result] = await db.execute(
      `
      INSERT INTO applications (
        job_id,
        candidate_id,
        resume_id,
        cover_letter
      )
      VALUES (?, ?, ?, ?)
      `,
      [jobId, candidateId, resumeId, coverLetter],
    );

    return result.insertId;
  }

  static async findByJobAndCandidate(jobId, candidateId) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        job_id,
        candidate_id,
        resume_id,
        cover_letter,
        status,
        applied_at,
        updated_at
      FROM applications
      WHERE job_id = ?
        AND candidate_id = ?
      LIMIT 1
      `,
      [jobId, candidateId],
    );

    return rows[0] || null;
  }
}

export default Application;
