import db from "../config/db.js"

export const getCandidatesForJob = async (jobId) => {
  const [rows]= await db.query(
    `SELECT jobs.title, u.name, u.email, MAX(m.score) AS score,r.file_path
     FROM resumes r
     JOIN users u ON r.user_id = u.id
     JOIN match_scores m ON r.id = m.resume_id
     JOIN jobs ON jobs.id=m.job_id
     WHERE m.job_id = ?
     GROUP BY u.id, u.name, u.email
     ORDER BY score DESC`,
    [jobId]
  );
  console.log(rows);
  return  rows;
};

/*
job_titele
candidate-name,
candidate_email
score
file_path

*/
