import db from "../config/db.js";

class EmployerProfile {
  static async findByEmployerId(employerId) {
    const sql = `
      SELECT
        id,
        employer_id,
        company_name,
        company_description,
        industry,
        company_size,
        location,
        website_url,
        linkedin_url,
        phone,
        profile_image_path,
        created_at,
        updated_at
      FROM employer_profiles
      WHERE employer_id = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(sql, [employerId]);

    return rows[0] || null;
  }

  static async create({
    employer_id,
    company_name,
    company_description,
    industry,
    company_size,
    location,
    website_url,
    linkedin_url,
    phone,
  }) {
    const sql = `
      INSERT INTO employer_profiles (
        employer_id,
        company_name,
        company_description,
        industry,
        company_size,
        location,
        website_url,
        linkedin_url,
        phone
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      employer_id,
      company_name,
      company_description,
      industry,
      company_size,
      location,
      website_url,
      linkedin_url,
      phone,
    ]);

    return result;
  }

  static async update(
    employerId,
    {
      company_name,
      company_description,
      industry,
      company_size,
      location,
      website_url,
      linkedin_url,
      phone,
    },
  ) {
    const sql = `
      UPDATE employer_profiles
      SET
        company_name = ?,
        company_description = ?,
        industry = ?,
        company_size = ?,
        location = ?,
        website_url = ?,
        linkedin_url = ?,
        phone = ?
      WHERE employer_id = ?
    `;

    const [result] = await db.execute(sql, [
      company_name,
      company_description,
      industry,
      company_size,
      location,
      website_url,
      linkedin_url,
      phone,
      employerId,
    ]);

    return result;
  }

  static async updateProfileImage(employerId, imagePath) {
    const sql = `
      UPDATE employer_profiles
      SET profile_image_path = ?
      WHERE employer_id = ?
    `;

    const [result] = await db.execute(sql, [imagePath, employerId]);

    return result;
  }

  static async removeProfileImage(employerId) {
    const sql = `
      UPDATE employer_profiles
      SET profile_image_path = NULL
      WHERE employer_id = ?
    `;

    const [result] = await db.execute(sql, [employerId]);

    return result;
  }
}

export default EmployerProfile;
