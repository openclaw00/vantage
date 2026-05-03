import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const userId = session.user.id;

  const [attempts, recentAttempts] = await Promise.all([
    prisma.questionAttempt.findMany({
      where: { userId },
      include: {
        question: {
          include: { subject: true, topic: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.questionAttempt.findMany({
      where: { userId },
      include: {
        question: { include: { subject: true, topic: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const total = attempts.length;
  const scored = attempts.filter((a) => a.aiScore !== null && a.aiMaxScore !== null);
  const avgScore =
    scored.length > 0
      ? Math.round(
          (scored.reduce((sum, a) => sum + (a.aiScore! / a.aiMaxScore!) * 100, 0) /
            scored.length)
        )
      : 0;

  // Topic performance breakdown
  const topicMap: Record<string, { name: string; attempts: number; totalPct: number }> = {};
  for (const attempt of attempts) {
    if (!attempt.question.topic) continue;
    const tid = attempt.question.topic.id;
    if (!topicMap[tid]) {
      topicMap[tid] = { name: attempt.question.topic.name, attempts: 0, totalPct: 0 };
    }
    topicMap[tid].attempts++;
    if (attempt.aiScore !== null && attempt.aiMaxScore !== null) {
      topicMap[tid].totalPct += (attempt.aiScore / attempt.aiMaxScore) * 100;
    }
  }

  const topicPerformance = Object.entries(topicMap)
    .map(([id, data]) => ({
      id,
      name: data.name,
      attempts: data.attempts,
      avgScore: Math.round(data.totalPct / data.attempts),
    }))
    .sort((a, b) => a.avgScore - b.avgScore);

  const weakTopics = topicPerformance.filter((t) => t.avgScore < 60).slice(0, 3);

  // Score over time (last 14 days)
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const recentScored = scored.filter((a) => new Date(a.createdAt) >= twoWeeksAgo);

  const scoreOverTime = recentScored.map((a) => ({
    date: a.createdAt.toISOString().split("T")[0],
    score: Math.round((a.aiScore! / a.aiMaxScore!) * 100),
    subject: a.question.subject.name,
  }));

  return NextResponse.json({
    totalAttempts: total,
    avgScore,
    questionsToday: attempts.filter((a) => {
      const d = new Date(a.createdAt);
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    }).length,
    weakTopics,
    topicPerformance,
    scoreOverTime,
    recentAttempts,
  });
}
