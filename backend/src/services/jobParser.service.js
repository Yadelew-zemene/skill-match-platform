import { parseSkills } from "./resumeParser.service.js";

export const parseJobSkills = (description) => {
  return parseSkills(description);   // TEXT, not file
};
