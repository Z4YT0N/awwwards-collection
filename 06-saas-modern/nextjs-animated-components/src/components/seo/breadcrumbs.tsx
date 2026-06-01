"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BreadcrumbJsonLd } from "./json-ld";

// =============================================================================
// Visual Breadcrumb Component with SEO Schema
// =============================================================================
// Combines UX navigation with structured data for rich snippets in Google

export interface BreadcrumbProps {
  items: {
    name: string;
    url: string;
  }[];
  className?: string;
  separator?: "chevron" | "slash" | "arrow" | "dot";
  variant?: "default" | "minimal" | "pill" | "underline";
  showHome?: boolean;
  homeLabel?: string;
  homeUrl?: string;
  // SEO: Include schema markup (recommended)
  includeSchema?: boolean;
}

const separators = {
  chevron: (
    <svg
      className="w-4 h-4 text-neutral-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  slash: <span className="text-neutral-400 mx-1">/</span>,
  arrow: <span className="text-neutral-400 mx-1">→</span>,
  dot: <span className="text-neutral-400 mx-1">•</span>,
};

export function Breadcrumbs({
  items,
  className,
  separator = "chevron",
  variant = "default",
  showHome = true,
  homeLabel = "Home",
  homeUrl = "/",
  includeSchema = true,
}: BreadcrumbProps) {
  // Prepend home if enabled
  const allItems = showHome
    ? [{ name: homeLabel, url: homeUrl }, ...items]
    : items;

  const variantStyles = {
    default: {
      container: "flex items-center gap-2 text-sm",
      link: "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors",
      active: "text-neutral-900 dark:text-neutral-100 font-medium",
    },
    minimal: {
      container: "flex items-center gap-1.5 text-xs",
      link: "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors",
      active: "text-neutral-600 dark:text-neutral-300",
    },
    pill: {
      container: "flex items-center gap-1 text-sm",
      link: "px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors",
      active:
        "px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium",
    },
    underline: {
      container: "flex items-center gap-2 text-sm",
      link: "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 border-b border-transparent hover:border-neutral-400 transition-all",
      active:
        "text-neutral-900 dark:text-neutral-100 font-medium border-b border-neutral-900 dark:border-neutral-100",
    },
  };

  const styles = variantStyles[variant];

  return (
    <>
      {/* SEO: Structured data for breadcrumbs */}
      {includeSchema && <BreadcrumbJsonLd items={allItems} />}

      {/* Visual breadcrumbs */}
      <nav aria-label="Breadcrumb" className={cn(styles.container, className)}>
        <ol className="flex items-center gap-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <motion.li
                key={item.url}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {isLast ? (
                  <span className={styles.active} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} className={styles.link}>
                      {item.name}
                    </Link>
                    {separators[separator]}
                  </>
                )}
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// =============================================================================
// Collapsible Breadcrumbs (for long paths)
// =============================================================================

export interface CollapsibleBreadcrumbsProps extends Omit<BreadcrumbProps, "items"> {
  items: {
    name: string;
    url: string;
  }[];
  maxVisible?: number;
}

export function CollapsibleBreadcrumbs({
  items,
  maxVisible = 3,
  showHome = true,
  homeLabel = "Home",
  homeUrl = "/",
  includeSchema = true,
  className,
  separator = "chevron",
  variant = "default",
}: CollapsibleBreadcrumbsProps) {
  const allItems = showHome
    ? [{ name: homeLabel, url: homeUrl }, ...items]
    : items;

  // If fewer items than max, show all
  if (allItems.length <= maxVisible) {
    return (
      <Breadcrumbs
        items={items}
        showHome={showHome}
        homeLabel={homeLabel}
        homeUrl={homeUrl}
        includeSchema={includeSchema}
        className={className}
        separator={separator}
        variant={variant}
      />
    );
  }

  // Show first, ellipsis, and last (maxVisible - 1) items
  const firstItem = allItems[0];
  const lastItems = allItems.slice(-(maxVisible - 1));
  const hiddenItems = allItems.slice(1, -(maxVisible - 1));

  const variantStyles = {
    default: {
      container: "flex items-center gap-2 text-sm",
      link: "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors",
      active: "text-neutral-900 dark:text-neutral-100 font-medium",
    },
    minimal: {
      container: "flex items-center gap-1.5 text-xs",
      link: "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors",
      active: "text-neutral-600 dark:text-neutral-300",
    },
    pill: {
      container: "flex items-center gap-1 text-sm",
      link: "px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors",
      active:
        "px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium",
    },
    underline: {
      container: "flex items-center gap-2 text-sm",
      link: "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 border-b border-transparent hover:border-neutral-400 transition-all",
      active:
        "text-neutral-900 dark:text-neutral-100 font-medium border-b border-neutral-900 dark:border-neutral-100",
    },
  };

  const styles = variantStyles[variant];

  return (
    <>
      {includeSchema && <BreadcrumbJsonLd items={allItems} />}

      <nav aria-label="Breadcrumb" className={cn(styles.container, className)}>
        <ol className="flex items-center gap-2">
          {/* First item */}
          <li className="flex items-center gap-2">
            <Link href={firstItem.url} className={styles.link}>
              {firstItem.name}
            </Link>
            {separators[separator]}
          </li>

          {/* Collapsed items with dropdown */}
          <li className="flex items-center gap-2 group relative">
            <button className={cn(styles.link, "cursor-pointer")}>
              <span className="px-1">...</span>
            </button>

            {/* Dropdown for hidden items */}
            <div className="absolute top-full left-0 mt-1 py-1 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[150px]">
              {hiddenItems.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="block px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {separators[separator]}
          </li>

          {/* Last items */}
          {lastItems.map((item, index) => {
            const isLast = index === lastItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {isLast ? (
                  <span className={styles.active} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} className={styles.link}>
                      {item.name}
                    </Link>
                    {separators[separator]}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// =============================================================================
// Auto Breadcrumbs (generates from URL path)
// =============================================================================

export interface AutoBreadcrumbsProps
  extends Omit<BreadcrumbProps, "items"> {
  path: string;
  baseUrl?: string;
  // Transform slug to display name (e.g., "my-page" -> "My Page")
  transformLabel?: (slug: string) => string;
}

function defaultTransform(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AutoBreadcrumbs({
  path,
  baseUrl = "",
  transformLabel = defaultTransform,
  ...props
}: AutoBreadcrumbsProps) {
  // Parse path into segments
  const segments = path.split("/").filter(Boolean);

  // Build breadcrumb items
  const items = segments.map((segment, index) => {
    const url = baseUrl + "/" + segments.slice(0, index + 1).join("/");
    return {
      name: transformLabel(segment),
      url,
    };
  });

  return <Breadcrumbs items={items} {...props} />;
}
