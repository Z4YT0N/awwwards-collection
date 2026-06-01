"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGsapOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | Element;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

// Basic GSAP animation hook
export function useGsap<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const animate = useCallback(
    (
      vars: gsap.TweenVars,
      options?: { delay?: number; duration?: number }
    ) => {
      if (!ref.current) return;
      return gsap.to(ref.current, {
        ...vars,
        duration: options?.duration ?? 1,
        delay: options?.delay ?? 0,
      });
    },
    []
  );

  const animateFrom = useCallback(
    (
      vars: gsap.TweenVars,
      options?: { delay?: number; duration?: number }
    ) => {
      if (!ref.current) return;
      return gsap.from(ref.current, {
        ...vars,
        duration: options?.duration ?? 1,
        delay: options?.delay ?? 0,
      });
    },
    []
  );

  const timeline = useCallback(() => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline();
    }
    return timelineRef.current;
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return { ref, animate, animateFrom, timeline, gsap };
}

// Scroll-triggered animation hook
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, tl: gsap.core.Timeline) => void,
  options: UseGsapOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        scrub: options.scrub ?? false,
        pin: options.pin ?? false,
        markers: options.markers ?? false,
        toggleActions: options.toggleActions || "play none none reverse",
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      },
    });

    animation(element, tl);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, options]);

  return ref;
}

// Parallax effect hook
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5,
  options: Partial<UseGsapOptions> = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: () => -ScrollTrigger.maxScroll(window) * speed,
      ease: "none",
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || "top bottom",
        end: options.end || "bottom top",
        scrub: options.scrub ?? true,
        markers: options.markers ?? false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed, options]);

  return ref;
}

// Text reveal animation hook
export function useTextReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    ease?: string;
  } & UseGsapOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const chars = element.querySelectorAll(".char");
    const words = element.querySelectorAll(".word");
    const lines = element.querySelectorAll(".line");

    const targets = chars.length > 0 ? chars : words.length > 0 ? words : lines;

    if (targets.length === 0) return;

    gsap.set(targets, { y: options.y ?? 100, opacity: 0 });

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      stagger: options.stagger ?? 0.02,
      duration: options.duration ?? 0.8,
      ease: options.ease ?? "power3.out",
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 80%",
        toggleActions: options.toggleActions || "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options]);

  return ref;
}

// Magnetic effect hook
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.3
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

export { gsap, ScrollTrigger };
