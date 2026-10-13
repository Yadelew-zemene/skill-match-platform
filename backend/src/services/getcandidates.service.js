// import db from "../config/db.js";

// export const getJobForEmployer = async (jobId, employerId) => {
//   const [rows] = await db.query(
//     `
//     SELECT
//       id,
//       title,
//       company,
//       status
//     FROM jobs
//     WHERE id = ?
//       AND employer_id = ?
//     LIMIT 1
//     `,
//     [jobId, employerId],
//   );

//   return rows[0] || null;
// };

// export const getCandidatesForJob = async (jobId) => {
//   const [rows] = await db.query(
//     `
//     SELECT
//       a.id AS application_id,
//       a.job_id,
//       a.candidate_id,
//       a.resume_id,
//       a.cover_letter,
//       a.status AS application_status,
//       a.applied_at,
//       a.updated_at,

//       u.name AS candidate_name,
//       u.email AS candidate_email,

//       r.original_filename,

//       COALESCE(
//         (
//           SELECT MAX(ms.score)
//           FROM match_scores ms
//           WHERE ms.job_id = a.job_id
//             AND ms.resume_id = a.resume_id
//         ),
//         0
//       ) AS match_score

//     FROM applications a

//     INNER JOIN users u
//       ON u.id = a.candidate_id

//     INNER JOIN resumes r
//       ON r.id = a.resume_id

//     WHERE a.job_id = ?

//     ORDER BY
//       match_score DESC,
//       a.applied_at ASC
//     `,
//     [jobId],
//   );

//   return rows;
// };

// export const getCandidateDetail = async (jobId, candidateId) => {
//   const [rows] = await db.query(
//     `
//     SELECT
//       a.id AS application_id,
//       a.job_id,
//       a.candidate_id,
//       a.resume_id,
//       a.cover_letter,
//       a.status AS application_status,
//       a.applied_at,
//       a.updated_at,

//       u.name AS candidate_name,
//       u.email AS candidate_email,

//       r.original_filename,
//       r.mime_type,
//       r.file_size,
//       r.status AS resume_status,

//       COALESCE(
//         (
//           SELECT MAX(ms.score)
//           FROM match_scores ms
//           WHERE ms.job_id = a.job_id
//             AND ms.resume_id = a.resume_id
//         ),
//         0
//       ) AS match_score

//     FROM applications a

//     INNER JOIN users u
//       ON u.id = a.candidate_id

//     INNER JOIN resumes r
//       ON r.id = a.resume_id

//     WHERE a.job_id = ?
//       AND a.candidate_id = ?

//     LIMIT 1
//     `,
//     [jobId, candidateId],
//   );

//   if (!rows.length) {
//     return null;
//   }

//   const candidate = rows[0];

//   const [skills] = await db.query(
//     `
//     SELECT skill
//     FROM resume_skills
//     WHERE resume_id = ?
//     ORDER BY skill ASC
//     `,
//     [candidate.resume_id],
//   );

//   return {
//     ...candidate,
//     skills: skills.map((row) => row.skill),
//   };
// };
// export const getCandidateResumeForEmployer = async (jobId, candidateId) => {
//   const [rows] = await db.query(
//     `
//     SELECT
//       a.id AS application_id,
//       a.job_id,
//       a.candidate_id,
//       a.resume_id,

//       r.file_path,
//       r.original_filename,
//       r.mime_type,
//       r.file_size,
//       r.status AS resume_status

//     FROM applications a

//     INNER JOIN resumes r
//       ON r.id = a.resume_id

//     WHERE a.job_id = ?
//       AND a.candidate_id = ?

//     LIMIT 1
//     `,
//     [jobId, candidateId],
//   );

//   return rows[0] || null;
// };
import db from "../config/db.js";

