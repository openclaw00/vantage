"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback } from "react";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { LevelBadge } from "@/components/ui/LevelBadge";

interface Question {
  id: string;
  year: number;
  questionNumber: string;
  marks: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  content: string;
  subjectId: string;
  subject: { id: string; name: string; code: string; color: string; examBoard: string; level: string };
  topic: { id: string; name: string } | null;
  _count: { attempts: number };
}

interface Subject { id: string; name: string; code: string; examBoard: string; level: string }
interface Topic   { id: string; name: string; subjectId: string }

interface Props {
  questions: Question[];
  total: number;
  page: number;
  totalPages: number;
  subjects: Subject[];
  topics: Topic[];
  years: number[];
  filters: { subject?: string; topic?: string; difficulty?: string; year?: string };
}

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;

export function QuestionList({ questions, total, page, totalPages, subjects, topics, years, filters }: Props) {
  const router   = useRouter();
  const pathname = usePathname();
  const sp       = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(sp.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      if (key === "subject") params.delete("topic");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, sp]
  );

  const filteredTopics = filters.subject
    ? topics.filter((t) => t.subjectId === filters.subject)
    : topics;

  return (
    <div className="flex gap-6">
      {/* Filters sidebar */}
      <aside className="hidden lg:block w-52 shrink-0 space-y-6">
        {/* Subject */}
        <div>
          <div className="font-mono text-[10px] text-[var(--color-text-faint)] uppercase tracking-widest mb-2">
            Subject
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => updateFilter("subject", undefined)}
              className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
                !filters.subject
                  ? "bg-[var(--color-amber-pale)] text-[var(--color-amber-light)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
              }`}
            >
              All subjects
            </button>
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => updateFilter("subject", s.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
                  filters.subject === s.id
                    ? "bg-[var(--color-amber-pale)] text-[var(--color-amber-light)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        {filteredTopics.length > 0 && (
          <div>
            <div className="font-mono text-[10px] text-[var(--color-text-faint)] uppercase tracking-widest mb-2">
              Topic
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => updateFilter("topic", undefined)}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                  !filters.topic
                    ? "text-[var(--color-amber-light)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                All topics
              </button>
              {filteredTopics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateFilter("topic", t.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                    filters.topic === t.id
                      ? "text-[var(--color-amber-light)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div>
          <div className="font-mono text-[10px] text-[var(--color-text-faint)] uppercase tracking-widest mb-2">
            Difficulty
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => updateFilter("difficulty", undefined)}
              className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
                !filters.difficulty
                  ? "text-[var(--color-amber-light)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              All
            </button>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => updateFilter("difficulty", d)}
                className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors flex items-center gap-2 ${
                  filters.difficulty === d
                    ? "text-[var(--color-amber-light)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    d === "EASY" ? "bg-green-400" : d === "MEDIUM" ? "bg-amber-400" : "bg-red-400"
                  }`}
                />
                {d.charAt(0) + d.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <div className="font-mono text-[10px] text-[var(--color-text-faint)] uppercase tracking-widest mb-2">
            Year
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => updateFilter("year", undefined)}
              className={`w-full text-left px-2.5 py-1.5 rounded text-sm transition-colors ${
                !filters.year
                  ? "text-[var(--color-amber-light)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              All years
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => updateFilter("year", String(y))}
                className={`w-full text-left px-2.5 py-1.5 rounded text-sm font-mono transition-colors ${
                  filters.year === String(y)
                    ? "text-[var(--color-amber-light)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Clear filters */}
        {(filters.subject || filters.topic || filters.difficulty || filters.year) && (
          <button
            onClick={() => router.push(pathname)}
            className="text-xs text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
          >
            ✕ Clear all filters
          </button>
        )}
      </aside>

      {/* Question list */}
      <div className="flex-1 min-w-0 space-y-3">
        {questions.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-[var(--color-text-muted)] mb-2">No questions match your filters.</div>
            <button
              onClick={() => router.push(pathname)}
              className="text-sm text-[var(--color-amber)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          questions.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="card flex items-start gap-4 p-5 hover:border-[var(--color-border-2)] hover:bg-[var(--color-surface-2)] transition-all group block"
            >
              <div className="shrink-0 pt-0.5">
                <div
                  className="font-mono text-xs leading-none"
                  style={{ color: q.subject.color }}
                >
                  {q.questionNumber}
                </div>
                <div className="font-mono text-[10px] text-[var(--color-text-faint)] mt-1">
                  {q.year}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${q.subject.color}20`,
                      color: q.subject.color,
                    }}
                  >
                    {q.subject.name}
                  </span>
                  {q.topic && (
                    <span className="text-xs text-[var(--color-text-faint)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
                      {q.topic.name}
                    </span>
                  )}
                  <LevelBadge level={q.subject.level as "IGCSE" | "A_LEVEL" | "IB_SL" | "IB_HL"} />
                  <DifficultyBadge difficulty={q.difficulty} />
                </div>

                <p className="text-sm text-[var(--color-text)] leading-relaxed line-clamp-2">
                  {q.content}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-mono text-sm text-[var(--color-text-muted)]">
                  [{q.marks}m]
                </div>
                {q._count.attempts > 0 && (
                  <div className="font-mono text-[10px] text-[var(--color-text-faint)] mt-0.5">
                    {q._count.attempts} attempt{q._count.attempts !== 1 ? "s" : ""}
                  </div>
                )}
              </div>

              <svg
                className="w-4 h-4 text-[var(--color-text-faint)] group-hover:text-[var(--color-text-muted)] transition-colors shrink-0 mt-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              {total} questions · page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`${pathname}?${new URLSearchParams({ ...Object.fromEntries(
                    Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
                  ), page: String(page - 1) })}`}
                  className="px-3 py-1.5 border border-[var(--color-border)] rounded text-xs text-[var(--color-text-muted)] hover:border-[var(--color-border-2)] hover:text-[var(--color-text)] transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`${pathname}?${new URLSearchParams({ ...Object.fromEntries(
                    Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
                  ), page: String(page + 1) })}`}
                  className="px-3 py-1.5 border border-[var(--color-border)] rounded text-xs text-[var(--color-text-muted)] hover:border-[var(--color-border-2)] hover:text-[var(--color-text)] transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
