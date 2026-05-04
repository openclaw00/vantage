const labels: Record<string, string> = {
  IGCSE: "IGCSE", A_LEVEL: "A-Level", IB_SL: "IB SL", IB_HL: "IB HL",
};

export function LevelBadge({ level }: { level: "IGCSE" | "A_LEVEL" | "IB_SL" | "IB_HL" }) {
  return (
    <span
      className="font-mono text-[10px] px-2 py-0.5 rounded-lg uppercase tracking-wide"
      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(240,253,244,0.4)" }}
    >
      {labels[level] ?? level}
    </span>
  );
}
