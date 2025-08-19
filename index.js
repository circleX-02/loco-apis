const express = require('express')
const connectDB = require('./config/db')
const cors = require("cors");
const dotenv = require("dotenv");
const Category = require("./models/Category");
const router = express.Router();


dotenv.config()
connectDB();


const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/admin"));
app.use("/api", require("./routes/allBus"));

// Get all categories
router.get("/api/categories", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  });

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
