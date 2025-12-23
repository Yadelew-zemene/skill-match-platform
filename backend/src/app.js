import express from 'express';
import cors from "cors"
import pool from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Skill match running" })

    
});
app.get("/test-db", async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT 1")
            res.json({ success: true, massage: "Database connected" });
        
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
    }
})
export default app;
