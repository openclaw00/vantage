"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface TopBarProps {
  user: { name?: string | null; email: string; tier: "FREE" | "PRO" };
}

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Questions", href: "/questions" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Mock", href: "/mock" },
];

export function TopBar({ user }: TopBarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const active = navItems.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"));

  return (
    <header
      className="h-14 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20"
      style={{
        background: "rgba(13,13,13,0.9)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Mobile logo */}
      <div className="md:hidden flex items-center gap-2">
        <img src="/logo.png" alt="Leaply" className="w-6 h-6 object-contain" />
        <span className="font-bold text-sm tracking-tight text-white">Leaply</span>
      </div>

      {/* Desktop breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>Leaply</span>
        {active && (
          <>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span className="font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{active.label}</span>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {user.tier === "FREE" && (
          <Link
            href="/billing"
            className="hidden sm:flex items-center gap-1.5 text-xs text-black px-3 py-1.5 rounded-lg font-semibold transition-opacity hover:opacity-85"
            style={{ background: "#fff" }}
          >
            ✦ Upgrade
          </Link>
        )}

        {/* Mobile menu */}
        <div className="md:hidden relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl py-1 z-50" style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                  style={{ color: pathname.startsWith(item.href) ? "#fff" : "rgba(255,255,255,0.5)" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
