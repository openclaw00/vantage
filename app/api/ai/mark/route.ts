import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { markAnswer } from "@/lib/ai";

const FREE_DAILY_LIMIT = 5;

const markSchema = z.object({
  questionId: z.string().cuid(),
  answer: z.string().min(1).max(5000),
  timeTaken: z.number().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = markSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { questionId, answer, timeTaken } = parsed.data;

  // Rate limiting for free tier
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.tier === "FREE") {
    const now = new Date();
    const resetAt = new Date(user.aiMarkResetAt);
    const sameDay =
      now.getFullYear() === resetAt.getFullYear() &&
      now.getMonth() === resetAt.getMonth() &&
      now.getDate() === resetAt.getDate();

    const count = sameDay ? user.aiMarksToday : 0;

    if (count >= FREE_DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: "Daily AI marking limit reached",
          limit: FREE_DAILY_LIMIT,
          upgradeRequired: true,
        },
        { status: 429 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        aiMarksToday: sameDay ? { increment: 1 } : 1,
        aiMarkResetAt: sameDay ? undefined : now,
      },
    });
  }

  // Fetch question with mark scheme (server-side only)
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { subject: true },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  try {
    const result = await markAnswer(
      question.content,
      question.markScheme,
      answer,
      question.marks
    );

    // Persist attempt
    await prisma.questionAttempt.create({
      data: {
        userId: session.user.id,
        questionId,
        answer,
        aiScore: result.score,
        aiMaxScore: result.maxScore,
        aiFeedback: JSON.stringify(result),
        timeTaken: timeTaken ?? null,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI marking error:", error);
    return NextResponse.json({ error: "AI marking failed. Please try again." }, { status: 500 });
  }
}
