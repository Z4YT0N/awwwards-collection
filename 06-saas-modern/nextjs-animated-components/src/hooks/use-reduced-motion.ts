"use client";

import { useState, useEffect } from "react";

/**
 * Hook that detects if the user prefers reduced motion
 * Uses the prefers-reduced-motion media query
 *
 * @returns boolean - true if user prefers reduced motion
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 *
 * // Disable animations for users who prefer reduced motion
 * <motion.div
 *   animate={prefersReducedMotion ? {} : { scale: 1.1 }}
 *   transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
 * />
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Returns animation values that respect reduced motion preferences
 *
 * @example
 * const { shouldAnimate, duration, spring } = useMotionSafe();
 *
 * <motion.div
 *   animate={shouldAnimate ? { y: 0 } : {}}
 *   transition={{ duration }}
 * />
 */
export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();

  return {
    shouldAnimate: !prefersReducedMotion,
    duration: prefersReducedMotion ? 0 : undefined,
    spring: prefersReducedMotion
      ? { type: "tween" as const, duration: 0 }
      : { type: "spring" as const, stiffness: 300, damping: 30 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  };
}

/**
 * SSR-safe check for reduced motion preference
 * Use this for initial render values
 */
export function getReducedMotionPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
