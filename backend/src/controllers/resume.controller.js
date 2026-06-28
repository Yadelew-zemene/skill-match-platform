


import Resume from "../models/resume.model.js";
import MatchScore from "../models/score.model.js";
import { parseSkills } from "../services/resumeParser.service.js";
import { saveResumeSkills } from "../services/resumeSkill.service.js";
import { matchResumeToAllJobs } from "../services/match.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user.id;
    const filePath = req.file.path;

    // 1. Save resume
    const insertResult = await Resume.create({
      userId,
      filePath,
    });

    const resumeId = insertResult.insertId;

    // 2. Extract skills from Python
    const skills = await parseSkills(filePath);

    // 3. Save skills
    await saveResumeSkills(resumeId, skills);

    // 4. Run matching engine
    await matchResumeToAllJobs(resumeId);

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId,
      skills,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Resume processing failed",
    });
  }
};
export const getResumeMatches = async (req, res) => {
  try {
    const { id } = req.params;
    const matches = await MatchScore.findByResumeId(id); // return all jobs & scores
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};