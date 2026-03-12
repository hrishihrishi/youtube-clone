import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js"; // Import the database connection utility
import authRoutes from "./routers/authRoutes.js";
import videoRoutes from "./routers/videoRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic root route for API status check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to YouTube Clone API" });
});

// AUTH ROUTES - Handle user registration and login
app.use("/api/auth", authRoutes);

// VIDEO ROUTES - Handle video uploading, streaming, and metadata management
app.use("/api/videos", videoRoutes);

// Global error handling middleware - Catch and report server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// 404 Route Not Found handler - Catch all undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});