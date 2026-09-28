import express from "express";

import {
  uploadResume,
  getResumes,
  getResume,
  activateResume,
  deleteResume,
  getResumeMatches,
} from "../controllers/resume.controller.js";

import upload from "../middlewares/upload.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("candidate"));

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/", getResumes);

router.get("/:id", getResume);

router.get("/:id/matches", getResumeMatches);

router.patch("/:id/activate", activateResume);

router.delete("/:id", deleteResume);

export default router;
