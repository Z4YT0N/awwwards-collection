"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rotationIntensity?: number;
  borderGlow?: boolean;
  glowColor?: string;
}

export function TiltCard({
  children,
  className,
  containerClassName,
  rotationIntensity = 15,
  borderGlow = true,
  glowColor = "rgba(120, 119, 198, 0.3)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("perspective-[1000px]", containerClassName)}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 transition-shadow duration-300",
          borderGlow && hovering && "shadow-2xl",
          className
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovering
            ? `0 25px 50px -12px ${glowColor}, 0 0 0 1px ${glowColor}`
            : "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ transform: "translateZ(50px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

// 3D Card with layers
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  layers?: number;
}

export function Card3D({ children, className, layers = 3 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
      y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
    });
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative perspective-[1000px]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      animate={{
        rotateY: mousePosition.x * 15,
        rotateX: -mousePosition.y * 15,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Stacked layers */}
      {Array.from({ length: layers }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10"
          style={{
            transform: `translateZ(${i * -20}px)`,
            opacity: 1 - i * 0.2,
          }}
        />
      ))}
      {/* Content */}
      <div className="relative z-10 p-6" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
