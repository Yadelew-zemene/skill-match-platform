import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: `"SkillMatch" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Your SkillMatch Password",
    text: `You requested a password reset. Open this link to reset your password: ${resetLink}\n\nThis link expires in 15 minutes. If you did not request this email, you can ignore it.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; padding: 30px; color: #252a32;">
        <h2 style="color: #252a32;">Reset your SkillMatch password</h2>
        <p>We received a request to reset your SkillMatch account password.</p>
        <p>Click the button below to choose a new password.</p>
        <a href="${resetLink}"
           style="display: inline-block; padding: 12px 24px; background: #f5b942; color: #12141e; text-decoration: none; font-weight: bold; border-radius: 6px;">
          Reset Password
        </a>
        <p style="margin-top: 24px;">This link expires in 15 minutes.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #ddd; margin-top: 30px;" />
        <p style="font-size: 12px; color: #777;">SkillMatch Account Security</p>
      </div>
    `,
  });
};


