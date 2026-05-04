"use client";

import { useState } from "react";

export function MarkSchemePanel({ markScheme, marks }: { markScheme: string; marks: number }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="glass rounded-2xl p-6 xl:p-8 flex flex-col border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Mark Scheme</h2>
          <span className="font-mono text-xs border px-1.5 py-0.5 rounded-md" style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)" }}>{marks}m</span>
        </div>
        <button
          onClick={() => setRevealed(!revealed)}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
            revealed
              ? "border-white/10 text-white/50 hover:text-white"
              : "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
          }`}
        >
          {revealed ? "Hide" : "Reveal mark scheme"}
        </button>
      </div>

      {revealed ? (
        <div className="flex-1 animate-fade-in">
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.7)" }}>{markScheme}</p>
          <div className="mt-5 p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <p className="text-xs text-emerald-400 font-mono uppercase tracking-wide mb-1">Note</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Official mark scheme. Use it to self-assess, then try AI marking for personalised feedback.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.02)" }}>
            <svg className="w-5 h-5" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Mark scheme hidden.</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Attempt the question first, then reveal.</p>
        </div>
      )}
    </div>
  );
}
