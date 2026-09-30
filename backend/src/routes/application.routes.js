import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import {
  submitApplication,
  getMyApplications,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("candidate"),
  submitApplication,
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("candidate"),
  getMyApplications
);

export default router;
