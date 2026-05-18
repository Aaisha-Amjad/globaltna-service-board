// New job form page — allows logged-in users to post a new service request
// Redirects to login if no token found
// Client-side validation runs before hitting the API

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Title is required");
    if (!form.description.trim()) return setError("Description is required");
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) {
      return setError("Please enter a valid email address");
    }

    setLoading(true);
    const res = await createJob(form);
    setLoading(false);

    if (!res.success) {
      setError(Array.isArray(res.error) ? res.error.join(", ") : res.error);
      return;
    }

    router.push("/");
  };

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "800",
          background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}>
          Post a Service Request
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Describe the job and tradespeople will get in touch.
        </p>
      </div>

      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "32px",
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
            }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px" }}>
              Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Fix leaking kitchen tap" />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px" }}>
              Description <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the job in detail..."
              rows={4}
              style={{
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "14px",
                width: "100%",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px" }}>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px" }}>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Glasgow" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px" }}>Your Name</label>
              <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="John Smith" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px" }}>Email</label>
              <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} placeholder="john@example.com" />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            background: loading ? "var(--border)" : "var(--accent)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            marginTop: "8px",
          }}>
            {loading ? "Posting..." : "Post Service Request"}
          </button>
        </form>
      </div>
    </div>
  );
}