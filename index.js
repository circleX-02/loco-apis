const express = require('express')
const connectDB = require('./config/db')
const cors = require("cors");
const dotenv = require("dotenv");
const Category = require("./models/Category");
const User = require("./models/User");
const Rating = require("./models/Ratings");
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
app.use("/api", require("./routes/approve"));


// Get all categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});




app.post("/rate/:userId", async (req, res) => {
  try {
    const { description, customer_name, rating } = req.body;
    const { userId } = req.params;

    // Validate input
    if (!description || !customer_name || typeof rating !== 'number' || !userId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    console.log("User  ID:", userId);
    console.log("Customer Name:", customer_name);
    console.log("Rating:", rating);
    console.log("Description:", description);

    // Find business
    const business = await User.findById(userId);
    if (!business) return res.status(404).json({ message: "Business not found" });

    // Push rating into array
    const newRating = await Rating.create({
      business_id: userId,
      customer_name,
      description,
      rating,
    });

    res.status(201).json({
      message: "Rating added",
      ratings: business.ratings
    });
  } catch (error) {
    console.error("Error adding rating:", error); // Log the full error
    res.status(500).json({ error: error.message });
  }
});



const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
