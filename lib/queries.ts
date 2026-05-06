import { unstable_cache } from "next/cache";
import { prisma } from "./db";
import type { Difficulty, Prisma } from "@prisma/client";

export const getSubjects = unstable_cache(
  () => prisma.subject.findMany({ orderBy: { name: "asc" } }),
  ["subjects"],
  { revalidate: 3600 }
);

export const getTopics = unstable_cache(
  (subjectId?: string) =>
    prisma.topic.findMany({
      where: subjectId ? { subjectId } : {},
      orderBy: { name: "asc" },
    }),
  ["topics"],
  { revalidate: 3600 }
);

export const getTotalQuestions = unstable_cache(
  () => prisma.question.count(),
  ["total-questions"],
  { revalidate: 3600 }
);

interface QuestionBankFilters {
  subject?: string;
  topic?: string;
  difficulty?: Difficulty;
  year?: number;
}

export const getQuestionYears = unstable_cache(
  () =>
    prisma.question.findMany({
      select: { year: true },
      distinct: ["year"],
      orderBy: { year: "desc" },
    }),
  ["question-years"],
  { revalidate: 3600 }
);

export const getQuestionBankPage = unstable_cache(
  async (filters: QuestionBankFilters, page: number, limit: number) => {
    const where: Prisma.QuestionWhereInput = {};
    if (filters.subject) where.subjectId = filters.subject;
    if (filters.topic) where.topicId = filters.topic;
    if (filters.difficulty) where.difficulty = filters.difficulty;
    if (filters.year) where.year = filters.year;

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        include: {
          subject: { select: { id: true, name: true, code: true, color: true, examBoard: true, level: true } },
          topic: { select: { id: true, name: true } },
          _count: { select: { attempts: true } },
        },
        orderBy: [{ year: "desc" }, { questionNumber: "asc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.question.count({ where }),
    ]);

    return { questions, total };
  },
  ["question-bank-page"],
  { revalidate: 300 }
);

export const getQuestionBankQuestions = unstable_cache(
  () =>
    prisma.question.findMany({
      include: {
        subject: { select: { id: true, name: true, code: true, color: true, examBoard: true, level: true } },
        topic: { select: { id: true, name: true } },
        _count: { select: { attempts: true } },
      },
      orderBy: [{ year: "desc" }, { questionNumber: "asc" }],
    }),
  ["question-bank-questions"],
  { revalidate: 300 }
);
