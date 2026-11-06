import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  getMyNotifications,
  getUnreadCount,
  getNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

// All notification endpoints require authentication.
router.use(authMiddleware);

router.get("/", getMyNotifications);

router.get("/unread-count", getUnreadCount);

router.get("/count", getNotificationCount);

router.patch("/read-all", markAllNotificationsAsRead);

router.patch("/:notificationId/read", markNotificationAsRead);

export default router;
