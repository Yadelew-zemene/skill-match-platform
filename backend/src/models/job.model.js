import db from "../config/db.js";

class Job {
  static async create({ employerId, title, description,application_link ,company }) {
    const [result] = await db.query(
      "INSERT INTO jobs (employer_id, title, description,application_link, company) VALUES (?, ?, ? , ?,?)",
      [employerId, title, description,application_link,company]
    );
    return result.insertId;
  }
}

export default Job;
