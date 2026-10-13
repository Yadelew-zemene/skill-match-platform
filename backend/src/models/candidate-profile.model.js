import db from "../config/db.js";

class CandidateProfile {
  static async findByUserId(userId) {
    const sql = `
    SELECT
      id,
      user_id,
      professional_title,
      bio,
      phone,
      location,
      linkedin_url,
      github_url,
      profile_image_path,
      created_at,
      updated_at
    FROM candidate_profiles
    WHERE user_id = ?
    LIMIT 1
  `;

    const [rows] = await db.execute(sql, [userId]);
    return rows[0] || null;
  }

  static async create(userId) {
    const sql = `
      INSERT INTO candidate_profiles (user_id)
      VALUES (?)
    `;

    const [result] = await db.execute(sql, [userId]);

    return result;
  }

  static async updateByUserId(
    userId,
    { professional_title, bio, phone, location, linkedin_url, github_url },
  ) {
    const sql = `
      UPDATE candidate_profiles
      SET
        professional_title = ?,
        bio = ?,
        phone = ?,
        location = ?,
        linkedin_url = ?,
        github_url = ?
      WHERE user_id = ?
    `;

    const [result] = await db.execute(sql, [
      professional_title,
      bio,
      phone,
      location,
      linkedin_url,
      github_url,
      userId,
    ]);

    return result;
  }
  static async updateProfileImage(userId, profileImagePath) {
    const sql = `
    UPDATE candidate_profiles
    SET profile_image_path = ?
    WHERE user_id = ?
  `;

    const [result] = await db.execute(sql, [profileImagePath, userId]);

    return result;
  }

  static async clearProfileImage(userId) {
    const sql = `
    UPDATE candidate_profiles
    SET profile_image_path = NULL
    WHERE user_id = ?
  `;

    const [result] = await db.execute(sql, [userId]);

    return result;
  }
}

export default CandidateProfile;
