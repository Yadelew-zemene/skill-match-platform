import express from "express";
import { createJob } from "../controllers/job.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);

export default router;
