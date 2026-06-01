"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode, type MouseEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  rippleColor?: string;
  duration?: number;
}

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

// ─── RippleButton ───────────────────────────────────────────────────────────
// Material-design inspired click ripple effect

export function RippleButton({
  children,
  className,
  onClick,
  rippleColor = "hsl(var(--primary) / 0.3)",
  duration = 0.6,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { id: Date.now(), x, y, size };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, duration * 1000);

    onClick?.();
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              background: rippleColor,
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}

// ─── Ripple (standalone) ────────────────────────────────────────────────────
// Click anywhere ripple effect wrapper

interface RippleProps {
  className?: string;
  color?: string;
}

export function Ripple({ className, color = "hsl(var(--primary))" }: RippleProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: color }}
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
