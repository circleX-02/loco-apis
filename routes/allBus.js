const express = require("express");
const router = express.Router();

const { business } = require("../controllers/busController"); // adjust path as needed

// POST /api/login
router.get("/allBus", business);

module.exports = router;
