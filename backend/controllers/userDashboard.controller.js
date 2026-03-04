const UserService = require("../models/userService");
const Notification = require("../models/notification");
const Document = require("../models/document"); // if you have

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get services
    const services = await UserService.find({ user: userId });

    const totalServices = services.length;

    let totalProgress = 0;
    services.forEach((service) => {
      totalProgress += service.progress || 0;
    });

    const averageProgress =
      totalServices > 0
        ? Math.round(totalProgress / totalServices)
        : 0;

    // ✅ Count documents (if model exists)
    const documentsCount = await Document.countDocuments({
      user: userId,
    });

    // ✅ Count UNREAD notifications
    const notificationsCount = await Notification.countDocuments({
      user: userId,
      read: false,
    });

    res.json({
      myServices: totalServices,
      serviceProgress: averageProgress,
      documents: documentsCount,
      notifications: notificationsCount,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard error" });
  }
};
