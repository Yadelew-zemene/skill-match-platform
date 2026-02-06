import Resume from "../models/resume.model.js";
import { parseSkills } from "../services/resumeParser.service.js";
import { saveResumeSkills } from "../services/resumeSkill.service.js";
export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });

        }
        const filePath = req.file.path;
        const userId = req.user.id;
        await Resume.create({ userId, filePath });
        res.status(201).json({
            message: "file Uploaded succcesfully",
            filePath,
        });

    }
    catch (error) {
        res.status(500).json({ message: "Resume uploading faild" });
    }

};
export const processResume = async (req, res) => {
  try {
    const { resumeId, extractedText } = req.body;

    const skills = await parseSkills(extractedText);

    await saveResumeSkills(resumeId, skills);
    console.log("Resume text extracted");
console.log("Skills from Python:", skills);

    res.json({
      message: "Resume processed successfully",
      skills
    });
  } catch (err) {
    res.status(500).json({ message: "Skill extraction failed" });
  }
};
