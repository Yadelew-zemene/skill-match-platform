import db from "../config/db.js";

class Job {
  static async create({
    employerId,
    title,
    description,
    application_link,
    company,
  }) {
    const [result] = await db.query(
      `
      INSERT INTO jobs (
        employer_id,
        title,
        description,
        application_link,
        company
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [employerId, title, description, application_link, company],
    );

    return result.insertId;
  }

  static async findActiveForCandidate(
    candidateId,
    { limit = 10, offset = 0 } = {},
  ) {
    const [rows] = await db.query(
      `
      SELECT
        j.id,
        j.title,
        j.description,
        j.company,
        j.application_link,
        j.created_at,
        COALESCE(MAX(ms.score), 0) AS match_score
      FROM jobs j
      LEFT JOIN resumes r
        ON r.user_id = ?
        AND r.status = 'completed'
        AND r.is_active = TRUE
      LEFT JOIN match_scores ms
        ON ms.job_id = j.id
        AND ms.resume_id = r.id
      WHERE j.status = 'active'
      GROUP BY
        j.id,
        j.title,
        j.description,
        j.company,
        j.application_link,
        j.created_at
      ORDER BY match_score DESC, j.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [candidateId, limit, offset],
    );

    return rows;
  }

  static async countActiveJobs() {
    const [rows] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM jobs
      WHERE status = 'active'
      `,
    );

    return rows[0].total;
  }
}

export default Job;
