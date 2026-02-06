import { spawn } from "child_process";
import path from "path";

export const parseSkills = (resumeText) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      process.cwd(),
      "python",
      "skill_extractor.py"
    );

    const python = spawn("python", [scriptPath]);

    let data = "";

    python.stdin.write(resumeText);
    python.stdin.end();

    python.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
      reject(err.toString());
    });

    python.on("close", () => {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject("Failed to parse skills");
      }
    });
  });
};
