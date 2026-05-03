import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Difficulty, ExamBoard, Level } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const subjectId  = searchParams.get("subjectId") || undefined;
  const topicId    = searchParams.get("topicId") || undefined;
  const difficulty = searchParams.get("difficulty") as Difficulty | null;
  const year       = searchParams.get("year") ? parseInt(searchParams.get("year")!) : undefined;
  const examBoard  = searchParams.get("examBoard") as ExamBoard | null;
  const level      = searchParams.get("level") as Level | null;
  const page       = parseInt(searchParams.get("page") || "1");
  const limit      = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};

  if (subjectId)  where.subjectId = subjectId;
  if (topicId)    where.topicId = topicId;
  if (difficulty) where.difficulty = difficulty;
  if (year)       where.year = year;

  if (examBoard || level) {
    where.subject = {
      ...(examBoard ? { examBoard } : {}),
      ...(level    ? { level }     : {}),
    };
  }

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
