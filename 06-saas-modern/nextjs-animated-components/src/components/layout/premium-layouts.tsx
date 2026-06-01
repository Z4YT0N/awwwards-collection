"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Masonry Grid - Pinterest-style layout with animated entries
// =============================================================================

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
  className?: string;
}

export function MasonryGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 16,
  className,
}: MasonryGridProps) {
  const [columnCount, setColumnCount] = useState(
    typeof columns === "number" ? columns : columns.lg || 3
  );

  useEffect(() => {
    const updateColumns = () => {
      if (typeof columns === "number") {
        setColumnCount(columns);
        return;
      }

      const width = window.innerWidth;
      if (width >= 1280 && columns.xl) setColumnCount(columns.xl);
      else if (width >= 1024 && columns.lg) setColumnCount(columns.lg);
      else if (width >= 768 && columns.md) setColumnCount(columns.md);
      else if (columns.sm) setColumnCount(columns.sm);
      else setColumnCount(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columns]);

  // Distribute children into columns
  const columnArrays: React.ReactNode[][] = Array.from(
    { length: columnCount },
    () => []
  );

  children.forEach((child, index) => {
    columnArrays[index % columnCount].push(child);
  });

  return (
    <div
      className={cn("flex", className)}
      style={{ gap: `${gap}px` }}
    >
      {columnArrays.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {column.map((child, itemIndex) => (
            <motion.div
              key={itemIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: (columnIndex * 0.1) + (itemIndex * 0.05),
              }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Masonry Item - Individual item for masonry grid
// =============================================================================

interface MasonryItemProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
}

export function MasonryItem({
  children,
  className,
  aspectRatio = "auto",
}: MasonryItemProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden bg-zinc-900",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {children}
    </div>
  );
}

// =============================================================================
// Snap Scroll Container - Full-page snap scrolling sections
// =============================================================================

interface SnapScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  direction?: "vertical" | "horizontal";
}

export function SnapScrollContainer({
  children,
  className,
  direction = "vertical",
}: SnapScrollContainerProps) {
  return (
    <div
      className={cn(
        "snap-mandatory overflow-auto",
        direction === "vertical"
          ? "snap-y h-screen"
          : "snap-x w-screen flex",
        className
      )}
    >
      {children}
    </div>
  );
}

// =============================================================================
// Snap Section - Individual section for snap scroll
// =============================================================================

interface SnapSectionProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

export function SnapSection({
  children,
  className,
  align = "start",
}: SnapSectionProps) {
  const alignClasses = {
    start: "snap-start",
    center: "snap-center",
    end: "snap-end",
  };

  return (
    <section
      className={cn(
        "min-h-screen w-full flex-shrink-0",
        alignClasses[align],
        className
      )}
    >
      {children}
    </section>
  );
}

// =============================================================================
// Full Page Sections - Smooth snap with indicators
// =============================================================================

interface FullPageSectionsProps {
  children: React.ReactNode[];
  className?: string;
  showIndicators?: boolean;
  indicatorPosition?: "left" | "right";
}

export function FullPageSections({
  children,
  className,
  showIndicators = true,
  indicatorPosition = "right",
}: FullPageSectionsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / sectionHeight);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: index * container.clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={cn(
          "h-screen overflow-y-auto snap-y snap-mandatory",
          className
        )}
      >
        {children.map((child, index) => (
          <section
            key={index}
            className="h-screen w-full snap-start flex-shrink-0"
          >
            {child}
          </section>
        ))}
      </div>

      {/* Navigation indicators */}
      {showIndicators && (
        <div
          className={cn(
            "fixed top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50",
            indicatorPosition === "right" ? "right-6" : "left-6"
          )}
        >
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-white h-8"
                  : "bg-zinc-600 hover:bg-zinc-400"
              )}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Timeline - Vertical timeline with animated entries
// =============================================================================

interface TimelineItem {
  date?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  lineColor?: string;
  activeColor?: string;
}

export function Timeline({
  items,
  className,
  lineColor = "bg-zinc-800",
  activeColor = "bg-white",
}: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div
        className={cn(
          "absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2",
          lineColor
        )}
      />

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative flex items-start gap-8",
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Dot indicator */}
            <div
              className={cn(
                "absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10",
                "ring-4 ring-zinc-950",
                activeColor
              )}
            />

            {/* Content */}
            <div
              className={cn(
                "flex-1 ml-12 md:ml-0",
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              )}
            >
              {item.date && (
                <span className="text-sm text-zinc-500 font-medium">
                  {item.date}
                </span>
              )}
              <h3 className="text-xl font-semibold text-white mt-1">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-zinc-400 mt-2">{item.description}</p>
              )}
              {item.content && (
                <div className="mt-4">{item.content}</div>
              )}
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Horizontal Timeline - For process flows
// =============================================================================

interface HorizontalTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function HorizontalTimeline({
  items,
  className,
}: HorizontalTimelineProps) {
  return (
    <div className={cn("relative overflow-x-auto", className)}>
      {/* Horizontal line */}
      <div className="absolute top-6 left-0 right-0 h-px bg-zinc-800" />

      {/* Items */}
      <div className="flex gap-8 md:gap-16 pb-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex-shrink-0 w-64"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Dot */}
            <div className="w-3 h-3 rounded-full bg-white ring-4 ring-zinc-950 mb-6" />

            {/* Content */}
            {item.date && (
              <span className="text-sm text-zinc-500 font-medium">
                {item.date}
              </span>
            )}
            <h4 className="text-lg font-semibold text-white mt-1">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-sm text-zinc-400 mt-2">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Accordion - Expandable sections
// =============================================================================

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export function Accordion({
  items,
  className,
  allowMultiple = false,
  defaultOpen = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionItemComponentProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
}: AccordionItemComponentProps) {
  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-900/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {item.icon && (
            <span className="text-zinc-400">{item.icon}</span>
          )}
          <span className="font-medium text-white">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-400"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-4 pb-4 text-zinc-400">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// Diagonal Section - Angled section divider
// =============================================================================

interface DiagonalSectionProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  angle?: "up" | "down" | "both";
  angleSize?: "sm" | "md" | "lg";
}

export function DiagonalSection({
  children,
  className,
  bgColor = "bg-zinc-900",
  angle = "both",
  angleSize = "md",
}: DiagonalSectionProps) {
  const sizeMap = {
    sm: "50px",
    md: "100px",
    lg: "150px",
  };

  const clipSize = sizeMap[angleSize];

  const clipPaths = {
    up: `polygon(0 ${clipSize}, 100% 0, 100% 100%, 0 100%)`,
    down: `polygon(0 0, 100% 0, 100% calc(100% - ${clipSize}), 0 100%)`,
    both: `polygon(0 ${clipSize}, 100% 0, 100% calc(100% - ${clipSize}), 0 100%)`,
  };

  return (
    <section
      className={cn("relative py-24", bgColor, className)}
      style={{ clipPath: clipPaths[angle] }}
    >
      <div
        className={cn(
          angle === "up" || angle === "both" ? "pt-12" : "",
          angle === "down" || angle === "both" ? "pb-12" : ""
        )}
      >
        {children}
      </div>
    </section>
  );
}

// =============================================================================
// Wave Divider - SVG wave section divider
// =============================================================================

interface WaveDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
}

export function WaveDivider({
  className,
  color = "fill-zinc-900",
  flip = false,
}: WaveDividerProps) {
  return (
    <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={cn("w-full h-16 md:h-24", color)}
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
      </svg>
    </div>
  );
}

// =============================================================================
// Split Layout - Two-column layout with various arrangements
// =============================================================================

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  ratio?: "50-50" | "40-60" | "60-40" | "33-67" | "67-33";
  gap?: "none" | "sm" | "md" | "lg";
  reverse?: boolean;
  sticky?: "left" | "right" | "none";
}

export function SplitLayout({
  left,
  right,
  className,
  ratio = "50-50",
  gap = "md",
  reverse = false,
  sticky = "none",
}: SplitLayoutProps) {
  const ratioClasses = {
    "50-50": "md:grid-cols-2",
    "40-60": "md:grid-cols-[2fr_3fr]",
    "60-40": "md:grid-cols-[3fr_2fr]",
    "33-67": "md:grid-cols-[1fr_2fr]",
    "67-33": "md:grid-cols-[2fr_1fr]",
  };

  const gapClasses = {
    none: "gap-0",
    sm: "gap-4",
    md: "gap-8",
    lg: "gap-16",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        ratioClasses[ratio],
        gapClasses[gap],
        className
      )}
    >
      <div
        className={cn(
          reverse && "md:order-2",
          sticky === "left" && "md:sticky md:top-24 md:self-start"
        )}
      >
        {left}
      </div>
      <div
        className={cn(
          reverse && "md:order-1",
          sticky === "right" && "md:sticky md:top-24 md:self-start"
        )}
      >
        {right}
      </div>
    </div>
  );
}

// =============================================================================
// Magazine Layout - Editorial style with featured + grid
// =============================================================================

interface MagazineLayoutProps {
  featured: React.ReactNode;
  items: React.ReactNode[];
  className?: string;
}

export function MagazineLayout({
  featured,
  items,
  className,
}: MagazineLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {/* Featured - spans 2 columns and 2 rows */}
      <motion.div
        className="md:col-span-2 md:row-span-2"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {featured}
      </motion.div>

      {/* Grid items */}
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// Card Grid with Expand - Grid that expands items to modal/fullscreen
// =============================================================================

interface ExpandableGridProps {
  children: React.ReactNode[];
  className?: string;
  columns?: number;
}

export function ExpandableGrid({
  children,
  className,
  columns = 3,
}: ExpandableGridProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn("grid gap-4", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            layoutId={`expandable-${index}`}
            onClick={() => setExpandedIndex(index)}
            className="cursor-pointer"
          >
            {child}
          </motion.div>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setExpandedIndex(null)}
            />
            <motion.div
              layoutId={`expandable-${expandedIndex}`}
              className="fixed inset-4 md:inset-12 z-50 rounded-2xl overflow-hidden"
            >
              {children[expandedIndex]}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
