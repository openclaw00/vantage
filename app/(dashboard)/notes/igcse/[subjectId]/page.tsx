import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { subjectId: string } }): Promise<Metadata> {
  const subject = await prisma.subject.findUnique({ where: { id: params.subjectId } });
  return { title: subject ? `${subject.name} Notes` : "Notes" };
}

export default async function SubjectNotesPage({ params }: { params: { subjectId: string } }) {
  const [subject, notes] = await Promise.all([
    prisma.subject.findUnique({ where: { id: params.subjectId } }),
    prisma.revisionNote.findMany({
      where: { subjectId: params.subjectId },
      orderBy: { order: "asc" },
    }),
  ]);

  if (!subject) notFound();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-1 text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
        <Link href="/notes" className="hover:text-white transition-colors">Revision Notes</Link>
        <span>/</span>
        <Link href="/notes/igcse" className="hover:text-white transition-colors">IGCSE</Link>
        <span>/</span>
        <span className="text-white">{subject.name}</span>
      </div>

      <div className="flex items-center gap-3 mb-8 mt-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: subject.color + "22", color: subject.color }}>
          {subject.code}
        </div>
        <div>
          <h1 className="font-bold text-3xl text-white">{subject.name}</h1>
          <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            IGCSE · {subject.examBoard} · {notes.length} notes
          </p>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Notes coming soon.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {notes.map((note) => (
            <div key={note.id} id={`note-${note.id}`}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 className="font-bold text-lg text-white mb-4">{note.title}</h2>
              <div className="prose-note">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-base font-bold text-white mt-5 mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-sm font-bold mt-4 mb-2" style={{ color: "rgba(255,255,255,0.85)" }}>{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-semibold mt-3 mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>{children}</h3>,
                    p: ({ children }) => <p className="text-sm leading-6 mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>{children}</p>,
                    ul: ({ children }) => <ul className="space-y-1 mb-3 ml-4">{children}</ul>,
                    ol: ({ children }) => <ol className="space-y-1 mb-3 ml-4 list-decimal">{children}</ol>,
                    li: ({ children }) => (
                      <li className="text-sm flex gap-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.3)" }} />
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic" style={{ color: "rgba(255,255,255,0.6)" }}>{children}</em>,
                    code: ({ children }) => (
                      <code className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}>
                        {children}
                      </code>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 pl-4 my-3 italic" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }}>
                        {children}
                      </blockquote>
                    ),
                    hr: () => <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.08)" }} />,
                  }}
                >
                  {note.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
