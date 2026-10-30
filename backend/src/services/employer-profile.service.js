import db from "../config/db.js";

export const getEmployerProfile = async (employerId) => {
  const sql = `
    SELECT
      u.id AS user_id,
      u.name,
      u.email,
      ep.id AS profile_id,
      ep.employer_id,
      ep.company_name,
      ep.company_description,
      ep.industry,
      ep.company_size,
      ep.location,
      ep.website_url,
      ep.linkedin_url,
      ep.phone,
      ep.profile_image_path,
      ep.created_at,
      ep.updated_at
    FROM users u
    LEFT JOIN employer_profiles ep
      ON ep.employer_id = u.id
    WHERE u.id = ?
      AND u.role = 'employer'
    LIMIT 1
  `;

  const [rows] = await db.execute(sql, [employerId]);

  return rows[0] || null;
};

export const updateEmployerProfile = async (
  employerId,
  {
    name,
    company_name,
    company_description,
    industry,
    company_size,
    location,
    website_url,
    linkedin_url,
    phone,
  },
) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Verify employer exists
    const [users] = await connection.execute(
      `
        SELECT id
        FROM users
        WHERE id = ?
          AND role = 'employer'
        LIMIT 1
      `,
      [employerId],
    );

    if (users.length === 0) {
      await connection.rollback();
      return null;
    }

    // Name is optional.
    // Only update it if the frontend actually sends it.
    if (typeof name === "string" && name.trim()) {
      await connection.execute(
        `
          UPDATE users
          SET name = ?
          WHERE id = ?
        `,
        [name.trim(), employerId],
      );
    }

    // Create or update company profile.
    await connection.execute(
      `
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

        ON DUPLICATE KEY UPDATE
          company_name = VALUES(company_name),
          company_description = VALUES(company_description),
          industry = VALUES(industry),
          company_size = VALUES(company_size),
          location = VALUES(location),
          website_url = VALUES(website_url),
          linkedin_url = VALUES(linkedin_url),
          phone = VALUES(phone)
      `,
      [
        employerId,
        typeof company_name === "string" ? company_name.trim() : null,
        typeof company_description === "string"
          ? company_description.trim() || null
          : null,
        typeof industry === "string" ? industry.trim() || null : null,
        typeof company_size === "string" ? company_size.trim() || null : null,
        typeof location === "string" ? location.trim() || null : null,
        typeof website_url === "string" ? website_url.trim() || null : null,
        typeof linkedin_url === "string" ? linkedin_url.trim() || null : null,
        typeof phone === "string" ? phone.trim() || null : null,
      ],
    );

    await connection.commit();

    return await getEmployerProfile(employerId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updateEmployerProfileImage = async (
  employerId,
  profileImagePath,
) => {
  const sql = `
    UPDATE employer_profiles
    SET profile_image_path = ?
    WHERE employer_id = ?
  `;

  const [result] = await db.execute(sql, [profileImagePath, employerId]);

  return result;
};

export const removeEmployerProfileImage = async (employerId) => {
  const sql = `
    UPDATE employer_profiles
    SET profile_image_path = NULL
    WHERE employer_id = ?
  `;

  const [result] = await db.execute(sql, [employerId]);

  return result;
};
