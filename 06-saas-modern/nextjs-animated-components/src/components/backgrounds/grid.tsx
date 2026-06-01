"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "grid" | "dot" | "grid-small";
  color?: string;
  fadeDirection?: "top" | "bottom" | "both" | "none";
}

export function GridBackground({
  children,
  className,
  variant = "grid",
  color = "rgba(255,255,255,0.03)",
  fadeDirection = "both",
}: GridBackgroundProps) {
  const bgClass = {
    grid: "bg-grid",
    dot: "bg-dot",
    "grid-small": "bg-grid-small",
  }[variant];

  const fadeClass = {
    top: "[mask-image:linear-gradient(to_bottom,transparent,black_20%)]",
    bottom: "[mask-image:linear-gradient(to_bottom,black_80%,transparent)]",
    both: "[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]",
    none: "",
  }[fadeDirection];

  return (
    <div className={cn("relative w-full bg-black", className)}>
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          bgClass,
          fadeClass
        )}
        style={
          {
            "--grid-color": color,
          } as React.CSSProperties
        }
      />
      {children}
    </div>
  );
}

// Animated grid with beams
export function GridBeams({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full bg-black overflow-hidden", className)}>
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated beams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse" />
        <div
          className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/50 to-transparent animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/50 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {children}
    </div>
  );
}

// Perspective grid
export function PerspectiveGrid({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full bg-black overflow-hidden", className)}>
      <div className="absolute inset-0 [perspective:1000px]">
        <div
          className="absolute inset-0 bg-grid-white/[0.05]"
          style={{
            transform: "rotateX(75deg)",
            transformOrigin: "center top",
            maskImage:
              "linear-gradient(to bottom, black 20%, transparent 80%)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
