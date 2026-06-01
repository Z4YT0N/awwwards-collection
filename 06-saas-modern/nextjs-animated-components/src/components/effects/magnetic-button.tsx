"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Magnetic Button - Physics-based cursor attraction
// =============================================================================
// Unlike generic magnetic effects, this uses actual spring physics
// with configurable mass and tension for organic movement

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  mass?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  mass = 0.5,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mass affects how "heavy" the button feels
  const springConfig = { stiffness: 150 * (1 / mass), damping: 15 * mass, mass };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Inner content moves opposite direction for depth
  const innerX = useTransform(springX, (v) => v * -0.3);
  const innerY = useTransform(springY, (v) => v * -0.3);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-white text-black font-medium rounded-lg overflow-hidden",
        className
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span className="relative z-10 block" style={{ x: innerX, y: innerY }}>
        {children}
      </motion.span>
    </motion.button>
  );
}

// =============================================================================
// Morph Button - Shape morphs on interaction
// =============================================================================
// The button physically transforms its shape, not just animates content

interface MorphButtonProps {
  children: React.ReactNode;
  className?: string;
  morphTo?: "circle" | "pill" | "square";
  onClick?: () => void;
}

export function MorphButton({
  children,
  className,
  morphTo = "circle",
  onClick,
}: MorphButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const morphVariants = {
    pill: { borderRadius: "9999px", scaleX: 1.1, scaleY: 0.95 },
    circle: { borderRadius: "50%", scaleX: 1, scaleY: 1, aspectRatio: "1/1" },
    square: { borderRadius: "8px", scaleX: 1.05, scaleY: 1.05 },
  };

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-medium overflow-hidden",
        className
      )}
      initial={{ borderRadius: "12px" }}
      animate={isHovered ? morphVariants[morphTo] : { borderRadius: "12px", scaleX: 1, scaleY: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Fluid Button - Liquid/blob that follows cursor inside button
// =============================================================================
// Not a sweep effect - an actual blob that tracks mouse position

interface FluidButtonProps {
  children: React.ReactNode;
  className?: string;
  fluidColor?: string;
  onClick?: () => void;
}

export function FluidButton({
  children,
  className,
  fluidColor = "rgba(255,255,255,0.15)",
  onClick,
}: FluidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Fluid blob */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: fluidColor,
          filter: "blur(20px)",
          x: mousePos.x - 60,
          y: mousePos.y - 60,
        }}
        animate={{
          scale: isInside ? 1 : 0,
          opacity: isInside ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Split Button - Text splits and reveals on hover
// =============================================================================
// Characters physically separate to reveal secondary layer

interface SplitButtonProps {
  children: string;
  revealText?: string;
  className?: string;
  onClick?: () => void;
}

export function SplitButton({
  children,
  revealText,
  className,
  onClick,
}: SplitButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const chars = children.split("");
  const reveal = revealText || children;

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-black text-white font-medium rounded-lg overflow-hidden border border-zinc-800",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Original text that splits apart */}
      <span className="relative z-10 flex justify-center overflow-hidden">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              y: isHovered ? (i % 2 === 0 ? -30 : 30) : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Revealed text */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {reveal}
      </motion.span>
    </motion.button>
  );
}

// =============================================================================
// Gravity Button - Elements fall when not hovered
// =============================================================================
// Letters have physics and "fall" when mouse leaves

interface GravityButtonProps {
  children: string;
  className?: string;
  onClick?: () => void;
}

export function GravityButton({
  children,
  className,
  onClick,
}: GravityButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const chars = children.split("");

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-white text-black font-medium rounded-lg overflow-hidden h-14",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="flex justify-center items-center h-full">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              y: isHovered ? 0 : 40 + Math.random() * 20,
              rotate: isHovered ? 0 : (Math.random() - 0.5) * 30,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: isHovered ? i * 0.03 : (chars.length - i) * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.button>
  );
}

// =============================================================================
// Outline Draw Button - Border draws itself on hover
// =============================================================================
// SVG path animation draws the border progressively

interface OutlineDrawButtonProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
  onClick?: () => void;
}

