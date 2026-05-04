import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Revision Notes" };

const levels = [
  {
    slug: "igcse",
    label: "IGCSE",
    description: "Cambridge IGCSE — complete notes for all core subjects.",
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics", "Computer Science", "Economics", "Geography", "History", "Business Studies", "English Language"],
  },
  {
    slug: "a-level",
    label: "A-Level",
    description: "Cambridge A-Level — coming soon.",
    subjects: [],
    disabled: true,
  },
  {
    slug: "ib",
    label: "IB",
    description: "International Baccalaureate — coming soon.",
    subjects: [],
    disabled: true,
  },
];

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-bold text-3xl text-white mb-1">Revision Notes</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Comprehensive notes organised by format, course, and subject.
        </p>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <div key={level.slug}>
            {level.disabled ? (
              <div
                className="rounded-2xl p-6 opacity-40 cursor-not-allowed"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-lg text-white">{level.label}</h2>
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>Soon</span>
                </div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{level.description}</p>
              </div>
            ) : (
              <Link
                href={`/notes/${level.slug}`}
                className="block rounded-2xl p-6 transition-all hover:border-white/20"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-xl text-white">{level.label}</h2>
                  <svg className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{level.description}</p>
                <div className="flex flex-wrap gap-2">
                  {level.subjects.map((s) => (
                    <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
