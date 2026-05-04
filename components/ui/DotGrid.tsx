"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty("--x", `${e.clientX}px`);
      glowRef.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Base dots */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }} />
      {/* Glow layer — brighter dots revealed under mouse */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage: "radial-gradient(circle 180px at var(--x, -999px) var(--y, -999px), black 0%, transparent 100%)",
          maskImage: "radial-gradient(circle 180px at var(--x, -999px) var(--y, -999px), black 0%, transparent 100%)",
        } as React.CSSProperties}
      />
    </>
  );
}
