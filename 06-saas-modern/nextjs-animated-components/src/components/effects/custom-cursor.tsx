"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
  variant?: "dot" | "ring" | "blend" | "trail";
  color?: string;
  size?: number;
}

export function CustomCursor({
  className,
  variant = "dot",
  color = "#8B5CF6",
  size = 20,
}: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (variant === "dot") {
    return (
      <>
        {/* Main dot */}
        <motion.div
          className={cn(
            "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference",
            className
          )}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: isHovering ? size * 2 : size,
            height: isHovering ? size * 2 : size,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </>
    );
  }

  if (variant === "ring") {
    return (
      <>
        {/* Center dot */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
            width: 8,
            height: 8,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        {/* Outer ring */}
        <motion.div
          className={cn(
            "fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2",
            className
          )}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: isHovering ? size * 2.5 : size * 1.5,
            height: isHovering ? size * 2.5 : size * 1.5,
            borderColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </>
    );
  }

  if (variant === "blend") {
    return (
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-exclusion",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? size * 4 : size * 2,
          height: isHovering ? size * 4 : size * 2,
          backgroundColor: "#ffffff",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    );
  }

  return null;
}

// Cursor trail effect
export function CursorTrail({
  color = "#8B5CF6",
  trailLength = 10,
}: {
  color?: string;
  trailLength?: number;
}) {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTrail((prev) => [
        ...prev.slice(-trailLength + 1),
        { x: e.clientX, y: e.clientY, id: idCounter.current++ },
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trailLength]);

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{
            x: point.x,
            y: point.y,
            width: 10 - index * 0.5,
            height: 10 - index * 0.5,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </>
  );
}

// Spotlight cursor
export function SpotlightCursor({ size = 300 }: { size?: number }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997] transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, transparent, rgba(0, 0, 0, 0.8))`,
      }}
    />
  );
}

// =============================================================================
// Magnetic Cursor - Sticks to interactive elements
// =============================================================================

interface MagneticCursorProps {
  className?: string;
  color?: string;
  size?: number;
  magnetStrength?: number;
}

export function MagneticCursor({
  className,
  color = "#8B5CF6",
  size = 20,
  magnetStrength = 0.3,
}: MagneticCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [magnetTarget, setMagnetTarget] = useState<{ x: number; y: number } | null>(null);

  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (magnetTarget) {
        // Interpolate toward magnet target
        const targetX = e.clientX + (magnetTarget.x - e.clientX) * magnetStrength;
        const targetY = e.clientY + (magnetTarget.y - e.clientY) * magnetStrength;
        cursorX.set(targetX);
        cursorY.set(targetY);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest("[data-magnetic]") as HTMLElement;

      if (magneticEl) {
        setIsHovering(true);
        const rect = magneticEl.getBoundingClientRect();
        setMagnetTarget({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
        const el = target.closest("a, button") || target;
        const rect = el.getBoundingClientRect();
        setMagnetTarget({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setMagnetTarget(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, magnetTarget, magnetStrength]);

  return (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 8,
          height: 8,
          backgroundColor: color,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          borderColor: color,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? size * 3 : size * 1.5,
          height: isHovering ? size * 3 : size * 1.5,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

// =============================================================================
// Morphing Cursor - Changes shape based on context
// =============================================================================

type CursorShape = "circle" | "square" | "arrow" | "text" | "play" | "drag";

interface MorphingCursorProps {
  className?: string;
  color?: string;
  size?: number;
}

export function MorphingCursor({
  className,
  color = "#8B5CF6",
  size = 20,
}: MorphingCursorProps) {
  const [shape, setShape] = useState<CursorShape>("circle");
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data-cursor-shape attribute
      const shapeEl = target.closest("[data-cursor-shape]") as HTMLElement;
      if (shapeEl) {
        const cursorShape = shapeEl.dataset.cursorShape as CursorShape;
        setShape(cursorShape || "circle");
        setIsHovering(true);
        return;
      }

      // Auto-detect shape based on element type
      if (target.closest("video, [data-video]")) {
        setShape("play");
        setIsHovering(true);
      } else if (target.closest("[data-draggable], .draggable")) {
        setShape("drag");
        setIsHovering(true);
      } else if (target.closest("p, span, h1, h2, h3, h4, h5, h6, [data-text]")) {
        setShape("text");
        setIsHovering(true);
      } else if (target.closest("a, button")) {
        setShape("arrow");
        setIsHovering(true);
      } else {
        setShape("circle");
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => {
      setShape("circle");
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  const getShapeStyles = () => {
    const baseSize = isHovering ? size * 2.5 : size;

    switch (shape) {
      case "square":
        return {
          width: baseSize,
          height: baseSize,
          borderRadius: 4,
        };
      case "arrow":
        return {
          width: baseSize * 1.5,
          height: baseSize * 1.5,
          borderRadius: "50%",
        };
      case "text":
        return {
          width: 3,
          height: baseSize * 1.2,
          borderRadius: 2,
        };
      case "play":
        return {
          width: baseSize * 2,
          height: baseSize * 2,
          borderRadius: "50%",
        };
      case "drag":
        return {
          width: baseSize * 2,
          height: baseSize,
          borderRadius: baseSize / 2,
        };
      default:
        return {
          width: baseSize,
          height: baseSize,
          borderRadius: "50%",
        };
    }
  };

  const renderIcon = () => {
    switch (shape) {
      case "arrow":
        return (
          <motion.span
            className="text-black text-lg font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            ↗
          </motion.span>
        );
      case "play":
        return (
          <motion.span
            className="text-black text-lg ml-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            ▶
          </motion.span>
        );
      case "drag":
        return (
          <motion.span
            className="text-black text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            ⟷
          </motion.span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference",
        className
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        backgroundColor: color,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={getShapeStyles()}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {renderIcon()}
    </motion.div>
  );
}

// =============================================================================
// Text Label Cursor - Shows contextual text labels
// =============================================================================

interface TextLabelCursorProps {
  className?: string;
  color?: string;
  defaultLabel?: string;
}

export function TextLabelCursor({
  className,
  color = "#8B5CF6",
  defaultLabel,
}: TextLabelCursorProps) {
  const [label, setLabel] = useState<string | null>(defaultLabel || null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelEl = target.closest("[data-cursor-label]") as HTMLElement;

      if (labelEl) {
        setLabel(labelEl.dataset.cursorLabel || null);
        setIsVisible(true);
      } else if (target.closest("a")) {
        setLabel("View");
        setIsVisible(true);
      } else if (target.closest("button")) {
        setLabel("Click");
        setIsVisible(true);
      }
    };

    const handleMouseOut = () => {
      setLabel(defaultLabel || null);
      setIsVisible(!!defaultLabel);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, defaultLabel]);

  return (
    <>
      {/* Small dot always visible */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 8,
          height: 8,
          backgroundColor: color,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Text label */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998] px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: color,
          color: "#fff",
          translateX: "-50%",
          translateY: "calc(-50% - 30px)",
        }}
        animate={{
          opacity: isVisible && label ? 1 : 0,
          scale: isVisible && label ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.div>
    </>
  );
}

// =============================================================================
// Particle Trail Cursor - Leaves particles that fade out
// =============================================================================

interface ParticleCursorProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  spread?: number;
}

export function ParticleCursor({
  color = "#8B5CF6",
  particleCount = 20,
  particleSize = 6,
  spread = 30,
}: ParticleCursorProps) {
  const [particles, setParticles] = useState<
    { x: number; y: number; id: number; vx: number; vy: number }[]
  >([]);
  const idCounter = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only spawn particles when moving fast enough
      if (distance > 5) {
        const newParticles = Array.from({ length: Math.min(3, Math.floor(distance / 10) + 1) }, () => ({
          x: e.clientX + (Math.random() - 0.5) * spread,
          y: e.clientY + (Math.random() - 0.5) * spread,
          id: idCounter.current++,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1, // Slight upward bias
        }));

        setParticles((prev) => [...prev.slice(-particleCount + newParticles.length), ...newParticles]);
      }

      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [particleCount, spread]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          initial={{
            opacity: 1,
            scale: 1,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            opacity: 0,
            scale: 0,
            x: particle.x + particle.vx * 50,
            y: particle.y + particle.vy * 50,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: particleSize + Math.random() * particleSize,
            height: particleSize + Math.random() * particleSize,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </>
  );
}

// =============================================================================
// Glow Cursor - Circular glow that follows the mouse
// =============================================================================

interface GlowCursorProps {
  color?: string;
  size?: number;
  blur?: number;
}

export function GlowCursor({
  color = "#8B5CF6",
  size = 400,
  blur = 100,
}: GlowCursorProps) {
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full opacity-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

// =============================================================================
// Crosshair Cursor - Precise crosshair for design tools
// =============================================================================

interface CrosshairCursorProps {
  color?: string;
  size?: number;
  showCoordinates?: boolean;
}

export function CrosshairCursor({
  color = "#8B5CF6",
  size = 40,
  showCoordinates = false,
}: CrosshairCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Horizontal line */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x - size / 2,
          top: position.y,
          width: size,
          height: 1,
          backgroundColor: color,
        }}
      />
      {/* Vertical line */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y - size / 2,
          width: 1,
          height: size,
          backgroundColor: color,
        }}
      />
      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: position.x - 3,
          top: position.y - 3,
          width: 6,
          height: 6,
          backgroundColor: color,
        }}
      />
      {/* Coordinates */}
      {showCoordinates && (
        <div
          className="fixed pointer-events-none z-[9999] text-xs font-mono px-2 py-1 rounded"
          style={{
            left: position.x + 15,
            top: position.y + 15,
            backgroundColor: color,
            color: "#fff",
          }}
        >
          {position.x}, {position.y}
        </div>
      )}
    </>
  );
}
