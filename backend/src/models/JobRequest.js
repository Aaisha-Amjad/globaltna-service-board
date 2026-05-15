// Defines the shape of every job document in MongoDB
// Mongoose enforces types, required fields, and validation at the DB layer

const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      // Restricts to these values only — anything else is rejected
      enum: ["Plumbing", "Electrical", "Painting", "Joinery", "Other"],
      default: "Other",
    },

    location: {
      type: String,
      trim: true,
    },

    contactName: {
      type: String,
      trim: true,
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      // Simple regex to validate email format at the DB level
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open", // Every new job starts as Open
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps to every document
    timestamps: true,
  },
);

// Text index enables full-text keyword search across title and description
// This powers the ?search= query param (bonus feature)
jobRequestSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("JobRequest", jobRequestSchema);
