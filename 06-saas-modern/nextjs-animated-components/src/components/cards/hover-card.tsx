"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Directional hover card
interface DirectionalHoverCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  className?: string;
}

export function DirectionalHoverCard({
  imageUrl,
  title,
  description,
  className,
}: DirectionalHoverCardProps) {
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right">("top");

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    const topDist = y;
    const bottomDist = h - y;
    const leftDist = x;
    const rightDist = w - x;

    const minDist = Math.min(topDist, bottomDist, leftDist, rightDist);

    if (minDist === topDist) setDirection("top");
    else if (minDist === bottomDist) setDirection("bottom");
    else if (minDist === leftDist) setDirection("left");
    else setDirection("right");
  };

  const getInitialPosition = () => {
    switch (direction) {
      case "top":
        return { y: "-100%" };
      case "bottom":
        return { y: "100%" };
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
    }
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl aspect-[4/3]",
        className
      )}
      onMouseEnter={handleMouseEnter}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-pink-600/90 flex flex-col justify-end p-6"
        initial={{ opacity: 0, ...getInitialPosition() }}
        whileHover={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        {description && <p className="text-white/80">{description}</p>}
      </motion.div>
    </motion.div>
  );
}

// Hover reveal card
interface HoverRevealCardProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
}

export function HoverRevealCard({
  children,
  revealContent,
  className,
}: HoverRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-900 cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default content */}
      <motion.div
        className="relative z-10"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Reveal content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {revealContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Floating card
interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  floatIntensity?: number;
}

export function FloatingCard({
  children,
  className,
  floatIntensity = 20,
}: FloatingCardProps) {
  return (
    <motion.div
      className={cn("rounded-xl bg-zinc-900 border border-zinc-800 p-6", className)}
      animate={{
        y: [-floatIntensity / 2, floatIntensity / 2, -floatIntensity / 2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Wobble card
interface WobbleCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function WobbleCard({
  children,
  className,
  containerClassName,
}: WobbleCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  return (
    <div
      className={cn("relative perspective-[800px]", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className={cn(
          "rounded-2xl bg-zinc-900 border border-zinc-800",
          className
        )}
        animate={{
          rotateX: isHovering ? -mousePosition.y * 20 : 0,
          rotateY: isHovering ? mousePosition.x * 20 : 0,
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
