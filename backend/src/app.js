import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import jobRoutes from "./routes/job.routes.js";
import candidateDashboardRoutes from "./routes/candidateDashboard.routes.js";

import applicationRoutes from "./routes/application.routes.js";
import employerApplicationRoutes from "./routes/employer-application.routes.js";

import candidateProfileRoutes from "./routes/candidate-profile.routes.js";
import employerProfileRoutes from "./routes/employer-profile.routes.js";

import notificationRoutes from "./routes/notification.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

// Allow local development and deployed frontend domains.
const allowedOrigins = new Set([
  "http://localhost:3000",
  ...(process.env.FRONTEND_URLS || "").split(","),
  process.env.FRONTEND_URL || "",
].map((url) => url.trim().replace(/\/$/, "")).filter(Boolean));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/resumes", resumeRoutes);
app.use("/", jobRoutes);
app.use("/candidate", candidateDashboardRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api", employerApplicationRoutes);

app.use("/api/candidate/profile", candidateProfileRoutes);
app.use("/api/employer/profile", employerProfileRoutes);

app.use("/api/notifications", notificationRoutes);
app.use("/api/contact", contactRoutes);

export default app;
