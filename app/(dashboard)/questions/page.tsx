import { prisma } from "@/lib/db";
import { getSubjects, getTopics } from "@/lib/queries";
import { QuestionList } from "@/components/questions/QuestionList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Question Bank" };

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { subject?: string; topic?: string; difficulty?: string; year?: string; page?: string };
}) {
  const page = parseInt(searchParams.page ?? "1");
  const limit = 15;

  const where: Record<string, unknown> = {};
  if (searchParams.subject)    where.subjectId  = searchParams.subject;
  if (searchParams.topic)      where.topicId    = searchParams.topic;
  if (searchParams.difficulty) where.difficulty = searchParams.difficulty;
  if (searchParams.year)       where.year       = parseInt(searchParams.year);

  const [questions, total, subjects, topics, yearsRaw] = await Promise.all([
    prisma.question.findMany({
      where,
      include: {
        subject: { select: { id: true, name: true, code: true, color: true, examBoard: true, level: true } },
        topic:   { select: { id: true, name: true } },
        _count:  { select: { attempts: true } },
      },
      orderBy: [{ year: "desc" }, { questionNumber: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.question.count({ where }),
    getSubjects(),
    getTopics(searchParams.subject),
    prisma.question.findMany({ select: { year: true }, distinct: ["year"], orderBy: { year: "desc" } }),
  ]);

  const years = yearsRaw.map((q) => q.year);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-[var(--color-text)]">Question Bank</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          {total} question{total !== 1 ? "s" : ""} · use the filters to find what you need.
        </p>
      </div>

      <QuestionList
        questions={questions as Parameters<typeof QuestionList>[0]["questions"]}
        total={total}
        page={page}
        totalPages={Math.ceil(total / limit)}
        subjects={subjects}
        topics={topics}
        years={years}
        filters={{
          subject: searchParams.subject,
          topic: searchParams.topic,
          difficulty: searchParams.difficulty,
          year: searchParams.year,
        }}
      />
    </div>
  );
}
