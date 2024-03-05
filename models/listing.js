const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    price: {
      type: Number,
      required: true,
      minLength: 1,
      maxLength: 10000,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Categorie",
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
