const Notification = require("../models/notification");

const createNotification = async (userId, data, io) => {
  const notification = await Notification.create({
    user: userId,
    title: data.title || "Notification",
    message: data.message,
    type: data.type || "info",
    read: false,
  });

  // 🔔 Emit real-time notification
  if (io) {
    io.to(userId.toString()).emit("new-notification", notification);
  }

  return notification;
};

module.exports = { createNotification };