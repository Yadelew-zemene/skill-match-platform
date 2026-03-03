import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import { getCandidateDashboard } from "../controllers/candidateDashboard.controller.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router=express.Router()
router.get(
  "/candidate/dashboard",
  authMiddleware,
  roleMiddleware("candidate"),
  getCandidateDashboard
);
export default router