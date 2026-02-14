export const getCandidatesForJob = async (jobId) => {
  const [results] = await db.query(
    `
    SELECT r.id, r.user_id, m.score
    FROM match_scores m
    JOIN resumes r ON m.resume_id = r.id
    WHERE m.job_id = ?
    ORDER BY m.score DESC
    `,
    [jobId]
  );

  return results;
};