export function OutlineDrawButton({
  children,
  className,
  strokeColor = "white",
  onClick,
}: OutlineDrawButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 text-white font-medium bg-transparent",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* SVG border that draws */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="8"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Depth Button - 3D depth with parallax layers
// =============================================================================
// Multiple layers create actual depth perception

interface DepthButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DepthButton({
  children,
  className,
  onClick,
}: DepthButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 20);
    setRotateX(-y * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn("relative px-8 py-4 font-medium", className)}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back layer */}
        <div
          className="absolute inset-0 bg-zinc-800 rounded-xl"
          style={{ transform: "translateZ(-10px)" }}
        />
        {/* Middle layer */}
        <div
          className="absolute inset-0 bg-zinc-700 rounded-xl"
          style={{ transform: "translateZ(-5px)" }}
        />
        {/* Front layer */}
        <div
          className="relative bg-zinc-900 text-white rounded-xl px-8 py-4"
          style={{ transform: "translateZ(0px)" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.button>
  );
}

// =============================================================================
// Ripple Button - Organic ripple from click point
// =============================================================================
// Not a Material Design ripple - organic, physics-based expansion

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.3)",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
    onClick?.();
  };

  return (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl overflow-hidden",
        className
      )}
      onClick={handleClick}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              background: rippleColor,
              transformOrigin: "center",
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ width: 400, height: 400, x: -200, y: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// =============================================================================
// Scramble Button - Text scrambles through characters
// =============================================================================
// Not a simple text swap - actual character-by-character scramble

interface ScrambleButtonProps {
  children: string;
  className?: string;
  onClick?: () => void;
}

export function ScrambleButton({
  children,
  className,
  onClick,
}: ScrambleButtonProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const originalChars = children.split("");

    const interval = setInterval(() => {
      setDisplayText(
        originalChars
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return children[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= children.length) {
        clearInterval(interval);
        setDisplayText(children);
        setIsAnimating(false);
      }
    }, 30);
  }, [children, isAnimating, chars]);

  const unscramble = useCallback(() => {
    setDisplayText(children);
    setIsAnimating(false);
  }, [children]);

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-black text-white font-mono font-medium rounded-lg border border-zinc-700",
        className
      )}
      onMouseEnter={scramble}
      onMouseLeave={unscramble}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 tracking-wider">{displayText}</span>
    </motion.button>
  );
}

// =============================================================================
// Elastic Button - Stretches and snaps back
// =============================================================================
// Actual elastic physics, not just scale

