"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/services/notification.service";

import { Notification } from "@/types/notifications";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const { user, loading: authLoading } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch the latest notifications.
   */
  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setListLoading(true);
    setError(null);

    try {
      const result = await getUserNotifications(1, 10);

      setNotifications(result.notifications);
      setUnreadCount(result.unreadCount);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError("Please check your connection and try again.");
    } finally {
      setListLoading(false);
    }
  }, [user]);

  /**
   * Refresh only the unread badge count.
   */
  const refreshUnreadCount = useCallback(async () => {
    if (!user) return;

    try {
      const count = await getUnreadNotificationCount();
      setUnreadCount(count);
    } catch (err) {
      console.error("Failed to refresh unread notification count:", err);
    }
  }, [user]);

  /**
   * Reset notification state when the authenticated user changes.
   * Wait until AuthContext has finished initializing.
   */
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setIsOpen(false);
      setError(null);
      return;
    }

    refreshUnreadCount();
  }, [user, authLoading, refreshUnreadCount]);

  /**
   * Poll for new notifications every 30 seconds.
   */
  useEffect(() => {
    if (authLoading || !user) return;

    const interval = window.setInterval(() => {
      refreshUnreadCount();

      if (isOpen) {
        fetchNotifications();
      }
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [user, authLoading, isOpen, refreshUnreadCount, fetchNotifications]);

  /**
   * Close the dropdown when clicking outside.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  /**
   * Toggle dropdown and load notifications when opened.
   */
  const handleToggle = () => {
    if (authLoading || !user) return;

    const shouldOpen = !isOpen;
    setIsOpen(shouldOpen);

    if (shouldOpen) {
      fetchNotifications();
    }
  };

  /**
   * Mark one notification as read.
   */
  const handleMarkAsRead = async (notificationId: number) => {
    const notification = notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification || notification.is_read) return;

    try {
      await markNotificationAsRead(notificationId);

      setNotifications((current) =>
        current.map((item) =>
          item.id === notificationId ? { ...item, is_read: true } : item,
        ),
      );

      setUnreadCount((current) => Math.max(0, current - 1));
      setError(null);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Could not update the notification. Please try again.");
    }
  };

  /**
   * Mark all notifications as read.
   */
  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    try {
      await markAllNotificationsAsRead();

      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          is_read: true,
        })),
      );

      setUnreadCount(0);
      setError(null);
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setError("Could not update notifications. Please try again.");
    }
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Notification bell */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-sm transition-all duration-200 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-soft)] hover:text-[var(--primary)]"
      >
        <Bell size={18} strokeWidth={1.9} />

        {unreadCount > 0 && (
          <>
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[var(--background)] bg-[var(--primary)] px-1 text-[9px] font-bold leading-none text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          loading={listLoading}
          error={error}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onRetry={fetchNotifications}
        />
      )}
    </div>
  );
}
