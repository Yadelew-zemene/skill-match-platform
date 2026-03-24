import getPostedJobs from "../services/posted-jobs.service.js"

export const getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.params.employerId;

    const jobs = await getPostedJobs(employerId);

      res.status(200).json(jobs);
      console.log(jobs)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};