const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    plan: { type: String,required: true },
    businessName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    businessCategory: String,
    description: String,
    logoUrl: String,
    galleryImages: [String],
     status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Default to 'user' for non-admins
  },
})


module.exports = mongoose.model("User", userSchema)