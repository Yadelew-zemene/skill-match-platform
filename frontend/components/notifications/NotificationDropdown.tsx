"use client";

import { CheckCheck, LoaderCircle, RefreshCw } from "lucide-react";

import { Notification } from "@/types/notifications";
import NotificationItem from "./NotificationItem";

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onRetry: () => void;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  loading,
  error,
  onMarkAsRead,
  onMarkAllAsRead,
  onRetry,
}: NotificationDropdownProps) {
  return (
    <div
      className="absolute right-0 top-full z-50 mt-3 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-black/20"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            Notifications
          </h2>

          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            {unreadCount === 0
              ? "You're all caught up"
              : `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[var(--primary)] transition hover:bg-[var(--primary-light)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="max-h-[min(28rem,65vh)] overflow-y-auto">
        {loading && notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12">
            <LoaderCircle
              size={24}
              className="animate-spin text-[var(--primary)]"
            />
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Loading notifications...
            </p>
          </div>
        ) : error && notifications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Couldn't load notifications
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">{error}</p>

            <button
              type="button"
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]"
            >
              <RefreshCw size={13} />
              Try again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-soft)] text-[var(--text-muted)]">
              <CheckCheck size={22} />
            </div>

            <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
              No notifications yet
            </p>

            <p className="mt-1 max-w-[230px] text-xs leading-5 text-[var(--text-muted)]">
              Updates about applications and their statuses will appear here.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <p className="border-b border-[var(--border)] px-4 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-soft)]/50 px-4 py-3">
        <p className="text-center text-[11px] text-[var(--text-muted)]">
          Showing your 10 most recent notifications
        </p>
      </div>
    </div>
  );
}
