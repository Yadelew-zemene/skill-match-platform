import db from "../config/db.js";

class Notification {
  // Create a notification.
  static async create({ userId, title, message, type, referenceId = null }) {
    const [result] = await db.execute(
      `
      INSERT INTO notifications (
        user_id,
        title,
        message,
        type,
        reference_id
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [userId, title, message, type, referenceId],
    );

    return result.insertId;
  }

  // Retrieve paginated notifications for a user.
  static async findByUserId(userId, limit, offset) {
    const safeLimit = Math.max(
      1,
      Math.min(50, Math.trunc(Number(limit) || 10)),
    );

    const safeOffset = Math.max(0, Math.trunc(Number(offset) || 0));

    const [rows] = await db.execute(
      `
      SELECT
        id,
        user_id,
        title,
        message,
        type,
        reference_id,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC, id DESC
      LIMIT ${safeLimit} OFFSET ${safeOffset}
      `,
      [userId],
    );

    return rows.map((notification) => ({
      ...notification,
      is_read: Boolean(notification.is_read),
    }));
  }

  // Count all notifications for a user.
  static async countByUserId(userId) {
    const [rows] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM notifications
      WHERE user_id = ?
      `,
      [userId],
    );

    return Number(rows[0].total);
  }

  // Count unread notifications for a user.
  static async countUnreadByUserId(userId) {
    const [rows] = await db.execute(
      `
      SELECT COUNT(*) AS unreadCount
      FROM notifications
      WHERE user_id = ?
        AND is_read = FALSE
      `,
      [userId],
    );

    return Number(rows[0].unreadCount);
  }

  // Mark one notification as read.
  static async markAsRead(notificationId, userId) {
    const [result] = await db.execute(
      `
      UPDATE notifications
      SET is_read = TRUE
      WHERE id = ?
        AND user_id = ?
        AND is_read = FALSE
      `,
      [notificationId, userId],
    );

    return result;
  }

  // Check whether a notification belongs to a user.
  static async findByIdForUser(notificationId, userId) {
    const [rows] = await db.execute(
      `
      SELECT id, is_read
      FROM notifications
      WHERE id = ?
        AND user_id = ?
      LIMIT 1
      `,
      [notificationId, userId],
    );

    return rows[0] || null;
  }

  // Mark all notifications as read.
  static async markAllAsRead(userId) {
    const [result] = await db.execute(
      `
      UPDATE notifications
      SET is_read = TRUE
      WHERE user_id = ?
        AND is_read = FALSE
      `,
      [userId],
    );

    return result;
  }
}

export default Notification;
