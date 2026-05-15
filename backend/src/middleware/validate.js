// Runs after express-validator checks and collects any validation errors
// If there are errors, it stops the request and returns them immediately
// If clean, it calls next() and the request continues to the controller

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      // Map to just the messages so the frontend gets a clean array of strings
      error: errors.array().map((e) => e.msg),
    });
  }

  next();
};

module.exports = validate;
