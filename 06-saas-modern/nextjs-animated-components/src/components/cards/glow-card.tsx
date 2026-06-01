"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(120, 119, 198, 0.5)",
  borderRadius = "1rem",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{ borderRadius }}
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
        }}
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          borderRadius,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 bg-zinc-900/90 h-full" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}

// Border beam effect
interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)]",
        "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)*1px)_50%]",
        "after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}

// Card with border beam
interface BeamCardProps {
  children: React.ReactNode;
  className?: string;
  beamProps?: Partial<BorderBeamProps>;
}

export function BeamCard({ children, className, beamProps }: BeamCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl bg-zinc-900 p-6 border border-zinc-800",
        className
      )}
    >
      <BorderBeam {...beamProps} />
      {children}
    </div>
  );
}

// Evervault-style card
interface EvervaultCardProps {
  children: React.ReactNode;
  className?: string;
  text?: string;
}

export function EvervaultCard({
  children,
  className,
  text = "hover",
}: EvervaultCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      let result = "";
      for (let i = 0; i < 1500; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setRandomText(result);
    }, 50);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div
      className={cn(
        "relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Random characters background */}
      <div
        className="absolute inset-0 font-mono text-xs text-zinc-600 overflow-hidden break-all leading-tight p-2 transition-opacity duration-300"
        style={{ opacity: isHovering ? 1 : 0 }}
      >
        {randomText}
      </div>

      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.3), transparent 80%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
