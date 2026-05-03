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
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          50:  "#E8EDF5",
          100: "#C5D0E4",
          200: "#8FA5C8",
          300: "#5E7BAC",
          400: "#3D5990",
          500: "#1E3A6E",
          600: "#162D56",
          700: "#0F2040",
          800: "#0B182E",
          900: "#070F1E",
          950: "#040A14",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          50: "#FDFCF9",
          100: "#F5F0E8",
          200: "#EDE4D0",
          300: "#DDD1B4",
          400: "#C9B990",
        },
        amber: {
          DEFAULT: "#D97706",
          light:   "#F59E0B",
          pale:    "#FEF3C7",
          dark:    "#92400E",
        },
        teal: {
          DEFAULT: "#0D9488",
          light:   "#14B8A6",
          pale:    "#CCFBF1",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#F5F0E8",
            a: { color: "#F59E0B" },
            h1: { fontFamily: "var(--font-serif)" },
            h2: { fontFamily: "var(--font-serif)" },
            h3: { fontFamily: "var(--font-serif)" },
          },
        },
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "slide-up":   "slideUp 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer":    "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "grid-navy": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(30 51 80 / 0.4)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
    },
  },
  plugins: [],
};

export default config;
