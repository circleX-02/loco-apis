const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming "User" is your business collection
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true } // ✅ This adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Rating", ratingSchema);
