"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  className?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}

interface PillTabsProps {
  tabs: Tab[];
  className?: string;
}

interface UnderlineTabsProps {
  tabs: Tab[];
  className?: string;
}

// ─── AnimatedTabs ───────────────────────────────────────────────────────────
// Tabs with smooth layout animation on the active indicator

export function AnimatedTabs({
  tabs,
  className,
  activeTabClassName,
  contentClassName,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab list */}
      <div className="relative flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative z-10 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className={cn(
                  "absolute inset-0 rounded-md bg-surface shadow-sm border border-border/50",
                  activeTabClassName
                )}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.icon && <span className="relative z-10">{tab.icon}</span>}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={cn("mt-4", contentClassName)}>
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── PillTabs ───────────────────────────────────────────────────────────────
// Pill-shaped tabs with background slide animation

export function PillTabs({ tabs, className }: PillTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={cn("w-full", className)}>
      <div className="inline-flex gap-1 rounded-full border border-border bg-muted/30 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="pill-tab"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── UnderlineTabs ──────────────────────────────────────────────────────────
// Tabs with animated underline indicator

export function UnderlineTabs({ tabs, className }: UnderlineTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
