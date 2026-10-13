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

      CASE
        WHEN cp.profile_image_path IS NOT NULL THEN 1
        ELSE 0
      END AS has_profile_image,

      COALESCE(
        (
          SELECT MAX(ms.score)
          FROM match_scores ms
          WHERE ms.job_id = a.job_id
            AND ms.resume_id = a.resume_id
        ),
        0
      ) AS match_score

    FROM applications a

    INNER JOIN users u
      ON u.id = a.candidate_id

    INNER JOIN resumes r
      ON r.id = a.resume_id

    LEFT JOIN candidate_profiles cp
      ON cp.user_id = a.candidate_id

    WHERE a.job_id = ?

    ORDER BY a.applied_at DESC
    `,
      [jobId],
    );

    return rows.map((application) => ({
      ...application,
      has_profile_image: Boolean(application.has_profile_image),
    }));
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
    SET
      status = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
      [status, applicationId],
    );

    return result;
  }

  static async findByCandidateId(candidateId) {
    const [rows] = await db.query(
      `
    SELECT
      a.id,
      a.job_id,
      a.candidate_id,
      a.resume_id,
      a.cover_letter,
      a.status,
      a.applied_at,
      a.updated_at,

      j.title AS job_title,
      j.company,
      j.description AS job_description,
      j.application_link,

      r.original_filename,
      r.is_active,

      COALESCE(
        (
          SELECT MAX(ms.score)
          FROM match_scores ms
          WHERE ms.job_id = a.job_id
            AND ms.resume_id = a.resume_id
        ),
        0
      ) AS match_score

    FROM applications a

    INNER JOIN jobs j
      ON j.id = a.job_id

    INNER JOIN resumes r
      ON r.id = a.resume_id

    WHERE a.candidate_id = ?

    ORDER BY a.applied_at DESC
    `,
      [candidateId],
    );

    return rows;
  }
}

export default Application;
