import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "Menlo", "monospace"],
      },
      colors: {
        bg:      "#07070f",
        surface: "rgba(255,255,255,0.04)",
        violet: {
          DEFAULT: "#8b5cf6",
          bright:  "#a78bfa",
          dim:     "#6d28d9",
          glow:    "rgba(139,92,246,0.15)",
        },
        indigo: {
          DEFAULT: "#6366f1",
          bright:  "#818cf8",
        },
        glass: {
          DEFAULT: "rgba(255,255,255,0.06)",
          border:  "rgba(255,255,255,0.09)",
          hover:   "rgba(255,255,255,0.09)",
        },
      },
      backgroundImage: {
        "gradient-violet": "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
        "gradient-text":   "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
        "glow-violet":     "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 70%)",
        "noise":           "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in":    "fadeIn 0.35s ease-out forwards",
        "slide-up":   "slideUp 0.4s ease-out forwards",
        "slide-down": "slideDown 0.25s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "shimmer":    "shimmer 2s infinite",
        "float":      "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:   { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        glowPulse: { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
      },
      boxShadow: {
        glass:  "0 0 0 1px rgba(255,255,255,0.08), 0 4px 32px rgba(0,0,0,0.4)",
        violet: "0 0 40px rgba(139,92,246,0.25), 0 0 80px rgba(99,102,241,0.1)",
        card:   "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 4px 24px rgba(0,0,0,0.5)",
        cta:    "0 0 0 1px rgba(139,92,246,0.5), 0 4px 20px rgba(139,92,246,0.3)",
      },
      backdropBlur: { xs: "4px" },
    },
  },
  plugins: [],
};

export default config;
