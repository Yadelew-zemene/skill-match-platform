import db from "../config/db.js";

const getPostedJobs = async (employerId) => {
  const [rows] = await db.query(
    `
    SELECT
      j.id,
      j.title,
      j.company,
      j.description,
      j.application_link,
      j.status,
      j.created_at,

      COUNT(DISTINCT a.id) AS applicants,

      COUNT(
        DISTINCT CASE
          WHEN a.status = 'pending'
          THEN a.id
        END
      ) AS pending_applications,

      COUNT(
        DISTINCT CASE
          WHEN a.status = 'reviewing'
          THEN a.id
        END
      ) AS reviewing_applications,

      COUNT(
        DISTINCT CASE
          WHEN a.status = 'shortlisted'
          THEN a.id
        END
      ) AS shortlisted_applications

    FROM jobs j

    LEFT JOIN applications a
      ON a.job_id = j.id

    WHERE j.employer_id = ?

    GROUP BY
      j.id,
      j.title,
      j.company,
      j.description,
      j.application_link,
      j.status,
      j.created_at

    ORDER BY j.created_at DESC
    `,
    [employerId],
  );

  return rows;
};

export default getPostedJobs;
