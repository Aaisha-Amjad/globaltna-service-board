
// Auth routes — maps register and login endpoints to their controllers
// Includes input validation before the request reaches the controller

const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validate");

// Validation rules for registration
const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Validation rules for login
const loginRules = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// POST /api/auth/register — validate then create account
router.post("/register", registerRules, validate, register);

// POST /api/auth/login — validate then check credentials
router.post("/login", loginRules, validate, login);

module.exports = router;
