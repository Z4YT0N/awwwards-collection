"use client";

import { cn } from "@/lib/utils";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NumberTickerProps {
  value: number;
  className?: string;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
}

// ─── NumberTicker ───────────────────────────────────────────────────────────
// Animated number counter that triggers on scroll into view

export function NumberTicker({
  value,
  className,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent =
            prefix + Intl.NumberFormat("en-US", {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            }).format(Number(latest.toFixed(decimalPlaces))) + suffix;
        }
      }),
    [springValue, decimalPlaces, prefix, suffix]
  );

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-wider text-foreground",
        className
      )}
    >
      {prefix}0{suffix}
    </span>
  );
}

// ─── AnimatedCounter (slot machine style) ───────────────────────────────────

interface AnimatedCounterProps {
  value: number;
  className?: string;
  fontSize?: number;
}

export function AnimatedCounter({
  value,
  className,
  fontSize = 48,
}: AnimatedCounterProps) {
  const digits = String(value).split("");

  return (
    <div className={cn("flex items-center overflow-hidden", className)}>
      {digits.map((digit, i) => (
        <SlotDigit key={`${i}-${digit}`} digit={parseInt(digit)} fontSize={fontSize} delay={i * 0.1} />
      ))}
    </div>
  );
}

function SlotDigit({
  digit,
  fontSize,
  delay,
}: {
  digit: number;
  fontSize: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: fontSize, width: fontSize * 0.6 }}
    >
      <div
        className="absolute transition-transform duration-700 ease-out"
        style={{
          transform: isInView ? `translateY(-${digit * fontSize}px)` : "translateY(0)",
          transitionDelay: `${delay}s`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div
            key={n}
            className="flex items-center justify-center font-bold text-foreground"
            style={{ height: fontSize, fontSize: fontSize * 0.8 }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
