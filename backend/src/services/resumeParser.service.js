import { spawn } from "child_process";
import path from "path";

export const parseResume = (resumePath) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(
      process.cwd(),
      "python",
      "skill_extractor.py",
    );

    const py = spawn("python", [pythonScriptPath, "file", resumePath]);

    let output = "";
    let errorOutput = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    py.on("error", (error) => {
      reject(new Error(`Failed to start Python process: ${error.message}`));
    });

    py.on("close", (code) => {
      if (code !== 0) {
        console.error("Python error:", errorOutput);

        return reject(
          new Error(errorOutput.trim() || "Resume processing failed"),
        );
      }

      try {
        const result = JSON.parse(output);

        if (!result.text || !Array.isArray(result.skills)) {
          return reject(new Error("Invalid response from resume parser"));
        }

        resolve(result);
      } catch (error) {
        console.error("Parser output:", output);

        reject(new Error("Failed to parse resume parser response"));
      }
    });
  });
};
