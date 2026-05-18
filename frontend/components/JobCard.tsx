import Link from "next/link";
import { JobRequest } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface Props { job: JobRequest; }

export default function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job._id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", lineHeight: "1.4" }}>
            {job.title}
          </h3>
          <StatusBadge status={job.status} />
        </div>

        {/* Description */}
        <p style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: "1.6",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}>
          {job.description}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{
            background: "rgba(99,102,241,0.15)",
            color: "var(--accent)",
            border: "1px solid rgba(99,102,241,0.3)",
            fontSize: "11px",
            fontWeight: "600",
            padding: "3px 10px",
            borderRadius: "20px",
          }}>
            {job.category}
          </span>
          {job.location && (
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              📍 {job.location}
            </span>
          )}
          <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "auto" }}>
            {new Date(job.createdAt).toLocaleDateString("en-GB", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}