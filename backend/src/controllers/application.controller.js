import {
  createApplication,
  getCandidateApplications,
} from "../services/application.service.js";

export const submitApplication = async (req, res) => {
  try {
    const { jobId, resumeId, coverLetter } = req.body;

    if (!Number.isInteger(jobId) || !Number.isInteger(resumeId)) {
      return res.status(400).json({
        message: "jobId and resumeId must be integers",
      });
    }

    if (
      coverLetter !== undefined &&
      coverLetter !== null &&
      typeof coverLetter !== "string"
    ) {
      return res.status(400).json({
        message: "coverLetter must be a string",
      });
    }

    const applicationId = await createApplication({
      jobId,
      candidateId: req.user.id,
      resumeId,
      coverLetter: coverLetter?.trim() || null,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      applicationId,
    });
  } catch (error) {
    console.error("APPLICATION ERROR", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : "Failed to submit application",
    });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await getCandidateApplications(req.user.id);

    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get candidate applications error:", error);

    return res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};
