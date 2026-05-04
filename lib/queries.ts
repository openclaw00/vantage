import { unstable_cache } from "next/cache";
import { prisma } from "./db";

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
