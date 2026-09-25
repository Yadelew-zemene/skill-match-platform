import db from "../config/db.js";
import Application from "../models/application.model.js";

const ALLOWED_STATUSES = new Set([
  "pending",
  "reviewing",
  "shortlisted",
  "rejected",
  "accepted",
]);

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createEmployerApplicationService = ({
  database = db,
  applicationModel = Application,
} = {}) => ({
  getApplications: async (jobId, employerId) => {
    const [jobs] = await database.execute(
      `
      SELECT id
      FROM jobs
      WHERE id = ?
        AND employer_id = ?
      LIMIT 1
      `,
      [jobId, employerId],
    );

    if (!jobs.length) {
      throw createError("Job not found", 404);
    }

    return applicationModel.findByJobId(jobId);
  },

  updateStatus: async ({ applicationId, employerId, status }) => {
    if (!ALLOWED_STATUSES.has(status)) {
      throw createError("Invalid application status", 400);
    }

    const application = await applicationModel.findById(applicationId);

    if (!application) {
      throw createError("Application not found", 404);
    }

    const [jobs] = await database.execute(
      `
      SELECT id
      FROM jobs
      WHERE id = ?
        AND employer_id = ?
      LIMIT 1
      `,
      [application.job_id, employerId],
    );

    if (!jobs.length) {
      throw createError("Application not found", 404);
    }

    await applicationModel.updateStatus(applicationId, status);

    return {
      applicationId,
      status,
    };
  },
});

const employerApplicationService = createEmployerApplicationService();

export const getEmployerApplications = (jobId, employerId) =>
  employerApplicationService.getApplications(jobId, employerId);

export const updateApplicationStatus = (data) =>
  employerApplicationService.updateStatus(data);
