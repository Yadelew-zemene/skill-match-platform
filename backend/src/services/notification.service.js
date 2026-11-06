import Notification from "../models/notification.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const ALLOWED_TYPES = new Set(["new_application", "application_status"]);

export const createNotificationService = ({
  notificationModel = Notification,
} = {}) => ({
  // Create a notification.
  create: async ({ userId, title, message, type, referenceId = null }) => {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw createError("Invalid notification recipient", 400);
    }

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      throw createError("Notification title and message are required", 400);
    }

    if (!ALLOWED_TYPES.has(type)) {
      throw createError("Invalid notification type", 400);
    }

    return notificationModel.create({
      userId,
      title: title.trim(),
      message: message.trim(),
      type,
      referenceId,
    });
  },

  // Retrieve notifications with pagination and counts.
  getByUserId: async (userId, { page = 1, limit = 10 } = {}) => {
    const [notifications, total, unreadCount] = await Promise.all([
      notificationModel.findByUserId(userId, { page, limit }),
      notificationModel.countByUserId(userId),
      notificationModel.countUnreadByUserId(userId),
    ]);

    return {
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      unreadCount,
    };
  },

  // Retrieve unread count.
  getUnreadCount: async (userId) => {
    return notificationModel.countUnreadByUserId(userId);
  },

  // Retrieve total count.
  getTotalCount: async (userId) => {
    return notificationModel.countByUserId(userId);
  },

  // Mark one notification as read.
  markAsRead: async (notificationId, userId) => {
    const result = await notificationModel.markAsRead(notificationId, userId);

    if (result.affectedRows === 0) {
      const notification = await notificationModel.findByIdForUser(
        notificationId,
        userId,
      );

      if (!notification) {
        throw createError("Notification not found", 404);
      }
    }

    return true;
  },

  // Mark all notifications as read.
  markAllAsRead: async (userId) => {
    const result = await notificationModel.markAllAsRead(userId);

    return result.affectedRows;
  },
});

const notificationService = createNotificationService();

// Export reusable service functions.
export const createNotification = (data) => notificationService.create(data);

export const getUserNotifications = (userId, options) =>
  notificationService.getByUserId(userId, options);

export const getUnreadNotificationCount = (userId) =>
  notificationService.getUnreadCount(userId);

export const getTotalNotificationCount = (userId) =>
  notificationService.getTotalCount(userId);

export const markNotificationAsRead = (notificationId, userId) =>
  notificationService.markAsRead(notificationId, userId);

export const markAllNotificationsAsRead = (userId) =>
  notificationService.markAllAsRead(userId);
