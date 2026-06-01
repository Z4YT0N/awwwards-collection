"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MorphingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

interface TypingTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  cursor?: boolean;
}

interface FlipTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

// ─── MorphingText ───────────────────────────────────────────────────────────
// Smooth text morphing between words using SVG filters

export function MorphingText({
  texts,
  className,
  interval = 3000,
}: MorphingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className={cn("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── TypingText ─────────────────────────────────────────────────────────────
// Typewriter effect that types and deletes through text array

export function TypingText({
  texts,
  className,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  cursor = true,
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, isDeleting, textIndex, texts, pauseTime]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deleteSpeed, speed]);

  return (
    <span className={cn("inline-flex", className)}>
      <span>{displayText}</span>
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="ml-0.5 inline-block w-[3px] h-[1em] bg-primary self-end"
        />
      )}
    </span>
  );
}

// ─── FlipText ───────────────────────────────────────────────────────────────
// 3D flip animation between text items

export function FlipText({
  texts,
  className,
  interval = 3000,
}: FlipTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className={cn("relative inline-block overflow-hidden perspective-1000", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block origin-bottom"
          style={{ transformStyle: "preserve-3d" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── WordRotate ─────────────────────────────────────────────────────────────
// Simple word rotation with slide animation

interface WordRotateProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function WordRotate({
  words,
  className,
  interval = 2500,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("inline-block", className)}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
