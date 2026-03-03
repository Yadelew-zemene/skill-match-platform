import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import {authMiddleware} from "../middlewares/auth.middleware.js"
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
  // req.user comes from authMiddleware
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});
export default router;
