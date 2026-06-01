"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  const colSpanClasses = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  const rowSpanClasses = {
    1: "md:row-span-1",
    2: "md:row-span-2",
  };

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 overflow-hidden",
        "hover:border-zinc-700 transition-colors duration-300",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header content (image, animation, etc.) */}
      {header && (
        <div className="mb-4 rounded-lg overflow-hidden">{header}</div>
      )}

      {/* Icon */}
      {icon && <div className="mb-4 text-zinc-400 group-hover:text-zinc-300 transition-colors">{icon}</div>}

      {/* Title */}
      <h3 className="font-bold text-lg text-zinc-100 mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// Feature card variant
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  index = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8",
        "hover:border-zinc-700/50 transition-all duration-500",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Top shine */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Icon */}
      {icon && (
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400 group-hover:text-purple-300 transition-colors">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
        {description}
      </p>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-purple-500/50 transition-colors duration-500" />
    </motion.div>
  );
}

// =============================================================================
// Section Label - Dot indicator with label text
// =============================================================================

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "purple" | "green" | "orange" | "pink";
}

export function SectionLabel({
  children,
  className,
  color = "blue",
}: SectionLabelProps) {
  const colorClasses = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-emerald-400",
    orange: "text-orange-400",
    pink: "text-pink-400",
  };

  const dotColorClasses = {
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    green: "bg-emerald-400",
    orange: "bg-orange-400",
    pink: "bg-pink-400",
  };

  return (
    <div className={cn("flex items-center gap-2 text-sm font-medium uppercase tracking-wider", colorClasses[color], className)}>
      <span className={cn("w-2 h-2 rounded-full", dotColorClasses[color])} />
      {children}
    </div>
  );
}

// =============================================================================
// Code Preview Card - Shows code with optional run button
// =============================================================================

interface CodePreviewCardProps {
  label?: string;
  code: string;
  language?: string;
  showRunButton?: boolean;
  onRun?: () => void;
  className?: string;
}

export function CodePreviewCard({
  label = "IMPLEMENTATION",
  code,
  language = "javascript",
  showRunButton = true,
  onRun,
  className,
}: CodePreviewCardProps) {
  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</span>
        {showRunButton && (
          <button
            onClick={onRun}
            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
          >
            RUN
          </button>
        )}
      </div>
      {/* Code block */}
      <pre className="p-4 text-sm text-zinc-300 font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// =============================================================================
// Animated Icon Card - Pulsing rings animation
// =============================================================================

interface AnimatedIconCardProps {
  label?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  color?: "blue" | "purple" | "green" | "orange" | "pink";
}

export function AnimatedIconCard({
  label = "ANIMATION",
  title,
  description,
  icon,
  className,
  color = "blue",
}: AnimatedIconCardProps) {
  const colorClasses = {
    blue: { ring: "border-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/10" },
    purple: { ring: "border-purple-500/30", text: "text-purple-400", bg: "bg-purple-500/10" },
    green: { ring: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10" },
    orange: { ring: "border-orange-500/30", text: "text-orange-400", bg: "bg-orange-500/10" },
    pink: { ring: "border-pink-500/30", text: "text-pink-400", bg: "bg-pink-500/10" },
  };

  const colors = colorClasses[color];

  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/50 p-6", className)}>
      {/* Label */}
      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</span>

      {/* Animated rings */}
      <div className="relative flex items-center justify-center my-8">
        {/* Pulsing rings */}
        <motion.div
          className={cn("absolute w-24 h-24 rounded-full border-2", colors.ring)}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={cn("absolute w-16 h-16 rounded-full border-2", colors.ring)}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        {/* Center icon */}
        <div className={cn("relative w-12 h-12 rounded-full flex items-center justify-center border-2", colors.ring, colors.bg)}>
          {icon || (
            <div className={cn("w-4 h-4 rounded-full", colors.bg, "border-2", colors.ring)} />
          )}
        </div>
      </div>

      {/* Title */}
      <h4 className={cn("text-center font-medium mb-2", colors.text)}>{title}</h4>

      {/* Description */}
      {description && (
        <p className="text-center text-sm text-zinc-500">{description}</p>
      )}
    </div>
  );
}

// =============================================================================
// Feature List Card - Card with bullet point list
// =============================================================================

interface FeatureListCardProps {
  label?: string;
  title: string;
  description?: string;
  features: string[];
  className?: string;
}

export function FeatureListCard({
  label,
  title,
  description,
  features,
  className,
}: FeatureListCardProps) {
  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/50 p-6", className)}>
      {/* Label */}
      {label && <SectionLabel className="mb-4">{label}</SectionLabel>}

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-zinc-400 mb-6">{description}</p>
      )}

      {/* Feature list */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="text-zinc-600">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// =============================================================================
// Highlight Menu Card - Card with highlighted menu items
// =============================================================================

interface MenuItem {
  label: string;
  active?: boolean;
}

interface HighlightMenuCardProps {
  label?: string;
  items: MenuItem[];
  className?: string;
  color?: "blue" | "purple" | "green" | "orange" | "pink";
}

export function HighlightMenuCard({
  label,
  items,
  className,
  color = "blue",
}: HighlightMenuCardProps) {
  const colorClasses = {
    blue: { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-300" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/30", text: "text-purple-300" },
    green: { bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-300" },
    orange: { bg: "bg-orange-500/20", border: "border-orange-500/30", text: "text-orange-300" },
    pink: { bg: "bg-pink-500/20", border: "border-pink-500/30", text: "text-pink-300" },
  };

  const colors = colorClasses[color];

  return (
    <div className={cn("space-y-1", className)}>
      {/* Section label if provided */}
      {label && (
        <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
          {label}
        </div>
      )}

      {/* Menu items */}
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "px-4 py-2 rounded-lg text-sm transition-colors",
            item.active
              ? cn(colors.bg, "border", colors.border, colors.text)
              : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
          )}
        >
          {item.active && <span className="mr-2">•</span>}
          {item.label}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Stats Card - Simple stat display
// =============================================================================

interface StatsCardProps {
  label: string;
  items: { label: string; value?: string }[];
  className?: string;
}

export function StatsCard({
  label,
  items,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/50 p-6", className)}>
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">
        {label}
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="text-zinc-600">•</span>
            {item.label}
            {item.value && <span className="text-zinc-300 ml-auto">{item.value}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
