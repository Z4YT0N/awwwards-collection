"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface UseLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal" | "both";
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}

const defaultOptions: UseLenisOptions = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};

export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      ...defaultOptions,
      ...options,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export function useLenisScroll(callback: (e: any) => void) {
  const lenisRef = useLenis();

  useEffect(() => {
    if (!lenisRef.current) return;

    lenisRef.current.on("scroll", callback);

    return () => {
      lenisRef.current?.off("scroll", callback);
    };
  }, [callback]);

  return lenisRef;
}
