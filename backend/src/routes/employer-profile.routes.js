import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/employer-profile.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("employer"));

router.get("/", getProfile);

router.patch("/", updateProfile);

export default router;
