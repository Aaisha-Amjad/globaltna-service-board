// Auth middleware — protects routes that require a logged-in user
// Checks the Authorization header for a valid JWT token
// If valid, attaches the decoded user to req.user and continues
// If missing or invalid, blocks the request with a 401 response

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // Token is sent as: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Not authorised — no token provided",
      });
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify the token using our secret — throws if expired or tampered
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Not authorised — user no longer exists",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Not authorised — invalid token",
    });
  }
};

module.exports = protect;
