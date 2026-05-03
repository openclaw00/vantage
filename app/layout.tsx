import type { Metadata } from "next";
import { DM_Serif_Display, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Vantage — Exam Prep", template: "%s | Vantage" },
  description:
    "AI-powered exam preparation for IGCSE, A-Level and IB. Past papers, mark schemes, AI marking and spaced repetition flashcards.",
  keywords: ["IGCSE", "A-Level", "IB", "past papers", "exam prep", "revision", "mark scheme"],
  openGraph: {
    title: "Vantage — Exam Prep",
    description: "Gain the academic edge with AI-powered revision.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${jetbrainsMono.variable} ${plusJakarta.variable}`}
    >
      <body className="min-h-screen grain">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
