"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useState, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ConfettiButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  particleCount?: number;
  colors?: string[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: "square" | "circle" | "triangle";
}

// ─── ConfettiButton ─────────────────────────────────────────────────────────
// Button that shoots confetti particles on click

export function ConfettiButton({
  children,
  className,
  onClick,
  particleCount = 30,
  colors,
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const defaultColors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--secondary))",
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
  ];

  const confettiColors = colors || defaultColors;

  const handleClick = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 200 + 100),
      rotation: Math.random() * 720 - 360,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: Math.random() * 8 + 4,
      shape: (["square", "circle", "triangle"] as const)[Math.floor(Math.random() * 3)],
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1500);
    onClick?.();
  }, [particleCount, confettiColors, onClick]);

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95",
          className
        )}
      >
        {children}
      </button>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: 0,
          }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.shape === "circle" ? "50%" : particle.shape === "triangle" ? "0" : "2px",
            clipPath: particle.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

// ─── CelebrationConfetti ────────────────────────────────────────────────────
// Full-screen confetti rain effect

interface CelebrationProps {
  active?: boolean;
  className?: string;
  particleCount?: number;
}

export function CelebrationConfetti({
  active = false,
  className,
  particleCount = 80,
}: CelebrationProps) {
  if (!active) return null;

  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
  ];

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50 overflow-hidden", className)}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            x: `${Math.random() * 100}vw`,
            y: -20,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            y: "110vh",
            rotate: Math.random() * 720,
            x: `${Math.random() * 100}vw`,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 0.5,
            ease: "easeIn",
          }}
          className="absolute"
          style={{
            width: Math.random() * 10 + 4,
            height: Math.random() * 10 + 4,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
