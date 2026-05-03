import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#07070f] text-white overflow-hidden">

      {/* ── Background glow orbs ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="orb w-[600px] h-[600px] top-[-200px] left-[50%] -translate-x-1/2 bg-violet-500/20" style={{ filter: "blur(120px)" }} />
        <div className="orb w-[400px] h-[400px] top-[20%] right-[-100px] bg-indigo-500/15" style={{ filter: "blur(100px)" }} />
        <div className="orb w-[300px] h-[300px] top-[60%] left-[-80px] bg-violet-600/10" style={{ filter: "blur(80px)" }} />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.025] bg-noise bg-repeat" style={{ backgroundSize: "128px" }} />
      </div>

      {/* ── Floating pill nav ────────────────────────────────────────────── */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <div className="glass rounded-2xl px-5 h-14 flex items-center justify-between shadow-glass">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-violet flex items-center justify-center">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            <span className="font-display font-semibold text-[15px]">Vantage</span>
            <span className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30">
              BETA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            {["Features", "Subjects", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link href="/register" className="btn-primary text-xs px-4 py-2">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-44 pb-24 px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-white/60 mb-8 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-slow" />
          AI-powered exam prep · IGCSE · A-Level · IB
        </div>

        <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-[88px] leading-[1.0] tracking-tight mb-6 max-w-4xl mx-auto">
          Study less.
          <br />
          <span className="gradient-text">Score more.</span>
        </h1>

        <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
          Past papers, AI marking, and spaced repetition flashcards — everything you need
          to go from revision to top grades.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Link href="/register" className="btn-primary px-7 py-3.5 text-[15px] rounded-xl inline-flex items-center gap-2">
            Start for free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/login" className="btn-ghost px-7 py-3.5 text-[15px] rounded-xl inline-flex items-center gap-2">
            Sign in
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mb-20">
          <div className="flex -space-x-2">
            {["#8b5cf6","#6366f1","#a855f7","#7c3aed"].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#07070f] flex items-center justify-center text-[10px] font-semibold" style={{ background: c }}>
                {["A","B","C","D"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/40">
            <span className="text-white font-medium">2,400+</span> students already revising
          </p>
        </div>

        {/* ── Product UI mockup ────────────────────────────────────────── */}
        <div className="relative max-w-4xl mx-auto animate-float">
          {/* Glow behind the card */}
          <div className="absolute inset-x-10 -top-6 h-20 bg-violet-500/20 blur-3xl rounded-full" />

          <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <div className="flex-1 flex justify-center">
                <div className="glass rounded-md px-8 py-0.5 text-[10px] text-white/30 font-mono">
                  vantage.study/questions
                </div>
              </div>
            </div>

            {/* App interior */}
            <div className="grid grid-cols-[200px_1fr] min-h-[340px]">
              {/* Sidebar */}
              <div className="border-r border-white/[0.06] bg-white/[0.01] p-4 space-y-1">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-3 px-2">Navigation</div>
                {[
                  { label: "Dashboard", active: false, icon: "▦" },
                  { label: "Questions", active: true,  icon: "◈" },
                  { label: "Flashcards", active: false, icon: "⟨⟩" },
                  { label: "Mock Exams", active: false, icon: "◷" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs ${item.active ? "bg-violet-500/20 text-violet-300" : "text-white/30"}`}>
                    <span className="text-[10px]">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="p-5 space-y-3">
                {/* Filter row */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-xs text-white/40 font-mono">FILTER:</div>
                  {["Biology", "2023", "Medium"].map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.06] text-white/50 border border-white/[0.08]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Question rows */}
                {[
                  { q: "Q1(a)", subj: "Biology", topic: "Cell Biology", marks: 3, diff: "Easy", year: 2023 },
                  { q: "Q3(a)", subj: "Biology", topic: "Photosynthesis", marks: 5, diff: "Medium", year: 2022 },
                  { q: "Q5(a)", subj: "Biology", topic: "Genetics", marks: 4, diff: "Medium", year: 2021 },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${i === 1 ? "bg-violet-500/10 border-violet-500/30" : "bg-white/[0.02] border-white/[0.06]"}`}>
                    <span className="font-mono text-xs text-violet-400 w-10">{row.q}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white/80 truncate">State the differences between a plant and animal cell...</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-green-400/70 bg-green-400/10 px-1.5 py-0.5 rounded">{row.topic}</span>
                        <span className="text-[10px] text-white/25 font-mono">{row.year}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-white/30">[{row.marks}m]</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
                      row.diff === "Easy" ? "text-green-400 border-green-500/30 bg-green-500/10" :
                      "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                    }`}>{row.diff}</span>
                  </div>
                ))}

                {/* AI marking preview */}
                <div className="mt-4 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">AI Marking result</span>
                    <span className="text-xs font-semibold text-green-400">8 / 10 · 80%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted by ───────────────────────────────────────────────────── */}
      <div className="relative py-12 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs text-white/30 font-mono uppercase tracking-widest mb-6">
            Trusted by students preparing for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Cambridge IGCSE", "Cambridge A-Level", "Edexcel", "AQA", "OCR", "IB Diploma"].map((board) => (
              <span key={board} className="text-sm text-white/30 font-medium">{board}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-[11px] font-mono text-violet-400 uppercase tracking-widest mb-4 glass px-3 py-1.5 rounded-full border border-violet-500/20">
              Everything you need
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Built for results,<br />
              <span className="gradient-text">not busywork.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Every feature is designed around one question: will this help you score more marks?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "◈",
                color: "text-violet-400",
                bg: "bg-violet-500/10 border-violet-500/20",
                title: "Past Paper Bank",
                body: "Hundreds of real questions, filterable by subject, year, topic, difficulty, and board. Every question with its official mark scheme.",
              },
              {
                icon: "⟡",
                color: "text-indigo-400",
                bg: "bg-indigo-500/10 border-indigo-500/20",
                title: "AI Mark My Answer",
                body: "Write your answer. Our AI grades it against the real mark scheme point-by-point and tells you exactly what you missed.",
                highlight: true,
              },
              {
                icon: "⟨⟩",
                color: "text-purple-400",
                bg: "bg-purple-500/10 border-purple-500/20",
                title: "Spaced Repetition",
                body: "SM-2 algorithm surfaces the flashcards you're about to forget. Zero wasted review time.",
              },
              {
                icon: "◎",
                color: "text-fuchsia-400",
                bg: "bg-fuchsia-500/10 border-fuchsia-500/20",
                title: "Weak Topic Detector",
                body: "AI analyses your attempt history and surfaces your weakest topics with targeted practice queues.",
              },
              {
                icon: "◷",
                color: "text-cyan-400",
                bg: "bg-cyan-500/10 border-cyan-500/20",
                title: "Timed Mock Exams",
                body: "Pull a full set of questions, set a countdown timer, and experience real exam pressure.",
              },
              {
                icon: "▦",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20",
                title: "Progress Dashboard",
                body: "Score over time, topic coverage, attempt history. See exactly where you stand and what to fix.",
              },
            ].map((f) => (
              <div key={f.title} className={`glass rounded-2xl p-6 border ${f.highlight ? "border-violet-500/30 bg-violet-500/10 shadow-violet" : "border-white/[0.07] hover:border-white/[0.12]"} transition-all duration-200 hover:-translate-y-0.5`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${f.bg} ${f.color} text-lg`}>
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-[15px] mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Marking showcase ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 border border-white/[0.07] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-[11px] font-mono text-violet-400 uppercase tracking-widest mb-4">AI Marking Engine</div>
                <h2 className="font-display font-bold text-4xl md:text-5xl mb-5 leading-tight">
                  Instant feedback from a{" "}
                  <span className="gradient-text">Cambridge examiner.</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  Write your answer. Get scored point-by-point against the official mark scheme.
                  See exactly what you got right, what you missed, and a model answer for full marks.
                </p>
                <Link href="/register" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3">
                  Try it free →
                </Link>
              </div>

              {/* Mock marking UI */}
              <div className="glass-bright rounded-2xl p-5 space-y-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Biology 0610 · Q1(a) · 3 marks</span>
                  <span className="text-xs font-semibold text-green-400 bg-green-500/15 border border-green-500/25 px-2.5 py-1 rounded-lg">3 / 3</span>
                </div>

                <div className="text-sm text-white/70 border-l-2 border-violet-500 pl-3 leading-relaxed">
                  State THREE differences between a plant cell and an animal cell.
                </div>

                <div className="bg-white/[0.03] rounded-xl p-3 text-sm text-white/40 italic border border-white/[0.05]">
                  "Plant cells have a cell wall, animal cells do not. Plant cells have chloroplasts, animal cells do not. Plant cells have a large permanent vacuole..."
                </div>

                {/* Score bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-display font-bold text-2xl">3<span className="text-white/30 text-lg"> / 3</span></span>
                    <span className="text-xs text-white/30 self-end mb-0.5">100%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.07]">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <div className="text-[10px] text-green-400 font-mono uppercase tracking-wide mb-1">✓ Got right</div>
                    <p className="text-[11px] text-white/50">All 3 comparisons stated with both sides correctly.</p>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3">
                    <div className="text-[10px] text-violet-400 font-mono uppercase tracking-wide mb-1">⟡ Tip</div>
                    <p className="text-[11px] text-white/50">Always state both sides of every comparison for full credit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subjects ────────────────────────────────────────────────────── */}
      <section id="subjects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-3">
              Subjects covered.
            </h2>
            <p className="text-white/40">Live now, more coming every month.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Biology", board: "Cambridge IGCSE", code: "0610", color: "#22c55e", live: true },
              { name: "Mathematics", board: "Cambridge A-Level", code: "9709", color: "#6366f1", live: true },
              { name: "Chemistry", board: "Cambridge IGCSE", code: "0620", color: "#a855f7", live: false },
              { name: "Physics", board: "Cambridge IGCSE", code: "0625", color: "#f97316", live: false },
              { name: "English Lang.", board: "Cambridge IGCSE", code: "0500", color: "#06b6d4", live: false },
              { name: "Economics", board: "Cambridge A-Level", code: "9708", color: "#eab308", live: false },
              { name: "History", board: "Cambridge A-Level", code: "9489", color: "#ef4444", live: false },
              { name: "Computer Sci.", board: "Cambridge A-Level", code: "9618", color: "#10b981", live: false },
            ].map((s) => (
              <div key={s.code} className={`glass rounded-2xl p-5 border transition-all ${s.live ? "border-white/[0.1] hover:border-white/[0.18] hover:-translate-y-0.5" : "border-white/[0.04] opacity-40"} duration-200`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  {s.live
                    ? <span className="text-[9px] font-mono text-green-400 bg-green-500/15 border border-green-500/20 px-1.5 py-0.5 rounded-md">LIVE</span>
                    : <span className="text-[9px] font-mono text-white/20 border border-white/[0.06] px-1.5 py-0.5 rounded-md">SOON</span>
                  }
                </div>
                <div className="font-display font-semibold text-sm text-white/90">{s.name}</div>
                <div className="text-[11px] text-white/35 mt-0.5">{s.board}</div>
                <div className="font-mono text-[10px] text-white/20 mt-1">{s.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-3">
              Simple pricing.
            </h2>
            <p className="text-white/40 text-lg">Start free. Upgrade when you need the AI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free */}
            <div className="glass rounded-2xl p-8 border border-white/[0.07]">
              <div className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-4">Free</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display font-bold text-5xl">£0</span>
              </div>
              <div className="text-sm text-white/40 mb-8">Forever. No card needed.</div>
              <ul className="space-y-3 mb-8">
                {["Full question bank", "Mark scheme viewer", "5 AI markings/day", "Flashcards", "Progress tracking"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/50">
                    <span className="w-4 h-4 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] text-white/40">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn-ghost w-full text-center py-3 rounded-xl block">
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl p-8 border border-violet-500/40 overflow-hidden" style={{ background: "rgba(139,92,246,0.08)" }}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="text-[11px] font-mono text-violet-400 uppercase tracking-widest mb-4">Pro</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display font-bold text-5xl">£9</span>
                <span className="text-white/40 text-sm">/ month</span>
              </div>
              <div className="text-sm text-white/40 mb-8">Cancel anytime.</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "Unlimited AI markings",
                  "AI Explain This",
                  "AI practice questions",
                  "Weak topic detector",
                  "Timed mock exams",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-4 h-4 rounded-full bg-violet-500/30 flex items-center justify-center text-[9px] text-violet-300">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn-primary w-full text-center py-3 rounded-xl block">
                Start 7-day free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-violet flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">V</span>
            </div>
            <span className="font-display font-semibold text-sm">Vantage</span>
            <span className="text-white/20 text-xs ml-2">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6 text-xs text-white/30">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
