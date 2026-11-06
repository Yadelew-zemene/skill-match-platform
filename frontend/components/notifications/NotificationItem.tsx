
"use client";

import { useRouter } from "next/navigation";
import { BriefcaseBusiness, ClipboardCheck } from "lucide-react";

import { Notification } from "@/types/notifications";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const router = useRouter();
  const isUnread = !notification.is_read;

  const Icon =
    notification.type === "new_application"
      ? BriefcaseBusiness
      : ClipboardCheck;

  const formatDate = (dateValue: string) => {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const handleNotificationClick = () => {
    if (isUnread) {
      onMarkAsRead(notification.id);
    }

    if (!notification.reference_id) {
      return;
    }

    if (notification.type === "new_application") {
      router.push(
        `/employer/jobs/${notification.reference_id}/applications`,
      );
      return;
    }

    if (notification.type === "application_status") {
      router.push("/candidate/applications");
    }
  };


  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNotificationClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNotificationClick();
        }
      }}
      className={`group flex cursor-pointer gap-3 border-b border-[var(--border)] px-4 py-4 transition-colors last:border-b-0 ${
        isUnread
          ? "bg-[var(--primary-light)]/20"
          : "bg-transparent hover:bg-[var(--surface-soft)]"
      }`}
    >
      {/* Notification icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          notification.type === "new_application"
            ? "bg-blue-500/10 text-blue-400"
            : "bg-emerald-500/10 text-emerald-400"
        }`}
      >
        <Icon size={18} strokeWidth={1.9} />
      </div>

      {/* Notification content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm ${
              isUnread
                ? "font-semibold text-[var(--foreground)]"
                : "font-medium text-[var(--text-secondary)]"
            }`}
          >
            {notification.title}
          </p>

          {isUnread && (
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]"
              aria-label="Unread"
            />
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
          {notification.message}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[11px] text-[var(--text-muted)]">
            {formatDate(notification.created_at)}
          </p>

          {isUnread && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onMarkAsRead(notification.id);
              }}
              className="text-[11px] font-semibold text-[var(--primary)] transition hover:underline"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
