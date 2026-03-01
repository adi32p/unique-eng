const mongoose = require("mongoose");

const userServiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    stage: {
      type: String,
      enum: [
        "request-approved",
        "application-submitted",
        "documents-submitted",
        "payment-done",
        "license-completed",
      ],
      default: "request-approved",
    },

    progress: {
      type: Number,
      default: 25,
    },

    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },

    /* 🔥 NEW FIELDS */
    completedAt: Date,
    expiryDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserService", userServiceSchema);