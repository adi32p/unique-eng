// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     shortDescription: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     features: {
//       type: [String],
//       required: true,
//     },
//     icon: {
//       type: String,
//       default: "FileCheck",
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive"],
//       default: "active",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Service", serviceSchema);


const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      required: true,
    },
    icon: {
      type: String,
      default: "FileCheck",
    },

    /* 🔥 NEW FIELD */
    validityInMonths: {
      type: Number,
      default: 12, // default 1 year
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);