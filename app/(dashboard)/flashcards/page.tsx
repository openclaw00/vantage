import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FlashcardDeck } from "@/components/flashcards/FlashcardDeck";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Flashcards" };

export default async function FlashcardsPage() {
  const session = await getServerSession(authOptions);

  const flashcards = await prisma.flashcard.findMany({
    include: {
      subject: { select: { id: true, name: true, color: true } },
      topic:   { select: { id: true, name: true } },
      progress: session
        ? { where: { userId: session.user.id }, take: 1 }
        : false,
    },
    orderBy: { id: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-[var(--color-text)]">Flashcards</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          {flashcards.length} cards · spaced repetition with SM-2 algorithm.
        </p>
      </div>
      <FlashcardDeck flashcards={flashcards as Parameters<typeof FlashcardDeck>[0]["flashcards"]} />
    </div>
  );
}
