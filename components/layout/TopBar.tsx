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
    <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 bg-white/[0.01] backdrop-blur-sm">
      {/* Mobile logo */}
      <div className="md:hidden flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
          <span className="text-white font-bold text-[10px]">V</span>
        </div>
        <span className="font-display font-semibold text-sm">Vantage</span>
      </div>

      {/* Desktop breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-white/30">Vantage</span>
        {active && (
          <>
            <span className="text-white/15">/</span>
            <span className="text-white/60 font-medium">{active.label}</span>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {user.tier === "FREE" && (
          <Link
            href="/billing"
            className="hidden sm:flex items-center gap-1.5 text-xs border border-violet-500/30 text-violet-400 px-3 py-1.5 rounded-lg hover:bg-violet-500/10 transition-colors font-medium"
          >
            ✦ Upgrade
          </Link>
        )}

        {/* Mobile menu */}
        <div className="md:hidden relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-white/40 hover:text-white/70 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 glass rounded-xl border border-white/10 shadow-glass py-1 z-50 animate-slide-down">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname.startsWith(item.href) ? "text-violet-400" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] my-1" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2.5 text-sm text-white/40 hover:text-white/60"
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
