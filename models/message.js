const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.ObjectId,
      ref: "Listing",
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
