import db from "../config/db.js";

 const getPostedJobs = async (employerId) => {
  const [rows] = await db.query(
    `
    SELECT 
      j.id,
      j.title,
      j.company,
      j.created_at,
      COUNT(ms.id) AS applicants
    FROM jobs j
    LEFT JOIN match_scores ms 
      ON j.id = ms.job_id
    WHERE j.employer_id = ?
    GROUP BY j.id
    ORDER BY j.created_at DESC
    `,
    [employerId]
  );

  return rows;
};
export  default  getPostedJobs