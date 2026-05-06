"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCallback, useMemo, useState, useTransition } from "react";
import { useTopLoader } from "nextjs-toploader";
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
  page: number;
  pageSize: number;
  subjects: Subject[];
  topics: Topic[];
  years: number[];
  filters: { subject?: string; topic?: string; difficulty?: string; year?: string };
}

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;

const filterBtn = (active: boolean) => ({
  background: active ? "rgba(34,197,94,0.12)" : "transparent",
  border: active ? "1px solid rgba(34,197,94,0.25)" : "1px solid transparent",
  color: active ? "#4ade80" : "rgba(240,253,244,0.45)",
  borderRadius: "8px",
});

export function QuestionList({ questions, page, pageSize, subjects, topics, years, filters: initialFilters }: Props) {
  const pathname = usePathname();
  const loader   = useTopLoader();
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(page);
  const [, startTransition] = useTransition();

  const updateUrl = useCallback(
    (nextFilters: Props["filters"], nextPage: number) => {
      const params = new URLSearchParams();
      if (nextFilters.subject) params.set("subject", nextFilters.subject);
      if (nextFilters.topic) params.set("topic", nextFilters.topic);
      if (nextFilters.difficulty) params.set("difficulty", nextFilters.difficulty);
      if (nextFilters.year) params.set("year", nextFilters.year);
      if (nextPage > 1) params.set("page", String(nextPage));

      const query = params.toString();
      window.history.pushState(null, "", query ? `${pathname}?${query}` : pathname);
    },
    [pathname]
  );

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      startTransition(() => {
        const nextFilters = { ...filters, [key]: value };
        if (!value) delete nextFilters[key as keyof typeof nextFilters];
        if (key === "subject") delete nextFilters.topic;

        setFilters(nextFilters);
        setCurrentPage(1);
        updateUrl(nextFilters, 1);
      });
    },
    [filters, updateUrl]
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setFilters({});
      setCurrentPage(1);
      updateUrl({}, 1);
    });
  }, [updateUrl]);

  const goToPage = useCallback(
    (targetPage: number) => {
      startTransition(() => {
        setCurrentPage(targetPage);
        updateUrl(filters, targetPage);
      });
    },
    [filters, updateUrl]
  );

  const filteredTopics = filters.subject ? topics.filter((t) => t.subjectId === filters.subject) : topics;
  const startLoader = useCallback(() => {
    loader.start();
    window.setTimeout(() => loader.done(), 150);
  }, [loader]);

  const filteredQuestions = useMemo(
    () =>
      questions.filter((q) => {
        if (filters.subject && q.subjectId !== filters.subject) return false;
        if (filters.topic && q.topic?.id !== filters.topic) return false;
        if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
        if (filters.year && q.year !== Number.parseInt(filters.year, 10)) return false;
        return true;
      }),
    [filters, questions]
  );

  const total = filteredQuestions.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const visibleQuestions = filteredQuestions.slice((safePage - 1) * pageSize, safePage * pageSize);

  const filterLabel = "font-mono text-[10px] uppercase tracking-widest mb-2 block";

  return (
    <div className="flex gap-6">
      {/* ── Filters sidebar ── */}
      <aside className="hidden lg:block w-52 shrink-0 space-y-6">
        {/* Subject */}
        <div>
          <span className={filterLabel} style={{ color: "rgba(240,253,244,0.28)" }}>Subject</span>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => { startLoader(); updateFilter("subject", undefined); }}
              className="block w-full text-left px-2.5 py-1.5 text-sm transition-all duration-150"
              style={filterBtn(!filters.subject)}
            >
              All subjects
            </button>
            {subjects.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { startLoader(); updateFilter("subject", s.id); }}
                className="block w-full text-left px-2.5 py-1.5 text-sm transition-all duration-150"
                style={filterBtn(filters.subject === s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        {filteredTopics.length > 0 && (
          <div>
            <span className={filterLabel} style={{ color: "rgba(240,253,244,0.28)" }}>Topic</span>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => { startLoader(); updateFilter("topic", undefined); }}
                className="block w-full text-left px-2.5 py-1.5 text-xs transition-all duration-150"
                style={filterBtn(!filters.topic)}
              >
                All topics
              </button>
              {filteredTopics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { startLoader(); updateFilter("topic", t.id); }}
                  className="block w-full text-left px-2.5 py-1.5 text-xs transition-all duration-150"
                  style={filterBtn(filters.topic === t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div>
          <span className={filterLabel} style={{ color: "rgba(240,253,244,0.28)" }}>Difficulty</span>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => { startLoader(); updateFilter("difficulty", undefined); }}
              className="block w-full text-left px-2.5 py-1.5 text-sm transition-all duration-150"
              style={filterBtn(!filters.difficulty)}
            >
              All
            </button>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => { startLoader(); updateFilter("difficulty", d); }}
                className="block w-full text-left px-2.5 py-1.5 text-sm transition-all duration-150 flex items-center gap-2"
                style={filterBtn(filters.difficulty === d)}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  d === "EASY" ? "bg-green-400" : d === "MEDIUM" ? "bg-yellow-400" : "bg-red-400"
                }`} />
                {d.charAt(0) + d.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <span className={filterLabel} style={{ color: "rgba(240,253,244,0.28)" }}>Year</span>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => { startLoader(); updateFilter("year", undefined); }}
              className="block w-full text-left px-2.5 py-1.5 text-sm transition-all duration-150"
              style={filterBtn(!filters.year)}
            >
              All years
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => { startLoader(); updateFilter("year", String(y)); }}
                className="block w-full text-left px-2.5 py-1.5 text-sm font-mono transition-all duration-150"
                style={filterBtn(filters.year === String(y))}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {(filters.subject || filters.topic || filters.difficulty || filters.year) && (
          <button
            type="button"
            onClick={() => { startLoader(); clearFilters(); }}
            className="text-xs transition-colors inline-flex items-center gap-1"
            style={{ color: "rgba(240,253,244,0.3)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4ade80"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,253,244,0.3)"; }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            Clear all filters
          </button>
        )}
      </aside>

      {/* ── Question list ── */}
      <div className="flex-1 min-w-0 space-y-3">
        {visibleQuestions.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div className="mb-2" style={{ color: "rgba(240,253,244,0.45)" }}>No questions match your filters.</div>
            <button
              type="button"
              onClick={() => { startLoader(); clearFilters(); }}
              className="text-sm transition-colors"
              style={{ color: "#4ade80" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          visibleQuestions.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              onClick={startLoader}
              className="rounded-2xl flex items-start gap-4 p-5 transition-all duration-200 group block"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,197,94,0.05)";
                (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(34,197,94,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(255,255,255,0.08)";
              }}
            >
              {/* Q number + year */}
              <div className="shrink-0 pt-0.5">
                <div className="font-mono text-xs leading-none" style={{ color: q.subject.color }}>
                  {q.questionNumber}
                </div>
                <div className="font-mono text-[10px] mt-1" style={{ color: "rgba(240,253,244,0.28)" }}>
                  {q.year}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${q.subject.color}22`,
                      color: q.subject.color,
                      border: `1px solid ${q.subject.color}44`,
                    }}
                  >
                    {q.subject.name}
                  </span>
                  {q.topic && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      color: "rgba(240,253,244,0.45)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                      {q.topic.name}
                    </span>
                  )}
                  <LevelBadge level={q.subject.level as "IGCSE" | "A_LEVEL" | "IB_SL" | "IB_HL"} />
                  <DifficultyBadge difficulty={q.difficulty} />
                </div>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(240,253,244,0.72)" }}>
                  {q.content}
                </p>
              </div>

              {/* Marks + attempts */}
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm" style={{ color: "rgba(240,253,244,0.45)" }}>
                  [{q.marks}m]
                </div>
                {q._count.attempts > 0 && (
                  <div className="font-mono text-[10px] mt-0.5" style={{ color: "rgba(240,253,244,0.28)" }}>
                    {q._count.attempts} attempt{q._count.attempts !== 1 ? "s" : ""}
                  </div>
                )}
              </div>

              <svg
                className="w-4 h-4 shrink-0 mt-0.5 transition-colors"
                style={{ color: "rgba(240,253,244,0.22)" }}
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
            <span className="text-xs font-mono" style={{ color: "rgba(240,253,244,0.35)" }}>
              {total} questions · page {safePage} of {totalPages}
            </span>
            <div className="flex gap-2">
              {safePage > 1 && (
                <button
                  type="button"
                  onClick={() => { startLoader(); goToPage(safePage - 1); }}
                  className="px-3 py-1.5 rounded text-xs transition-all duration-150"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(240,253,244,0.5)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                  Previous
                </button>
              )}
              {safePage < totalPages && (
                <button
                  type="button"
                  onClick={() => { startLoader(); goToPage(safePage + 1); }}
                  className="px-3 py-1.5 rounded text-xs transition-all duration-150"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(240,253,244,0.5)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  Next
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
