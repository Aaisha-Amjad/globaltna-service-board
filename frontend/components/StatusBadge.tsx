// Reusable status badge — displays job status with color coding
// Open = green, In Progress = yellow, Closed = gray

interface Props {
  status: "Open" | "In Progress" | "Closed";
}

export default function StatusBadge({ status }: Props) {
  const styles = {
    Open: "bg-green-100 text-green-700 border border-green-200",
    "In Progress": "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Closed: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}
