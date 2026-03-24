import { spawn } from "child_process";
import path from "path";

export const parseSkills = (resumePath) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(
      process.cwd(),
      "python",
      "skill_extractor.py"
    );

    const py = spawn("python", [
      pythonScriptPath,
      "file",
      resumePath]);

    let output = "";
     py.stdout.on("data", (data) => {
      output += data.toString();
    });

   py.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });
         py.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error("Python process failed"));
      }
      try {
        const skills = JSON.parse(output);
        resolve(skills);
      } catch (e) {
        reject(new Error("Failed to parse skills JSON"));
      }
    });
  });
};