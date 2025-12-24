import db from "../config/db.js";

class User {
  static async create({ name, email, password, role }) {
    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      name,
      email,
      password,
      role,
    ]);
    return result;
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  }
}

export default User;
