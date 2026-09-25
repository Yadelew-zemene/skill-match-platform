import { createApplication } from "../services/application.service.js";

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
