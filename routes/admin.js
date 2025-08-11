const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust if needed

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123"; // Ideally hash this or use env


router.post("/admin", async (req,res) => {
    const { email, password } = req.body;

    // Simple check
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        console.log("email pass empty")
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        // Generate token (optional)
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        // Fetch all users
        const users = await User.find().select("-password");

        res.json({
            success: true,
            message: "Admin login successful",
            token,
            users
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }

})

module.exports = router;
