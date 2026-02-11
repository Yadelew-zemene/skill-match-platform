import { spawn } from "child_process";
import path from "path";

export const parseSkills = (text) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(
      process.cwd(),
      "python",
      "skill_extractor.py"
    );

    const python = spawn("python", [pythonScriptPath]);

    let output = "";
      let errorOutput = "";
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

  

   

   python.stderr.on("data", (err) => {
      errorOutput += err.toString();
    });
       python.on("close", () => {
      if (errorOutput) {
        return reject(errorOutput);
      }
      try {
        resolve(JSON.parse(output));
      } catch {
        reject("Failed to parse skills");
      }
    });

   
  python.stdin.write(text);
    python.stdin.end();
  });
}