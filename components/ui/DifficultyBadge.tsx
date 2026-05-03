const config = {
  EASY:   { label: "Easy",   classes: "text-green-400 bg-green-500/10 border-green-500/25" },
  MEDIUM: { label: "Medium", classes: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25" },
  HARD:   { label: "Hard",   classes: "text-red-400 bg-red-500/10 border-red-500/25" },
};

export function DifficultyBadge({ difficulty }: { difficulty: "EASY" | "MEDIUM" | "HARD" }) {
  const c = config[difficulty];
  return (
    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-lg border ${c.classes} uppercase tracking-wide`}>
      {c.label}
    </span>
  );
}
