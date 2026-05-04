export default function NotesLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
      <div className="h-8 w-48 rounded-lg mb-10" style={{ background: "rgba(255,255,255,0.06)" }} />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-36 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
      ))}
    </div>
  );
}
