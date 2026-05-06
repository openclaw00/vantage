import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getTotalQuestions } from "@/lib/queries";
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
      include: { question: { include: { subject: true, topic: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.questionAttempt.findMany({
      where: { userId },
      include: { question: { include: { subject: true, topic: true } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    getTotalQuestions(),
  ]);

  const scored = allAttempts.filter((a) => a.aiScore !== null && a.aiMaxScore !== null);
  const avgScore =
    scored.length > 0
      ? Math.round(scored.reduce((s, a) => s + (a.aiScore! / a.aiMaxScore!) * 100, 0) / scored.length)
      : 0;

  const today = allAttempts.filter((a) => a.createdAt >= todayStart).length;

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

const STAT_ACCENTS = [
  { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>, grad: "from-blue-500 to-indigo-500", glow: "rgba(99,102,241,0.18)", ring: "rgba(99,102,241,0.25)" },
  { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>, grad: "from-green-600 to-emerald-400", glow: "rgba(22,163,74,0.18)", ring: "rgba(22,163,74,0.25)" },
  { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, grad: "from-teal-500 to-cyan-400", glow: "rgba(20,184,166,0.18)", ring: "rgba(20,184,166,0.25)" },
  { icon: <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>, grad: "from-rose-500 to-pink-400", glow: "rgba(244,63,94,0.18)", ring: "rgba(244,63,94,0.25)" },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const data = await getDashboardData(session!.user.id);
  const firstName = session!.user.name?.split(" ")[0] ?? "Student";

  const statCards = [
    {
      label: "Questions attempted",
      value: data.totalAttempts,
      sub: `of ${data.totalQuestions} available`,
      color: "text-indigo-600",
    },
    {
      label: "Average score",
      value: data.avgScore ? `${data.avgScore}%` : "—",
      sub: data.avgScore >= 70 ? "Good progress" : data.avgScore > 0 ? "Room to improve" : "No scored attempts yet",
      color: data.avgScore >= 70 ? "text-emerald-400" : data.avgScore >= 50 ? "text-yellow-400" : "text-white/40",
    },
    {
      label: "Questions today",
      value: data.questionsToday,
      sub: "keep the streak going",
      color: "text-emerald-600",
    },
    {
      label: "Weak topics",
      value: data.weakTopics.length,
      sub: data.weakTopics.length > 0 ? "need attention" : "great coverage!",
      color: data.weakTopics.length > 0 ? "text-rose-500" : "text-emerald-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-enter-1">
        <h1 className="font-bold text-4xl text-white tracking-tight">
          Good {getGreeting()}, {firstName}.
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "rgba(240,253,244,0.45)" }}>
          {data.totalAttempts === 0
            ? "Start by attempting a question from the question bank."
            : `You've attempted ${data.totalAttempts} question${data.totalAttempts !== 1 ? "s" : ""}${data.avgScore > 0 ? ` with an average score of ${data.avgScore}%` : ""}.`}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const accent = STAT_ACCENTS[i];
          return (
            <div
              key={card.label}
              className={`stat-card p-5 animate-enter-${i + 2}`}
            >
              {/* Accent glow blob */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`, filter: "blur(12px)" }}
              />
              {/* Icon badge */}
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accent.grad} flex items-center justify-center mb-3 text-sm shadow-sm`}
                style={{ boxShadow: `0 2px 10px ${accent.ring}` }}
              >
                {accent.icon}
              </div>
              <div className="text-[10px] font-mono mb-1.5 uppercase tracking-widest" style={{ color: "rgba(240,253,244,0.38)" }}>
                {card.label}
              </div>
              <div className={`font-display font-bold text-3xl mb-1 ${card.color}`}>{card.value}</div>
              <div className="text-xs" style={{ color: "rgba(240,253,244,0.38)" }}>{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts + weak topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score over time */}
        <div className="lg:col-span-2 card p-6 animate-enter-6 relative overflow-hidden">
          {/* Subtle gradient wash */}
          <div className="relative flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-white text-sm">Score over time</h2>
              <p className="text-xs mt-0.5" style={{ color: "rgba(240,253,244,0.38)" }}>Your last 30 days of attempts</p>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ color: "rgba(240,253,244,0.4)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              LAST 30 DAYS
            </span>
          </div>
          {data.scoreOverTime.length > 0 ? (
            <div className="relative">
              <DashboardCharts data={data.scoreOverTime} />
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm mb-3" style={{ color: "rgba(240,253,244,0.38)" }}>No attempts yet</div>
                <Link href="/questions" className="text-sm hover:underline font-medium text-white inline-flex items-center gap-1">
                  Start with a question
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Weak topics */}
        <div className="card p-6 animate-enter-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-[20px]" style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.04) 0%, transparent 60%)" }} />
          <div className="relative flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-white text-sm">Weak topics</h2>
              <p className="text-xs mt-0.5" style={{ color: "rgba(240,253,244,0.38)" }}>Focus areas for improvement</p>
            </div>
            <span className="font-mono text-[10px] text-rose-400 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
              PRIORITY
            </span>
          </div>
          {data.weakTopics.length > 0 ? (
            <div className="relative space-y-5">
              {data.weakTopics.map((topic, idx) => (
                <div key={topic.id} style={{ animationDelay: `${0.1 * idx}s` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-medium">{topic.name}</span>
                    <span className="font-mono text-xs text-rose-500 font-semibold">{topic.avgScore}%</span>
                  </div>
                  <div className="score-bar">
                    <div className="score-bar-fill" style={{ width: `${topic.avgScore}%`, background: "linear-gradient(90deg, #dc2626, #ef4444)" }} />
                  </div>
                  <div className="text-[10px] mt-1 font-mono" style={{ color: "rgba(240,253,244,0.3)" }}>
                    {topic.subject} · {topic.attempts} attempt{topic.attempts !== 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>
          ) : data.totalAttempts > 0 ? (
            <div className="relative text-sm" style={{ color: "rgba(240,253,244,0.45)" }}>Great work — no weak topics detected yet.</div>
          ) : (
            <div className="relative text-sm" style={{ color: "rgba(240,253,244,0.45)" }}>Weak topics will appear here after you attempt questions.</div>
          )}
        </div>
      </div>

      {/* Recent attempts */}
      {data.recentAttempts.length > 0 && (
        <div className="card overflow-hidden animate-enter-6">
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <h2 className="font-semibold text-white text-sm">Recent attempts</h2>
              <p className="text-xs mt-0.5" style={{ color: "rgba(240,253,244,0.38)" }}>Your latest practice sessions</p>
            </div>
            <Link href="/questions" className="text-xs font-medium transition-colors text-white/40 hover:text-white inline-flex items-center gap-1">
              All questions
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div>
            {data.recentAttempts.map((attempt, idx) => {
              const pct =
                attempt.aiScore !== null && attempt.aiMaxScore !== null
                  ? Math.round((attempt.aiScore / attempt.aiMaxScore) * 100)
                  : null;
              return (
                <Link
                  key={attempt.id}
                  href={`/questions/${attempt.questionId}`}
                  className="flex items-center gap-4 px-6 py-4 group transition-all duration-150 hover:bg-white/[0.03]"
                  style={{ borderBottom: idx < data.recentAttempts.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                >
                  {/* Score ring */}
                  {pct !== null && (
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0`}
                      style={{
                        background: pct >= 70 ? "linear-gradient(135deg,#15803d,#22c55e)" : pct >= 50 ? "linear-gradient(135deg,#d97706,#fbbf24)" : "linear-gradient(135deg,#dc2626,#f87171)",
                        color: "white",
                        boxShadow: pct >= 70 ? "0 2px 8px rgba(22,163,74,0.35)" : pct >= 50 ? "0 2px 8px rgba(217,119,6,0.3)" : "0 2px 8px rgba(220,38,38,0.3)"
                      }}
                    >
                      {pct}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs" style={{ color: "rgba(240,253,244,0.45)" }}>Q{attempt.question.questionNumber}</span>
                      <span className="text-xs" style={{ color: "rgba(240,253,244,0.38)" }}>{attempt.question.subject.name}</span>
                      {attempt.question.topic && (
                        <>
                          <span style={{ color: "rgba(240,253,244,0.2)" }}>·</span>
                          <span className="text-xs" style={{ color: "rgba(240,253,244,0.38)" }}>{attempt.question.topic.name}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm truncate" style={{ color: "rgba(240,253,244,0.45)" }}>
                      {attempt.question.content.substring(0, 80)}...
                    </p>
                  </div>
                  <svg className="w-4 h-4 shrink-0 transition-colors" style={{ color: "rgba(240,253,244,0.22)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
        <div className="card p-12 text-center relative overflow-hidden animate-enter-6">
          <div className="relative">
            <div className="text-white/60 mb-4 flex justify-center">
              <svg className="w-10 h-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
              </svg>
            </div>
            <div className="font-display text-2xl text-white mb-2 font-bold">Ready to start?</div>
            <p className="mb-7 text-sm max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(240,253,244,0.45)" }}>
              Browse the question bank, attempt a question, and get instant AI marking against the official mark scheme.
            </p>
            <Link
              href="/questions"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3"
            >
              Browse questions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
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
