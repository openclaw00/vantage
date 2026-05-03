const config = {
  EASY:   { label: "Easy",   classes: "text-green-400 border-green-900/50" },
  MEDIUM: { label: "Medium", classes: "text-amber-400 border-amber-900/50" },
  HARD:   { label: "Hard",   classes: "text-red-400 border-red-900/50" },
};

export function DifficultyBadge({ difficulty }: { difficulty: "EASY" | "MEDIUM" | "HARD" }) {
  const c = config[difficulty];
  return (
    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${c.classes} uppercase tracking-wide`}>
      {c.label}
    </span>
  );
}
