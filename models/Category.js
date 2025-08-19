const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Restaurants",
      "Fashion",
      "Hotel & Resort",
      "Health Care",
      "Electronics",
      "Events",
      "Education",
      "Services"
    ]
  },
  iconUrl: String,   // optional → if you want icons/images for categories
  description: String // optional → description about the category
});

module.exports = mongoose.model("Category", categorySchema);
