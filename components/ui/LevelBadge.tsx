const labels: Record<string, string> = {
  IGCSE: "IGCSE", A_LEVEL: "A-Level", IB_SL: "IB SL", IB_HL: "IB HL",
};

export function LevelBadge({ level }: { level: "IGCSE" | "A_LEVEL" | "IB_SL" | "IB_HL" }) {
  return (
    <span className="font-mono text-[10px] px-2 py-0.5 rounded-lg border border-white/[0.08] text-white/30 uppercase tracking-wide">
      {labels[level] ?? level}
    </span>
  );
}
