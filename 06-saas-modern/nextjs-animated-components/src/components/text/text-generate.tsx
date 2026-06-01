"use client";

import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.02,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(staggerDelay),
      }
    );
  }, [animate, duration, filter, staggerDelay]);

  return (
    <motion.div ref={scope} className={cn("font-bold", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
          style={{
            filter: filter ? "blur(10px)" : "none",
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Typewriter effect
interface TypewriterEffectProps {
  words: Array<{
    text: string;
    className?: string;
  }>;
  className?: string;
  cursorClassName?: string;
  speed?: number;
}

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
  speed = 100,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex].text;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
          if (currentText === word) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, words, speed]);

  return (
    <div className={cn("flex items-center", className)}>
      <span className={words[currentWordIndex].className}>{currentText}</span>
      <span
        className={cn(
          "ml-1 inline-block w-[4px] h-[1em] bg-current animate-pulse",
          cursorClassName
        )}
      />
    </div>
  );
}

// Flip words effect
interface FlipWordsProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function FlipWords({
  words,
  className,
  duration = 3000,
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={cn("relative inline-block overflow-hidden", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={word}
          className="absolute inset-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: currentIndex === idx ? "0%" : "-100%",
            opacity: currentIndex === idx ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {word}
        </motion.span>
      ))}
      {/* Invisible placeholder for layout */}
      <span className="invisible">{words[0]}</span>
    </div>
  );
}
