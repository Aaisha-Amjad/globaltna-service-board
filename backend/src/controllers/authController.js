// Auth controller — handles user registration and login
// Returns a signed JWT token on success so the frontend can store and use it

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper — creates and signs a JWT token for a given user ID
// Token expires in 7 days so users stay logged in across sessions
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ─── POST /api/auth/register ──────────────────────────────────────────────────
// Creates a new user account and returns a token immediately
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "An account with this email already exists",
      });
    }

    // Password hashing happens automatically via the User model pre-save hook
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
// Validates credentials and returns a token if correct
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email — include password field for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Use the model's matchPassword method to compare hashed passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
