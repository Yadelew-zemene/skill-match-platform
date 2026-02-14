
import { matchResumeToAllJobs } from "../services/match.service.js";

export const calculateMatch = async (req, res) => {
  try {
    const { resumeId, jobId } = req.body;

    if (!resumeId || !jobId) {
      return res.status(400).json({
        message: "resumeId and jobId are required",
      });
    }

    await matchResumeToAllJobs(resumeId);

    res.status(200).json({
      message: "Match calculated successfully",
      ...result,
    });
  } catch (error) {
    console.error("Match error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
