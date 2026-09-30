require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Lost & Found Campus Portal API is running...");
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
