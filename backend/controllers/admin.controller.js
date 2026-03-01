const User = require("../models/User");
const Service = require("../models/Service");
const Request = require("../models/Request");
const License = require("../models/License");
const UserService = require("../models/userService");
// ✅ MOVE THESE HERE (TOP)
const { sendEmail } = require("../utils/mailer");
const { createNotification } = require("../services/notification.service");

exports.getDashboardStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Active services
    const activeServices = await Service.countDocuments({
      status: "active",
    });

    // Pending requests
    const pendingRequests = await Request.countDocuments({
      status: "Pending",
    });

    // Expiring licenses (within 30 days)
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const expiringLicenses = await License.countDocuments({
      expiryDate: { $gte: today, $lte: next30Days },
    });

    res.json({
      totalUsers,
      activeServices,
      pendingRequests,
      expiringLicenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


exports.assignService = async (req, res) => {
  const { userId, serviceId } = req.body;

  const assignment = await UserService.create({
    user: userId,
    service: serviceId,
  });

  res.json({ message: "Service assigned successfully" });
};

/* ======================================================
   GET SERVICES OF SPECIFIC USER (ADMIN)
====================================================== */
exports.getServicesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const services = await UserService.find({ user: userId })
      .populate("service")
      .populate("user", "name email");

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   UPDATE SERVICE STAGE (ADMIN)
====================================================== */
exports.updateServiceStage = async (req, res) => {
  try {
    const io = req.app.get("io"); // ✅ GET SOCKET INSTANCE

    const { serviceId } = req.params;
    const { stage, expiryDate } = req.body;

    const stageMap = {
      "request-approved": 25,
      "application-submitted": 50,
      "documents-submitted": 75,
      "payment-done": 90,
      "license-completed": 100,
    };

    const userService = await UserService.findById(serviceId)
      .populate("user")
      .populate("service");

    if (!userService) {
      return res.status(404).json({ message: "Service not found" });
    }

    userService.stage = stage;
    userService.progress = stageMap[stage] || userService.progress;

    /* ======================================================
       IF SERVICE COMPLETED
    ====================================================== */
    if (stage === "license-completed") {
      if (!expiryDate) {
        return res.status(400).json({
          message: "Expiry date is required when completing service",
        });
      }

      userService.status = "Completed";
      userService.completedAt = new Date();
      userService.expiryDate = new Date(expiryDate);

      // ✅ SERVICE COMPLETED NOTIFICATION
      await createNotification(
        userService.user._id,
        {
          title: "Service Completed",
          message: `Your service "${userService.service.title}" has been completed successfully.`,
          type: "success",
        },
        io
      );
    } else {
      userService.status = "In Progress";
    }

    await userService.save();

    /* ======================================================
       PROGRESS UPDATE EMAIL + NOTIFICATION
    ====================================================== */
    const message = `Your service "${userService.service.title}" is now ${userService.progress}% completed.`;

    // ✅ Send Email
    await sendEmail(
      userService.user.email,
      "Service Progress Updated",
      message
    );

    // ✅ Real-time Notification
    await createNotification(
      userService.user._id,
      {
        title: "Service Progress Updated",
        message,
        type: userService.progress === 100 ? "success" : "info",
      },
      io
    );

    res.json({
      message: "Stage updated successfully",
      userService,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};