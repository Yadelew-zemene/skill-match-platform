import api from "./api";

import {
    NotificationListResponse,
    UnreadNotificationCountResponse,
    NotificationCountResponse,
    MarkNotificationReadResponse,
    MarkAllNotificationsReadResponse,
} from "@/types/notifications";

/**
 * Fetch the authenticated user's notifications.
 */
export const getUserNotifications = async (
    page: number = 1,
    limit: number = 10
): Promise<NotificationListResponse> => {
    const response = await api.get<NotificationListResponse>(
        "/api/notifications",
        {
            params: { page, limit },
        }
    );

    return response.data;
};

/**
 * Fetch the authenticated user's unread notification count.
 */
export const getUnreadNotificationCount = async (): Promise<number> => {
    const response = await api.get<UnreadNotificationCountResponse>(
        "/api/notifications/unread-count"
    );

    return response.data.unreadCount;
};

/**
 * Fetch the authenticated user's total notification count.
 */
export const getTotalNotificationCount = async (): Promise<number> => {
    const response = await api.get<NotificationCountResponse>(
        "/api/notifications/count"
    );

    return response.data.total;
};

/**
 * Mark one notification as read.
 */
export const markNotificationAsRead = async (
    notificationId: number
): Promise<MarkNotificationReadResponse> => {
    const response = await api.patch<MarkNotificationReadResponse>(
        `/api/notifications/${notificationId}/read`
    );

    return response.data;
};

/**
 * Mark all notifications as read.
 */
export const markAllNotificationsAsRead =
    async (): Promise<MarkAllNotificationsReadResponse> => {
        const response = await api.patch<MarkAllNotificationsReadResponse>(
            "/api/notifications/read-all"
        );

        return response.data;
    };