// Entry point of the entire backend
// Sets up Express, connects middleware, mounts routes, starts the server

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env file before anything else
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Allows the Next.js frontend (different port) to call this API
app.use(cors());

// Parses incoming JSON request bodies so req.body works
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

// All job-related routes live under /api/jobs
app.use("/api/jobs", require("./routes/jobs"));

// Health check — useful for verifying the server is alive
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// 404 handler — catches any route that doesn't match above
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler — must be last, after all routes
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
