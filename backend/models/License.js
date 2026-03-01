const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    authority: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    issueDate: { type: Date, required: true },
    validTill: { type: Date, required: true },
    userEmail: { type: String, required: true },
    remarks: String,
    reminder30Sent: { type: Boolean, default: false },
    reminder15Sent: { type: Boolean, default: false },
    reminder7Sent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("License", licenseSchema);
