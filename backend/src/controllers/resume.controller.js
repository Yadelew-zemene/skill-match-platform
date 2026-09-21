import MatchScore from "../models/score.model.js";

import {
  createResume,
  getCandidateResumes,
  getCandidateResume,
  activateCandidateResume,
  deleteCandidateResume,
} from "../services/resume.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const result = await createResume({
      userId: req.user.id,
      filePath: req.file.path,
      originalFilename: req.file.originalname,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
    });

    return res.status(201).json({
      message: "Resume uploaded and processed successfully",
      ...result,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      message: error.message || "Resume processing failed",
    });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await getCandidateResumes(req.user.id);

    return res.json(resumes);
  } catch (error) {
    console.error("Get resumes error:", error);

    return res.status(500).json({
      message: "Failed to fetch resumes",
    });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await getCandidateResume(req.params.id, req.user.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.json(resume);
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      message: "Failed to fetch resume",
    });
  }
};

export const activateResume = async (req, res) => {
  try {
    const resume = await activateCandidateResume(req.params.id, req.user.id);

    return res.json({
      message: "Resume activated successfully",
      resume,
    });
  } catch (error) {
    console.error("Activate resume error:", error);

    if (error.message === "Resume not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "Only completed resumes can be activated") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to activate resume",
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    await deleteCandidateResume(req.params.id, req.user.id);

    return res.json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    if (
      error.message === "Resume not found" ||
      error.message === "Active resume cannot be deleted"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to delete resume",
    });
  }
};

export const getResumeMatches = async (req, res) => {
  try {
    const resume = await getCandidateResume(req.params.id, req.user.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const matches = await MatchScore.findByResumeId(req.params.id);

    return res.json(matches);
  } catch (error) {
    console.error("Get resume matches error:", error);

    return res.status(500).json({
      message: "Failed to fetch matches",
    });
  }
};
