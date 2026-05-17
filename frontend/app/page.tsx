// Home page — lists all job requests with category, status and keyword filters
// Fetches fresh data on every page load (no caching) so status changes appear immediately

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

  // Fetch jobs whenever filters change
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

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Service Requests
        </h1>
        <p className="text-gray-500">
          Browse open requests from homeowners looking for tradespeople.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search jobs by keyword..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSearchInput("");
            }}
            className="text-gray-500 px-3 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </form>

      {/* Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Active filter count */}
        {(category !== "All" || status !== "All" || search) && (
          <button
            onClick={() => {
              setCategory("All");
              setStatus("All");
              setSearch("");
              setSearchInput("");
            }}
            className="text-sm text-red-500 hover:text-red-700 px-3 py-2 border border-red-200 rounded-lg"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Job listings */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
              <div className="h-3 bg-gray-100 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-4">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
