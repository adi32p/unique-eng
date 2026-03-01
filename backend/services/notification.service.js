const Notification = require("../models/Notification");

exports.createNotification = async (
  userId,
  { title, message, type = "info" }
) => {
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
    read: false,
  });

  // 🔴 Emit real-time notification
  const io = require("../server").io; // OR use req.app.get("io") pattern
  if (io) {
    io.to(userId.toString()).emit("new-notification", notification);
  }

  return notification;
};