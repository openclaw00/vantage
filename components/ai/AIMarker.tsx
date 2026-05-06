"use client";

import { useState } from "react";
import { normalizeMarkingResult, type MarkingResult } from "@/lib/ai";
import Link from "next/link";

interface Props {
  questionId: string;
  questionMarks: number;
  isPro: boolean;
  previousAnswer?: string;
  previousFeedback?: MarkingResult;
}

const gradeConfig: Record<string, { bar: string; badge: string }> = {
  Excellent:    { bar: "from-green-500 to-emerald-400",  badge: "text-green-400 bg-green-500/10 border-green-500/25" },
  Good:         { bar: "from-orange-500 to-amber-400",   badge: "text-orange-600 bg-orange-500/10 border-orange-500/25" },
  Satisfactory: { bar: "from-yellow-500 to-amber-400",   badge: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25" },
  "Needs work": { bar: "from-orange-500 to-red-400",     badge: "text-orange-600 bg-orange-500/10 border-orange-500/25" },
  Incomplete:   { bar: "from-red-600 to-red-400",        badge: "text-red-400 bg-red-500/10 border-red-500/25" },
};

export function AIMarker({ questionId, questionMarks, isPro, previousAnswer, previousFeedback }: Props) {
  const [answer, setAnswer] = useState(previousAnswer ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarkingResult | null>(previousFeedback ?? null);
  const [error, setError] = useState<{ message: string; upgradeRequired?: boolean } | null>(null);
  const [tab, setTab] = useState<"answer" | "result">(previousFeedback ? "result" : "answer");
  const [startTime] = useState(Date.now());

  const handleMark = async () => {
    if (!answer.trim()) return;
    setLoading(true); setError(null);
    const res = await fetch("/api/ai/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer, timeTaken: Math.round((Date.now() - startTime) / 1000) }),
    });
    setLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setError({ message: json.error ?? "Marking failed", upgradeRequired: json.upgradeRequired });
      return;
    }
    const json = await res.json();
    setResult(normalizeMarkingResult(json, questionMarks));
    setTab("result");
  };

  const g = result ? (gradeConfig[result.grade] ?? gradeConfig.Satisfactory) : null;

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 rounded-xl p-1 border border-white/10 w-fit" style={{ background: "rgba(255,255,255,0.02)" }}>
        {(["answer", "result"] as const).filter((t) => t === "answer" || result).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? "bg-emerald-500/10 text-emerald-400" : "text-white/40 hover:text-white/60"
            }`}
          >
            {t === "answer" ? "Your answer" : "AI feedback"}
          </button>
        ))}
      </div>

      {tab === "answer" && (
        <div className="space-y-4 animate-fade-in">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={`Write your answer here...\n\nAim for ${questionMarks} point${questionMarks !== 1 ? "s" : ""} — one per mark.`}
            rows={8}
            className="w-full border rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-emerald-500/40 transition-all resize-none leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
              {answer.trim() ? `${answer.split(/\s+/).filter(Boolean).length} words` : ""}
            </span>
            <div className="flex items-center gap-3">
              {result && (
                <button onClick={() => setTab("result")} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                  View last result
                </button>
              )}
              <button
                onClick={handleMark}
                disabled={loading || !answer.trim()}
                className="btn-primary inline-flex items-center gap-2 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Marking...</>
                ) : (
                  <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Mark my answer</>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4">
              <p className="text-sm text-red-400 mb-1">{error.message}</p>
              {error.upgradeRequired && (
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Free tier: 5 markings/day.{" "}
                  <Link href="/billing" className="text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1">Upgrade to Pro <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
                </p>
              )}
            </div>
          )}

          {!isPro && (
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              Free tier · 5 AI markings/day ·{" "}
              <Link href="/billing" className="text-emerald-400 hover:text-emerald-300 hover:underline">Upgrade for unlimited</Link>
            </p>
          )}
        </div>
      )}

      {tab === "result" && result && g && (
        <div className="space-y-5 animate-fade-in">
          {/* Score header */}
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display font-bold text-5xl">{result.score}</span>
                <span className="text-gray-400 text-xl font-display">/ {result.maxScore}</span>
              </div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${g.badge}`}>
                {result.grade}
              </span>
            </div>
            <div className={`font-display font-bold text-4xl ${result.percentage >= 70 ? "text-green-400" : result.percentage >= 50 ? "text-yellow-400" : "text-red-400"}`}>
              {result.percentage}%
            </div>
          </div>

          {/* Bar */}
          <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className={`h-full rounded-full bg-gradient-to-r ${g.bar} transition-all duration-700`}
              style={{ width: `${Math.min(100, Math.max(0, result.percentage))}%` }}
            />
          </div>

          {/* Feedback grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="glass rounded-xl p-4 border border-green-500/20 bg-green-500/[0.06]">
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">What you got right</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{result.whatYouGotRight}</p>
            </div>

            <div className="glass rounded-xl p-4 border border-red-500/20 bg-red-500/[0.06]">
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">What&apos;s missing</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{result.whatsMissing}</p>
            </div>
          </div>

          {/* Examiner tip */}
          <div className="glass rounded-xl p-4 border border-emerald-500/20 bg-emerald-500/[0.06]">
            <div className="flex items-center gap-1.5 mb-2">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Examiner&apos;s tip</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{result.examinerTip}</p>
          </div>

          {/* Model answer */}
          <details className="group">
            <summary className="cursor-pointer text-xs font-mono uppercase tracking-widest transition-colors list-none flex items-center gap-2 hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
              <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Model answer (full marks)
            </summary>
            <div className="mt-3 glass rounded-xl p-4 border" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(255,255,255,0.6)" }}>{result.improvedAnswer}</p>
            </div>
          </details>

          <button onClick={() => { setTab("answer"); setResult(null); setAnswer(""); }} className="text-sm transition-colors inline-flex items-center gap-1 hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
