"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  springConfig?: { stiffness: number; damping: number };
}

// ─── Magnetic ───────────────────────────────────────────────────────────────
// Element that attracts toward the cursor when nearby

export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 200,
  springConfig = { stiffness: 150, damping: 15 },
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < radius) {
      x.set(distX * strength);
      y.set(distY * strength);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

// ─── MagneticButton ─────────────────────────────────────────────────────────
// Pre-styled magnetic button with hover effects

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "default",
}: MagneticButtonProps) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted/50",
  };

  return (
    <Magnetic strength={0.3}>
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors",
          variants[variant],
          className
        )}
      >
        {children}
      </motion.button>
    </Magnetic>
  );
}
