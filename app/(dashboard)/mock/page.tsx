import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mock Exams" };

export default function MockPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-[var(--color-text)]">Mock Exams</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          Timed mock exam mode — coming soon.
        </p>
      </div>

      <div className="card p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[var(--color-amber)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-[var(--color-text)] mb-3">
          Timed mock exams are coming.
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm max-w-sm mx-auto mb-6">
          Soon you&apos;ll be able to pull a full set of questions, set a countdown timer, and
          simulate real exam conditions.
        </p>
        <Link
          href="/questions"
          className="inline-flex items-center gap-2 border border-[var(--color-border-2)] text-[var(--color-text-muted)] px-5 py-2.5 rounded text-sm hover:text-[var(--color-text)] hover:border-[var(--color-text-muted)] transition-all"
        >
          Practice with the question bank for now
        </Link>
      </div>
    </div>
  );
}
