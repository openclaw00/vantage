import Link from "next/link";
import { DotGrid } from "@/components/ui/DotGrid";

type SubjectIcon =
  | "bio"
  | "math"
  | "chem"
  | "physics"
  | "english"
  | "econ"
  | "history"
  | "cs";

function SubjectGlyph({ icon }: { icon: SubjectIcon }) {
  const iconProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "bio":
      return (
        <svg {...iconProps}>
          <path d="M6.5 13.5c5.2-.1 8.9-3.8 9-9" />
          <path d="M18 6c-.2 7.5-4.8 12.2-12.5 12.5" />
          <path d="M8 16 6 14" />
          <path d="M11.5 14.5 9 12" />
          <path d="M14 12 12 10" />
        </svg>
      );
    case "math":
      return (
        <svg {...iconProps}>
          <path d="M5 7h14" />
          <path d="M5 17h14" />
          <path d="M8 4v6" />
          <path d="M16 14v6" />
          <path d="m9 14 6 6" />
          <path d="m15 14-6 6" />
        </svg>
      );
    case "chem":
      return (
        <svg {...iconProps}>
          <path d="M9 3h6" />
          <path d="M10 3v5.2l-4.1 7.1A4 4 0 0 0 9.4 21h5.2a4 4 0 0 0 3.5-5.7L14 8.2V3" />
          <path d="M8.2 15h7.6" />
        </svg>
      );
    case "physics":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="1.8" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case "english":
      return (
        <svg {...iconProps}>
          <path d="M5 5.5h8a4 4 0 0 1 4 4V19H9a4 4 0 0 0-4 2V5.5Z" />
          <path d="M9 9h5" />
          <path d="M9 13h4" />
        </svg>
      );
    case "econ":
      return (
        <svg {...iconProps}>
          <path d="M4 19h16" />
          <path d="M7 16v-5" />
          <path d="M12 16V7" />
          <path d="M17 16v-9" />
          <path d="m5 10 5-5 4 4 5-5" />
        </svg>
      );
    case "history":
      return (
        <svg {...iconProps}>
          <path d="M12 7v5l3 2" />
          <path d="M5.4 5.4A9 9 0 1 1 3 12" />
          <path d="M3 5v5h5" />
        </svg>
      );
    case "cs":
      return (
        <svg {...iconProps}>
          <path d="m8 9-4 3 4 3" />
          <path d="m16 9 4 3-4 3" />
          <path d="m13 7-2 10" />
        </svg>
      );
  }
}

