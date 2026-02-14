import express from "express";
import { calculateMatch } from "../controllers/match.controller.js";

const router = express.Router();

router.post("/calculate", calculateMatch);

export default router;
