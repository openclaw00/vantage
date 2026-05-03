"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

function zodResolver(schema: z.ZodSchema<unknown>) {
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

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema) as never,
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    // Auto-sign in after registration
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: true,
    });
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-[var(--color-surface)] border-r border-[var(--color-border)]">
        <Link href="/" className="font-serif text-xl text-[var(--color-text)]">
          Vantage
        </Link>
        <div className="space-y-6">
          {[
            { stat: "24+", label: "Real exam questions" },
            { stat: "2", label: "Subjects (more soon)" },
            { stat: "Free", label: "To start — no card needed" },
          ].map((item) => (
            <div key={item.stat} className="flex items-baseline gap-4">
              <span className="font-serif text-4xl text-[var(--color-amber)]">{item.stat}</span>
              <span className="text-sm text-[var(--color-text-muted)]">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-xs text-[var(--color-text-faint)]">
          IGCSE · A-LEVEL · IB
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link href="/" className="font-serif text-xl text-[var(--color-text)]">
              Vantage
            </Link>
          </div>

          <h1 className="font-serif text-3xl text-[var(--color-text)] mb-2">
            Create your account.
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Already have one?{" "}
            <Link href="/login" className="text-[var(--color-amber)] hover:underline">
              Sign in
            </Link>
          </p>

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
            {googleLoading ? "Signing up..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-text-faint)] font-mono">OR</span>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
                Full name
              </label>
              <input
                {...register("name")}
                type="text"
                autoComplete="name"
                placeholder="Alex Chen"
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
              )}
            </div>

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
                autoComplete="new-password"
                placeholder="At least 8 characters"
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-xs text-center text-[var(--color-text-faint)] mt-6">
            By signing up, you agree to our{" "}
            <a href="#" className="underline hover:text-[var(--color-text-muted)]">Terms</a> and{" "}
            <a href="#" className="underline hover:text-[var(--color-text-muted)]">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
