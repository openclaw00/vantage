import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DotGrid } from "@/components/ui/DotGrid";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: "#111111", color: "#fff" }}>

      {/* Side panel halos */}
      <div className="fixed pointer-events-none" style={{
        top: 0, left: 0, width: "18vw", height: "100vh",
        background: "linear-gradient(to right, rgba(34,197,94,0.05) 0%, transparent 100%)",
        filter: "blur(24px)",
      }} />
      <div className="fixed pointer-events-none" style={{
        top: 0, right: 0, width: "18vw", height: "100vh",
        background: "linear-gradient(to left, rgba(34,197,94,0.05) 0%, transparent 100%)",
        filter: "blur(24px)",
      }} />

      <DotGrid />


      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14" style={{
        background: "rgba(17,17,17,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Leaply" className="w-7 h-7 object-contain" />
          <span className="font-bold text-[15px] tracking-tight text-white">Leaply</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {["Features", "Subjects", "Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="px-3.5 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.6)" }}>
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm px-4 py-1.5 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.6)" }}>
            Log in
          </Link>
          <Link href="/register" className="text-sm px-4 py-1.5 rounded-lg font-semibold text-black transition-opacity hover:opacity-90"
            style={{ background: "#fff" }}>
            Get started free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-48 pb-28 px-6 text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs mb-10 cursor-pointer hover:bg-white/5 transition-colors" style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.75)",
        }}>
          <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: "#22c55e" }} />
          <span className="font-mono uppercase tracking-widest text-[10px]">AI EXAM PREP · IGCSE · A-LEVEL · IB</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>↗</span>
        </div>

        <h1 className="font-black leading-[0.9] tracking-tighter mb-6 mx-auto text-white"
          style={{ fontSize: "clamp(56px, 9vw, 108px)", maxWidth: "900px" }}>
          Your memory,<br />supercharged.
        </h1>

        <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
          Past papers, AI marking, and spaced repetition — everything you need to go from revision to top grades.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-24">
          <Link href="/register" className="px-7 py-3 text-[15px] rounded-lg font-semibold text-black transition-opacity hover:opacity-90"
            style={{ background: "#fff" }}>
            Try Leaply free
          </Link>
          <Link href="/login" className="px-7 py-3 text-[15px] rounded-lg font-medium transition-colors hover:bg-white/5"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}>
            Sign in
          </Link>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)", paddingTop: "40px" }}>
          <p className="text-[11px] font-mono uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            Trusted by students preparing for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Cambridge IGCSE", "Cambridge A-Level", "Edexcel", "AQA", "OCR", "IB Diploma"].map((board) => (
              <span key={board} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>{board}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Features</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter text-white max-w-xl">
              Built for results.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: "Past Paper Bank", body: "Real questions filterable by subject, year, topic, difficulty, and board — each with its official mark scheme." },
              { title: "AI Mark My Answer", body: "Write your answer. Get scored point-by-point against the real mark scheme and see exactly what you missed.", accent: true },
              { title: "Spaced Repetition", body: "SM-2 algorithm surfaces the flashcards you're about to forget. Zero wasted review time." },
              { title: "Weak Topic Detector", body: "AI analyses your attempt history and surfaces your weakest topics with targeted practice queues." },
              { title: "Timed Mock Exams", body: "Pull a full paper, set a timer, and experience real exam conditions." },
              { title: "Progress Dashboard", body: "Score over time, topic coverage, attempt history. Know exactly where you stand." },
            ].map((f) => (
              <div key={f.title} className="p-8 rounded-2xl transition-all hover:border-white/20" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {f.accent && <div className="w-1 h-6 rounded-full mb-5" style={{ background: "#22c55e" }} />}
                <h3 className="font-bold text-lg text-white mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Marking showcase ── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>AI Marking Engine</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter text-white mb-6 leading-[0.9]">
              Instant feedback from a Cambridge examiner.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.72)" }}>
              Write your answer. Get scored point-by-point against the official mark scheme. See exactly what you got right, what you missed, and a model answer for full marks.
            </p>
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black text-sm hover:opacity-90 transition-opacity"
              style={{ background: "#fff" }}>
              Try it free →
            </Link>
          </div>

          <div className="rounded-2xl p-6 space-y-4" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>Biology 0610 · Q1(a) · 3 marks</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md" style={{ color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>3 / 3</span>
            </div>
            <div className="text-sm leading-relaxed pl-3 py-1" style={{ color: "rgba(255,255,255,0.7)", borderLeft: "2px solid rgba(255,255,255,0.2)" }}>
              State THREE differences between a plant cell and an animal cell.
            </div>
            <div className="rounded-xl p-3 text-sm italic" style={{
              background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)",
            }}>
              "Plant cells have a cell wall, animal cells do not. Plant cells have chloroplasts, animal cells do not..."
            </div>
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="font-black text-3xl text-white">3<span className="text-xl" style={{ color: "rgba(255,255,255,0.4)" }}> / 3</span></span>
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.45)" }}>100%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-full w-full rounded-full" style={{ background: "#22c55e" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="text-[10px] font-mono uppercase tracking-wide mb-1.5 text-white">✓ Got right</div>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>All 3 comparisons stated with both sides correctly.</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="text-[10px] font-mono uppercase tracking-wide mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>⟡ Tip</div>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>Always state both sides of every comparison for full credit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subjects ── */}
      <section id="subjects" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Subjects</p>
            <h2 className="font-black text-5xl tracking-tighter text-white">Covered.</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Biology", board: "Cambridge IGCSE", code: "0610", live: true },
              { name: "Mathematics", board: "Cambridge A-Level", code: "9709", live: true },
              { name: "Chemistry", board: "Cambridge IGCSE", code: "0620", live: false },
              { name: "Physics", board: "Cambridge IGCSE", code: "0625", live: false },
              { name: "English Lang.", board: "Cambridge IGCSE", code: "0500", live: false },
              { name: "Economics", board: "Cambridge A-Level", code: "9708", live: false },
              { name: "History", board: "Cambridge A-Level", code: "9489", live: false },
              { name: "Computer Sci.", board: "Cambridge A-Level", code: "9618", live: false },
            ].map((s) => (
              <div key={s.code} className="p-6 rounded-2xl transition-all hover:border-white/20"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.live ? "#22c55e" : "rgba(255,255,255,0.25)" }} />
                  <span className="text-[9px] font-mono" style={{ color: s.live ? "#22c55e" : "rgba(255,255,255,0.3)" }}>
                    {s.live ? "LIVE" : "SOON"}
                  </span>
                </div>
                <div className="font-bold text-sm mb-0.5" style={{ color: s.live ? "#fff" : "rgba(255,255,255,0.45)" }}>{s.name}</div>
                <div className="text-[11px]" style={{ color: s.live ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)" }}>{s.board}</div>
                <div className="font-mono text-[10px] mt-1" style={{ color: s.live ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)" }}>{s.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-28 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Pricing</p>
            <h2 className="font-black text-5xl md:text-6xl tracking-tighter text-white">Simple.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Free</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-black text-5xl text-white">£0</span>
              </div>
              <div className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Forever. No card needed.</div>
              <ul className="space-y-3 mb-8">
                {["Full question bank", "Mark scheme viewer", "5 AI markings/day", "Flashcards", "Progress tracking"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full text-center py-3 rounded-lg block text-sm font-medium transition-colors hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)" }}>
                Get started free
              </Link>
            </div>

            <div className="p-8 relative rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="font-mono text-[11px] uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Pro</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-black text-5xl text-white">£9</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>/ month</span>
              </div>
              <div className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Cancel anytime.</div>
              <ul className="space-y-3 mb-8">
                {["Everything in Free", "Unlimited AI markings", "AI Explain This", "AI practice questions", "Weak topic detector", "Timed mock exams", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white">
                    <span style={{ color: "#22c55e" }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full text-center py-3 rounded-lg block text-sm font-semibold text-black transition-opacity hover:opacity-90"
                style={{ background: "#fff" }}>
                Start 7-day free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Leaply" className="w-6 h-6 object-contain" />
            <span className="font-bold text-sm tracking-tight text-white">Leaply</span>
            <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
