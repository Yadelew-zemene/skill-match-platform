// import db from "../config/db.js";
// import Application from "../models/application.model.js";

// const ALLOWED_STATUSES = new Set([
//   "pending",
//   "reviewing",
//   "shortlisted",
//   "rejected",
//   "accepted",
// ]);

// const createError = (message, statusCode) => {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   return error;
// };

// export const createEmployerApplicationService = ({
//   database = db,
//   applicationModel = Application,
// } = {}) => ({
//   getApplications: async (jobId, employerId) => {
//     const [jobs] = await database.execute(
//       `
//       SELECT id
//       FROM jobs
//       WHERE id = ?
//         AND employer_id = ?
//       LIMIT 1
//       `,
//       [jobId, employerId],
//     );

//     if (!jobs.length) {
//       throw createError("Job not found", 404);
//     }

//     return applicationModel.findByJobId(jobId);
//   },

//   updateStatus: async ({ applicationId, employerId, status }) => {
//     if (!ALLOWED_STATUSES.has(status)) {
//       throw createError("Invalid application status", 400);
//     }

//     const application = await applicationModel.findById(applicationId);

//     if (!application) {
//       throw createError("Application not found", 404);
//     }

//     const [jobs] = await database.execute(
//       `
//       SELECT id
//       FROM jobs
//       WHERE id = ?
//         AND employer_id = ?
//       LIMIT 1
//       `,
//       [application.job_id, employerId],
//     );

//     if (!jobs.length) {
//       throw createError("Application not found", 404);
//     }

//     await applicationModel.updateStatus(applicationId, status);

//     return {
//       applicationId,
//       status,
//     };
//   },
// });

// const employerApplicationService = createEmployerApplicationService();

// export const getEmployerApplications = (jobId, employerId) =>
//   employerApplicationService.getApplications(jobId, employerId);

// export const updateApplicationStatus = (data) =>
//   employerApplicationService.updateStatus(data);
// // import db from "../config/db.js";
// // import Application from "../models/application.model.js";

// // const ALLOWED_STATUSES = [
// //   "pending",
// //   "reviewing",
// //   "shortlisted",
// //   "rejected",
// //   "accepted",
// // ];

// // const validateApplicationId = (applicationId) => {
// //   const parsedId = Number(applicationId);

// //   if (!Number.isInteger(parsedId) || parsedId <= 0) {
// //     const error = new Error("Invalid application ID");
// //     error.statusCode = 400;
// //     throw error;
// //   }

// //   return parsedId;
// // };

// // export const updateEmployerApplicationStatus = async ({
// //   applicationId,
// //   employerId,
// //   status,
// // }) => {
// //   const parsedApplicationId = validateApplicationId(applicationId);

// //   if (!ALLOWED_STATUSES.includes(status)) {
// //     const error = new Error("Invalid application status");
// //     error.statusCode = 400;
// //     throw error;
// //   }

// //   /*
// //    * Verify that the application exists and that
// //    * the employer owns the job associated with it.
// //    */
// //   const [rows] = await db.execute(
// //     `
// //     SELECT
// //       a.id,
// //       a.job_id,
// //       a.candidate_id,
// //       a.resume_id,
// //       a.cover_letter,
// //       a.status,
// //       a.applied_at,
// //       a.updated_at,

// //       j.employer_id

// //     FROM applications a

// //     INNER JOIN jobs j
// //       ON j.id = a.job_id

// //     WHERE a.id = ?
// //       AND j.employer_id = ?

// //     LIMIT 1
// //     `,
// //     [parsedApplicationId, employerId],
// //   );

// //   if (!rows.length) {
// //     const error = new Error("Application not found");
// //     error.statusCode = 404;
// //     throw error;
// //   }

// //   await Application.updateStatus(
// //     parsedApplicationId,
// //     status,
// //   );

// //   /*
// //    * Return the updated application.
// //    */
// //   const updatedApplication =
// //     await Application.findById(parsedApplicationId);

// //   return updatedApplication;
// // };

import db from "../config/db.js";
import Application from "../models/application.model.js";
import { createNotification } from "./notification.service.js";

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
  notificationCreator = createNotification,
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
    // 1. Validate the requested status.
    if (!ALLOWED_STATUSES.has(status)) {
      throw createError("Invalid application status", 400);
    }

    // 2. Retrieve the application.
    const application = await applicationModel.findById(applicationId);

    if (!application) {
      throw createError("Application not found", 404);
    }

    // 3. Verify that this employer owns the associated job.
    const [jobs] = await database.execute(
      `
      SELECT
        id,
        title
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

    const job = jobs[0];

    // 4. Avoid duplicate notifications when the status is unchanged.
    if (application.status === status) {
      return {
        applicationId,
        status,
        changed: false,
      };
    }

    // 5. Update the application status.
    await applicationModel.updateStatus(applicationId, status);

    // 6. Notify the candidate.
    try {
      await notificationCreator({
        userId: application.candidate_id,
        title: "Application status updated",
        message: `Your application for ${job.title} is now ${status}.`,
        type: "application_status",
        referenceId: applicationId,
      });
    } catch (notificationError) {
      console.error(
        "APPLICATION STATUS NOTIFICATION ERROR:",
        notificationError,
      );
    }

    return {
      applicationId,
      previousStatus: application.status,
      status,
      changed: true,
    };
  },
});

const employerApplicationService = createEmployerApplicationService();

export const getEmployerApplications = (jobId, employerId) =>
  employerApplicationService.getApplications(jobId, employerId);

export const updateApplicationStatus = (data) =>
  employerApplicationService.updateStatus(data);
