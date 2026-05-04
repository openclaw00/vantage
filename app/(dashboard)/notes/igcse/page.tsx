import { prisma } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = { title: "IGCSE Notes" };

const getIgcseSubjectsWithNotes = unstable_cache(
  async () => {
    const subjects = await prisma.subject.findMany({
      where: { level: "IGCSE" },
      include: { _count: { select: { revisionNotes: true } } },
      orderBy: [{ courseGroup: "asc" }, { name: "asc" }],
    });
    return subjects;
  },
  ["igcse-subjects-notes"],
  { revalidate: 3600 }
);

export default async function IgcseNotesPage() {
  const subjects = await getIgcseSubjectsWithNotes();

  const grouped = subjects.reduce<Record<string, typeof subjects>>((acc, s) => {
    const g = s.courseGroup || "Other";
    if (!acc[g]) acc[g] = [];
    acc[g].push(s);
    return acc;
  }, {});

  const groupOrder = ["Sciences", "Mathematics", "Humanities", "Business", "Technology", "English", "Languages", "Other"];
  const sortedGroups = Object.keys(grouped).sort(
    (a, b) => (groupOrder.indexOf(a) === -1 ? 99 : groupOrder.indexOf(a)) - (groupOrder.indexOf(b) === -1 ? 99 : groupOrder.indexOf(b))
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-1 text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
        <Link href="/notes" className="hover:text-white transition-colors">Revision Notes</Link>
        <span>/</span>
        <span className="text-white">IGCSE</span>
      </div>
      <div className="mb-10 mt-3">
        <h1 className="font-bold text-3xl text-white mb-1">IGCSE</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Select a subject to view detailed revision notes.
        </p>
      </div>

      <div className="space-y-8">
        {sortedGroups.map((group) => (
          <div key={group}>
            <h2 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{group}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {grouped[group].map((subject) => (
                <Link
                  key={subject.id}
                  href={`/notes/igcse/${subject.id}`}
                  className="flex items-center gap-4 rounded-xl p-4 transition-all hover:border-white/20"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: subject.color + "22", color: subject.color }}>
                    {subject.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm text-white">{subject.name}</div>
                    <div className="text-[11px] font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {subject._count.revisionNotes} {subject._count.revisionNotes === 1 ? "note" : "notes"}
                    </div>
                  </div>
                  <svg className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
