const User = require("../models/User");

// Approve user by ID
exports.approveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find and update user status
    const user = await User.findByIdAndUpdate(
      userId,
      { status: "approved" },
      { new: true } // return updated user
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User approved successfully.",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
