const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/authController"); // adjust path as needed

// POST /api/login
router.post("/login", loginUser);

module.exports = router;
