// Job detail page — shows full job info, status updater and delete button
// Status update and delete are only shown to logged-in users

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getJobById, updateJobStatus, deleteJob } from "@/lib/api";
import { JobRequest } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

const STATUSES = ["Open", "In Progress", "Closed"];

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState<JobRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch job details
    const fetchJob = async () => {
      const res = await getJobById(id as string);
      if (res.success) setJob(res.data);
      else setError("Job not found");
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!job) return;
    setUpdating(true);
    const res = await updateJobStatus(job._id, newStatus);
    if (res.success) setJob(res.data);
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (!job || !confirm("Are you sure you want to delete this job?")) return;
    setDeleting(true);
    await deleteJob(job._id);
    router.push("/");
  };

  if (loading)
    return (
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Loading skeleton */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          {[140, 80, 200, 120].map((w, i) => (
            <div
              key={i}
              style={{
                height: "16px",
                background: "var(--border)",
                borderRadius: "4px",
                marginBottom: "16px",
                width: `${w}px`,
              }}
            />
          ))}
        </div>
      </div>
    );

  if (error || !job)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "var(--text-muted)",
        }}
      >
        <p style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</p>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)" }}>
          {error || "Job not found"}
        </p>
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "16px",
            background: "var(--accent)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to listings
        </button>
      </div>
    );

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        style={{
          background: "transparent",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "13px",
          marginBottom: "24px",
        }}
      >
        ← Back to listings
      </button>

      {/* Main card */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "var(--text-primary)",
              lineHeight: "1.3",
            }}
          >
            {job.title}
          </h1>
          <StatusBadge status={job.status} />
        </div>

        {/* Meta info */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              background: "rgba(99,102,241,0.15)",
              color: "var(--accent)",
              border: "1px solid rgba(99,102,241,0.3)",
              fontSize: "12px",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "20px",
            }}
          >
            {job.category}
          </span>
          {job.location && (
            <span
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              📍 {job.location}
            </span>
          )}
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginLeft: "auto",
            }}
          >
            Posted{" "}
            {new Date(job.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "24px",
          }}
        />

        {/* Description */}
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "10px",
            }}
          >
            Description
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              fontSize: "15px",
            }}
          >
            {job.description}
          </p>
        </div>

        {/* Contact info */}
        {(job.contactName || job.contactEmail) && (
          <div
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "28px",
            }}
          >
            <h2
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "10px",
              }}
            >
              Contact
            </h2>
            {job.contactName && (
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                👤 {job.contactName}
              </p>
            )}
            {job.contactEmail && (
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                ✉️{" "}
                <a
                  href={`mailto:${job.contactEmail}`}
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  {job.contactEmail}
                </a>
              </p>
            )}
          </div>
        )}

        {/* Actions — only shown to logged in users */}
        {isLoggedIn && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Status dropdown */}
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  marginBottom: "6px",
                }}
              >
                Update status
              </label>
              <select
                value={job.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={updating}
                style={{ width: "auto" }}
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                background: "rgba(239,68,68,0.1)",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.3)",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: deleting ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "20px",
              }}
            >
              {deleting ? "Deleting..." : "Delete Job"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
