"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  useRef,
  useState,
  type ReactNode,
  createContext,
  useContext,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DockProps {
  children: ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "bottom" | "top" | "left" | "right";
}

interface DockItemProps {
  children: ReactNode;
  className?: string;
  label?: string;
  onClick?: () => void;
}

interface DockContextType {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

// ─── Context ────────────────────────────────────────────────────────────────

const DockContext = createContext<DockContextType>({
  mouseX: new MotionValue(),
  magnification: 60,
  distance: 140,
});

// ─── Dock ───────────────────────────────────────────────────────────────────

export function Dock({
  children,
  className,
  magnification = 60,
  distance = 140,
  direction = "bottom",
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  const isVertical = direction === "left" || direction === "right";

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => {
          if (isVertical) {
            mouseX.set(e.pageY);
          } else {
            mouseX.set(e.pageX);
          }
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex items-end gap-3 rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-xl px-4 pb-3 pt-3",
          "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
          isVertical && "flex-col items-center px-3 pb-4 pt-4",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

// ─── DockItem ───────────────────────────────────────────────────────────────

export function DockItem({ children, className, label, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, magnification, distance } = useContext(DockContext);
  const [hovered, setHovered] = useState(false);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && label && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground shadow-lg"
          >
            {label}
            <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45 border-b border-r border-border bg-surface" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-xl",
          "bg-gradient-to-b from-muted/80 to-muted/40 border border-border/30",
          "transition-colors hover:border-primary/30",
          "shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── DockSeparator ──────────────────────────────────────────────────────────

export function DockSeparator() {
  return <div className="mx-1.5 h-8 w-px bg-border/50 self-center" />;
}
