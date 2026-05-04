export default function FlashcardsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-36 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </div>
  );
}
