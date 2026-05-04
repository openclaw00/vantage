export default function SubjectNotesLoading() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      <div className="h-4 w-48 rounded mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="h-10 w-64 rounded-lg mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-48 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </div>
  );
}
