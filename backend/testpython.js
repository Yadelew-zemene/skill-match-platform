import { parseSkills } from "./src/services/resumeParser.service.js";

const text = "I work with JavaScript, React, Node.js and MySQL";

parseSkills(text)
  .then(skills => {
    console.log("Extracted skills:", skills);
    process.exit(0);
  })
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
