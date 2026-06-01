"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { type ReactNode, type MouseEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}

interface SpotlightBorderCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}

// ─── SpotlightCard ──────────────────────────────────────────────────────────
// Card with cursor-following radial spotlight effect

export function SpotlightCard({
  children,
  className,
  spotlightColor = "hsl(var(--primary) / 0.15)",
  radius = 350,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-surface p-8",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── SpotlightBorderCard ────────────────────────────────────────────────────
// Card with cursor-following spotlight on the border only

export function SpotlightBorderCard({
  children,
  className,
  spotlightColor = "hsl(var(--primary))",
  radius = 250,
}: SpotlightBorderCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative rounded-xl p-px", className)}
    >
      {/* Spotlight border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Inner card */}
      <div className="relative rounded-[11px] bg-surface p-8">{children}</div>
    </div>
  );
}

// ─── SpotlightGrid ──────────────────────────────────────────────────────────
// Grid of cards with shared spotlight effect

interface SpotlightGridProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightGrid({ children, className }: SpotlightGridProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative grid gap-4", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.06), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
