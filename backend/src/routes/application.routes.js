import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { submitApplication } from "../controllers/application.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("candidate"),
  submitApplication,
);

export default router;
