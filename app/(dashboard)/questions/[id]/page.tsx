import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { MarkSchemePanel } from "@/components/questions/MarkSchemePanel";
import { AIMarker } from "@/components/ai/AIMarker";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const q = await prisma.question.findUnique({
    where: { id: params.id },
    include: { subject: true },
  });
  if (!q) return { title: "Question not found" };
  return { title: `Q${q.questionNumber} · ${q.subject.name} ${q.year}` };
}

export default async function QuestionPage({ params }: { params: { id: string } }) {
  const [session, question] = await Promise.all([
    getServerSession(authOptions),
    prisma.question.findUnique({
      where: { id: params.id },
      include: {
        subject: true,
        topic: true,
      },
    }),
  ]);

  if (!question) notFound();

  // Previous attempt by this user
  const lastAttempt = session
    ? await prisma.questionAttempt.findFirst({
        where: { userId: session.user.id, questionId: question.id },
        orderBy: { createdAt: "desc" },
      })
    : null;

  const lastScore =
    lastAttempt?.aiScore !== null &&
    lastAttempt?.aiMaxScore !== null &&
    lastAttempt?.aiScore !== undefined &&
    lastAttempt?.aiMaxScore !== undefined
      ? Math.round((lastAttempt.aiScore / lastAttempt.aiMaxScore) * 100)
      : null;

  const isPro = session?.user.tier === "PRO";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6 font-mono">
        <Link href="/questions" className="hover:text-[var(--color-text)] transition-colors">
          Question Bank
        </Link>
        <span className="text-[var(--color-text-faint)]">/</span>
        <span className="text-[var(--color-text-faint)]">
          {question.subject.name} · {question.year}
        </span>
      </nav>

      {/* Question header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-lg" style={{ color: question.subject.color }}>
            Q{question.questionNumber}
          </span>
          <span className="text-[var(--color-text-muted)] font-mono text-sm">{question.year}</span>
          {question.paper && (
            <span className="font-mono text-xs text-[var(--color-text-faint)] border border-[var(--color-border)] px-2 py-0.5 rounded">
              {question.paper}
            </span>
          )}
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${question.subject.color}20`, color: question.subject.color }}
          >
            {question.subject.name}
          </span>
          {question.topic && (
            <span className="text-xs text-[var(--color-text-faint)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
              {question.topic.name}
            </span>
          )}
          <LevelBadge level={question.subject.level as "IGCSE" | "A_LEVEL" | "IB_SL" | "IB_HL"} />
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        <div className="flex items-center gap-3">
          {lastScore !== null && (
            <div className={`font-mono text-sm ${lastScore >= 70 ? "text-green-400" : lastScore >= 50 ? "text-amber-400" : "text-red-400"}`}>
              Last: {lastScore}%
            </div>
          )}
          <div className="font-mono text-base text-[var(--color-text)]">
            [{question.marks} mark{question.marks !== 1 ? "s" : ""}]
          </div>
        </div>
      </div>

      {/* Main layout: question + mark scheme */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Question */}
        <div className="card p-6 xl:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
              Question
            </h2>
            <span className="font-mono text-xs text-[var(--color-text-faint)]">
              {question.subject.examBoard} · {question.subject.level.replace("_", "-")}
            </span>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-[var(--color-text)] leading-relaxed whitespace-pre-wrap text-base">
              {question.content}
            </p>
          </div>

          {question.examinerTip && (
            <div className="mt-6 border-t border-[var(--color-border)] pt-4">
              <div className="font-mono text-xs text-[var(--color-amber)] mb-1 uppercase tracking-wide">
                Examiner&apos;s tip
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {question.examinerTip}
              </p>
            </div>
          )}
        </div>

        {/* Mark scheme */}
        <MarkSchemePanel markScheme={question.markScheme} marks={question.marks} />
      </div>

      {/* AI Marking */}
      <div className="card">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <h2 className="font-medium text-[var(--color-text)]">AI Mark My Answer</h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Write your answer and get instant feedback against the mark scheme.
              {!session && " Sign in to use AI marking."}
              {session && !isPro && " Free tier: 5 markings per day."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] animate-pulse-slow" />
            <span className="font-mono text-xs text-[var(--color-amber)]">AI</span>
          </div>
        </div>

        {session ? (
          <AIMarker
            questionId={question.id}
            questionMarks={question.marks}
            isPro={isPro}
            previousAnswer={lastAttempt?.answer ?? undefined}
            previousFeedback={
              lastAttempt?.aiFeedback
                ? (JSON.parse(lastAttempt.aiFeedback) as import("@/lib/ai").MarkingResult)
                : undefined
            }
          />
        ) : (
          <div className="p-8 text-center">
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              Sign in to use AI marking and track your progress.
            </p>
            <Link
              href={`/login?callbackUrl=/questions/${question.id}`}
              className="inline-flex items-center gap-2 bg-[var(--color-amber)] text-black px-5 py-2.5 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-colors"
            >
              Sign in to continue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
