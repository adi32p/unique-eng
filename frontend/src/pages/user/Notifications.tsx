import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Section, SectionHeader } from "../../components/common/Section";
import { AnimatedSection } from "../../components/common/AnimatedSection";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  read: boolean;
  createdAt: string;
}

const API_BASE = "http://localhost:5000/api";

function NotificationIcon({ type }: { type: string }) {
  if (type === "success")
    return <CheckCircle className="text-green-500" size={22} />;
  if (type === "warning")
    return <AlertTriangle className="text-yellow-500" size={22} />;
  return <Info className="text-blue-500" size={22} />;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchNotifications = async () => {
    try {
      if (!token) return;

      const res = await fetch(`${API_BASE}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.emit("join", userId);

    socket.on("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  /* -------------------------------------------------------- */
  const toggleRead = async (id: string) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE}/notifications/${id}/toggle-read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = await res.json();

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, read: updated.read } : n
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    if (!token) return;

    await fetch(`${API_BASE}/notifications/mark-all-read`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString();

  return (
    <>
      <Section className="bg-gradient-to-br from-forest via-primary to-forest text-white">
        <AnimatedSection>
          <h1 className="text-3xl font-bold mb-2">
            Notifications 🔔
          </h1>
          <p className="text-white/80">
            You have {unreadCount} unread notifications
          </p>
        </AnimatedSection>
      </Section>

      <Section className="-mt-20 pt-24 bg-gray-50 min-h-screen">
        <SectionHeader
          badge="Updates"
          title="Your Notifications"
          subtitle="Important alerts and reminders"
        />

        {notifications.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No notifications yet.
          </p>
        )}

        <div className="space-y-4">
          {notifications.map((note) => (
            <Card
              key={note._id}
              className={`shadow-md transition-all ${
                note.read
                  ? "bg-white"
                  : "bg-green-50 border border-green-300"
              }`}
            >
              <CardContent className="p-5 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <NotificationIcon type={note.type} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {note.title}
                    </h3>
                    {!note.read && (
                      <Badge className="bg-green-200 text-green-800">
                        New
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {note.message}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={12} />
                      {formatDate(note.createdAt)}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleRead(note._id)}
                    >
                      {note.read
                        ? "Mark as Unread"
                        : "Mark as Read"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length > 0 && (
          <div className="text-center mt-10">
            <Button variant="outline" onClick={markAllRead}>
              Mark all as read
            </Button>
          </div>
        )}
      </Section>
    </>
  );
}