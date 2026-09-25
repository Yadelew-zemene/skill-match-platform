import db from "../config/db.js";
import Application from "../models/application.model.js";

export const createApplicationService =
  ({ database = db, applicationModel = Application } = {}) =>
  async ({ jobId, candidateId, resumeId, coverLetter }) => {
    const [jobs] = await database.execute(
      `
    SELECT id
    FROM jobs
    WHERE id = ?
      AND status = 'active'
    LIMIT 1
    `,
      [jobId],
    );

    if (!jobs.length) {
      const error = new Error("Job not found or inactive");
      error.statusCode = 404;
      throw error;
    }

    const [resumes] = await database.execute(
      `
    SELECT id
    FROM resumes
    WHERE id = ?
      AND user_id = ?
      AND status = 'completed'
      AND is_active = TRUE
    LIMIT 1
    `,
      [resumeId, candidateId],
    );

    if (!resumes.length) {
      const error = new Error("Resume not found or unavailable");
      error.statusCode = 400;
      throw error;
    }

    const existingApplication = await applicationModel.findByJobAndCandidate(
      jobId,
      candidateId,
    );

    if (existingApplication) {
      const error = new Error("You have already applied to this job");
      error.statusCode = 409;
      throw error;
    }

    return applicationModel.create({
      jobId,
      candidateId,
      resumeId,
      coverLetter,
    });
  };

export const createApplication = createApplicationService();
