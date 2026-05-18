// Register page — creates a new account and logs in immediately
// Stores JWT token in localStorage and redirects to home

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name is required");
    if (!form.email) return setError("Email is required");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);
    const res = await register(form);
    setLoading(false);

    if (!res.success) {
      setError(Array.isArray(res.error) ? res.error.join(", ") : res.error);
      return;
    }

    // Store token and user name for navbar
    localStorage.setItem("token", res.token);
    localStorage.setItem("userName", res.user.name);
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
    router.refresh();
  };

  return (
    <div style={{ maxWidth: "440px", margin: "60px auto" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
          }}
        >
          Create an account
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Join GlobalTNA to post and manage service requests
        </p>
      </div>

      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "32px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-secondary)",
                marginBottom: "6px",
              }}
            >
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-secondary)",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-secondary)",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
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
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "var(--text-muted)",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
