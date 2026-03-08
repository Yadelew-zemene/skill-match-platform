import { getCandidateDashboardData } from "../services/preferedJobs.service.js";

export const getCandidateDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const rows = await getCandidateDashboardData(userId);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No matched jobs found" });
    }

    const matchedJobs = rows.map((row) => ({
      jobId: row.job_id,
      title: row.title,
      company: row.company,
      description: row.description,
      application_link: row.application_link,
      score: row.score,
    }));

    res.status(200).json({matchedJobs,});

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard" });
  }
};