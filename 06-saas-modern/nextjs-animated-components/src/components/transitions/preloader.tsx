"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// Preloader Context
// =============================================================================
// Manages loading state across the app

interface PreloaderContextType {
  isLoading: boolean;
  progress: number;
  setProgress: (value: number) => void;
  finishLoading: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | null>(null);

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within PreloaderProvider");
  }
  return context;
}

interface PreloaderProviderProps {
  children: ReactNode;
  /** Minimum time to show preloader (ms) */
  minDuration?: number;
  /** Component to show while loading */
  preloader?: ReactNode;
}

export function PreloaderProvider({
  children,
  minDuration = 2000,
  preloader,
}: PreloaderProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow down as we approach 100
        const increment = Math.max(1, (100 - prev) / 10);
        return Math.min(prev + increment, 99);
      });
    }, 50);

    // Minimum duration timer
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration]);

  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <PreloaderContext.Provider value={{ isLoading, progress, setProgress, finishLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && (preloader || <DefaultPreloader progress={progress} />)}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </PreloaderContext.Provider>
  );
}

// =============================================================================
// Default Preloader - Minimal, elegant counter
// =============================================================================

function DefaultPreloader({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="text-center">
        <motion.div
          className="text-8xl md:text-9xl font-bold text-white tabular-nums"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Math.round(progress)}
        </motion.div>
        <motion.div
          className="w-48 h-[2px] bg-zinc-800 mt-8 mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// Counter Preloader - Large animated numbers
// =============================================================================

interface CounterPreloaderProps {
  className?: string;
  color?: string;
  bgColor?: string;
}

export function CounterPreloader({
  className,
  color = "white",
  bgColor = "black",
}: CounterPreloaderProps) {
  const { progress } = usePreloader();

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        className
      )}
      style={{ backgroundColor: bgColor }}
      exit={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.span
        className="text-[20vw] font-bold leading-none tabular-nums"
        style={{ color }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Math.round(progress).toString().padStart(3, "0")}
      </motion.span>
    </motion.div>
  );
}

// =============================================================================
// Word Preloader - Reveals words sequentially
// =============================================================================

interface WordPreloaderProps {
  words?: string[];
  className?: string;
}

export function WordPreloader({
  words = ["Loading", "Building", "Creating", "Launching"],
  className,
}: WordPreloaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { progress } = usePreloader();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 400);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-8",
        className
      )}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="h-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="text-5xl md:text-7xl font-bold text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {words[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {words.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: i === currentIndex ? "#fff" : "#333",
              scale: i === currentIndex ? 1.2 : 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// =============================================================================
// Logo Preloader - Animated logo/icon reveal
// =============================================================================

interface LogoPreloaderProps {
  logo?: ReactNode;
  className?: string;
}

export function LogoPreloader({ logo, className }: LogoPreloaderProps) {
  const { progress } = usePreloader();

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[9999] bg-black flex items-center justify-center",
        className
      )}
      exit={{ scale: 1.5, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative">
        {/* Logo with reveal mask */}
        <motion.div
          className="text-6xl font-bold text-white"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {logo || "AWWWARDS"}
        </motion.div>

        {/* Scanning line */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-white"
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </motion.div>
  );
}

// =============================================================================
// Blocks Preloader - Grid of blocks that fill
// =============================================================================

interface BlocksPreloaderProps {
  rows?: number;
  cols?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export function BlocksPreloader({
  rows = 4,
  cols = 6,
  color = "#fff",
  bgColor = "#000",
  className,
}: BlocksPreloaderProps) {
  const { progress } = usePreloader();
  const totalBlocks = rows * cols;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <motion.div
      className={cn("fixed inset-0 z-[9999] p-4", className)}
      style={{ backgroundColor: bgColor }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="w-full h-full grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: i < filledBlocks ? 1 : 0.1,
              scale: i < filledBlocks ? 1 : 0.8,
              backgroundColor: i < filledBlocks ? color : "#222",
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// =============================================================================
// Circular Preloader - Progress ring
// =============================================================================

interface CircularPreloaderProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export function CircularPreloader({
  size = 120,
  strokeWidth = 4,
  color = "#fff",
  bgColor = "#000",
  className,
}: CircularPreloaderProps) {
  const { progress } = usePreloader();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        className
      )}
      style={{ backgroundColor: bgColor }}
      exit={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#333"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
          />
        </svg>

        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white tabular-nums">
            {Math.round(progress)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// Split Preloader - Two halves that separate
// =============================================================================

interface SplitPreloaderProps {
  direction?: "horizontal" | "vertical";
  color?: string;
  className?: string;
}

export function SplitPreloader({
  direction = "horizontal",
  color = "#000",
  className,
}: SplitPreloaderProps) {
  const { progress, isLoading } = usePreloader();

  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      className={cn("fixed inset-0 z-[9999] flex", className)}
      style={{ flexDirection: isHorizontal ? "row" : "column" }}
    >
      <motion.div
        className="flex-1 flex items-center justify-center"
        style={{ backgroundColor: color }}
        animate={!isLoading ? (isHorizontal ? { x: "-100%" } : { y: "-100%" }) : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="text-4xl font-bold text-white">{Math.round(progress)}%</span>
      </motion.div>
      <motion.div
        className="flex-1"
        style={{ backgroundColor: color }}
        animate={!isLoading ? (isHorizontal ? { x: "100%" } : { y: "100%" }) : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.div>
  );
}

// =============================================================================
// Skeleton Components - For content loading states
// =============================================================================

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-zinc-800 rounded",
        animate && "animate-pulse",
        className
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 && "w-3/4")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl bg-zinc-900 p-6 space-y-4", className)}>
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return <Skeleton className={cn("rounded-full", sizeClasses[size])} />;
}

// =============================================================================
// Image Loading - Blur-to-sharp loading
// =============================================================================

interface ImageLoadProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: "blur" | "skeleton";
}

export function ImageLoad({
  src,
  alt,
  className,
  placeholder = "blur",
}: ImageLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      {!isLoaded && (
        placeholder === "skeleton" ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
        )
      )}

      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(20px)",
        }}
        transition={{ duration: 0.6 }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
