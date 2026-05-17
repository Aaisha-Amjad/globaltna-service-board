// Navbar — appears on every page
// Shows login/logout based on whether a JWT token exists in localStorage

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check localStorage for token on mount
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          GlobalTNA
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Browse Jobs
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/jobs/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Post Job
              </Link>
              <span className="text-gray-500 text-sm">Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 transition-colors text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
