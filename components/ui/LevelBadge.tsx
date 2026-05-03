const labels: Record<string, string> = {
  IGCSE:   "IGCSE",
  A_LEVEL: "A-Level",
  IB_SL:   "IB SL",
  IB_HL:   "IB HL",
};

export function LevelBadge({ level }: { level: "IGCSE" | "A_LEVEL" | "IB_SL" | "IB_HL" }) {
  return (
    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-faint)] uppercase tracking-wide">
      {labels[level] ?? level}
    </span>
  );
}
