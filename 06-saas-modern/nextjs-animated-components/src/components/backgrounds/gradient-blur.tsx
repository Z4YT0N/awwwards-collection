"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  colors?: string[];
  blur?: number;
  opacity?: number;
  animate?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function GradientBlob({
  className,
  colors = ["#4F46E5", "#7C3AED", "#EC4899"],
  blur = 100,
  opacity = 0.4,
  animate = true,
  size = "lg",
}: GradientBlobProps) {
  const sizeClasses = {
    sm: "w-[200px] h-[200px]",
    md: "w-[400px] h-[400px]",
    lg: "w-[600px] h-[600px]",
    xl: "w-[800px] h-[800px]",
  };

  const BlobComponent = animate ? motion.div : "div";

  const animationProps = animate
    ? {
        animate: {
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["40%", "50%", "40%", "50%", "40%"],
        },
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }
    : {};

  return (
    <BlobComponent
      className={cn(
        "absolute rounded-full pointer-events-none",
        sizeClasses[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${colors.join(", ")})`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      {...animationProps}
    />
  );
}

// Multi-blob background
interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  preset?: "aurora" | "sunset" | "ocean" | "forest" | "neon";
}

export function GradientBackground({
  children,
  className,
  preset = "aurora",
}: GradientBackgroundProps) {
  const presets = {
    aurora: {
      blobs: [
        { colors: ["#4F46E5", "#7C3AED"], position: "top-0 -left-20" },
        { colors: ["#EC4899", "#8B5CF6"], position: "top-1/3 right-0" },
        { colors: ["#06B6D4", "#3B82F6"], position: "bottom-0 left-1/3" },
      ],
    },
    sunset: {
      blobs: [
        { colors: ["#F59E0B", "#EF4444"], position: "top-0 right-0" },
        { colors: ["#EC4899", "#F97316"], position: "bottom-0 left-0" },
        { colors: ["#8B5CF6", "#F43F5E"], position: "top-1/2 left-1/2" },
      ],
    },
    ocean: {
      blobs: [
        { colors: ["#0EA5E9", "#06B6D4"], position: "top-0 left-0" },
        { colors: ["#3B82F6", "#8B5CF6"], position: "bottom-0 right-0" },
        { colors: ["#14B8A6", "#0EA5E9"], position: "top-1/2 right-1/4" },
      ],
    },
    forest: {
      blobs: [
        { colors: ["#059669", "#10B981"], position: "top-0 right-1/4" },
        { colors: ["#14B8A6", "#22C55E"], position: "bottom-0 left-0" },
        { colors: ["#84CC16", "#10B981"], position: "top-1/3 left-1/2" },
      ],
    },
    neon: {
      blobs: [
        { colors: ["#F0ABFC", "#C084FC"], position: "top-0 left-0" },
        { colors: ["#22D3EE", "#A78BFA"], position: "bottom-0 right-0" },
        { colors: ["#FB7185", "#C084FC"], position: "top-1/2 left-1/2" },
      ],
    },
  };

  const { blobs } = presets[preset];

  return (
    <div className={cn("relative w-full min-h-screen bg-black overflow-hidden", className)}>
      {blobs.map((blob, i) => (
        <GradientBlob
          key={i}
          colors={blob.colors}
          className={blob.position}
          animate
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
