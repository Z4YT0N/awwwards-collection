"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, type MouseEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: number;
  border?: boolean;
  tilt?: boolean;
}

interface FrostedPanelProps {
  children: ReactNode;
  className?: string;
  noise?: boolean;
}

// ─── LiquidGlass ────────────────────────────────────────────────────────────
// iOS 26-style liquid glass effect with tilt and refraction

export function LiquidGlass({
  children,
  className,
  intensity = 1,
}: LiquidGlassProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8 * intensity, -8 * intensity]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8 * intensity, 8 * intensity]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/[0.08] dark:bg-white/[0.05]",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/[0.15]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent",
        "before:pointer-events-none",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ─── GlassCard ──────────────────────────────────────────────────────────────
// Simple glass morphism card

export function GlassCard({
  children,
  className,
  blur = 20,
  border = true,
  tilt = false,
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...(tilt ? { rotateX, rotateY, transformPerspective: 800 } : {}),
        backdropFilter: `blur(${blur}px)`,
      }}
      className={cn(
        "rounded-xl p-6",
        "bg-white/[0.06] dark:bg-white/[0.04]",
        border && "border border-white/[0.1]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ─── FrostedPanel ───────────────────────────────────────────────────────────
// Panel with heavy frosted glass + optional noise texture

export function FrostedPanel({
  children,
  className,
  noise = true,
}: FrostedPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-200",
        "border border-white/[0.08]",
        "shadow-[0_16px_64px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      {/* Noise texture overlay */}
      {noise && (
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Gradient shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
