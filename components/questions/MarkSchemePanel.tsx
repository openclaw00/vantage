"use client";

import { useState } from "react";

export function MarkSchemePanel({ markScheme, marks }: { markScheme: string; marks: number }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="glass rounded-2xl p-6 xl:p-8 flex flex-col border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Mark Scheme</h2>
          <span className="font-mono text-xs text-gray-300 border border-gray-200 px-1.5 py-0.5 rounded-md">{marks}m</span>
        </div>
        <button
          onClick={() => setRevealed(!revealed)}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
            revealed
              ? "border-gray-200 text-gray-500 hover:text-gray-600"
              : "border-orange-500/40 text-orange-600 hover:bg-orange-500/10"
          }`}
        >
          {revealed ? "Hide" : "Reveal mark scheme"}
        </button>
      </div>

      {revealed ? (
        <div className="flex-1 animate-fade-in">
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{markScheme}</p>
          <div className="mt-5 p-3.5 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <p className="text-xs text-orange-600 font-mono uppercase tracking-wide mb-1">Note</p>
            <p className="text-xs text-gray-500">
              Official mark scheme. Use it to self-assess, then try AI marking for personalised feedback.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-12 h-12 rounded-2xl glass border border-gray-200 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-sm text-gray-400 mb-1">Mark scheme hidden.</p>
          <p className="text-xs text-gray-300">Attempt the question first, then reveal.</p>
        </div>
      )}
    </div>
  );
}
