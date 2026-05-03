"use client";

import { useState } from "react";

interface Props {
  markScheme: string;
  marks: number;
}

export function MarkSchemePanel({ markScheme, marks }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="card p-6 xl:p-8 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
          Mark Scheme
        </h2>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-text-faint)]">
            [{marks}m]
          </span>
          <button
            onClick={() => setRevealed(!revealed)}
            className={`text-xs font-medium px-3 py-1.5 rounded border transition-all ${
              revealed
                ? "border-[var(--color-border-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                : "border-[var(--color-amber)] text-[var(--color-amber)] hover:bg-[var(--color-amber-pale)]"
            }`}
          >
            {revealed ? "Hide" : "Reveal mark scheme"}
          </button>
        </div>
      </div>

      {revealed ? (
        <div className="flex-1 animate-fade-in">
          <div className="prose prose-sm max-w-none">
            <p className="text-[var(--color-text)] leading-relaxed whitespace-pre-wrap text-sm">
              {markScheme}
            </p>
          </div>
          <div className="mt-4 p-3 bg-[var(--color-amber-pale)] rounded border border-[var(--color-amber)]/20">
            <p className="text-xs text-[var(--color-amber)] font-mono uppercase tracking-wide mb-1">
              Note
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              This is the official mark scheme. Use it to self-assess, then try the AI marking for
              detailed personalised feedback.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-12 h-12 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-1">
            Mark scheme is hidden.
          </p>
          <p className="text-xs text-[var(--color-text-faint)]">
            Try the question first, then reveal.
          </p>
        </div>
      )}
    </div>
  );
}
