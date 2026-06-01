"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollProviderProps {
  children: React.ReactNode;
}

const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      lerp: 0.1, // inertia (0 = no smoothing, 1 = no movement)
      duration: 1.2, // scroll duration in seconds
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true, // ✅ works in v1
      wheelMultiplier: 1, // adjust scroll speed
      touchMultiplier: 1.5, // adjust touch speed
      infinite: false, // loop scrolling
    });

    lenisRef.current = lenis;

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value as number)
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    refresh();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollProvider;
