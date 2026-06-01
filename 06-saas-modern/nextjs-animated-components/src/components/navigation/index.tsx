"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// =============================================================================
// Hamburger Menu - Animated icon that morphs
// =============================================================================

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  variant?: "cross" | "arrow" | "rotate";
}

export function Hamburger({
  isOpen,
  onClick,
  className,
  color = "white",
  size = "md",
  variant = "cross",
}: HamburgerProps) {
  const sizeMap = {
    sm: { width: 20, gap: 4, height: 2 },
    md: { width: 28, gap: 6, height: 2 },
    lg: { width: 36, gap: 8, height: 3 },
  };

  const { width, gap, height } = sizeMap[size];

  const variants = {
    cross: {
      top: isOpen ? { rotate: 45, y: gap + height } : { rotate: 0, y: 0 },
      middle: isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 },
      bottom: isOpen ? { rotate: -45, y: -(gap + height) } : { rotate: 0, y: 0 },
    },
    arrow: {
      top: isOpen ? { rotate: -45, y: gap / 2, width: width * 0.5, x: 3 } : { rotate: 0, y: 0, width, x: 0 },
      middle: isOpen ? { opacity: 1 } : { opacity: 1 },
      bottom: isOpen ? { rotate: 45, y: -gap / 2, width: width * 0.5, x: 3 } : { rotate: 0, y: 0, width, x: 0 },
    },
    rotate: {
      top: isOpen ? { rotate: 45, y: gap + height, width: width * 1.2 } : { rotate: 0, y: 0, width },
      middle: isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 },
      bottom: isOpen ? { rotate: -45, y: -(gap + height), width: width * 1.2 } : { rotate: 0, y: 0, width },
    },
  };

  return (
    <button
      className={cn("relative flex flex-col items-center justify-center", className)}
      onClick={onClick}
      style={{ width: width + 10, height: (height * 3) + (gap * 2) + 10 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        className="absolute rounded-full"
        style={{ width, height, backgroundColor: color, originX: 0 }}
        animate={variants[variant].top}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{ width, height, backgroundColor: color }}
        animate={variants[variant].middle}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{ width, height, backgroundColor: color, originX: 0, y: gap + height }}
        animate={variants[variant].bottom}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />
    </button>
  );
}

// =============================================================================
// Full Screen Navigation - Overlay menu with animated links
// =============================================================================

interface NavLink {
  label: string;
  href: string;
}

interface FullScreenNavProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export function FullScreenNav({
  links,
  isOpen,
  onClose,
  className,
  bgColor = "#000",
  textColor = "#fff",
}: FullScreenNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center",
            className
          )}
          style={{ backgroundColor: bgColor }}
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul className="flex flex-col items-center gap-4">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className="text-5xl md:text-7xl font-bold hover:opacity-50 transition-opacity"
                  style={{ color: textColor }}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// Sliding Nav - Slides in from side
// =============================================================================

interface SlidingNavProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  width?: string;
  className?: string;
}

export function SlidingNav({
  links,
  isOpen,
  onClose,
  side = "right",
  width = "400px",
  className,
}: SlidingNavProps) {
  const slideFrom = side === "left" ? { x: "-100%" } : { x: "100%" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[99] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className={cn(
              "fixed top-0 bottom-0 z-[100] bg-zinc-900 flex flex-col p-8",
              side === "left" ? "left-0" : "right-0",
              className
            )}
            style={{ width }}
            initial={slideFrom}
            animate={{ x: 0 }}
            exit={slideFrom}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              onClick={onClose}
              className="self-end text-zinc-500 hover:text-white mb-8"
            >
              Close
            </button>

            <ul className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-white hover:text-zinc-400 transition-colors"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// Sticky Header - Hides on scroll down, shows on scroll up
// =============================================================================

interface StickyHeaderProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function StickyHeader({
  children,
  className,
  threshold = 100,
}: StickyHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > threshold);
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled && "bg-black/80 backdrop-blur-lg",
        className
      )}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.header>
  );
}

// =============================================================================
// Animated Nav Links - Hover effect with underline/highlight
// =============================================================================

interface AnimatedNavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "underline" | "highlight" | "bracket" | "fill";
}

export function AnimatedNavLink({
  href,
  children,
  className,
  variant = "underline",
}: AnimatedNavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    underline: (
      <Link
        href={href}
        className={cn("relative inline-block", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-current"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </Link>
    ),
    highlight: (
      <Link
        href={href}
        className={cn("relative inline-block px-3 py-1", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className="absolute inset-0 bg-white/10 rounded"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        <span className="relative z-10">{children}</span>
      </Link>
    ),
    bracket: (
      <Link
        href={href}
        className={cn("relative inline-block px-2", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-current"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute right-0 top-0 bottom-0 w-[2px] bg-current"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />
        {children}
      </Link>
    ),
    fill: (
      <Link
        href={href}
        className={cn("relative inline-block overflow-hidden px-4 py-2", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className="absolute inset-0 bg-white"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <span className="relative z-10">
          <motion.span
            className="inline-block"
            animate={{ color: isHovered ? "#000" : "#fff" }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        </span>
      </Link>
    ),
  };

  return variants[variant];
}

// =============================================================================
// Tab Navigation - Animated indicator
// =============================================================================

interface Tab {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "underline" | "pill" | "block";
}

export function TabNav({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "underline",
}: TabNavProps) {
  return (
    <div className={cn("relative flex gap-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          {tab.label}

          {activeTab === tab.id && (
            <motion.div
              className={cn(
                "absolute",
                variant === "underline" && "bottom-0 left-0 right-0 h-[2px] bg-white",
                variant === "pill" && "inset-0 bg-zinc-800 rounded-full -z-10",
                variant === "block" && "inset-0 bg-white/10 rounded -z-10"
              )}
              layoutId="tab-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// Breadcrumb - Animated path navigation
// =============================================================================

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: ReactNode;
}

export function Breadcrumb({
  items,
  className,
  separator = "/",
}: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {i > 0 && <span className="text-zinc-600">{separator}</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </motion.span>
      ))}
    </nav>
  );
}

// =============================================================================
// Magnetic Nav Item - Item that pulls cursor toward it
// =============================================================================

interface MagneticNavItemProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticNavItem({
  href,
  children,
  className,
  strength = 0.3,
}: MagneticNavItemProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * strength, y: y * strength });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.a
      href={href}
      className={cn("inline-block", className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
