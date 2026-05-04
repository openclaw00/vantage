import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: {
      subject: true,
      topic: true,
    },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  // Never return the markScheme in this endpoint — only returned after attempt or explicit reveal
  const { markScheme: _ms, ...safeQuestion } = question;
  return NextResponse.json({ ...safeQuestion, hasMarkScheme: true });
}

async function getWithScheme(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: { subject: true, topic: true },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json(question);
}
