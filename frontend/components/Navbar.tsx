"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const updateAuth = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userName");
      if (token) {
        setIsLoggedIn(true);
        setUserName(name || "");
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    // Run on mount
    updateAuth();

    // Listen for login/logout/register events
    window.addEventListener("authChange", updateAuth);
    return () => window.removeEventListener("authChange", updateAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav
      style={{
        background: "rgba(15,17,23,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "20px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          GlobalTNA
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/"
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
          >
            Browse Jobs
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/jobs/new"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                + Post Job
              </Link>
              <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                style={{
                  background: "var(--accent)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
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