export const getJobForEmployer = async (jobId, employerId) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      title,
      company,
      status
    FROM jobs
    WHERE id = ?
      AND employer_id = ?
    LIMIT 1
    `,
    [jobId, employerId],
  );

  return rows[0] || null;
};

export const getCandidatesForJob = async (jobId) => {
  const [rows] = await db.query(
    `
    SELECT
      a.id AS application_id,
      a.job_id,
      a.candidate_id,
      a.resume_id,
      a.cover_letter,
      a.status AS application_status,
      a.applied_at,
      a.updated_at,

      u.name AS candidate_name,
      u.email AS candidate_email,

      r.original_filename,

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

    WHERE a.job_id = ?

    ORDER BY
      match_score DESC,
      a.applied_at ASC
    `,
    [jobId],
  );

  return rows;
};

export const getCandidateDetail = async (jobId, candidateId) => {
  const [rows] = await db.query(
    `
    SELECT
      a.id AS application_id,
      a.job_id,
      a.candidate_id,
      a.resume_id,
      a.cover_letter,
      a.status AS application_status,
      a.applied_at,
      a.updated_at,

      u.name AS candidate_name,
      u.email AS candidate_email,

      cp.professional_title,
      cp.bio,
      cp.phone,
      cp.location,
      cp.linkedin_url,
      cp.github_url,

      CASE
        WHEN cp.profile_image_path IS NOT NULL
          THEN TRUE
        ELSE FALSE
      END AS has_profile_image,

      r.original_filename,
      r.mime_type,
      r.file_size,
      r.status AS resume_status,

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

    LEFT JOIN candidate_profiles cp
      ON cp.user_id = a.candidate_id

    INNER JOIN resumes r
      ON r.id = a.resume_id

    WHERE a.job_id = ?
      AND a.candidate_id = ?

    LIMIT 1
    `,
    [jobId, candidateId],
  );

  if (!rows.length) {
    return null;
  }

  const candidate = rows[0];

  const [skills] = await db.query(
    `
    SELECT skill
    FROM resume_skills
    WHERE resume_id = ?
    ORDER BY skill ASC
    `,
    [candidate.resume_id],
  );

  return {
    ...candidate,
    has_profile_image: Boolean(candidate.has_profile_image),
    skills: skills.map((row) => row.skill),
  };
};
export const getCandidatePhotoForEmployer = async (jobId, candidateId) => {
  const [rows] = await db.query(
    `
    SELECT
      cp.profile_image_path
    FROM applications a

    INNER JOIN candidate_profiles cp
      ON cp.user_id = a.candidate_id

    WHERE a.job_id = ?
      AND a.candidate_id = ?

    LIMIT 1
    `,
    [jobId, candidateId],
  );

  return rows[0] || null;
};
/**
 * Get the candidate's profile image path.
 *
 * Authorization is performed by the controller/service caller
 * after verifying that the employer owns the job and the
 * candidate applied to that job.
 */
export const getCandidateProfileImageForEmployer = async (
  jobId,
  candidateId,
) => {
  const [rows] = await db.query(
    `
    SELECT
      cp.profile_image_path

    FROM applications a

    INNER JOIN candidate_profiles cp
      ON cp.user_id = a.candidate_id

    WHERE a.job_id = ?
      AND a.candidate_id = ?

    LIMIT 1
    `,
    [jobId, candidateId],
  );

  return rows[0] || null;
};

export const getCandidateResumeForEmployer = async (jobId, candidateId) => {
  const [rows] = await db.query(
    `
    SELECT
      a.id AS application_id,
      a.job_id,
      a.candidate_id,
      a.resume_id,

      r.file_path,
      r.original_filename,
      r.mime_type,
      r.file_size,
      r.status AS resume_status

    FROM applications a

    INNER JOIN resumes r
      ON r.id = a.resume_id

    WHERE a.job_id = ?
      AND a.candidate_id = ?

    LIMIT 1
    `,
    [jobId, candidateId],
  );

  return rows[0] || null;
};