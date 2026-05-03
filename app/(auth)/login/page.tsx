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
      const path = issue.path.join(".");
      errors[path] = { type: "manual", message: issue.message };
    }
    return { values: {}, errors };
  };
}

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema) as never,
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-[var(--color-surface)] border-r border-[var(--color-border)]">
        <Link href="/" className="font-serif text-xl text-[var(--color-text)]">
          Vantage
        </Link>
        <div>
          <blockquote className="font-serif text-3xl text-[var(--color-text)] leading-snug mb-4">
            &ldquo;The difference between a good student and a great student is knowing
            exactly what they don&apos;t know.&rdquo;
          </blockquote>
          <cite className="text-sm text-[var(--color-text-muted)] not-italic font-mono">
            — EXAMINER&apos;S PERSPECTIVE
          </cite>
        </div>
        <div className="font-mono text-xs text-[var(--color-text-faint)]">
          IGCSE · A-LEVEL · IB
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link href="/" className="font-serif text-xl text-[var(--color-text)]">
              Vantage
            </Link>
          </div>

          <h1 className="font-serif text-3xl text-[var(--color-text)] mb-2">Welcome back.</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            New here?{" "}
            <Link href="/register" className="text-[var(--color-amber)] hover:underline">
              Create an account
            </Link>
          </p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-[var(--color-border-2)] text-[var(--color-text)] py-3 rounded font-medium text-sm hover:bg-[var(--color-surface)] transition-colors mb-6 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-text-faint)] font-mono">OR</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="you@school.edu"
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
              />
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-800/50 rounded px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-amber)] text-black py-3 rounded font-semibold text-sm hover:bg-[var(--color-amber-light)] transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-[var(--color-text-faint)] text-center mt-6">
            Demo account:{" "}
            <span className="font-mono text-[var(--color-text-muted)]">
              demo@vantage.study / password123
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
