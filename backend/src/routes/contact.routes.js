import express from "express";
import { createContactMessage } from "../controllers/contact.controller.js";

const router = express.Router();

// Public endpoint: visitors do not need to log in.
router.post("/", createContactMessage);

export default router;
