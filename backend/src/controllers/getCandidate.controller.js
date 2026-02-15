import {getCandidatesForJob} from "../services/match.service.js"
export const viewCandidates = async (req, res) => {
  try {
        const { jobId } = req.params;

        const candidates = await getCandidatesForJob(jobId);

        res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
