import db from "../config/db.js";

class Job {
  static async create({ employerId, title, description,applicatin_link ,campanyName }) {
    const [result] = await db.query(
      "INSERT INTO jobs (employer_id, title, description,applicatin_link, campanyName) VALUES (?, ?, ? , ?,?)",
      [employerId, title, description,applicatin_link,campanyName]
    );
    return result.insertId;
  }
}

export default Job;
