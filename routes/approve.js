const express = require("express");
const { approveUser } = require("../controllers/approveController");
const router = express.Router();

// Approve user
router.put("/users/:userId/approve", approveUser);

module.exports = router;
