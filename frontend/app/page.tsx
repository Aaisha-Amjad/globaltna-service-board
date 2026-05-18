"use client";

import { useEffect, useState } from "react";
import { getJobs } from "@/lib/api";
import { JobRequest } from "@/lib/types";
import JobCard from "@/components/JobCard";

const CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
  "Other",
];
const STATUSES = ["All", "Open", "In Progress", "Closed"];

export default function HomePage() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const res = await getJobs({
        category: category !== "All" ? category : undefined,
        status: status !== "All" ? status : undefined,
        search: search || undefined,
      });
      setJobs(res.data || []);
      setLoading(false);
    };
    fetchJobs();
  }, [category, status, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const clearAll = () => {
    setCategory("All");
    setStatus("All");
    setSearch("");
    setSearchInput("");
  };

  return (
    <div>
      {/* Hero header */}
      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            lineHeight: "1.2",
          }}
        >
          Service Requests
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
          Browse open requests from homeowners looking for skilled tradespeople.
        </p>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          style={{
            background: "var(--accent)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            whiteSpace: "nowrap",
          }}
        >
          Search
        </button>
        {search && (
          <button
            type="button"
            onClick={clearAll}
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear
          </button>
        )}
      </form>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "32px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "auto" }}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "auto" }}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {(category !== "All" || status !== "All" || search) && (
          <button
            onClick={clearAll}
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "var(--danger)",
              border: "1px solid rgba(239,68,68,0.3)",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                animation: "pulse 1.5s infinite",
              }}
            >
              <div
                style={{
                  height: "16px",
                  background: "var(--border)",
                  borderRadius: "4px",
                  marginBottom: "12px",
                  width: "70%",
                }}
              />
              <div
                style={{
                  height: "12px",
                  background: "var(--border)",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  height: "12px",
                  background: "var(--border)",
                  borderRadius: "4px",
                  width: "50%",
                }}
              />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "var(--text-secondary)",
            }}
          >
            No jobs found
          </p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
