"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function BillingPage() {
  const { data: session } = useSession();
  const isPro = session?.user?.tier === "PRO";
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setUpgradeLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUpgradeLoading(false);
    setToast("Stripe integration coming soon — add STRIPE_SECRET_KEY and STRIPE_PRO_PRICE_ID to .env to enable payments.");
    setTimeout(() => setToast(null), 6000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4">
          <div className="glass rounded-2xl px-5 py-4 border border-green-500/30 bg-green-500/10 text-sm text-gray-200 animate-slide-up">
            {toast}
          </div>
        </div>
      )}

      <div>
        <h1 className="font-display font-bold text-3xl text-white">Billing</h1>
        <p className="text-gray-400 mt-1 text-sm">Manage your Leaply subscription.</p>
      </div>

      {/* Current plan card */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current plan</div>
            <div className="font-display font-bold text-2xl text-white">{isPro ? "Pro" : "Free"}</div>
          </div>
          <span className={`font-mono text-xs px-3 py-1 rounded-full border ${
            isPro
              ? "border-green-500/40 text-green-500 bg-green-500/10"
              : "border-white/10 text-gray-400"
          }`}>
            {isPro ? "ACTIVE" : "FREE TIER"}
          </span>
        </div>

        <ul className="space-y-2.5 mb-6">
          {(isPro ? [
            "Unlimited AI markings",
            "AI Explain This",
            "AI-generated practice questions",
            "Weak topic detector",
            "Timed mock exams",
            "Priority support",
          ] : [
            "Full question bank access",
            "Mark scheme viewer",
            "5 AI markings per day",
            "Basic flashcards",
            "Progress tracking",
          ]).map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isPro ? "bg-green-500/20 text-green-500" : "bg-white/10 text-gray-500"}`}>
                {isPro ? (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                ) : (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" /></svg>
                )}
              </span>
              {f}
            </li>
          ))}
        </ul>

        {isPro && (
          <button className="text-sm text-gray-500 hover:text-gray-300 transition-colors font-mono inline-flex items-center gap-1">
            Manage subscription
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        )}
      </div>

      {/* Upgrade CTA */}
      {!isPro && (
        <div className="relative rounded-2xl p-8 border border-green-500/30 overflow-hidden glass">
          <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="font-mono text-[10px] text-green-500 uppercase tracking-widest mb-4">Upgrade to Pro</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-display font-bold text-5xl text-white">£9</span>
              <span className="text-gray-400 text-sm">/ month</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Unlimited AI markings, weak topic detection, mock exam mode, and more. Cancel anytime.
            </p>

            <ul className="space-y-2.5 mb-8">
              {[
                "Everything in Free",
                "Unlimited AI markings",
                "AI Explain This",
                "AI practice questions",
                "Weak topic detector",
                "Timed mock exams",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-4 h-4 rounded-full bg-green-500/25 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={upgradeLoading}
              className="btn-primary w-full py-3.5 rounded-xl text-[15px] inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {upgradeLoading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : (
                <>Start 7-day free trial <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg> then £9/month</>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-3 font-mono">
              Powered by Stripe · Secure · Cancel anytime
            </p>
          </div>
        </div>
      )}

      <div className="text-center pt-2">
        <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono inline-flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
