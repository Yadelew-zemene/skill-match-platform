import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import crypto from "node:crypto";
import PasswordReset from "../models/password-reset.model.js";
import { sendPasswordResetEmail } from "../services/email.service.js";


export const toPublicUser = ({ id, name, email, role }) => ({
  id,
  name,
  email,
  role,
});

export const createAuthController = ({
  userModel = User,
  bcryptLib = bcrypt,
  tokenGenerator = generateToken,
} = {}) => {
  const register = async (req, res) => {
    try {
                const { name, email, password, role } = req.body;
                const existingUser = await userModel.findByEmail(email);
                if (existingUser) {
                    return res.status(400).json({ message: "Email already exists" });
                }

                const hashedPassword = await bcryptLib.hash(password, 10);
                await userModel.create({
                    name,
                    email,
                    password: hashedPassword,
                    role
                });
                res.status(201).json({ message: "User Registered successfully" });



    }
    catch (error) {
           res.status(500).json({ message: "Registration Faild" });

    }
  };

  const login = async (req, res) => {
    try {
       
            const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "Email and password required" });
            }

            const user = await userModel.findByEmail(email);
                
            if (!user) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
            const isMatch = await bcryptLib.compare(password, user.password);
            // console.log("PASSWORD MATCH:", isMatch)
            if (!isMatch) {
                    return    res.status(401).json({ message: "Invalid credentials" });
                }
            const token = tokenGenerator({ id: user.id,role: user.role,});
                res.json({ token, user: toPublicUser(user) });
    } catch (error) {
        // console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "login faild" });
    }
  };
  const changePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Current password and new password are required",
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          message: "New password must be at least 8 characters long",
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "New password must be different from current password",
        });
      }

      const user = await userModel.findByIdWithPassword(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcryptLib.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Current password is incorrect",
        });
      }

      const hashedPassword = await bcryptLib.hash(newPassword, 10);

      await userModel.updatePassword(userId, hashedPassword);

      return res.status(200).json({
        message: "Password changed successfully",
      });
    } catch (error) {
  console.error("Change password error:", error);

  return res.status(500).json({
    message: "Failed to change password",
  });

    }
  };
  const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const user = await userModel.findByEmail(email.trim().toLowerCase());

      // Always return the same response whether the account exists or not.
      const responseMessage =
        "If an account with that email exists, a password reset link has been sent.";

      if (!user) {
        return res.status(200).json({
          message: responseMessage,
        });
      }

      // Generate a cryptographically secure random token.
      const resetToken = crypto.randomBytes(32).toString("hex");

      // Store only the SHA-256 hash in the database.
      const tokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // Expire the token after 15 minutes.
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      // Invalidate previous unused tokens for this account.
      await PasswordReset.invalidateUnusedByUserId(user.id);

      await PasswordReset.create({
        userId: user.id,
        tokenHash,
        expiresAt,
      });

      // Build the frontend reset URL.
      const resetUrl = new URL("/reset-password", process.env.FRONTEND_URL);

      resetUrl.searchParams.set("token", resetToken);

      await sendPasswordResetEmail(user.email, resetUrl.toString());

      return res.status(200).json({
        message: responseMessage,
      });
    } catch (error) {
      console.error("Forgot password error:", error);

      return res.status(500).json({
        message: "Unable to process password reset request",
      });
    }
  };
  const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          message: "Reset token and new password are required",
        });
      }

      if (typeof newPassword !== "string" || newPassword.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long",
        });
      }

      // Hash the incoming token to compare with the database.
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

      // Find a valid, unused, non-expired token.
const resetRecord = await PasswordReset.findValidByHash(tokenHash);

      if (!resetRecord) {
        return res.status(400).json({
          message: "Invalid or expired password reset link",
        });
      }

      // Hash the new password.
      const hashedPassword = await bcryptLib.hash(newPassword, 10);

      // Update the user's password.
      await userModel.updatePassword(resetRecord.user_id, hashedPassword);

     await PasswordReset.markAsUsed(resetRecord.id);

     await PasswordReset.invalidateUnusedByUserId(resetRecord.user_id);

      return res.status(200).json({
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Reset password error:", error);

      return res.status(500).json({
        message: "Failed to reset password",
      });
    }
  };

  return { register, login ,changePassword , forgotPassword,resetPassword};
  
};

const authController = createAuthController();

export const { register, login,changePassword,forgotPassword,resetPassword } = authController;

