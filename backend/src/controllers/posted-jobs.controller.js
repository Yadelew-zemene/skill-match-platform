import getPostedJobs from "../services/posted-jobs.service.js";

export const getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobs = await getPostedJobs(employerId);

    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("GET EMPLOYER JOBS ERROR", error);

    return res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};
