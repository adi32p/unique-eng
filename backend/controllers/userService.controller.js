const UserService = require("../models/userService");

/* =======================================================
   ASSIGN SERVICE MANUALLY (Admin)
======================================================= */
exports.assignServiceToUser = async (req, res) => {
  try {
    const { userId, serviceId } = req.body;

    // Validate user
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate service
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(404).json({ message: "Service not found" });
    }

    const existing = await UserService.findOne({
      user: userId,
      service: serviceId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Service already assigned to user",
      });
    }

    const assignment = await UserService.create({
      user: userId,
      service: serviceId,
      status: "pending",
      progress: 0,
    });

    res.status(201).json({
      message: "Service assigned successfully",
      assignment,
    });
  } catch (error) {
    console.error("Assign Service Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
/* =======================================================
   GET MY SERVICES (User)
======================================================= */
const Request = require("../models/Request");

exports.getMyServices = async (req, res) => {
  try {
    const userId = req.user._id;

    const services = await UserService.find({ user: userId })
      .populate("service");

    const formattedServices = services.map((item) => ({
      id: item._id,
      name: item.service?.title || "Service",
      category: item.service?.category || "General",
      status: item.status,
      progress: item.progress,
      expiryDate: item.expiryDate || null,
    }));

    res.json(formattedServices);
  } catch (error) {
    console.error("Get My Services Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get single service progress by ID
exports.getUserServiceById = async (req, res) => {
  try {
    const service = await UserService.findById(req.params.id)
      .populate("service")
      .populate("user");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // ✅ Allow owner OR admin
    if (
      service.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};