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

  const pageTitle = navItems.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/")
  )?.label ?? "Vantage";

  return (
    <header className="h-16 border-b border-[var(--color-border)] flex items-center justify-between px-6 bg-[var(--color-bg)] md:bg-transparent">
      {/* Mobile: logo + hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <Link href="/dashboard" className="font-serif text-lg text-[var(--color-text)]">
          Vantage
        </Link>
      </div>

      {/* Desktop: page breadcrumb */}
      <div className="hidden md:block">
        <h1 className="text-sm font-medium text-[var(--color-text-muted)]">{pageTitle}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {user.tier === "FREE" && (
          <Link
            href="/billing"
            className="hidden sm:inline-flex items-center gap-1.5 border border-[var(--color-amber)]/30 text-[var(--color-amber)] text-xs px-3 py-1.5 rounded font-medium hover:bg-[var(--color-amber-pale)] transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Upgrade to Pro
          </Link>
        )}

        {/* Mobile menu */}
        <div className="md:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              }
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 card shadow-xl py-1 z-50">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm ${
                    pathname.startsWith(item.href)
                      ? "text-[var(--color-amber-light)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-[var(--color-border)] my-1" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
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
