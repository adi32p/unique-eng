const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    fileUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
