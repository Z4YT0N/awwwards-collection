"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
  gap?: number;
}

// ─── Marquee ────────────────────────────────────────────────────────────────

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  speed = 40,
  gap = 16,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
          "--gap": `${gap}px`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col animate-marquee-vertical" : "animate-marquee",
            reverse && (vertical ? "animate-marquee-vertical-reverse" : "animate-marquee-reverse"),
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

// ─── MarqueeItem ────────────────────────────────────────────────────────────

interface MarqueeItemProps {
  children: ReactNode;
  className?: string;
}

export function MarqueeItem({ children, className }: MarqueeItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-border/50 bg-surface/60 backdrop-blur-sm px-6 py-4",
        "shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
