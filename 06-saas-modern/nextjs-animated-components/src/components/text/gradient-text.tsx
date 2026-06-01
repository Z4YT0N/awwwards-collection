"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  gradient = "from-purple-500 via-pink-500 to-red-500",
  animate = false,
}: GradientTextProps) {
  if (animate) {
    return (
      <motion.span
        className={cn(
          "inline-block bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient",
          gradient,
          className
        )}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent",
        gradient,
        className
      )}
    >
      {children}
    </span>
  );
}

// Shiny text effect
interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShinyText({ children, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-transparent via-white/80 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #000 0%, #fff 50%, #000 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

// Neon glow text
interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "cyan" | "purple" | "pink" | "green" | "yellow";
}

export function NeonText({
  children,
  className,
  color = "cyan",
}: NeonTextProps) {
  const colors = {
    cyan: {
      text: "text-cyan-400",
      shadow:
        "drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]",
    },
    purple: {
      text: "text-purple-400",
      shadow:
        "drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] drop-shadow-[0_0_30px_rgba(192,132,252,0.4)]",
    },
    pink: {
      text: "text-pink-400",
      shadow:
        "drop-shadow-[0_0_10px_rgba(244,114,182,0.8)] drop-shadow-[0_0_30px_rgba(244,114,182,0.4)]",
    },
    green: {
      text: "text-green-400",
      shadow:
        "drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] drop-shadow-[0_0_30px_rgba(74,222,128,0.4)]",
    },
    yellow: {
      text: "text-yellow-400",
      shadow:
        "drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]",
    },
  };

  return (
    <span
      className={cn(
        "inline-block font-bold",
        colors[color].text,
        colors[color].shadow,
        className
      )}
    >
      {children}
    </span>
  );
}

// Text with animated underline
interface UnderlineTextProps {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
  duration?: number;
}

export function UnderlineText({
  children,
  className,
  underlineColor = "bg-gradient-to-r from-purple-500 to-pink-500",
  duration = 0.3,
}: UnderlineTextProps) {
  return (
    <motion.span
      className={cn("relative inline-block cursor-pointer group", className)}
      whileHover="hover"
    >
      {children}
      <motion.span
        className={cn("absolute bottom-0 left-0 h-[2px] w-full", underlineColor)}
        initial={{ scaleX: 0 }}
        variants={{
          hover: {
            scaleX: 1,
            transition: { duration, ease: "easeInOut" },
          },
        }}
        style={{ transformOrigin: "left" }}
      />
    </motion.span>
  );
}

// Split color text
interface SplitColorTextProps {
  text: string;
  className?: string;
  leftColor?: string;
  rightColor?: string;
  splitPosition?: number; // 0-100
}

export function SplitColorText({
  text,
  className,
  leftColor = "text-white",
  rightColor = "text-purple-500",
  splitPosition = 50,
}: SplitColorTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      {/* Full text as base */}
      <span className={rightColor}>{text}</span>
      {/* Overlay with clip */}
      <span
        className={cn("absolute inset-0", leftColor)}
        style={{
          clipPath: `inset(0 ${100 - splitPosition}% 0 0)`,
        }}
      >
        {text}
      </span>
    </span>
  );
}
