
export type NotificationType =
    | "new_application"
    | "application_status";

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
    reference_id: number | null;
    is_read: boolean;
    created_at: string;
}

export interface NotificationPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface NotificationListResponse {
    notifications: Notification[];
    pagination: NotificationPagination;
    unreadCount: number;
}

export interface UnreadNotificationCountResponse {
    unreadCount: number;
}

export interface NotificationCountResponse {
    total: number;
}

export interface MarkNotificationReadResponse {
    message: string;
}

export interface MarkAllNotificationsReadResponse {
    message: string;
    updatedCount: number;
}
