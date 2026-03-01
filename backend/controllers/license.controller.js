const License = require("../models/License");

/* Create License */
exports.createLicense = async (req, res) => {
  try {
    const license = await License.create(req.body);
    res.status(201).json(license);
  } catch (error) {
    res.status(500).json({ message: "Failed to create license" });
  }
};

exports.getLicenses = async (req, res) => {
  try {
    const licenses = await License.find().sort({ createdAt: -1 });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch licenses" });
  }
};

exports.getAllLicenses = async (req, res) => {
  try {
    const licenses = await License.find().sort({ createdAt: -1 });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Delete License */
exports.deleteLicense = async (req, res) => {
  try {
    const license = await License.findById(req.params.id);

    if (!license) {
      return res.status(404).json({ message: "License not found" });
    }

    await license.deleteOne();
    res.json({ message: "License deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
