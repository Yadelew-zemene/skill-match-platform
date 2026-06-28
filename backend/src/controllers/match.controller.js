
import { matchResumeToAllJobs } from "../services/match.service.js";
export const calculateMatch = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        message: "resumeId is required",
      });
    }

    await matchResumeToAllJobs(resumeId);

    return res.status(200).json({
      message: "Match calculated successfully",
    });

  } catch (error) {
    console.error("Match error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};