"use client";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ShowcaseGlow({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !glowRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(22,163,74,0.18) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
