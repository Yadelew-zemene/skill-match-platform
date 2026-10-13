import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  getApplicationsForJob,
  changeApplicationStatus,
} from "../controllers/employer-application.controller.js";

const router = express.Router();

router.get(
  "/employer/jobs/:jobId/applications",
  authMiddleware,
  roleMiddleware("employer"),
  getApplicationsForJob,
);

router.patch(
  "/employer/applications/:applicationId/status",
  authMiddleware,
  roleMiddleware("employer"),
  changeApplicationStatus,
);

export default router;
