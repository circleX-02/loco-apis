// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Category = require('../models/Category'); // import category model

const business = async (req, res) => {
  try {
    // Fetch all users except those with role: "admin", excluding password and __v
    const allUsers = await User.find({ role: { $ne: 'admin' } }).select('-password -__v');
    const allCategories = await Category.find().select('-__v');

    return res.status(200).json({
      success: true,
      message: 'Data retrieved',
      users: allUsers, // Return non-admin users
      categories: allCategories   // 👈 include categories here

    });
  } catch (error) {
    console.error('Data Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { business };

// Mount the route
router.get('/users', business);