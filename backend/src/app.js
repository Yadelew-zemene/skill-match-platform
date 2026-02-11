import express from 'express';
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import resumeRoutes from "./routes/resume.routes.js"
import jobRoutes from "./routes/job.routes.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);


app.use("/jobs", jobRoutes);

export default app;
