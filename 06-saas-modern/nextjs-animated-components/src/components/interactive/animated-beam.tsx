"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLDivElement | null>;
  fromRef: RefObject<HTMLDivElement | null>;
  toRef: RefObject<HTMLDivElement | null>;
  className?: string;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

// ─── AnimatedBeam ───────────────────────────────────────────────────────────
// SVG beam animation connecting two elements, inspired by magicui

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "hsl(var(--primary))",
  gradientStopColor = "hsl(var(--accent))",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useRef(`beam-${Math.random().toString(36).slice(2, 9)}`);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current || !svgRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      svgRef.current.setAttribute("width", String(svgWidth));
      svgRef.current.setAttribute("height", String(svgHeight));
      svgRef.current.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

      const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      const controlY = startY - curvature;
      const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;

      if (pathRef.current) {
        pathRef.current.setAttribute("d", d);
      }
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      ref={svgRef}
      fill="none"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
    >
      <defs>
        <linearGradient id={`grad-${id.current}`} gradientUnits="userSpaceOnUse">
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background path */}
      <path
        ref={pathRef}
        d=""
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />

      {/* Animated gradient path */}
      <path
        d={pathRef.current?.getAttribute("d") || ""}
        stroke={`url(#grad-${id.current})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        strokeDasharray="16 32"
      >
        <animate
          attributeName="stroke-dashoffset"
          from={reverse ? "0" : "48"}
          to={reverse ? "48" : "0"}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

// ─── BeamCircle ─────────────────────────────────────────────────────────────
// A styled circle node for beam endpoints

interface BeamCircleProps {
  className?: string;
  children?: React.ReactNode;
}

export function BeamCircle({ className, children }: BeamCircleProps) {
  return (
    <div
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-surface p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
}
