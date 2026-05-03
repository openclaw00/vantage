import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[var(--color-bg)] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl text-[var(--color-text)]">Vantage</span>
            <span className="font-mono text-[10px] text-[var(--color-text-muted)] border border-[var(--color-border-2)] px-1.5 py-0.5 rounded">
              BETA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Subjects", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-[var(--color-amber)] text-black px-4 py-2 rounded font-medium hover:bg-[var(--color-amber-light)] transition-colors"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64' fill='none' stroke='rgb(30 58 92 / 0.5)'%3e%3cpath d='M0 .5H63.5V64'/%3e%3c/svg%3e")`,
        }}
      />

      {/* Hero */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 border border-[var(--color-border-2)] rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] animate-pulse-slow" />
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              AI-POWERED EXAM PREP · IGCSE · A-LEVEL · IB
            </span>
          </div>

          <h1 className="font-serif text-7xl md:text-[100px] lg:text-[120px] text-[var(--color-text)] leading-[0.92] mb-8">
            Gain the
            <br />
            <em className="not-italic text-[var(--color-amber)]">Academic</em>
            <br />
            Edge.
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed">
            Past papers, mark schemes, AI-powered marking, and spaced repetition — everything
            you need to go from revision to results. Built for serious students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-amber)] text-black px-8 py-4 rounded font-semibold text-base hover:bg-[var(--color-amber-light)] transition-all hover:-translate-y-0.5 shadow-[0_0_40px_rgba(217,119,6,0.25)]"
            >
              Start revising free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-border-2)] text-[var(--color-text-muted)] px-8 py-4 rounded font-medium text-base hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
            >
              Browse question bank
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <div className="font-mono text-3xl text-[var(--color-text)]">24+</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Sample questions</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]" />
            <div>
              <div className="font-mono text-3xl text-[var(--color-text)]">2</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Subjects (expanding)</div>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]" />
            <div>
              <div className="font-mono text-3xl text-[var(--color-amber)]">AI</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Instant marking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="features" className="py-24 px-6 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
            {[
              {
                num: "01",
                title: "Past Paper Question Bank",
                body: "Filter by subject, year, topic, difficulty, and exam board. Every question paired with its official mark scheme.",
              },
              {
                num: "02",
                title: "AI Mark My Answer",
                body: "Type your answer, get scored against the real mark scheme. Pinpoint feedback on exactly what you missed and what to say next time.",
              },
              {
                num: "03",
                title: "Spaced Repetition Flashcards",
                body: "SM-2 algorithm surfaces the cards you're about to forget. Never waste time on what you already know.",
              },
              {
                num: "04",
                title: "Weak Topic Detector",
                body: "AI analyses your attempt history and surfaces your weakest topics with targeted practice queues.",
              },
              {
                num: "05",
                title: "Timed Mock Exams",
                body: "Pull a full paper's worth of questions, set a countdown, and experience real exam conditions.",
              },
              {
                num: "06",
                title: "Progress Dashboard",
                body: "Score over time, topic coverage, attempt history, and a clear picture of where you stand.",
              },
            ].map((f) => (
              <div
                key={f.num}
                className="bg-[var(--color-bg)] p-8 hover:bg-[var(--color-surface)] transition-colors group"
              >
                <div className="font-mono text-xs text-[var(--color-text-faint)] mb-4">
                  {f.num}
                </div>
                <h3 className="font-serif text-xl text-[var(--color-text)] mb-3 group-hover:text-[var(--color-amber)] transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Marking preview */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-xs text-[var(--color-amber)] mb-4 tracking-widest">
                AI MARKING ENGINE
              </div>
              <h2 className="font-serif text-5xl text-[var(--color-text)] mb-6 leading-tight">
                Instant feedback from a Cambridge examiner.{" "}
                <em className="not-italic text-[var(--color-text-muted)]">
                  Powered by AI.
                </em>
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
                Write your answer to any past paper question. Our AI — trained on Cambridge mark
                scheme conventions — grades your response point by point, tells you exactly what
                you got right, what&apos;s missing, and shows you a model answer.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-[var(--color-amber)] font-medium hover:gap-3 transition-all"
              >
                Try it free →
              </Link>
            </div>

            {/* Mock marking UI */}
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  BIOLOGY 0610 · Q1(a) · 3 marks
                </span>
                <span className="font-mono text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">
                  3 / 3
                </span>
              </div>
              <p className="text-sm text-[var(--color-text)] leading-relaxed border-l-2 border-[var(--color-amber)] pl-4">
                State THREE differences between a plant cell and an animal cell.
              </p>
              <div className="bg-[var(--color-surface-2)] rounded p-4 text-sm text-[var(--color-text-muted)] italic">
                &ldquo;Plant cells have a cell wall, animal cells do not. Plant cells have
                chloroplasts for photosynthesis, animal cells do not. Plant cells have a large
                permanent vacuole, animal cells only have small temporary ones.&rdquo;
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-green-400 text-xs font-mono">✓</span>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-text)]">Cell wall [1]</span> — correct comparison with both sides stated.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-green-400 text-xs font-mono">✓</span>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-text)]">Chloroplasts [1]</span> — correctly identified as absent in animal cells.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-green-400 text-xs font-mono">✓</span>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-text)]">Vacuole [1]</span> — comparison stated on both sides. Full marks.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-amber)]">
                  Examiner&apos;s tip: Always state both sides of the comparison. &ldquo;Plant cells have X&rdquo; is not enough — add &ldquo;animal cells do not.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl text-[var(--color-text)] mb-12">
            Subjects covered.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Biology", board: "Cambridge IGCSE", code: "0610", color: "#16A34A" },
              { name: "Mathematics", board: "Cambridge A-Level", code: "9709", color: "#2563EB" },
              { name: "Chemistry", board: "Coming soon", code: "0620", color: "#7C3AED", soon: true },
              { name: "Physics", board: "Coming soon", code: "0625", color: "#EA580C", soon: true },
              { name: "English", board: "Coming soon", code: "0500", color: "#0891B2", soon: true },
              { name: "Economics", board: "Coming soon", code: "9708", color: "#CA8A04", soon: true },
              { name: "History", board: "Coming soon", code: "9489", color: "#DC2626", soon: true },
              { name: "Computer Sci.", board: "Coming soon", code: "9618", color: "#059669", soon: true },
            ].map((s) => (
              <div
                key={s.code}
                className={`card p-5 ${s.soon ? "opacity-40" : "hover:border-[var(--color-border-2)] cursor-pointer"} transition-all`}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: s.color }}
                />
                <div className="font-medium text-[var(--color-text)] text-sm">{s.name}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{s.board}</div>
                <div className="font-mono text-xs text-[var(--color-text-faint)] mt-1">{s.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-5xl text-[var(--color-text)] mb-4">
            Simple pricing.
          </h2>
          <p className="text-[var(--color-text-muted)] mb-16 text-lg">
            Start free. Upgrade when you need the AI features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="card p-8">
              <div className="font-mono text-xs text-[var(--color-text-muted)] mb-4">FREE</div>
              <div className="font-serif text-5xl text-[var(--color-text)] mb-1">£0</div>
              <div className="text-sm text-[var(--color-text-muted)] mb-8">Forever. No card required.</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Full question bank access",
                  "Mark scheme viewer",
                  "5 AI markings per day",
                  "Basic flashcards",
                  "Progress tracking",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-amber)] text-xs">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block text-center border border-[var(--color-border-2)] text-[var(--color-text)] py-3 rounded font-medium text-sm hover:bg-[var(--color-surface)] transition-colors"
              >
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div
              className="card p-8 relative"
              style={{ borderColor: "var(--color-amber)", boxShadow: "0 0 40px rgba(217,119,6,0.1)" }}
            >
              <div className="font-mono text-xs text-[var(--color-amber)] mb-4">PRO</div>
              <div className="font-serif text-5xl text-[var(--color-text)] mb-1">£9</div>
              <div className="text-sm text-[var(--color-text-muted)] mb-8">per month, cancel anytime.</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "Unlimited AI markings",
                  "AI Explain This (highlight any text)",
                  "AI-generated practice questions",
                  "Weak topic detector",
                  "Timed mock exam mode",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-amber)] text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block text-center bg-[var(--color-amber)] text-black py-3 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-colors"
              >
                Start Pro free for 7 days
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-serif text-lg text-[var(--color-text)] mb-1">Vantage</div>
            <div className="text-xs text-[var(--color-text-faint)]">
              © {new Date().getFullYear()} Vantage Study Ltd. All rights reserved.
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-[var(--color-text-muted)]">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-[var(--color-text)] transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
