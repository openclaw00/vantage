"use client";

import { useState } from "react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: { id: string; name: string; color: string };
  topic: { id: string; name: string } | null;
}

interface Props {
  flashcards: Flashcard[];
}

export function FlashcardDeck({ flashcards }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState<Set<number>>(new Set());

  if (flashcards.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-[var(--color-text-muted)]">No flashcards available.</p>
      </div>
    );
  }

  const card = flashcards[index];
  const isLast = index === flashcards.length - 1;
  const allDone = done.size === flashcards.length;

  const handleRate = (known: boolean) => {
    if (known) setDone((d) => { const s = new Set(d); s.add(index); return s; });
    setFlipped(false);
    if (!isLast) {
      setTimeout(() => setIndex((i) => i + 1), 150);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setFlipped(false);
    setDone(new Set());
  };

  if (allDone || (isLast && done.has(index))) {
    return (
      <div className="card p-12 text-center">
        <div className="font-display text-3xl text-[var(--color-text)] mb-3">
          Session complete!
        </div>
        <p className="text-[var(--color-text-muted)] text-sm mb-6">
          You&apos;ve reviewed all {flashcards.length} cards.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 bg-[var(--color-amber)] text-black px-5 py-2.5 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-colors"
        >
          Review again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
        <span>{index + 1} / {flashcards.length}</span>
        <span>{done.size} known</span>
      </div>
      <div className="score-bar">
        <div
          className="score-bar-fill bg-[var(--color-amber)]"
          style={{ width: `${((index + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        className="card p-10 min-h-64 cursor-pointer hover:border-[var(--color-border-2)] transition-all select-none flex flex-col justify-center items-center text-center"
        onClick={() => setFlipped(!flipped)}
        style={{ minHeight: "280px" }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${card.subject.color}20`, color: card.subject.color }}
          >
            {card.subject.name}
          </span>
          {card.topic && (
            <span className="text-xs text-[var(--color-text-faint)]">{card.topic.name}</span>
          )}
        </div>

        {!flipped ? (
          <div className="animate-fade-in">
            <div className="font-mono text-[10px] text-[var(--color-text-faint)] mb-4 uppercase tracking-widest">
              Question
            </div>
            <p className="text-lg text-[var(--color-text)] leading-relaxed">{card.front}</p>
            <p className="text-xs text-[var(--color-text-faint)] mt-6">Tap to reveal answer</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="font-mono text-[10px] text-[var(--color-amber)] mb-4 uppercase tracking-widest">
              Answer
            </div>
            <p className="text-base text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
              {card.back}
            </p>
          </div>
        )}
      </div>

      {/* Rating buttons (only shown after flip) */}
      {flipped && (
        <div className="flex gap-4 animate-slide-up">
          <button
            onClick={() => handleRate(false)}
            className="flex-1 py-3 rounded border border-red-900/50 text-red-400 text-sm font-medium hover:bg-red-900/10 transition-colors"
          >
            Still learning
          </button>
          <button
            onClick={() => handleRate(true)}
            className="flex-1 py-3 rounded border border-green-900/50 text-green-400 text-sm font-medium hover:bg-green-900/10 transition-colors"
          >
            Got it ✓
          </button>
        </div>
      )}
    </div>
  );
}
