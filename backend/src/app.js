import express from 'express';
import cors from "cors"

import pool from './config/db.js';
import authRoutes from './routes/auth.routes.js'
import resumeRoutes from "./routes/resume.routes.js"
import path from "path";



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Skill match running" })

    
});
app.get("/test-db", async (req, res) => {
    try {
            //this is for testing purpose
            const [rows] = await pool.query("SELECT 1")
            res.json({ success: true, massage: "Database connected" });
        
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
    } 
})
app.post("/test-upload", (req, res) => {
  res.json({ message: "test route works" });
});
app.use("/auth", authRoutes);
app.use("/resumes",resumeRoutes);
export default app;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6ImNhbmRpZGF0ZSIsImlhdCI6MTc2Njg0MDQzMiwiZXhwIjoxNzY2OTI2ODMyfQ.-cj5Hyv2yVKPU7RlRJpgO564fn0VvKIpk5huwV8bnnc