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
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        sans:    ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "Menlo", "monospace"],
      },
      colors: {
        bg:      "#f5f4f0",
        surface: "rgba(0,0,0,0.03)",
        orange: {
          DEFAULT: "#f97316",
          bright:  "#fb923c",
          dim:     "#ea580c",
          glow:    "rgba(249,115,22,0.15)",
        },
        glass: {
          DEFAULT: "rgba(255,255,255,0.82)",
          border:  "rgba(0,0,0,0.07)",
          hover:   "rgba(255,255,255,0.94)",
        },
      },
      backgroundImage: {
        "gradient-orange": "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
        "gradient-text":   "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
        "glow-orange":     "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(249,115,22,0.14) 0%, transparent 70%)",
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
        glass:  "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)",
        orange: "0 0 40px rgba(249,115,22,0.18), 0 0 80px rgba(234,88,12,0.08)",
        card:   "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)",
        cta:    "0 0 0 1px rgba(249,115,22,0.4), 0 4px 16px rgba(249,115,22,0.22)",
      },
      backdropBlur: { xs: "4px" },
    },
  },
  plugins: [],
};

export default config;
