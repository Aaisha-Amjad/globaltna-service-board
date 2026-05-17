// Maps HTTP methods + URL paths to their controller functions
// express-validator rules are defined here and run before the controller
// validate middleware collects those errors and blocks bad requests early

const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const validate = require("../middleware/validate");
// Protect middleware — verifies JWT token before allowing access
const protect = require("../middleware/protect");

// Reusable validation rules for creating a job
const createJobRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("contactEmail")
    .optional({ checkFalsy: true }) // only validate if provided
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("status")
    .optional()
    .isIn(["Open", "In Progress", "Closed"])
    .withMessage("Status must be Open, In Progress, or Closed"),
  body("category")
    .optional()
    .isIn(["Plumbing", "Electrical", "Painting", "Joinery", "Other"])
    .withMessage("Invalid category"),
];

// Validation rules for status update
const updateStatusRules = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Open", "In Progress", "Closed"])
    .withMessage("Status must be Open, In Progress, or Closed"),
];

router.get("/", getAllJobs);
router.get("/:id", getJobById);

// POST and DELETE are protected — only logged in users can create or delete jobs
router.post("/", protect, createJobRules, validate, createJob);
router.patch("/:id", protect, updateStatusRules, validate, updateJobStatus);
router.delete("/:id", protect, deleteJob);

module.exports = router;
