// Global error handler — sits at the end of the Express middleware chain
// Any error passed via next(error) lands here instead of crashing the server

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error (e.g. required field missing, enum mismatch)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, error: messages });
  }

  // Mongoose bad ObjectId — e.g. /api/jobs/not-a-valid-id
  if (err.name === "CastError") {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  // Fallback for anything else
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
