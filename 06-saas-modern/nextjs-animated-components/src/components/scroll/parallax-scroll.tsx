"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Basic parallax wrapper
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={cn("relative", className)} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

// Parallax image gallery (two columns scrolling opposite directions)
interface ParallaxGalleryProps {
  images: string[];
  className?: string;
}

export function ParallaxGallery({ images, className }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const leftImages = images.filter((_, i) => i % 2 === 0);
  const rightImages = images.filter((_, i) => i % 2 === 1);

  return (
    <div
      ref={containerRef}
      className={cn("flex gap-4 overflow-hidden py-20", className)}
    >
      {/* Left column - scrolls up */}
      <motion.div className="flex flex-col gap-4 w-1/2" style={{ y: leftY }}>
        {leftImages.map((img, idx) => (
          <div
            key={idx}
            className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-800"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Right column - scrolls down */}
      <motion.div className="flex flex-col gap-4 w-1/2" style={{ y: rightY }}>
        {rightImages.map((img, idx) => (
          <div
            key={idx}
            className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-800"
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Text parallax (large text scrolling horizontally)
interface TextParallaxProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
}

export function TextParallax({
  text,
  className,
  direction = "left",
}: TextParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
  );

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden py-20", className)}
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {/* Repeat text for seamless effect */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[15vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-zinc-500 px-8"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Sticky scroll reveal (GSAP powered)
interface StickyRevealProps {
  sections: Array<{
    title: string;
    description: string;
    content?: React.ReactNode;
  }>;
  className?: string;
}

export function StickyReveal({ sections, className }: StickyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const panels = containerRef.current.querySelectorAll(".panel");

    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return; // Skip last panel

      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false,
        snap: 1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="panel min-h-screen flex items-center justify-center bg-zinc-950 border-b border-zinc-800"
          style={{
            zIndex: sections.length - idx,
          }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              {section.title}
            </h2>
            <p className="text-xl text-zinc-400 mb-8">{section.description}</p>
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}

// Scroll velocity text
interface VelocityTextProps {
  text: string;
  className?: string;
  baseVelocity?: number;
}

export function VelocityText({
  text,
  className,
  baseVelocity = 3,
}: VelocityTextProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useTransform(scrollY, [0, 1000], [0, 5]);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const x = useTransform(smoothVelocity, (v) => {
    baseX.current += v * baseVelocity * 0.01;
    return `${-baseX.current}%`;
  });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex" style={{ x }}>
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-[10vw] font-bold text-zinc-800 mx-8"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
