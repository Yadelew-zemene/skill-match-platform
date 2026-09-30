import {
  getEmployerJob,
  updateEmployerJob,
  updateEmployerJobStatus,
  deleteEmployerJob,
} from "../services/job-management.service.js";

export const getEmployerJobController = async (req, res) => {
  try {
    const job = await getEmployerJob(req.params.jobId, req.user.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      job,
    });
  } catch (error) {
    if (error.message === "Invalid job ID") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("GET EMPLOYER JOB ERROR", error);

    return res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};

export const updateEmployerJobController = async (req, res) => {
  try {
    const job = await updateEmployerJob(
      req.params.jobId,
      req.user.id,
      req.body,
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    if (
      error.message === "Invalid job ID" ||
      error.message.includes("required")
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("UPDATE EMPLOYER JOB ERROR", error);

    return res.status(500).json({
      message: "Failed to update job",
    });
  }
};

export const updateEmployerJobStatusController = async (req, res) => {
  try {
    const job = await updateEmployerJobStatus(
      req.params.jobId,
      req.user.id,
      req.body.status,
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: `Job ${job.status === "active" ? "opened" : "closed"} successfully`,
      job,
    });
  } catch (error) {
    if (
      error.message === "Invalid job ID" ||
      error.message === "Invalid job status"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("UPDATE EMPLOYER JOB STATUS ERROR", error);

    return res.status(500).json({
      message: "Failed to update job status",
    });
  }
};

export const deleteEmployerJobController = async (req, res) => {
  try {
    const job = await deleteEmployerJob(req.params.jobId, req.user.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    if (error.message === "Invalid job ID") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("DELETE EMPLOYER JOB ERROR", error);

    return res.status(500).json({
      message: "Failed to delete job",
    });
  }
};
