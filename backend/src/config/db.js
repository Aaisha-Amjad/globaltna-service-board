// Loads mongoose and connects to MongoDB using the URI from .env
// We call this once when the server starts

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Kill the server if DB fails — no point running without it
  }
};

module.exports = connectDB;
