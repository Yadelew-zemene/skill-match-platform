import { parseSkills } from "./src/services/resumeParser.service.js";

export const parseJobSkills = async (jobDescription) => {
  return parseSkills(jobDescription);
};