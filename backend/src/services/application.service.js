

import db from "../config/db.js";
import Application from "../models/application.model.js";
import { createNotification } from "./notification.service.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createApplicationService =
  ({
    database = db,
    applicationModel = Application,
    notificationCreator = createNotification,
  } = {}) =>
  async ({ jobId, candidateId, resumeId, coverLetter }) => {
    // Verify the job exists, is active, and retrieve its employer.
    const [jobs] = await database.execute(
      `
      SELECT id, title, employer_id
      FROM jobs
      WHERE id = ?
        AND status = 'active'
      LIMIT 1
      `,
      [jobId],
    );

    if (!jobs.length) {
      throw createError("Job not found or inactive", 404);
    }

    const job = jobs[0];

    // Verify the resume belongs to the candidate.
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
      throw createError("Resume not found or unavailable", 400);
    }

    // . Prevent duplicate applications.
    const existingApplication = await applicationModel.findByJobAndCandidate(
      jobId,
      candidateId,
    );

    if (existingApplication) {
      throw createError("You have already applied to this job", 409);
    }

    // . Create the application first.
    const applicationId = await applicationModel.create({
      jobId,
      candidateId,
      resumeId,
      coverLetter,
    });

    // Notification failure must not invalidate the application.
    try {
      await notificationCreator({
        userId: job.employer_id,
        title: "New job application",
        message: `A candidate has applied for your job: ${job.title}.`,
        type: "new_application",
        referenceId: jobId,
      });
    } catch (notificationError) {
      console.error(
        "NEW APPLICATION EMPLOYER NOTIFICATION ERROR:",
        notificationError,
      );
    }

    // 6. Preserve the existing response expected by the controller.
    return applicationId;
  };

export const getCandidateApplications = async (candidateId) => {
  return Application.findByCandidateId(candidateId);
};

export const createApplication = createApplicationService();
