import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);
const EXAM_BOARDS = new Set(["CAMBRIDGE", "EDEXCEL", "AQA", "OCR", "IB"]);
const LEVELS = new Set(["IGCSE", "A_LEVEL", "IB_SL", "IB_HL"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const subjectId  = searchParams.get("subjectId") || undefined;
  const topicId    = searchParams.get("topicId") || undefined;
  const difficulty = searchParams.get("difficulty") || undefined;
  const yearRaw    = searchParams.get("year");
  const year       = yearRaw ? Number.parseInt(yearRaw, 10) : undefined;
  const examBoard  = searchParams.get("examBoard") || undefined;
  const level      = searchParams.get("level") || undefined;
  const pageRaw    = Number.parseInt(searchParams.get("page") || "1", 10);
  const limitRaw   = Number.parseInt(searchParams.get("limit") || "20", 10);
  const page       = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const limit      = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(limitRaw, 100) : 20;

  const where: Record<string, unknown> = {};

  if (subjectId)  where.subjectId = subjectId;
  if (topicId)    where.topicId = topicId;
  if (difficulty && DIFFICULTIES.has(difficulty)) where.difficulty = difficulty;
  if (year && Number.isFinite(year)) where.year = year;

  const subjectWhere = {
    ...(examBoard && EXAM_BOARDS.has(examBoard) ? { examBoard } : {}),
    ...(level && LEVELS.has(level) ? { level } : {}),
  };

  if (Object.keys(subjectWhere).length > 0) where.subject = subjectWhere;

  const [questions, total] = await Promise.all([
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
  ]);

  return NextResponse.json({
    questions,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
