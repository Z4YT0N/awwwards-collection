"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// Page Transition Context
// =============================================================================
// Wrap your app to enable page transitions throughout

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return context;
}

interface TransitionProviderProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "curtain" | "reveal" | "morph" | "blocks";
  duration?: number;
  color?: string;
}

export function TransitionProvider({
  children,
  variant = "curtain",
  duration = 0.8,
  color = "#000",
}: TransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  const startTransition = useCallback(() => setIsTransitioning(true), []);
  const endTransition = useCallback(() => setIsTransitioning(false), []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      <AnimatePresence mode="wait">
        <motion.div key={pathname}>
          {children}
          <TransitionOverlay
            variant={variant}
            duration={duration}
            color={color}
            isActive={isTransitioning}
          />
        </motion.div>
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

// =============================================================================
// Transition Overlay
// =============================================================================

interface TransitionOverlayProps {
  variant: "fade" | "slide" | "curtain" | "reveal" | "morph" | "blocks";
  duration: number;
  color: string;
  isActive: boolean;
}

function TransitionOverlay({ variant, duration, color, isActive }: TransitionOverlayProps) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: "-100%" },
      animate: { x: "0%" },
      exit: { x: "100%" },
    },
    curtain: {
      initial: { scaleY: 0, originY: 0 },
      animate: { scaleY: 1, originY: 0 },
      exit: { scaleY: 0, originY: 1 },
    },
    reveal: {
      initial: { clipPath: "circle(0% at 50% 50%)" },
      animate: { clipPath: "circle(150% at 50% 50%)" },
      exit: { clipPath: "circle(0% at 50% 50%)" },
    },
    morph: {
      initial: { borderRadius: "100%", scale: 0 },
      animate: { borderRadius: "0%", scale: 1 },
      exit: { borderRadius: "100%", scale: 0 },
    },
    blocks: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  if (variant === "blocks") {
    return <BlocksTransition color={color} duration={duration} />;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ backgroundColor: color }}
      initial="initial"
      animate={isActive ? "animate" : "initial"}
      exit="exit"
      variants={variants[variant]}
      transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

// =============================================================================
// Blocks Transition - Grid of squares that animate sequentially
// =============================================================================

function BlocksTransition({ color, duration }: { color: string; duration: number }) {
  const cols = 5;
  const rows = 5;
  const blocks = Array.from({ length: cols * rows }, (_, i) => ({
    id: i,
    col: i % cols,
    row: Math.floor(i / cols),
  }));

  return (
    <div className="fixed inset-0 z-[9999] grid pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          style={{ backgroundColor: color }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0], originY: [0, 0, 1, 1] }}
          transition={{
            duration: duration,
            delay: (block.col + block.row) * 0.05,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Page Transition Link - Use instead of Next.js Link for transitions
// =============================================================================

import Link from "next/link";
import { useRouter } from "next/navigation";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    startTransition();

    // Wait for transition animation
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

// =============================================================================
// Standalone Transition Components
// =============================================================================
// Use these for specific sections or custom implementations

interface CurtainTransitionProps {
  children: ReactNode;
  className?: string;
  color?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function CurtainTransition({
  children,
  className,
  color = "#000",
  direction = "up",
}: CurtainTransitionProps) {
  const directionMap = {
    up: { initial: { y: "100%" }, animate: { y: "0%" }, exit: { y: "-100%" } },
    down: { initial: { y: "-100%" }, animate: { y: "0%" }, exit: { y: "100%" } },
    left: { initial: { x: "100%" }, animate: { x: "0%" }, exit: { x: "-100%" } },
    right: { initial: { x: "-100%" }, animate: { x: "0%" }, exit: { x: "100%" } },
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: color }}
        initial={directionMap[direction].initial}
        animate={directionMap[direction].animate}
        exit={directionMap[direction].exit}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </div>
  );
}

// =============================================================================
// Slide Reveal - Content slides in with overlay
// =============================================================================

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function SlideReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: SlideRevealProps) {
  const slideMap = {
    up: { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      initial={slideMap[direction].initial}
      whileInView={slideMap[direction].animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Mask Reveal - Image/content reveals with animated mask
// =============================================================================

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  maskType?: "horizontal" | "vertical" | "diagonal" | "circle";
  delay?: number;
}

export function MaskReveal({
  children,
  className,
  maskType = "horizontal",
  delay = 0,
}: MaskRevealProps) {
  const maskMap = {
    horizontal: {
      initial: { clipPath: "inset(0 100% 0 0)" },
      animate: { clipPath: "inset(0 0% 0 0)" },
    },
    vertical: {
      initial: { clipPath: "inset(100% 0 0 0)" },
      animate: { clipPath: "inset(0% 0 0 0)" },
    },
    diagonal: {
      initial: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
      animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    },
    circle: {
      initial: { clipPath: "circle(0% at 50% 50%)" },
      animate: { clipPath: "circle(100% at 50% 50%)" },
    },
  };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={maskMap[maskType].initial}
      whileInView={maskMap[maskType].animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Page Stagger - For page-level staggered reveals (use scroll/StaggerItem for scroll-based)
// =============================================================================

interface PageStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function PageStagger({
  children,
  className,
  staggerDelay = 0.1,
  direction = "up",
}: PageStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function PageStaggerChild({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const slideMap = {
    up: { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down: { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      className={className}
      variants={slideMap[direction]}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
