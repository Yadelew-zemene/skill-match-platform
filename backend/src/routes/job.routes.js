import express from "express";
import { createJob } from "../controllers/job.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getEmployerJobs } from "../controllers/posted-jobs.controller.js";
import { viewCandidates } from "../controllers/getCandidate.controller.js";

const router = express.Router();

router.post(
    "/employer/post-jobs",
    authMiddleware,
    createJob);
router.get(
    "/jobs/employer/:employerId",
    getEmployerJobs);
router.get(
    "/employer/candidates:jobId",
    viewCandidates
)

export default router;
