interface Props {
  status: "Open" | "In Progress" | "Closed";
}

export default function StatusBadge({ status }: Props) {
  const styles: Record<string, React.CSSProperties> = {
    Open: {
      background: "rgba(16,185,129,0.15)",
      color: "#10b981",
      border: "1px solid rgba(16,185,129,0.3)",
    },
    "In Progress": {
      background: "rgba(245,158,11,0.15)",
      color: "#f59e0b",
      border: "1px solid rgba(245,158,11,0.3)",
    },
    Closed: {
      background: "rgba(71,85,105,0.3)",
      color: "#94a3b8",
      border: "1px solid rgba(71,85,105,0.4)",
    },
  };

  return (
    <span
      style={{
        ...styles[status],
        fontSize: "11px",
        fontWeight: "600",
        padding: "3px 10px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
        letterSpacing: "0.3px",
      }}
    >
      {status}
    </span>
  );
}
