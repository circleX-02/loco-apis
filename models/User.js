const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    plan: { type: String,required: true },
    businessName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    businessCategory: { type: String,required: true },  // <-- Category _id
    businessCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",  
      required: true,
    },
    businessCategoryName: String, // also store the name
  
    description: String,
    logoUrl: String,
    coverUrl: String,
    galleryImages: [String],
     status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
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
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating" // references Rating collection
    }
  ]

})


module.exports = mongoose.model("User", userSchema)