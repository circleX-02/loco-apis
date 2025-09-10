const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const parser = require("../utils/multer");

router.post('/register',
    parser.fields([
        {name : "logo", maxCount: 1},
        {name : "gallery", maxCount: 4},
        {name : "cover", maxCount: 4},

    ]),
    
    registerUser);


  module.exports = router;

