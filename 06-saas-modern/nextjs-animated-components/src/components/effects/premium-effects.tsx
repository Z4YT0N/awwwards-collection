"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useId,
  ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// LiquidGlass — Apple iOS 26 style glass with SVG refraction + specular
// =============================================================================

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  /** Backdrop blur amount in px */
  blur?: number;
  /** Refraction intensity (0-1) */
  refraction?: number;
  /** Show specular highlight */
  specular?: boolean;
  /** Respond to mouse/pointer movement */
  motionResponsive?: boolean;
  /** Base tint color */
  tint?: string;
  /** Border radius */
  borderRadius?: number;
}

export function LiquidGlass({
  children,
  className,
  blur = 20,
  refraction = 0.3,
  specular = true,
  motionResponsive = true,
  tint = "rgba(255,255,255,0.08)",
  borderRadius = 24,
}: LiquidGlassProps) {
  const filterId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    if (!motionResponsive) return;

    const handleMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setLightPos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [motionResponsive]);

  const scale = Math.round(refraction * 30);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius }}
    >
      {/* SVG filter for refraction */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`liquid-glass-${filterId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves={3}
              seed={42}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Glass layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: tint,
          borderRadius,
        }}
      />

      {/* Refraction distortion overlay */}
      {refraction > 0 && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            filter: `url(#liquid-glass-${filterId})`,
            opacity: refraction * 0.4,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
            borderRadius,
          }}
        />
      )}

      {/* Specular highlight */}
      {specular && (
        <div
          className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              ellipse 60% 40% at ${lightPos.x * 100}% ${lightPos.y * 100}%,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.05) 30%,
              transparent 70%
            )`,
            borderRadius,
          }}
        />
      )}

      {/* Edge highlight */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          borderRadius,
          boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.3), inset 0 -0.5px 0 rgba(0,0,0,0.1)",
          border: "0.5px solid rgba(255,255,255,0.18)",
        }}
      />

      {/* Content */}
      <div className="relative z-[4]">{children}</div>
    </div>
  );
}

// =============================================================================
// SpotlightCard — Linear.app style card with radial gradient following mouse
// =============================================================================

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Spotlight color */
  spotlightColor?: string;
  /** Spotlight radius in px */
  spotlightRadius?: number;
  /** Border color on hover */
  borderColor?: string;
  /** Background color */
  background?: string;
  /** Border radius */
  borderRadius?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(120, 119, 198, 0.15)",
  spotlightRadius = 400,
  borderColor = "rgba(255,255,255,0.1)",
  background = "rgba(0,0,0,0.4)",
  borderRadius = 16,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        borderRadius,
        background,
        border: `1px solid ${isHovering ? borderColor : "rgba(255,255,255,0.05)"}`,
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Spotlight gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 65%)`,
          borderRadius,
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(${spotlightRadius * 0.8}px circle at ${mousePos.x}px ${mousePos.y}px, ${borderColor}, transparent 65%)`,
          borderRadius,
          mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// =============================================================================
// AnimatedBeam — Vercel-style SVG beam connecting two elements
// =============================================================================

interface AnimatedBeamProps {
  /** Ref to the container element */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Ref to the start element */
  fromRef: React.RefObject<HTMLElement | null>;
  /** Ref to the end element */
  toRef: React.RefObject<HTMLElement | null>;
  /** Beam color */
  color?: string;
  /** Beam width */
  strokeWidth?: number;
  /** Curvature of the beam path */
  curvature?: number;
  /** Duration of the beam animation (seconds) */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Reverse direction */
  reverse?: boolean;
  className?: string;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  color = "#6366f1",
  strokeWidth = 2,
  curvature = 0,
  duration = 2,
  delay = 0,
  reverse = false,
  className,
}: AnimatedBeamProps) {
  const gradientId = useId().replace(/:/g, "");
  const [pathData, setPathData] = useState({ d: "", length: 0 });
  const pathRef = useRef<SVGPathElement>(null);

  const updatePath = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;

    const containerRect = container.getBoundingClientRect();
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();

    const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const toX = toRect.left + toRect.width / 2 - containerRect.left;
    const toY = toRect.top + toRect.height / 2 - containerRect.top;

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const dx = toX - fromX;
    const dy = toY - fromY;

    const cx = midX - dy * curvature * 0.01;
    const cy = midY + dx * curvature * 0.01;

    setPathData((prev) => ({
      ...prev,
      d: `M ${fromX},${fromY} Q ${cx},${cy} ${toX},${toY}`,
    }));
  }, [containerRef, fromRef, toRef, curvature]);

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [updatePath]);

  useEffect(() => {
    if (pathRef.current && pathData.d) {
      setPathData((prev) => ({
        ...prev,
        length: pathRef.current?.getTotalLength() || 0,
      }));
    }
  }, [pathData.d]);

  const beamLen = pathData.length * 0.3;
  const animName = `beam-${gradientId}`;

  return (
    <svg
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`beam-g-${gradientId}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="50%" stopColor={color} stopOpacity={1} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Background path */}
      <path d={pathData.d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeOpacity={0.1} />

      {/* Animated beam */}
      {pathData.length > 0 && (
        <path
          ref={pathRef}
          d={pathData.d}
          fill="none"
          stroke={`url(#beam-g-${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${beamLen} ${pathData.length}`}
          strokeLinecap="round"
          style={{
            animation: `${animName} ${duration}s linear ${delay}s infinite`,
          }}
        />
      )}

      <style>{`
        @keyframes ${animName} {
          0% { stroke-dashoffset: ${reverse ? -beamLen : pathData.length + beamLen}; }
          100% { stroke-dashoffset: ${reverse ? pathData.length + beamLen : -beamLen}; }
        }
      `}</style>
    </svg>
  );
}

