import type { Metadata } from "next";

export const metadata: Metadata = { title: "Revision Notes" };

export default function NotesPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-24 px-6">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <svg className="w-6 h-6" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
      <h1 className="text-lg font-semibold text-white mb-2">Revision Notes</h1>
      <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
        Notes are coming soon. Check back later.
      </p>
    </div>
  );
}
