// Integration tests for the /api/jobs endpoints
// Uses supertest to make real HTTP requests against the Express app
// Uses a separate test database so it never touches real data

const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Import the Express app — we need to export it from server.js first
const app = require("../server");

// ─── Setup & Teardown ─────────────────────────────────────────────────────────

beforeAll(async () => {
  // Connect to database before all tests run
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // Clean up test jobs and close connection after all tests finish
  await mongoose.connection
    .collection("jobrequests")
    .deleteMany({ title: /^TEST_/ });
  await mongoose.connection.close();
});

// ─── GET /api/jobs ─────────────────────────────────────────────────────────────

describe("GET /api/jobs", () => {
  it("should return all jobs with success true", async () => {
    const res = await request(app).get("/api/jobs");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    // Response must include count and data array
    expect(res.body).toHaveProperty("count");
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 10000);

  it("should filter jobs by category", async () => {
    const res = await request(app).get("/api/jobs?category=Plumbing");

    expect(res.statusCode).toBe(200);
    // Every returned job must be Plumbing category
    res.body.data.forEach((job) => {
      expect(job.category).toBe("Plumbing");
    });
  });

  it("should filter jobs by status", async () => {
    const res = await request(app).get("/api/jobs?status=Open");

    expect(res.statusCode).toBe(200);
    // Every returned job must have Open status
    res.body.data.forEach((job) => {
      expect(job.status).toBe("Open");
    });
  });
});

// ─── POST /api/jobs ────────────────────────────────────────────────────────────

describe("POST /api/jobs", () => {
  it("should create a new job with valid data", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "TEST_Fix leaking tap",
      description: "TEST_Kitchen tap needs urgent repair",
      category: "Plumbing",
      location: "Glasgow",
      contactName: "Test User",
      contactEmail: "test@example.com",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    // Created job should have default status of Open
    expect(res.body.data.status).toBe("Open");
    expect(res.body.data.title).toBe("TEST_Fix leaking tap");
  });

  it("should reject a job missing required title", async () => {
    const res = await request(app).post("/api/jobs").send({
      description: "TEST_Missing title field",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    // Error array should mention title
    expect(res.body.error).toContain("Title is required");
  });

  it("should reject a job with invalid email format", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "TEST_Valid title",
      description: "TEST_Valid description",
      contactEmail: "not-an-email",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Please enter a valid email address");
  });
});

// ─── GET /api/jobs/:id ─────────────────────────────────────────────────────────

describe("GET /api/jobs/:id", () => {
  it("should return 404 for a non-existent job id", async () => {
    // Valid ObjectId format but doesn't exist in DB
    const fakeId = "664f1b2c9f1b2c3d4e5f6a7b";
    const res = await request(app).get(`/api/jobs/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
