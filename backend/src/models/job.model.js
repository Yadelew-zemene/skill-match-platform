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
  static async findActiveByIdForCandidate(jobId, candidateId) {
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
    WHERE j.id = ?
      AND j.status = 'active'
    GROUP BY
      j.id,
      j.title,
      j.description,
      j.company,
      j.application_link,
      j.created_at
    LIMIT 1
    `,
      [candidateId, jobId],
    );

    return rows[0] || null;
  }
  static async findByIdForEmployer(jobId, employerId) {
  const [rows] = await db.query(
    `
    SELECT
      id,
      employer_id,
      title,
      description,
      company,
      application_link,
      status,
      created_at
    FROM jobs
    WHERE id = ?
      AND employer_id = ?
    LIMIT 1
    `,
    [jobId, employerId]
  );

  return rows[0] || null;
}

static async updateForEmployer(jobId, employerId, data) {
  const [result] = await db.query(
    `
    UPDATE jobs
    SET
      title = ?,
      description = ?,
      company = ?,
      application_link = ?
    WHERE id = ?
      AND employer_id = ?
    `,
    [
      data.title,
      data.description,
      data.company,
      data.application_link,
      jobId,
      employerId,
    ]
  );

  return result;
}

static async updateStatusForEmployer(jobId, employerId, status) {
  const [result] = await db.query(
    `
    UPDATE jobs
    SET status = ?
    WHERE id = ?
      AND employer_id = ?
    `,
    [status, jobId, employerId]
  );

  return result;
}

static async deleteForEmployer(jobId, employerId) {
  const [result] = await db.query(
    `
    DELETE FROM jobs
    WHERE id = ?
      AND employer_id = ?
    `,
    [jobId, employerId]
  );

  return result;
}
}

export default Job;
