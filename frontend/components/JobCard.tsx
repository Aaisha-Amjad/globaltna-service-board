// JobCard — displays a single job request in the listings grid
// Clicking anywhere on the card navigates to the job detail page

import Link from "next/link";
import { JobRequest } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface Props {
  job: JobRequest;
}

export default function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer h-full">
        {/* Header — title and status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 text-base leading-snug">
            {job.title}
          </h3>
          <StatusBadge status={job.status} />
        </div>

        {/* Description preview */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Footer — category, location, date */}
        <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium">
            {job.category}
          </span>
          {job.location && <span>📍 {job.location}</span>}
          <span className="ml-auto">
            {new Date(job.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
