"use client";

import { useEffect, useState } from "react";
import { getRealtimeClient } from "@/lib/realtimeClient";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string | Date;
  isRead?: boolean;
}

export default function LiveNotificationsPanel({
  userId,
  initialNotifications,
  title = "Notifications",
  className = "",
}: {
  userId: string;
  initialNotifications: NotificationItem[];
  title?: string;
  className?: string;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  useEffect(() => {
    const client = getRealtimeClient();
    if (!client) {
      return undefined;
    }

    const channel = client.subscribe(`user-${userId}`);
    const handler = (notification: NotificationItem) => {
      setNotifications((current) => {
        if (current.some((item) => item.id === notification.id)) {
          return current;
        }

        return [notification, ...current].slice(0, 8);
      });
    };

    channel.bind("notification.created", handler);

    return () => {
      channel.unbind("notification.created", handler);
      client.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  return (
    <div
      className={`surface-card border-round border-1 surface-border p-4 flex flex-column h-full ${className}`.trim()}
    >
      <h3 className="mt-0 mb-2">{title}</h3>
      <div className="flex-grow-1 flex flex-column">
        {notifications.map((notification) => (
          <div key={notification.id} className="border-bottom-1 surface-border py-3">
            <div className="font-semibold">{notification.title}</div>
            <div className="text-600 text-sm">{notification.message}</div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="flex-grow-1 flex align-items-center justify-content-center text-600 text-center px-2 py-5">
            <p className="m-0 line-height-3">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
