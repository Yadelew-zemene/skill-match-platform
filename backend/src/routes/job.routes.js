import express from "express";
import {
    createJob,
    getCandidateJobs,
    getCandidateJob,
} from "../controllers/job.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { getEmployerJobs } from "../controllers/posted-jobs.controller.js";
import { viewCandidates } from "../controllers/getCandidate.controller.js";

const router = express.Router();

router.post(
    "/employer/post-jobs",
    authMiddleware,
    roleMiddleware("employer"),
    createJob);
router.get(
    "/jobs/employer/:employerId",
    getEmployerJobs);
router.get(
    "/employer/candidates:jobId",
    viewCandidates
)

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
