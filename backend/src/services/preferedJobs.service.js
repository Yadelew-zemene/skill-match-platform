import db from "../config/db.js"

export const getCandidateDashboardData = async (userId) => {
  const query = `
    SELECT 
        u.id AS candidate_id,
        u.name,
        u.email,

        j.id AS job_id,
        j.title,
        j.company AS company,
        j.description,
        j.application_link AS application_link,

        m.score

    FROM users u
    JOIN resumes r ON r.user_id = u.id
    JOIN match_scores m ON m.resume_id = r.id
    JOIN jobs j ON j.id = m.job_id

    WHERE u.id = ?
    ORDER BY m.score DESC
    LIMIT 10
  `;

  const [rows] = await db.query(query, [userId]);
  return rows;

};
