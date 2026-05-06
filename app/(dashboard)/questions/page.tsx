import { getQuestionBankQuestions, getQuestionYears, getSubjects, getTopics } from "@/lib/queries";
import { QuestionList } from "@/components/questions/QuestionList";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Question Bank" };

const DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { subject?: string; topic?: string; difficulty?: string; year?: string; page?: string };
}) {
  const requestedPage = Number.parseInt(searchParams.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = 15;

  const [questions, subjects, topics, yearsRaw] = await Promise.all([
    getQuestionBankQuestions(),
    getSubjects(),
    getTopics(),
    getQuestionYears(),
  ]);

  const years = yearsRaw.map((q) => q.year);
  const initialFilters = {
    subject: searchParams.subject,
    topic: searchParams.topic,
    difficulty: searchParams.difficulty && DIFFICULTIES.has(searchParams.difficulty)
      ? searchParams.difficulty
      : undefined,
    year: searchParams.year,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-[var(--color-text)]">Question Bank</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          {questions.length} questions loaded · filters update instantly.
        </p>
      </div>

      <QuestionList
        questions={questions as Parameters<typeof QuestionList>[0]["questions"]}
        page={page}
        pageSize={limit}
        subjects={subjects}
        topics={topics}
        years={years}
        filters={initialFilters}
      />
    </div>
  );
}
