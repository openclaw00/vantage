export default function MockLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-36 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-48 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </div>
  );
}
