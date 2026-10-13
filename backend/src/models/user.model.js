import db from "../config/db.js";

class User {
  static async create({ name, email, password, role }) {
    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [name, email, password, role]);
    return result;
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  }
  static async updateName(userId, name) {
    const sql = `
    UPDATE users
    SET name = ?
    WHERE id = ?
  `;

    const [result] = await db.execute(sql, [name, userId]);

    return result;
  }
  static async findById(userId) {
    const sql = `
    SELECT id, name, email, role
    FROM users
    WHERE id = ?
    LIMIT 1
  `;

    const [rows] = await db.execute(sql, [userId]);

    return rows[0] || null;
  }
}

export default User;
