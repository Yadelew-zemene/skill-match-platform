import db from "../config/db.js";

class PasswordReset {
  // Invalidate previous unused tokens for this user
  static async invalidateUnusedByUserId(userId) {
    const sql = `
      DELETE FROM password_reset_tokens
      WHERE user_id = ?
        AND used_at IS NULL
    `;

    const [result] = await db.execute(sql, [userId]);
    return result;
  }

  // Save a new hashed reset token
  static async create({ userId, tokenHash, expiresAt }) {
    const sql = `
      INSERT INTO password_reset_tokens
        (user_id, token_hash, expires_at)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [userId, tokenHash, expiresAt]);

    return result;
  }

  // Find a valid, unused token
  static async findValidByHash(tokenHash) {
    const sql = `
      SELECT id, user_id, token_hash, expires_at
      FROM password_reset_tokens
      WHERE token_hash = ?
        AND used_at IS NULL
        AND expires_at > NOW()
      LIMIT 1
    `;

    const [rows] = await db.execute(sql, [tokenHash]);
    return rows[0] || null;
  }

  // Mark a token as used
  static async markAsUsed(tokenId) {
    const sql = `
      UPDATE password_reset_tokens
      SET used_at = NOW()
      WHERE id = ?
        AND used_at IS NULL
    `;

    const [result] = await db.execute(sql, [tokenId]);
    return result;
  }
}

export default PasswordReset;
