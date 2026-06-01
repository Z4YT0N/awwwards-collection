"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Character-by-character reveal
interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function CharacterReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.02,
  once = true,
}: CharacterRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const characters = text.split("");

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      initial="hidden"
      animate={controls}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: delay + i * staggerDelay,
                ease: [0.215, 0.61, 0.355, 1],
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Word-by-word reveal
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function WordReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.1,
  once = true,
}: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const words = text.split(" ");

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 30, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                delay: delay + i * staggerDelay,
                ease: [0.215, 0.61, 0.355, 1],
              },
            },
          }}
          style={{ perspective: 1000 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Line-by-line reveal (GSAP powered for scroll scrub)
interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  scrub?: boolean;
}

export function LineReveal({
  children,
  className,
  scrub = false,
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll(".line");

    if (scrub) {
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.2 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    } else {
      gsap.fromTo(
        lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scrub]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}

// Gradient text reveal on scroll
interface GradientRevealProps {
  text: string;
  className?: string;
}

export function GradientReveal({ text, className }: GradientRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      {
        backgroundSize: "0% 100%",
      },
      {
        backgroundSize: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <span
        ref={textRef}
        className="bg-gradient-to-r from-white to-white bg-no-repeat bg-clip-text text-transparent"
        style={{
          backgroundSize: "0% 100%",
          WebkitBackgroundClip: "text",
        }}
      >
        {text}
      </span>
    </div>
  );
}
