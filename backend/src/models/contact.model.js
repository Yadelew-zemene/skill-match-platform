import db from "../config/db.js";

class ContactMessage {
  // Save a visitor's contact message.
  static async create({ name, email, subject, message }) {
    const [result] = await db.execute(
      `
      INSERT INTO contact_messages (
        name,
        email,
        subject,
        message
      )
      VALUES (?, ?, ?, ?)
      `,
      [name, email, subject, message],
    );

    return result.insertId;
  }
}

export default ContactMessage;
