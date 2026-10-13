import express from "express";

import {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  getProfilePhoto,
  deleteProfilePhoto,
} from "../controllers/candidate-profile.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import uploadProfileImage from "../middlewares/profile-image.middleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("candidate"));

router.get("/", getProfile);

router.patch("/", updateProfile);

router.post("/photo", uploadProfileImage.single("photo"), uploadProfilePhoto);

router.get("/photo", getProfilePhoto);

router.delete("/photo", deleteProfilePhoto);

export default router;
