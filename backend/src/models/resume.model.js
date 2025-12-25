import db from "../config/db.js";
class Resume{
    static async create({ userId, filePath }) {
        const sql = `
        INSERT INTO resumes(user_id,file_path)
         VALUES (?,?)`;
        const [result] = await db.execute(sql, [userId, filePath]);
        return result;
        
    }

}
export default Resume;