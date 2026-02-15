import { spawn } from "child_process";
import path from "path";

export const parseJobSkills = (description) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve( process.cwd(),"python","skill_extractor.py");

    const py = spawn("python", [pythonScriptPath,"text",description ]);

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
        resolve(JSON.parse(output));
      } catch {
        reject(new Error("Invalid JSON from Python"));
      }
    });
  });
};
