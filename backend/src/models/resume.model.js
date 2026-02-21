import db from "../config/db.js";
class Resume {
    static async create({ userId, filePath }) {
        const sql = `
        INSERT INTO resumes(user_id,file_path)
         VALUES (?,?)`;
        const [result] = await db.execute(sql, [userId, filePath]);
        return result;
        
    }
static async findAllByUserId(userId) {
    const sql = `SELECT * FROM resumes WHERE user_id = ? ORDER BY created_at DESC`;
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }
}


export default Resume;