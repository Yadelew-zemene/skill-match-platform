import express from "express";
import { createJob } from "../controllers/job.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/employer/post-jobs",
    authMiddleware,
    createJob);

export default router;
