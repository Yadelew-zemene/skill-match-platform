import express from "express";

import {
  createJob,
  getCandidateJobs,
  getCandidateJob,
} from "../controllers/job.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

import { getEmployerJobs } from "../controllers/posted-jobs.controller.js";
import {
  getEmployerJobController,
  updateEmployerJobController,
  updateEmployerJobStatusController,
  deleteEmployerJobController,
} from "../controllers/job-management.controller.js";

import {
  viewCandidates,
  viewCandidateDetail,
} from "../controllers/getCandidate.controller.js";

import { viewOrDownloadCandidateResume } from "../controllers/employer-resume.controller.js";
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Employer Job Management
|--------------------------------------------------------------------------
*/

router.post(
  "/employer/post-jobs",
  authMiddleware,
  roleMiddleware("employer"),
  createJob,
);

router.get(
  "/employer/jobs",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerJobs,
);

router.get(
  "/employer/jobs/:jobId",
  authMiddleware,
  roleMiddleware("employer"),
  getEmployerJobController,
);

router.patch(
  "/employer/jobs/:jobId",
  authMiddleware,
  roleMiddleware("employer"),
  updateEmployerJobController,
);

router.patch(
  "/employer/jobs/:jobId/status",
  authMiddleware,
  roleMiddleware("employer"),
  updateEmployerJobStatusController,
);

router.delete(
  "/employer/jobs/:jobId",
  authMiddleware,
  roleMiddleware("employer"),
  deleteEmployerJobController,
);

/*
|--------------------------------------------------------------------------
| Employer Candidates
|--------------------------------------------------------------------------
*/

router.get(
  "/employer/candidates/:jobId",
  authMiddleware,
  roleMiddleware("employer"),
  viewCandidates,
);

router.get(
  "/employer/candidates/:jobId/:candidateId/resume",
  authMiddleware,
  roleMiddleware("employer"),
  viewOrDownloadCandidateResume,
);

router.get(
  "/employer/candidates/:jobId/:candidateId",
  authMiddleware,
  roleMiddleware("employer"),
  viewCandidateDetail,
);
/*
|--------------------------------------------------------------------------
| Candidate Job Browsing
|--------------------------------------------------------------------------
*/

router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware("candidate"),
  getCandidateJobs,
);

router.get(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware("candidate"),
  getCandidateJob,
);

export default router;
