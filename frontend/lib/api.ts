// Central API client — all requests to the Express backend go through here
// Using NEXT_PUBLIC_API_URL means we can swap the URL for production easily

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Attaches the JWT token from localStorage to every request that needs auth
const authHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ─── Jobs ─────────────────────────────────────────────────────────────────────

// Fetch all jobs — supports optional category, status and search filters
export const getJobs = async (params?: {
  category?: string;
  status?: string;
  search?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.category) query.append("category", params.category);
  if (params?.status) query.append("status", params.status);
  if (params?.search) query.append("search", params.search);

  const res = await fetch(`${BASE_URL}/api/jobs?${query.toString()}`);
  return res.json();
};

// Fetch a single job by ID
export const getJobById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`);
  return res.json();
};

// Create a new job — requires auth token
export const createJob = async (data: object) => {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

// Update job status — requires auth token
export const updateJobStatus = async (id: string, status: string) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// Delete a job — requires auth token
export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

// Register a new user
export const register = async (data: object) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Login with email and password
export const login = async (data: object) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
