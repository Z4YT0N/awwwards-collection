"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrbitingCirclesProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

interface OrbitProps {
  className?: string;
  children?: ReactNode;
  innerOrbit?: ReactNode[];
  outerOrbit?: ReactNode[];
  centerContent?: ReactNode;
  innerRadius?: number;
  outerRadius?: number;
  innerDuration?: number;
  outerDuration?: number;
}

// ─── OrbitingCircles ────────────────────────────────────────────────────────
// Elements that orbit around a center point

export function OrbitingCircles({
  children,
  className,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-border/20"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}
      <div
        className={cn(
          "absolute flex h-full w-full transform-gpu items-center justify-center",
          className
        )}
        style={{
          animation: `orbit ${duration}s linear ${delay}s infinite${reverse ? " reverse" : ""}`,
          ["--radius" as string]: `${radius}px`,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(var(--radius)) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(var(--radius)) rotate(-360deg); }
        }
      `}</style>
    </>
  );
}

// ─── OrbitSystem ────────────────────────────────────────────────────────────
// Complete orbit system with inner/outer rings

export function OrbitSystem({
  className,
  centerContent,
  innerOrbit = [],
  outerOrbit = [],
  innerRadius = 80,
  outerRadius = 160,
  innerDuration = 20,
  outerDuration = 30,
}: OrbitProps) {
  return (
    <div className={cn("relative flex h-[400px] w-[400px] items-center justify-center", className)}>
      {/* Center */}
      {centerContent && (
        <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface shadow-lg">
          {centerContent}
        </div>
      )}

      {/* Inner orbit */}
      {innerOrbit.map((item, i) => (
        <OrbitingCircles
          key={`inner-${i}`}
          radius={innerRadius}
          duration={innerDuration}
          delay={i * (innerDuration / innerOrbit.length)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-md">
            {item}
          </div>
        </OrbitingCircles>
      ))}

      {/* Outer orbit */}
      {outerOrbit.map((item, i) => (
        <OrbitingCircles
          key={`outer-${i}`}
          radius={outerRadius}
          duration={outerDuration}
          delay={i * (outerDuration / outerOrbit.length)}
          reverse
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-md">
            {item}
          </div>
        </OrbitingCircles>
      ))}
    </div>
  );
}
