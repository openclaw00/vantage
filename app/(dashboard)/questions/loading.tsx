export default function QuestionsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-40 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="h-12 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-20 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
      ))}
    </div>
  );
}
