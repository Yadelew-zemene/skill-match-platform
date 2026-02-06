import { parseSkills } from "./resumeParser.service.js";

export const parseJobSkills = async (jobDescription) => {
  return parseSkills(jobDescription);
};