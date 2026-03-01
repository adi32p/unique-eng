const Service = require("../models/Service");

/* -----------------------------
   GET ALL SERVICES
-------------------------------- */
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* 🔹 Get Single Service */
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* -----------------------------
   CREATE SERVICE (Admin)
-------------------------------- */
exports.createService = async (req, res) => {
  try {
    const { title, shortDescription, features, icon } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!features || features.length === 0) {
      return res.status(400).json({ message: "At least one feature required" });
    }

    const service = await Service.create({
      title,
      shortDescription,
      features,
      icon: icon || "FileCheck",
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* -----------------------------
   UPDATE SERVICE (Admin)
-------------------------------- */
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* -----------------------------
   DELETE SERVICE (Admin)
-------------------------------- */
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
