"use client";

import { useState } from "react";
import type { MarkingResult } from "@/lib/ai";
import Link from "next/link";

interface Props {
  questionId: string;
  questionMarks: number;
  isPro: boolean;
  previousAnswer?: string;
  previousFeedback?: MarkingResult;
}

const gradeColors: Record<string, string> = {
  Excellent:    "text-green-400 border-green-800/50 bg-green-900/10",
  Good:         "text-teal-400 border-teal-800/50 bg-teal-900/10",
  Satisfactory: "text-amber-400 border-amber-800/50 bg-amber-900/10",
  "Needs work": "text-orange-400 border-orange-800/50 bg-orange-900/10",
  Incomplete:   "text-red-400 border-red-800/50 bg-red-900/10",
};

const gradeBarColors: Record<string, string> = {
  Excellent:    "bg-green-400",
  Good:         "bg-teal-400",
  Satisfactory: "bg-amber-400",
  "Needs work": "bg-orange-400",
  Incomplete:   "bg-red-400",
};

export function AIMarker({ questionId, questionMarks, isPro, previousAnswer, previousFeedback }: Props) {
  const [answer, setAnswer] = useState(previousAnswer ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarkingResult | null>(previousFeedback ?? null);
  const [error, setError] = useState<{ message: string; upgradeRequired?: boolean } | null>(null);
  const [startTime] = useState(Date.now());
  const [activeTab, setActiveTab] = useState<"answer" | "result">(
    previousFeedback ? "result" : "answer"
  );

  const handleMark = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setError(null);

    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    const res = await fetch("/api/ai/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer, timeTaken }),
    });

    setLoading(false);

    if (!res.ok) {
      const json = await res.json();
      setError({ message: json.error ?? "Marking failed", upgradeRequired: json.upgradeRequired });
      return;
    }

    const data = await res.json() as MarkingResult;
    setResult(data);
    setActiveTab("result");
  };

  const handleReset = () => {
    setAnswer("");
    setResult(null);
    setError(null);
    setActiveTab("answer");
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--color-border)] mb-6">
        <button
          onClick={() => setActiveTab("answer")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "answer"
              ? "border-[var(--color-amber)] text-[var(--color-text)]"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
        >
          Your answer
        </button>
        {result && (
          <button
            onClick={() => setActiveTab("result")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "result"
                ? "border-[var(--color-amber)] text-[var(--color-text)]"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            AI feedback
          </button>
        )}
      </div>

      {activeTab === "answer" ? (
        <div className="space-y-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={`Write your answer here...\n\nTip: aim for ${questionMarks} point${questionMarks !== 1 ? "s" : ""} — one per mark available.`}
            rows={8}
            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-5 py-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <div className="text-xs text-[var(--color-text-faint)] font-mono">
              {answer.length > 0 && `${answer.split(/\s+/).filter(Boolean).length} words`}
            </div>
            <div className="flex items-center gap-3">
              {result && (
                <button
                  onClick={() => setActiveTab("result")}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  View last result
                </button>
              )}
              <button
                onClick={handleMark}
                disabled={loading || !answer.trim()}
                className="inline-flex items-center gap-2 bg-[var(--color-amber)] text-black px-5 py-2.5 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Marking...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mark my answer
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg px-5 py-4">
              <p className="text-sm text-red-400 mb-1">{error.message}</p>
              {error.upgradeRequired && (
                <div className="mt-2">
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    Free tier allows 5 AI markings per day. Upgrade to Pro for unlimited.
                  </p>
                  <Link
                    href="/billing"
                    className="text-xs text-[var(--color-amber)] hover:underline"
                  >
                    Upgrade to Pro →
                  </Link>
                </div>
              )}
            </div>
          )}

          {!isPro && (
            <p className="text-xs text-[var(--color-text-faint)] text-center">
              Free tier · 5 AI markings/day ·{" "}
              <Link href="/billing" className="text-[var(--color-amber)] hover:underline">
                Upgrade for unlimited
              </Link>
            </p>
          )}
        </div>
      ) : result ? (
        <div className="space-y-6 animate-fade-in">
          {/* Score header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-serif text-5xl text-[var(--color-text)]">
                  {result.score}
                </span>
                <span className="font-mono text-xl text-[var(--color-text-muted)]">
                  / {result.maxScore}
                </span>
              </div>
              <div
                className={`inline-block font-mono text-xs px-2.5 py-1 rounded-full border ${
                  gradeColors[result.grade] ?? gradeColors.Satisfactory
                }`}
              >
                {result.grade}
              </div>
            </div>
            <div className="text-right">
              <div className={`font-serif text-3xl ${
                result.percentage >= 70 ? "text-green-400" :
                result.percentage >= 50 ? "text-amber-400" : "text-red-400"
              }`}>
                {result.percentage}%
              </div>
              <div className="text-xs text-[var(--color-text-faint)] mt-0.5 font-mono">percentage</div>
            </div>
          </div>

          {/* Score bar */}
          <div className="score-bar h-2">
            <div
              className={`score-bar-fill ${gradeBarColors[result.grade] ?? "bg-amber-400"}`}
              style={{ width: `${result.percentage}%` }}
            />
          </div>

          {/* Feedback sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/10 border border-green-900/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="font-mono text-xs text-green-400 uppercase tracking-wide">
                  What you got right
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {result.whatYouGotRight}
              </p>
            </div>

            <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-mono text-xs text-red-400 uppercase tracking-wide">
                  What&apos;s missing
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {result.whatsMissing}
              </p>
            </div>
          </div>

          {/* Examiner tip */}
          <div className="bg-[var(--color-amber-pale)] border border-[var(--color-amber)]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-[var(--color-amber)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <span className="font-mono text-xs text-[var(--color-amber)] uppercase tracking-wide">
                Examiner&apos;s tip
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {result.examinerTip}
            </p>
          </div>

          {/* Model answer */}
          <details className="group">
            <summary className="cursor-pointer font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wide hover:text-[var(--color-text)] transition-colors list-none flex items-center gap-2">
              <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Model answer (full marks)
            </summary>
            <div className="mt-3 bg-[var(--color-surface-2)] rounded-lg p-4 border border-[var(--color-border)] animate-slide-down">
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed whitespace-pre-wrap">
                {result.improvedAnswer}
              </p>
            </div>
          </details>

          {/* Try again */}
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--color-border)]">
            <button
              onClick={handleReset}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              ← Try again with a new answer
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
