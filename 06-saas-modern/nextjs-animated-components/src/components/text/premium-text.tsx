"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// TextScramble — Characters scramble/decode before resolving to target text
// =============================================================================

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface TextScrambleProps {
  /** Target text to resolve to */
  text: string;
  className?: string;
  /** Trigger: mount, hover, inView, or controlled */
  trigger?: "mount" | "hover" | "inView";
  /** Duration of scramble effect in ms */
  duration?: number;
  /** Character set for scramble */
  charset?: string;
  /** Speed — frames between character updates */
  speed?: number;
  /** Callback when scramble completes */
  onComplete?: () => void;
  /** HTML tag to render */
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";
}

export function TextScramble({
  text,
  className,
  trigger = "mount",
  duration = 1500,
  charset = CHARS,
  speed = 50,
  onComplete,
  as: Tag = "span",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(trigger === "mount" ? "" : text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const observerRef = useRef<HTMLSpanElement>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const chars = text.split("");
    const resolved = new Array(chars.length).fill(false);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Progressively resolve characters left to right
      const resolveCount = Math.floor(progress * chars.length);
      for (let i = 0; i < resolveCount; i++) {
        resolved[i] = true;
      }

      const result = chars
        .map((char, i) => {
          if (resolved[i]) return char;
          if (char === " ") return " ";
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join("");

      setDisplayText(result);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, duration, charset, speed, isScrambling, onComplete]);

  // Mount trigger
  useEffect(() => {
    if (trigger === "mount" && !hasTriggered) {
      setHasTriggered(true);
      scramble();
    }
  }, [trigger, hasTriggered, scramble]);

  // InView trigger
  useEffect(() => {
    if (trigger !== "inView" || !observerRef.current) return;

    const el = observerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          scramble();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, hasTriggered, scramble]);

  const hoverProps =
    trigger === "hover"
      ? {
          onMouseEnter: scramble,
          style: { cursor: "pointer" } as React.CSSProperties,
        }
      : {};

  return (
    <span ref={observerRef} className="contents">
      <Tag
        className={cn("inline-block font-mono", className)}
        {...hoverProps}
      >
        {displayText || text}
      </Tag>
    </span>
  );
}

// =============================================================================
// SpringText — Per-character spring physics responding to cursor proximity
// =============================================================================

interface SpringTextProps {
  /** Text to render */
  text: string;
  className?: string;
  /** Font size (rem) */
  fontSize?: number;
  /** How close cursor needs to be to affect characters (px) */
  proximity?: number;
  /** Max displacement in px */
  maxDisplacement?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** HTML tag */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

export function SpringText({
  text,
  className,
  fontSize = 3,
  proximity = 100,
  maxDisplacement = 20,
  stiffness = 150,
  damping = 15,
  as: Tag = "span",
}: SpringTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleLeave = () => setMousePos(null);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const chars = useMemo(() => text.split(""), [text]);

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      style={{ fontSize: `${fontSize}rem`, lineHeight: 1.1 }}
    >
      {chars.map((char, i) => (
        <SpringChar
          key={`${i}-${char}`}
          char={char}
          mousePos={mousePos}
          proximity={proximity}
          maxDisplacement={maxDisplacement}
          stiffness={stiffness}
          damping={damping}
        />
      ))}
    </Tag>
  );
}

function SpringChar({
  char,
  mousePos,
  proximity,
  maxDisplacement,
  stiffness,
  damping,
}: {
  char: string;
  mousePos: { x: number; y: number } | null;
  proximity: number;
  maxDisplacement: number;
  stiffness: number;
  damping: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  useEffect(() => {
    if (!ref.current || !mousePos) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    const dx = charCenterX - mousePos.x;
    const dy = charCenterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < proximity) {
      const force = (1 - distance / proximity) * maxDisplacement;
      const angle = Math.atan2(dy, dx);
      x.set(Math.cos(angle) * force);
      y.set(Math.sin(angle) * force);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mousePos, proximity, maxDisplacement, x, y]);

  if (char === " ") {
    return <span>&nbsp;</span>;
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block will-change-transform"
      style={{ x: springX, y: springY }}
    >
      {char}
    </motion.span>
  );
}

// =============================================================================
// VariableFontText — Animate font-variation-settings per character
// =============================================================================

interface VariableFontTextProps {
  /** Text to render */
  text: string;
  className?: string;
  /** Font family (must be a variable font) */
  fontFamily?: string;
  /** Trigger mode */
  trigger?: "auto" | "hover" | "scroll" | "mouse";
  /** Weight range [min, max] */
  weightRange?: [number, number];
  /** Width range [min, max] (if font supports wdth axis) */
  widthRange?: [number, number];
  /** Animation duration per cycle (ms) for auto mode */
  cycleDuration?: number;
  /** Stagger delay between characters (ms) */
  stagger?: number;
  /** Font size */
  fontSize?: number;
  /** HTML tag */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

export function VariableFontText({
  text,
  className,
  fontFamily,
  trigger = "auto",
  weightRange = [300, 900],
  widthRange,
  cycleDuration = 2000,
  stagger = 50,
  fontSize,
  as: Tag = "span",
}: VariableFontTextProps) {
  const [mouseProgress, setMouseProgress] = useState(0.5);
  const chars = useMemo(() => text.split(""), [text]);

  // Mouse-based: track horizontal position
  useEffect(() => {
    if (trigger !== "mouse") return;

    const handleMove = (e: MouseEvent) => {
      setMouseProgress(e.clientX / window.innerWidth);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [trigger]);

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      style={{ fontFamily, fontSize }}
    >
      {chars.map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <VarFontChar
            key={`${i}-${char}`}
            char={char}
            index={i}
            total={chars.length}
            trigger={trigger}
            weightRange={weightRange}
            widthRange={widthRange}
            cycleDuration={cycleDuration}
            stagger={stagger}
            mouseProgress={mouseProgress}
            fontFamily={fontFamily}
          />
        )
      )}
    </Tag>
  );
}

function VarFontChar({
  char,
  index,
  total,
  trigger,
  weightRange,
  widthRange,
  cycleDuration,
  stagger,
  mouseProgress,
  fontFamily,
}: {
  char: string;
  index: number;
  total: number;
  trigger: string;
  weightRange: [number, number];
  widthRange?: [number, number];
  cycleDuration: number;
  stagger: number;
  mouseProgress: number;
  fontFamily?: string;
}) {
  const [weight, setWeight] = useState(weightRange[0]);
  const [width, setWidth] = useState(widthRange?.[0] || 100);
  const ref = useRef<HTMLSpanElement>(null);

  // Auto mode: continuous wave animation
  useEffect(() => {
    if (trigger !== "auto") return;

    let raf: number;
    const animate = () => {
      const time = Date.now();
      const offset = index * stagger;
      const progress =
        (Math.sin(((time + offset) / cycleDuration) * Math.PI * 2) + 1) / 2;

      setWeight(
        weightRange[0] + progress * (weightRange[1] - weightRange[0])
      );
      if (widthRange) {
        setWidth(widthRange[0] + progress * (widthRange[1] - widthRange[0]));
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [trigger, index, stagger, cycleDuration, weightRange, widthRange]);

  // Mouse mode: weight follows cursor position with per-char offset
  useEffect(() => {
    if (trigger !== "mouse") return;

    const charProgress = index / (total - 1 || 1);
    const distance = 1 - Math.abs(mouseProgress - charProgress);
    const w =
      weightRange[0] + distance * (weightRange[1] - weightRange[0]);
    setWeight(w);

    if (widthRange) {
      setWidth(widthRange[0] + distance * (widthRange[1] - widthRange[0]));
    }
  }, [trigger, mouseProgress, index, total, weightRange, widthRange]);

  // Hover mode via CSS (no JS needed for the animation itself)
  if (trigger === "hover") {
    return (
      <span
        ref={ref}
        className="inline-block transition-all duration-300"
        style={{
          fontFamily,
          fontVariationSettings: `'wght' ${weightRange[0]}${widthRange ? `, 'wdth' ${widthRange[0]}` : ""}`,
        }}
        onMouseEnter={() => {
          setWeight(weightRange[1]);
          if (widthRange) setWidth(widthRange[1]);
        }}
        onMouseLeave={() => {
          setWeight(weightRange[0]);
          if (widthRange) setWidth(widthRange[0]);
        }}
      >
        <span
          className="inline-block transition-all duration-300"
          style={{
            fontVariationSettings: `'wght' ${weight}${widthRange ? `, 'wdth' ${width}` : ""}`,
          }}
        >
          {char}
        </span>
      </span>
    );
  }

  const settings = `'wght' ${Math.round(weight)}${widthRange ? `, 'wdth' ${Math.round(width)}` : ""}`;

  return (
    <span
      ref={ref}
      className="inline-block"
      style={{ fontFamily, fontVariationSettings: settings }}
    >
      {char}
    </span>
  );
}
