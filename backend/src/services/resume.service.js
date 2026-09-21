import Resume from "../models/resume.model.js";
import { parseResume } from "./resumeParser.service.js";
import { saveResumeSkills } from "./resumeSkill.service.js";
import { matchResumeToAllJobs } from "./match.service.js";

export const createResume = async ({
  userId,
  filePath,
  originalFilename,
  mimeType,
  fileSize,
}) => {
  // 1. Create resume record
  const result = await Resume.create({
    userId,
    filePath,
    originalFilename,
    mimeType,
    fileSize,
  });

  const resumeId = result.insertId;

  try {
    // 2. Extract text + skills
    const { text, skills } = await parseResume(filePath);

    // 3. Save extracted text
    await Resume.updateProcessingResult(resumeId, {
      extractedText: text,
      status: "completed",
    });

    // 4. Save skills
    await saveResumeSkills(resumeId, skills);

    // 5. Make this the active resume
    await Resume.setActive(resumeId, userId);

    await matchResumeToAllJobs(resumeId);

    return {
      resumeId,
      skills,
      status: "completed",
    };
  } catch (error) {
    // Keep the resume record so the failure can be shown/traced
    await Resume.updateProcessingResult(resumeId, {
      extractedText: null,
      status: "failed",
      processingError: error.message,
    });

    throw error;
  }
};

export const getCandidateResumes = async (userId) => {
  return Resume.findAllByUserId(userId);
};

export const getCandidateResume = async (resumeId, userId) => {
  return Resume.findByIdAndUserId(resumeId, userId);
};

export const activateCandidateResume = async (resumeId, userId) => {
  const resume = await Resume.findByIdAndUserId(resumeId, userId);

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.status !== "completed") {
    throw new Error("Only completed resumes can be activated");
  }

  await Resume.setActive(resumeId, userId);

  return Resume.findByIdAndUserId(resumeId, userId);
};

export const deleteCandidateResume = async (resumeId, userId) => {
  const resume = await Resume.findByIdAndUserId(resumeId, userId);

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.is_active) {
    throw new Error("Active resume cannot be deleted");
  }

  return Resume.deleteByIdAndUserId(resumeId, userId);
};
