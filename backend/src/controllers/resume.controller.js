import Resume from "../models/resume.model.js";
import MatchScore from "../models/score.model.js"
import { parseSkills } from "../services/resumeParser.service.js";
import { saveResumeSkills } from "../services/resumeSkill.service.js";


export const uploadResume = async (req, res) => {
  try {
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = req.user.id;
        const filePath = req.file.path;
       
    

        
        const result = await Resume.create({
          userId,
          filePath
        });

        const resumeId = result.insertId;
        const skills = await parseSkills(req.file.path);
      //  console.log("Extracted skills:", skills);

        await saveResumeSkills(resumeId, skills);

        res.json({
          message: "Resume processed successfully",
          skills
        });

  } catch (err) {
        console.error("Resume upload error:", err);
        res.status(500).json({ message: "Resume processing failed" });
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