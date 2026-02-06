import db from "../config/db.js";

class Job {
  static async create({ employerId, title, description }) {
    const [result] = await db.query(
      "INSERT INTO jobs (employer_id, title, description) VALUES (?, ?, ?)",
      [employerId, title, description]
    );
    return result.insertId;
  }
}

export default Job;
