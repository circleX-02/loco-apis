const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Prepare response based on role
    if (user.role === 'admin') {
      // For admin, return all users' data (excluding password and __v)
      const allUsers = await User.find().select('-password -__v');
      return res.status(200).json({
        success: true,
        message: 'Login successful - Admin access',
        token,
        users: allUsers, // Return all users
      });
    } else {
      // For normal user, return only their own data (excluding password and __v)
      const { password: _, __v: __, ...userData } = user._doc;
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: userData, // Return only the logged-in user's data
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { loginUser };