import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Section, SectionHeader } from "../../components/common/Section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../components/common/AnimatedSection";

/* ------------------------------------------------------------------ */
interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  read: boolean;
  createdAt: string;
}

const API_BASE = "http://localhost:5000/api";
const socket = io("http://localhost:5000");

/* ------------------------------------------------------------------ */
function NotificationIcon({ type }: { type: string }) {
  if (type === "success")
    return <CheckCircle className="text-leaf" size={22} />;
  if (type === "warning")
    return <AlertTriangle className="text-sunrise" size={22} />;
  return <Info className="text-primary" size={22} />;
}

/* ------------------------------------------------------------------ */
export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  /* ------------------------------------------------------------------ */
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ------------------------------------------------------------------ */
  useEffect(() => {
    fetchNotifications();

    // 🔄 Auto refresh every 20 seconds
    const interval = setInterval(fetchNotifications, 20000);

    return () => clearInterval(interval);
  }, []);

  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);

      // 📲 Toast popup
      alert(`${notification.title}\n\n${notification.message}`);
    });

    return () => {
      socket.off("new-notification");
    };
  }, [userId]);

  /* ------------------------------------------------------------------ */
  const markAllRead = async () => {
    await fetch(`${API_BASE}/notifications/mark-all-read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString();

  /* ------------------------------------------------------------------ */
  return (
    <>
      <Section className="bg-gradient-to-br from-forest via-primary to-forest text-white">
        <AnimatedSection>
          <h1 className="text-3xl font-display font-bold mb-2">
            Notifications 🔔
          </h1>
          <p className="text-white/80">
            You have {unreadCount} unread notifications
          </p>
        </AnimatedSection>
      </Section>

      <Section className="-mt-20 pt-24 bg-gradient-to-r from-leaf/5 to-sky/5">
        <SectionHeader
          badge="Updates"
          title="Your Notifications"
          subtitle="Important alerts and reminders"
        />

        <StaggerContainer className="space-y-4">
          {notifications.map((note) => (
            <StaggerItem key={note._id}>
              <Card
                className={`card-nature ${
                  note.read
                    ? "bg-card"
                    : "bg-background/80 border-leaf/30"
                }`}
              >
                <CardContent className="p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-forest flex items-center justify-center">
                    <NotificationIcon type={note.type} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">
                        {note.title}
                      </h3>
                      {!note.read && (
                        <Badge className="bg-leaf/20 text-leaf">
                          New
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      {note.message}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                      <Clock size={12} />
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {notifications.length > 0 && (
          <AnimatedSection className="text-center mt-10">
            <Button variant="outline" onClick={markAllRead}>
              Mark all as read
            </Button>
          </AnimatedSection>
        )}
      </Section>
    </>
  );
}