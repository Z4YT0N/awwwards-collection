"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

interface ShimmerBorderProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  animationDuration?: number;
}

// ─── BorderBeam ─────────────────────────────────────────────────────────────
// A beam of light that travels around the border of an element

export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(var(--accent))",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{ overflow: "hidden", padding: borderWidth }}
    >
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          borderRadius: "50%",
          filter: `blur(${size / 4}px)`,
          opacity: 0.8,
          offsetPath: "rect(0% 100% 100% 0% round 0)",
          animation: `border-beam-travel ${duration}s linear ${delay}s infinite`,
        } as React.CSSProperties}
      />

      <style jsx>{`
        @keyframes border-beam-travel {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── ShimmerBorder ──────────────────────────────────────────────────────────
// Element with animated shimmer/gradient border

export function ShimmerBorder({
  children,
  className,
  shimmerColor = "hsl(var(--primary))",
  shimmerSize = "200px",
  borderRadius = "12px",
  shimmerDuration = "3s",
  background = "hsl(var(--surface))",
}: ShimmerBorderProps) {
  return (
    <div
      className={cn("relative overflow-hidden p-px", className)}
      style={{ borderRadius }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius,
          background: `linear-gradient(var(--shimmer-angle, 0deg), transparent 40%, ${shimmerColor} 50%, transparent 60%)`,
          backgroundSize: `${shimmerSize} ${shimmerSize}`,
          animation: `shimmer-spin ${shimmerDuration} linear infinite`,
        }}
      />

      {/* Inner content */}
      <div
        className="relative h-full w-full"
        style={{ borderRadius: `calc(${borderRadius} - 1px)`, background }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes shimmer-spin {
          0% { --shimmer-angle: 0deg; }
          100% { --shimmer-angle: 360deg; }
        }
        @property --shimmer-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </div>
  );
}

// ─── GlowingBorder ──────────────────────────────────────────────────────────
// Pulsing glow border effect

export function GlowingBorder({
  children,
  className,
  color = "hsl(var(--primary))",
  animationDuration = 2,
}: GlowingBorderProps) {
  return (
    <motion.div
      className={cn("relative rounded-xl p-px", className)}
      animate={{
        boxShadow: [
          `0 0 20px ${color}33, 0 0 40px ${color}11`,
          `0 0 30px ${color}55, 0 0 60px ${color}22`,
          `0 0 20px ${color}33, 0 0 40px ${color}11`,
        ],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-xl opacity-50"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent, ${color})`,
        }}
      />

      {/* Content */}
      <div className="relative rounded-[11px] bg-surface">{children}</div>
    </motion.div>
  );
}
