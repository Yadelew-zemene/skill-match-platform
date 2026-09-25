import {
  getEmployerApplications,
  updateApplicationStatus,
} from "../services/employer-application.service.js";

export const getApplicationsForJob = async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);

    if (!Number.isInteger(jobId) || jobId <= 0) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const applications = await getEmployerApplications(jobId, req.user.id);

    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("GET APPLICATIONS ERROR", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : "Failed to fetch applications",
    });
  }
};

export const changeApplicationStatus = async (req, res) => {
  try {
    const applicationId = Number(req.params.applicationId);
    const { status } = req.body;

    if (!Number.isInteger(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        message: "Invalid application ID",
      });
    }

    if (typeof status !== "string") {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const result = await updateApplicationStatus({
      applicationId,
      employerId: req.user.id,
      status: status.trim().toLowerCase(),
    });

    return res.status(200).json({
      message: "Application status updated successfully",
      ...result,
    });
  } catch (error) {
    console.error("UPDATE APPLICATION STATUS ERROR", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : "Failed to update application status",
    });
  }
};
