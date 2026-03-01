const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notification = require("../models/Notification");

const {
  getUserNotifications,
  markAllRead,
} = require("../controllers/notification.controller");

const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getUserNotifications);
router.put("/mark-all-read", protect, markAllRead);
// PUT /api/notifications/:id/toggle-read
router.put("/:id/toggle-read", protect, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid notification ID" });
    }

    const notification = await Notification.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = !notification.read;
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error("Toggle read error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;