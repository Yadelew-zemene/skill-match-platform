import db from "../config/db.js";

class Resume {
  // Create a new resume
  static async create({
    userId,
    filePath,
    originalFilename,
    mimeType,
    fileSize,
  }) {
    const sql = `
      INSERT INTO resumes (
        user_id,
        file_path,
        original_filename,
        mime_type,
        file_size,
        status,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, 'processing', FALSE)
    `;

    const [result] = await db.execute(sql, [
      userId,
      filePath,
      originalFilename,
      mimeType,
      fileSize,
    ]);

    return result;
  }

  // Get all resumes belonging to a candidate
  static async findAllByUserId(userId) {
    const sql = `
      SELECT *
      FROM resumes
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

    const [rows] = await db.execute(sql, [userId]);

    return rows;
  }

  // Get one resume, but only if it belongs to the user
  static async findByIdAndUserId(resumeId, userId) {
    const sql = `
      SELECT *
      FROM resumes
      WHERE id = ? AND user_id = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(sql, [resumeId, userId]);

    return rows[0] || null;
  }

  // Update processing result
  static async updateProcessingResult(
    resumeId,
    { extractedText, status, processingError = null },
  ) {
    const sql = `
      UPDATE resumes
      SET
        extracted_text = ?,
        status = ?,
        processing_error = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
      extractedText,
      status,
      processingError,
      resumeId,
    ]);

    return result;
  }

  // Make this resume the candidate's active resume
  static async setActive(resumeId, userId) {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Deactivate all resumes belonging to this candidate
      await connection.execute(
        `
        UPDATE resumes
        SET is_active = FALSE
        WHERE user_id = ?
        `,
        [userId],
      );

      // Activate the selected resume
      const [result] = await connection.execute(
        `
        UPDATE resumes
        SET is_active = TRUE
        WHERE id = ? AND user_id = ?
        `,
        [resumeId, userId],
      );

      await connection.commit();

      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Delete a candidate's resume
  static async deleteByIdAndUserId(resumeId, userId) {
    const sql = `
      DELETE FROM resumes
      WHERE id = ? AND user_id = ?
    `;

    const [result] = await db.execute(sql, [resumeId, userId]);

    return result;
  }
}

export default Resume;
