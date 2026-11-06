import {
  getUserNotifications,
  getUnreadNotificationCount,
  getTotalNotificationCount,
  markNotificationAsRead as markAsRead,
  markAllNotificationsAsRead as markAllAsRead,
} from "../services/notification.service.js";

// GET /api/notifications
export const getMyNotifications = async (req, res) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 50
    ) {
      return res.status(400).json({
        message: "Invalid pagination parameters",
      });
    }

    const result = await getUserNotifications(req.user.id, {
      page,
      limit,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};

// GET /api/notifications/unread-count
export const getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await getUnreadNotificationCount(req.user.id);

    return res.status(200).json({
      unreadCount,
    });
  } catch (error) {
    console.error("GET UNREAD NOTIFICATIONS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch unread notification count",
    });
  }
};

// GET /api/notifications/count
export const getNotificationCount = async (req, res) => {
  try {
    const total = await getTotalNotificationCount(req.user.id);

    return res.status(200).json({
      total,
    });
  } catch (error) {
    console.error("GET NOTIFICATION COUNT ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch notification count",
    });
  }
};

// PATCH /api/notifications/:notificationId/read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = Number(req.params.notificationId);

    if (!Number.isInteger(notificationId) || notificationId <= 0) {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    await markAsRead(notificationId, req.user.id);

    return res.status(200).json({
      message: "Notification marked as read",
    });
  } catch (error) {
    console.error("MARK NOTIFICATION AS READ ERROR:", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : "Failed to mark notification as read",
    });
  }
};

// PATCH /api/notifications/read-all
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const updatedCount = await markAllAsRead(req.user.id);

    return res.status(200).json({
      message: "All notifications marked as read",
      updatedCount,
    });
  } catch (error) {
    console.error("MARK ALL NOTIFICATIONS AS READ ERROR:", error);

    return res.status(500).json({
      message: "Failed to mark all notifications as read",
    });
  }
};