interface ElasticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ElasticButton({
  children,
  className,
  onClick,
}: ElasticButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-white text-black font-medium rounded-full",
        className
      )}
      animate={{
        scaleX: isPressed ? 1.2 : 1,
        scaleY: isPressed ? 0.85 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 15,
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Border Flow Button - Animated gradient border that flows
// =============================================================================
// Conic gradient animation, not the standard linear gradient border

interface BorderFlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BorderFlowButton({
  children,
  className,
  onClick,
}: BorderFlowButtonProps) {
  return (
    <motion.button
      className={cn("relative p-[2px] rounded-xl group", className)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated conic gradient border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "conic-gradient(from 0deg, #ff0080, #7928ca, #ff0080)",
          animation: "spin 3s linear infinite",
        }}
      />
      <div
        className="absolute inset-[1px] rounded-xl bg-black"
      />
      <span className="relative z-10 block px-8 py-4 text-white font-medium">
        {children}
      </span>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.button>
  );
}

// =============================================================================
// Invert Button - Colors invert on hover with clip path
// =============================================================================
// Clip-path reveal, not opacity transition

interface InvertButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InvertButton({
  children,
  className,
  onClick,
}: InvertButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn("relative px-8 py-4 font-medium rounded-lg overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Default state */}
      <span className="relative z-10 text-white">{children}</span>
      <div className="absolute inset-0 bg-zinc-900" />

      {/* Inverted state with clip */}
      <motion.div
        className="absolute inset-0 bg-white flex items-center justify-center"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{
          clipPath: isHovered ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="text-black font-medium">{children}</span>
      </motion.div>
    </motion.button>
  );
}

// =============================================================================
// Shiny Button - Sweep shine effect on hover
// =============================================================================
// Gradient highlight sweeps across the button from left to right

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShinyButton({
  children,
  className,
  onClick,
}: ShinyButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl overflow-hidden group",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shine sweep effect */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Premium Icon Button - NOT your typical AI-generated icon button
// =============================================================================
// Subtle, refined, no generic gradients. Feels handcrafted.

interface IconButtonProps {
  icon: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
  variant?: "ghost" | "outline" | "solid" | "glass";
  size?: "sm" | "md" | "lg";
}

export function IconButton({
  icon,
  label,
  className,
  onClick,
  variant = "ghost",
  size = "md",
}: IconButtonProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantClasses = {
    ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white",
    outline: "bg-transparent border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white",
    solid: "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white",
    glass: "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white",
  };

  return (
    <motion.button
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-colors duration-200",
        sizeClasses[size],
        variantClasses[variant],
        label && "gap-3 w-auto px-4",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={iconSizeClasses[size]}>{icon}</span>
      {label && <span className="text-sm font-medium">{label}</span>}
    </motion.button>
  );
}

// =============================================================================
// Feature Icon - Icon with text, premium style (not the generic rounded box)
// =============================================================================

interface FeatureIconProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  onClick?: () => void;
  badge?: string;
}

export function FeatureIcon({
  icon,
  title,
  description,
  className,
  onClick,
  badge,
}: FeatureIconProps) {
  return (
    <motion.button
      className={cn(
        "group flex items-center gap-4 text-left w-full",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      whileHover={onClick ? { x: 4 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Icon container - subtle, no generic gradient */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors duration-200">
          {icon}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium group-hover:text-white transition-colors">
            {title}
          </span>
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <span className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
            {description}
          </span>
        )}
      </div>

      {/* Arrow indicator on hover */}
      {onClick && (
        <motion.div
          className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
          initial={{ opacity: 0, x: -4 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

// =============================================================================
// Minimal Card Button - Clean, no-BS feature card
// =============================================================================

interface MinimalCardButtonProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function MinimalCardButton({
  icon,
  title,
  description,
  className,
  onClick,
  active = false,
}: MinimalCardButtonProps) {
  return (
    <motion.button
      className={cn(
        "group relative flex flex-col items-start gap-4 p-6 rounded-2xl text-left transition-all duration-200",
        active
          ? "bg-zinc-900 border border-zinc-700"
          : "bg-transparent border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/50",
        className
      )}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Icon - clean, no gradient box */}
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200",
        active
          ? "bg-white text-black"
          : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white"
      )}>
        {icon}
      </div>

      {/* Content */}
      <div>
        <h3 className="font-medium text-white mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-500">{description}</p>
        )}
      </div>

      {/* Subtle corner accent when active */}
      {active && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white" />
      )}
    </motion.button>
  );
}

// =============================================================================
// List Item Button - For navigation lists, settings, etc.
// =============================================================================

interface ListItemButtonProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  className?: string;
  onClick?: () => void;
  chevron?: boolean;
}

export function ListItemButton({
  icon,
  title,
  subtitle,
  value,
  className,
  onClick,
  chevron = true,
}: ListItemButtonProps) {
  return (
    <motion.button
      className={cn(
        "group flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left",
        "hover:bg-zinc-900/50 transition-colors duration-150",
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
    >
      {/* Icon */}
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:text-zinc-300 transition-colors">
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-zinc-200">{title}</div>
        {subtitle && (
          <div className="text-xs text-zinc-500">{subtitle}</div>
        )}
      </div>

      {/* Value or chevron */}
      {value ? (
        <span className="text-sm text-zinc-500">{value}</span>
      ) : chevron ? (
        <svg
          className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ) : null}
    </motion.button>
  );
}
