"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function zodResolver(schema: z.ZodSchema<any>) {
  return async (data: unknown) => {
    const result = schema.safeParse(data);
    if (result.success) return { values: result.data, errors: {} };
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      errors[issue.path.join(".")] = { type: "manual", message: issue.message };
    }
    return { values: {}, errors };
  };
}

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema) as never,
  });

  const onSubmit = async (data: Form) => {
    setLoading(true); setError("");
    const result = await signIn("credentials", { ...data, redirect: false });
    setLoading(false);
    if (result?.error) { setError("Invalid email or password"); return; }
    router.push(callbackUrl); router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#07070f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] top-[-150px] left-[50%] -translate-x-1/2 bg-violet-500/15 rounded-full" style={{ filter: "blur(100px)" }} />
        <div className="absolute w-[300px] h-[300px] bottom-[-80px] right-[-60px] bg-indigo-500/10 rounded-full" style={{ filter: "blur(80px)" }} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="font-display font-semibold text-lg">Vantage</span>
        </Link>

        <div className="glass rounded-2xl p-8 border border-white/[0.08] shadow-glass">
          <h1 className="font-display font-bold text-2xl mb-1">Welcome back</h1>
          <p className="text-sm text-white/40 mb-7">
            No account?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">Sign up free</Link>
          </p>

          {/* Google */}
          <button
            onClick={async () => { setGoogleLoading(true); await signIn("google", { callbackUrl }); }}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/[0.06] border border-white/[0.09] rounded-xl py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.09] hover:text-white transition-all mb-5 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] text-white/25 font-mono">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-1.5">Email</label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="you@school.edu"
                className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-1.5">Password</label>
              <input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
              />
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-xl mt-1 disabled:opacity-50">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-[11px] text-white/20 text-center mt-5 font-mono">
            Demo: demo@vantage.study / password123
          </p>
        </div>
      </div>
    </div>
  );
}
