import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

async function getDashboardData(userId: string) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [allAttempts, recentAttempts, totalQuestions] = await Promise.all([
    prisma.questionAttempt.findMany({
      where: { userId },
      include: {
        question: { include: { subject: true, topic: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.questionAttempt.findMany({
      where: { userId },
      include: {
        question: { include: { subject: true, topic: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.question.count(),
  ]);

  const scored = allAttempts.filter((a) => a.aiScore !== null && a.aiMaxScore !== null);
  const avgScore =
    scored.length > 0
      ? Math.round(scored.reduce((s, a) => s + (a.aiScore! / a.aiMaxScore!) * 100, 0) / scored.length)
      : 0;

  const today = allAttempts.filter((a) => a.createdAt >= todayStart).length;

  // Topic performance
  const topicMap: Record<string, { name: string; subject: string; attempts: number; total: number }> = {};
  for (const a of allAttempts) {
    if (!a.question.topic) continue;
    const tid = a.question.topic.id;
    if (!topicMap[tid]) {
      topicMap[tid] = { name: a.question.topic.name, subject: a.question.subject.name, attempts: 0, total: 0 };
    }
    topicMap[tid].attempts++;
    if (a.aiScore !== null && a.aiMaxScore !== null) {
      topicMap[tid].total += (a.aiScore / a.aiMaxScore) * 100;
    }
  }

  const topicPerformance = Object.entries(topicMap)
    .map(([id, d]) => ({
      id,
      name: d.name,
      subject: d.subject,
      attempts: d.attempts,
      avgScore: Math.round(d.total / d.attempts),
    }))
    .sort((a, b) => a.avgScore - b.avgScore);

  // Score over time (last 30 days, one point per attempt)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const scoreOverTime = scored
    .filter((a) => a.createdAt >= thirtyDaysAgo)
    .reverse()
    .map((a, i) => ({
      index: i + 1,
      date: a.createdAt.toISOString().split("T")[0],
      score: Math.round((a.aiScore! / a.aiMaxScore!) * 100),
      subject: a.question.subject.name,
    }));

  return {
    totalAttempts: allAttempts.length,
    avgScore,
    questionsToday: today,
    totalQuestions,
    weakTopics: topicPerformance.slice(0, 3),
    topicPerformance,
    scoreOverTime,
    recentAttempts,
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const data = await getDashboardData(session!.user.id);
  const firstName = session!.user.name?.split(" ")[0] ?? "Student";

  const statCards = [
    {
      label: "Questions attempted",
      value: data.totalAttempts,
      sub: `of ${data.totalQuestions} available`,
      color: "text-[var(--color-text)]",
    },
    {
      label: "Average score",
      value: data.avgScore ? `${data.avgScore}%` : "—",
      sub: data.avgScore >= 70 ? "Good progress" : data.avgScore > 0 ? "Room to improve" : "No scored attempts yet",
      color: data.avgScore >= 70 ? "text-green-400" : data.avgScore >= 50 ? "text-[var(--color-amber-light)]" : "text-[var(--color-text)]",
    },
    {
      label: "Questions today",
      value: data.questionsToday,
      sub: "keep the streak going",
      color: "text-[var(--color-amber-light)]",
    },
    {
      label: "Weak topics",
      value: data.weakTopics.length,
      sub: data.weakTopics.length > 0 ? "need attention" : "great coverage!",
      color: data.weakTopics.length > 0 ? "text-red-400" : "text-green-400",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-4xl text-[var(--color-text)]">
          Good {getGreeting()}, {firstName}.
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          {data.totalAttempts === 0
            ? "Start by attempting a question from the question bank."
            : `You've attempted ${data.totalAttempts} question${data.totalAttempts !== 1 ? "s" : ""}${data.avgScore > 0 ? ` with an average score of ${data.avgScore}%` : ""}.`}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="card p-5">
            <div className="text-xs font-mono text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
              {card.label}
            </div>
            <div className={`font-serif text-4xl mb-1 ${card.color}`}>{card.value}</div>
            <div className="text-xs text-[var(--color-text-faint)]">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts + weak topics row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score over time chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium text-[var(--color-text)]">Score over time</h2>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">LAST 30 DAYS</span>
          </div>
          {data.scoreOverTime.length > 0 ? (
            <DashboardCharts data={data.scoreOverTime} />
          ) : (
            <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[var(--color-text-faint)] text-sm mb-3">No attempts yet</div>
                <Link
                  href="/questions"
                  className="text-[var(--color-amber)] text-sm hover:underline"
                >
                  Start with a question →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Weak topics */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium text-[var(--color-text)]">Weak topics</h2>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">PRIORITY</span>
          </div>
          {data.weakTopics.length > 0 ? (
            <div className="space-y-4">
              {data.weakTopics.map((topic) => (
                <div key={topic.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--color-text)]">{topic.name}</span>
                    <span className="font-mono text-xs text-red-400">{topic.avgScore}%</span>
                  </div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill bg-red-500"
                      style={{ width: `${topic.avgScore}%` }}
                    />
                  </div>
                  <div className="text-xs text-[var(--color-text-faint)] mt-0.5">
                    {topic.subject} · {topic.attempts} attempt{topic.attempts !== 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>
          ) : data.totalAttempts > 0 ? (
            <div className="text-sm text-[var(--color-text-muted)]">
              Great work — no weak topics detected yet.
            </div>
          ) : (
            <div className="text-sm text-[var(--color-text-muted)]">
              Weak topics will appear here after you attempt questions.
            </div>
          )}
        </div>
      </div>

      {/* Recent attempts */}
      {data.recentAttempts.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
            <h2 className="font-medium text-[var(--color-text)]">Recent attempts</h2>
            <Link href="/questions" className="text-xs text-[var(--color-amber)] hover:underline">
              All questions →
            </Link>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {data.recentAttempts.map((attempt) => {
              const pct =
                attempt.aiScore !== null && attempt.aiMaxScore !== null
                  ? Math.round((attempt.aiScore / attempt.aiMaxScore) * 100)
                  : null;
              return (
                <Link
                  key={attempt.id}
                  href={`/questions/${attempt.questionId}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--color-surface-2)] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        Q{attempt.question.questionNumber}
                      </span>
                      <span className="text-xs text-[var(--color-text-faint)]">
                        {attempt.question.subject.name}
                      </span>
                      {attempt.question.topic && (
                        <>
                          <span className="text-[var(--color-text-faint)]">·</span>
                          <span className="text-xs text-[var(--color-text-faint)]">
                            {attempt.question.topic.name}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] truncate">
                      {attempt.question.content.substring(0, 80)}...
                    </p>
                  </div>
                  {pct !== null && (
                    <div
                      className={`font-mono text-sm shrink-0 ${
                        pct >= 70 ? "text-green-400" : pct >= 50 ? "text-[var(--color-amber-light)]" : "text-red-400"
                      }`}
                    >
                      {pct}%
                    </div>
                  )}
                  <svg className="w-4 h-4 text-[var(--color-text-faint)] group-hover:text-[var(--color-text-muted)] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state CTA */}
      {data.totalAttempts === 0 && (
        <div className="card p-12 text-center">
          <div className="font-serif text-3xl text-[var(--color-text)] mb-3">
            Ready to start?
          </div>
          <p className="text-[var(--color-text-muted)] mb-6 text-sm max-w-sm mx-auto">
            Browse the question bank, attempt a question, and get instant AI marking against the
            official mark scheme.
          </p>
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 bg-[var(--color-amber)] text-black px-6 py-3 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-colors"
          >
            Browse questions
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