// =============================================================================
// CursorReveal — Circle mask follows cursor, revealing alternate content
// =============================================================================

interface CursorRevealProps {
  /** Default visible content */
  children: ReactNode;
  /** Content revealed under cursor */
  revealContent: ReactNode;
  className?: string;
  /** Mask circle radius */
  radius?: number;
  /** Expand radius on click */
  expandOnClick?: boolean;
  /** Expanded radius */
  expandedRadius?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

export function CursorReveal({
  children,
  revealContent,
  className,
  radius = 80,
  expandOnClick = true,
  expandedRadius,
  stiffness = 300,
  damping = 30,
}: CursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  const currentRadius = isExpanded ? (expandedRadius || radius * 3) : radius;

  const clipPath = useTransform(
    [springX, springY],
    ([x, y]) => `circle(${currentRadius}px at ${x}px ${y}px)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-none", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsExpanded(false);
      }}
      onClick={() => expandOnClick && setIsExpanded((v) => !v)}
    >
      {/* Default content */}
      <div className="relative z-0">{children}</div>

      {/* Revealed content under cursor */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          clipPath: isHovering ? clipPath : "circle(0px at -100px -100px)",
          transition: isExpanded ? "clip-path 0.4s ease-out" : undefined,
        }}
      >
        {revealContent}
      </motion.div>
    </div>
  );
}

// =============================================================================
// ProgressiveBlur — Gradient blur on container edges (Linear.app style)
// =============================================================================

interface ProgressiveBlurProps {
  children: ReactNode;
  className?: string;
  /** Which edges to blur */
  edges?: ("top" | "bottom" | "left" | "right")[];
  /** Blur amount in px */
  blur?: number;
  /** Fade region size in px */
  fadeSize?: number;
  /** Overlay color for solid fade (usually matches page background) */
  fadeColor?: string;
}

export function ProgressiveBlur({
  children,
  className,
  edges = ["top", "bottom"],
  blur = 10,
  fadeSize = 60,
  fadeColor = "transparent",
}: ProgressiveBlurProps) {
  const edgeConfigs = {
    top: {
      position: "absolute top-0 left-0 right-0" as const,
      size: { height: fadeSize },
      mask: "linear-gradient(to bottom, black, transparent)",
      gradient: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
    },
    bottom: {
      position: "absolute bottom-0 left-0 right-0" as const,
      size: { height: fadeSize },
      mask: "linear-gradient(to top, black, transparent)",
      gradient: `linear-gradient(to top, ${fadeColor}, transparent)`,
    },
    left: {
      position: "absolute top-0 bottom-0 left-0" as const,
      size: { width: fadeSize },
      mask: "linear-gradient(to right, black, transparent)",
      gradient: `linear-gradient(to right, ${fadeColor}, transparent)`,
    },
    right: {
      position: "absolute top-0 bottom-0 right-0" as const,
      size: { width: fadeSize },
      mask: "linear-gradient(to left, black, transparent)",
      gradient: `linear-gradient(to left, ${fadeColor}, transparent)`,
    },
  };

  return (
    <div className={cn("relative", className)}>
      {children}
      {edges.map((edge) => {
        const cfg = edgeConfigs[edge];
        return (
          <div
            key={edge}
            className={cn(cfg.position, "pointer-events-none z-10")}
            style={{
              ...cfg.size,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: cfg.mask,
              WebkitMaskImage: cfg.mask,
              background: fadeColor !== "transparent" ? cfg.gradient : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