export default function HomePage() {
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
      <section className="relative overflow-hidden pt-48 pb-28 px-6 text-center">
        {/* Top-left hero light ray */}
        <div className="absolute pointer-events-none" style={{
          top: "-24vh",
          left: "-18vw",
          width: "54vw",
          height: "56vh",
          background: "radial-gradient(circle at 24% 18%, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.82) 13%, rgba(34,197,94,0.4) 32%, rgba(20,83,45,0.16) 52%, transparent 72%)",
          filter: "blur(18px)",
          opacity: 0.95,
        }} />
        <div className="absolute pointer-events-none" style={{
          top: "-42vh",
          left: "-10vw",
          width: "22vw",
          height: "184vh",
          background: "linear-gradient(154deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 8%, rgba(187,247,208,0.42) 24%, rgba(34,197,94,0.2) 46%, transparent 82%)",
          filter: "blur(10px)",
          transform: "rotate(-36deg)",
          transformOrigin: "top left",
          opacity: 0.92,
          mixBlendMode: "screen",
        }} />
        <div className="absolute pointer-events-none" style={{
          top: "-34vh",
          left: "-16vw",
          width: "52vw",
          height: "188vh",
          background: "linear-gradient(150deg, rgba(34,197,94,0.46) 0%, rgba(34,197,94,0.28) 20%, rgba(22,101,52,0.18) 43%, transparent 76%)",
          filter: "blur(36px)",
          transform: "rotate(-31deg)",
          transformOrigin: "top left",
          opacity: 0.95,
        }} />
        <div className="absolute pointer-events-none" style={{
          top: "-20vh",
          left: "-12vw",
          width: "32vw",
          height: "144vh",
          background: "linear-gradient(150deg, rgba(255,255,255,0.46) 0%, rgba(220,252,231,0.28) 24%, transparent 74%)",
          filter: "blur(4px)",
          transform: "rotate(-37deg)",
          transformOrigin: "top left",
          opacity: 0.72,
          mixBlendMode: "screen",
        }} />

        <div className="relative z-10 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs mb-10 cursor-pointer hover:bg-white/5 transition-colors" style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.75)",
        }}>
          <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: "#22c55e" }} />
          <span className="font-mono uppercase tracking-widest text-[10px]">AI EXAM PREP · IGCSE · A-LEVEL · IB</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>↗</span>
        </div>

        <h1 className="relative z-10 font-black leading-[0.9] tracking-tighter mb-6 mx-auto text-white"
          style={{ fontSize: "clamp(56px, 9vw, 108px)", maxWidth: "900px" }}>
          Your memory,<br />supercharged.
        </h1>

        <p className="relative z-10 text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
          Past papers, AI marking, and spaced repetition — everything you need to go from revision to top grades.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 mb-24">
          <Link href="/register" className="px-7 py-3 text-[15px] rounded-lg font-semibold text-black transition-opacity hover:opacity-90"
            style={{ background: "#fff" }}>
            Try Leaply free
          </Link>
          <Link href="/login" className="px-7 py-3 text-[15px] rounded-lg font-medium transition-colors hover:bg-white/5"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}>
            Sign in
          </Link>
        </div>

        <div className="relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.09)", paddingTop: "40px" }}>
          <p className="text-[11px] font-mono uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            Trusted by students preparing for
          </p>
          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "Cambridge IGCSE", src: "/exam-boards/cambridge-igcse.png", width: 168 },
              { name: "Cambridge A Levels", src: "/exam-boards/cambridge-a-levels.png", width: 154 },
              { name: "Edexcel Pearson", src: "/exam-boards/edexcel-pearson.png", width: 138 },
              { name: "AQA", src: "/exam-boards/aqa.png", width: 126 },
              { name: "International Baccalaureate", src: "/exam-boards/ib.png", width: 160 },
            ].map((board) => (
              <div
                key={board.name}
                className="flex h-16 items-center justify-center rounded-xl px-3 transition-opacity hover:opacity-100"
                style={{ opacity: 0.78 }}
              >
                <img
                  src={board.src}
                  alt={board.name}
                  className="max-h-12 object-contain"
                  style={{
                    width: `${board.width}px`,
                    filter: "saturate(0.9) brightness(1.12) contrast(0.96)",
                  }}
                />
              </div>
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
              { name: "Biology", board: "Cambridge IGCSE", code: "0610", icon: "bio", accent: "#22c55e" },
              { name: "Mathematics", board: "Cambridge A-Level", code: "9709", icon: "math", accent: "#38bdf8" },
              { name: "Chemistry", board: "Cambridge IGCSE", code: "0620", icon: "chem", accent: "#f59e0b" },
              { name: "Physics", board: "Cambridge IGCSE", code: "0625", icon: "physics", accent: "#a78bfa" },
              { name: "English Lang.", board: "Cambridge IGCSE", code: "0500", icon: "english", accent: "#fb7185" },
              { name: "Economics", board: "Cambridge A-Level", code: "9708", icon: "econ", accent: "#2dd4bf" },
              { name: "History", board: "Cambridge A-Level", code: "9489", icon: "history", accent: "#eab308" },
              { name: "Computer Sci.", board: "Cambridge A-Level", code: "9618", icon: "cs", accent: "#60a5fa" },
            ].map((s) => (
              <div key={s.code} className="group p-5 rounded-2xl transition-all hover:-translate-y-0.5 hover:border-white/20"
                style={{
                  background: `linear-gradient(145deg, ${s.accent}14 0%, rgba(255,255,255,0.04) 46%)`,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl transition-transform group-hover:scale-105"
                    style={{
                      color: s.accent,
                      background: `${s.accent}18`,
                      border: `1px solid ${s.accent}33`,
                    }}
                  >
                    <SubjectGlyph icon={s.icon as SubjectIcon} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[9px] font-mono uppercase"
                    style={{
                      color: s.accent,
                      background: `${s.accent}12`,
                      border: `1px solid ${s.accent}26`,
                    }}
                  >
                    Available
                  </span>
                </div>
                <div className="font-bold text-sm mb-0.5 text-white">{s.name}</div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.52)" }}>{s.board}</div>
                <div className="font-mono text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.38)" }}>{s.code}</div>
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
