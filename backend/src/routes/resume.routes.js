import express from "express";
import { uploadResume } from "../controllers/resume.controller.js";
import upload from "../middlewares/upload.middleware.js";
import authMiddleware from '../middlewares/auth.middleware.js'
import roleMiddleware from "../middlewares/role.middleware.js";
const router=express.Router()

// 
router.post("/upload",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.single("resume"),
         uploadResume
);
export default router;
