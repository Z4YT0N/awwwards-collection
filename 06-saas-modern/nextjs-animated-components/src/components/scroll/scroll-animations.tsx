"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in on scroll
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// Scale on scroll
interface ScaleOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function ScaleOnScroll({ children, className }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

// Rotate on scroll
interface RotateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  rotateAmount?: number;
}

export function RotateOnScroll({
  children,
  className,
  rotateAmount = 180,
}: RotateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotateAmount]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate }}>
      {children}
    </motion.div>
  );
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(scrollRef.current, {
      x: -(scrollWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth - viewportWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={scrollRef} className="flex">
        {children}
      </div>
    </div>
  );
}

// Stagger children on scroll
interface StaggerOnScrollProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerOnScroll({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Item for stagger
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Progress bar scroll indicator
interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

export function ScrollProgress({
  className,
  color = "bg-gradient-to-r from-purple-500 to-pink-500",
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 z-50 origin-left",
        position === "top" ? "top-0" : "bottom-0",
        color,
        className
      )}
      style={{
        scaleX: scrollYProgress,
        height,
      }}
    />
  );
}

// Zoom parallax (image zooms as you scroll)
interface ZoomParallaxProps {
  src: string;
  alt?: string;
  className?: string;
}

export function ZoomParallax({ src, alt = "", className }: ZoomParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale, opacity }}
      />
    </div>
  );
}
