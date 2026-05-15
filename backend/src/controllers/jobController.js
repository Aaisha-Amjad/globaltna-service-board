// Controllers contain the actual business logic for each route
// Each function handles one specific API action
// We use async/await and wrap everything in try/catch — errors go to next(err)
// which sends them to our global errorHandler middleware

const JobRequest = require("../models/JobRequest");

// ─── GET /api/jobs ────────────────────────────────────────────────────────────
// Returns all jobs. Supports optional filters:
//   ?category=Plumbing   — filter by category
//   ?status=Open         — filter by status
//   ?search=leaking tap  — full-text keyword search across title + description
exports.getAllJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    // $text search uses the text index we created on the model
    if (search) filter.$text = { $search: search };

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/jobs/:id ────────────────────────────────────────────────────────
// Returns a single job by its MongoDB ObjectId
exports.getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/jobs ───────────────────────────────────────────────────────────
// Creates a new job request
// express-validator has already checked the fields before this runs
exports.createJob = async (req, res, next) => {
  try {
    const job = await JobRequest.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/jobs/:id ──────────────────────────────────────────────────────
// Updates the status of a job only — Open, In Progress, or Closed
// We use { new: true } so Mongoose returns the updated document, not the old one
exports.updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }, // runValidators checks the enum is valid
    );

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/jobs/:id ─────────────────────────────────────────────────────
// Permanently deletes a job by ID
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
