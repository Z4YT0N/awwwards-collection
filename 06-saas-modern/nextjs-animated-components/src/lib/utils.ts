import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Easing functions for GSAP and custom animations
export const easings = {
  // Smooth ease out
  easeOutExpo: "power4.out",
  easeOutQuart: "power3.out",
  easeOutCubic: "power2.out",
  // Smooth ease in-out
  easeInOutExpo: "power4.inOut",
  easeInOutQuart: "power3.inOut",
  // Elastic
  elastic: "elastic.out(1, 0.3)",
  // Back
  back: "back.out(1.7)",
  // Custom bezier curves
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.68, -0.55, 0.265, 1.55],
  // CSS timing functions
  css: {
    smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    snappy: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
};

// Random number generator
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Clamp a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Linear interpolation
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// Map a value from one range to another
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Split text into spans for animation
export function splitText(text: string): string[] {
  return text.split("");
}

// Split text into words
export function splitWords(text: string): string[] {
  return text.split(" ");
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
