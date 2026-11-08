import "dotenv/config";
import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`SkillMatch backend running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Backend startup failed:", error);
});
