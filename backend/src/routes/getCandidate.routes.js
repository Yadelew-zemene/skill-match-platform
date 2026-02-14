import express from "express";
import { viewCandidates } from "../controllers/getCandidate.controller";

const router = express.Router();

router.get("/job/:jobId/candidates", viewCandidates);

export default router;