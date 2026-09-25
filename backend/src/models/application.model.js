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
  static async findByJobId(jobId) {
    const [rows] = await db.execute(
      `
    SELECT
      a.id AS application_id,
      a.job_id,
      a.candidate_id,
      a.resume_id,
      a.cover_letter,
      a.status,
      a.applied_at,
      a.updated_at,

      u.name AS candidate_name,
      u.email AS candidate_email,

      r.original_filename,
      r.file_path,

      m.score AS match_score
    FROM applications a
    JOIN users u
      ON u.id = a.candidate_id
    JOIN resumes r
      ON r.id = a.resume_id
    LEFT JOIN match_scores m
      ON m.job_id = a.job_id
      AND m.resume_id = a.resume_id
    WHERE a.job_id = ?
    ORDER BY a.applied_at DESC
    `,
      [jobId],
    );

    return rows;
  }

  static async findById(applicationId) {
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
    WHERE id = ?
    LIMIT 1
    `,
      [applicationId],
    );

    return rows[0] || null;
  }

  static async updateStatus(applicationId, status) {
    const [result] = await db.execute(
      `
    UPDATE applications
    SET status = ?
    WHERE id = ?
    `,
      [status, applicationId],
    );

    return result;
  }
}

export default Application;
