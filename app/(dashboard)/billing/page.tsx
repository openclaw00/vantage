import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Billing" };

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  const isPro = session?.user.tier === "PRO";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-[var(--color-text)]">Billing</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm">
          Manage your subscription.
        </p>
      </div>

      {/* Current plan */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-mono text-xs text-[var(--color-text-muted)] mb-1">CURRENT PLAN</div>
            <div className="font-serif text-2xl text-[var(--color-text)]">
              {isPro ? "Pro" : "Free"}
            </div>
          </div>
          <span
            className={`font-mono text-xs px-3 py-1 rounded-full border ${
              isPro
                ? "border-[var(--color-amber)] text-[var(--color-amber)]"
                : "border-[var(--color-border-2)] text-[var(--color-text-muted)]"
            }`}
          >
            {isPro ? "ACTIVE" : "FREE TIER"}
          </span>
        </div>

        <ul className="space-y-2 mb-6">
          {isPro ? [
            "Unlimited AI markings",
            "AI Explain This",
            "AI-generated practice questions",
            "Weak topic detector",
            "Timed mock exams",
          ] : [
            "Full question bank access",
            "Mark scheme viewer",
            "5 AI markings per day",
            "Basic flashcards",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <span className={isPro ? "text-green-400" : "text-[var(--color-amber)]"}>
                {isPro ? "✓" : "—"}
              </span>
              {f}
            </li>
          ))}
        </ul>

        {!isPro && (
          <div className="border-t border-[var(--color-border)] pt-5">
            <div className="font-serif text-2xl text-[var(--color-text)] mb-1">
              Upgrade to Pro — £9/month
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Unlimited AI markings, weak topic detection, mock exam mode, and more.
              Cancel any time.
            </p>
            <button
              className="w-full bg-[var(--color-amber)] text-black py-3 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-colors"
              onClick={() => {
                /* Stripe checkout would go here */
                alert("Stripe integration: set STRIPE_SECRET_KEY and STRIPE_PRO_PRICE_ID in .env to enable payments.");
              }}
            >
              Start 7-day free trial → then £9/month
            </button>
            <p className="text-xs text-center text-[var(--color-text-faint)] mt-3">
              Powered by Stripe · Secure · Cancel anytime
            </p>
          </div>
        )}

        {isPro && (
          <div className="border-t border-[var(--color-border)] pt-5">
            <button className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              Manage subscription →
            </button>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link href="/dashboard" className="text-xs text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
