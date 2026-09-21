import express from 'express';
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import resumeRoutes from "./routes/resume.routes.js"
import jobRoutes from "./routes/job.routes.js";
import candidateDashboardRoutes from "./routes/candidateDashboard.routes.js"



const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);
app.use("/", jobRoutes);
app.use("/candidate", candidateDashboardRoutes);

export default app;
