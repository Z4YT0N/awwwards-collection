"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  label: string;
  type?: string;
  className?: string;
  variant?: "underline" | "border" | "filled";
}

export function AnimatedInput({
  label,
  type = "text",
  className,
  variant = "underline",
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
  };

  if (variant === "underline") {
    return (
      <div className={cn("relative pt-5", className)}>
        <input
          ref={inputRef}
          type={type}
          className="peer w-full bg-transparent border-b-2 border-zinc-700 py-2 text-white outline-none focus:border-purple-500 transition-colors"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
        />
        <motion.label
          className="absolute left-0 text-zinc-500 pointer-events-none"
          animate={{
            y: isFocused || hasValue ? -20 : 8,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: isFocused ? "#A855F7" : "#71717A",
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </div>
    );
  }

  if (variant === "border") {
    return (
      <div className={cn("relative", className)}>
        <input
          ref={inputRef}
          type={type}
          className="peer w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          placeholder=" "
        />
        <motion.label
          className="absolute left-3 bg-zinc-900 px-1 text-zinc-500 pointer-events-none"
          animate={{
            y: isFocused || hasValue ? -12 : 12,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: isFocused ? "#A855F7" : "#71717A",
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      </div>
    );
  }

  if (variant === "filled") {
    return (
      <div className={cn("relative", className)}>
        <input
          ref={inputRef}
          type={type}
          className="peer w-full bg-zinc-800 rounded-lg px-4 pt-6 pb-2 text-white outline-none ring-2 ring-transparent focus:ring-purple-500 transition-all"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          placeholder=" "
        />
        <motion.label
          className="absolute left-4 text-zinc-500 pointer-events-none"
          animate={{
            y: isFocused || hasValue ? 8 : 16,
            scale: isFocused || hasValue ? 0.75 : 1,
            color: isFocused ? "#A855F7" : "#71717A",
          }}
          transition={{ duration: 0.2 }}
          style={{ originX: 0 }}
        >
          {label}
        </motion.label>
      </div>
    );
  }

  return null;
}

// Glowing search input
interface GlowingSearchProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export function GlowingSearch({
  placeholder = "Search...",
  className,
  onSearch,
}: GlowingSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={cn("relative", className)}>
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 blur-md"
        animate={{ opacity: isFocused ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Input container */}
      <div className="relative flex items-center bg-zinc-900 rounded-full border border-zinc-700 overflow-hidden">
        {/* Search icon */}
        <div className="pl-4 text-zinc-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-zinc-500"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onSearch) {
              onSearch(value);
            }
          }}
        />

        {/* Clear button */}
        <AnimatePresence>
          {value && (
            <motion.button
              className="pr-4 text-zinc-500 hover:text-white transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setValue("")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Animated checkbox
interface AnimatedCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function AnimatedCheckbox({
  label,
  checked = false,
  onChange,
  className,
}: AnimatedCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <button
      className={cn("flex items-center gap-3 group", className)}
      onClick={handleClick}
    >
      <div className="relative w-6 h-6">
        {/* Box */}
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-zinc-600 group-hover:border-purple-500 transition-colors"
          animate={{
            backgroundColor: isChecked ? "#A855F7" : "transparent",
            borderColor: isChecked ? "#A855F7" : undefined,
          }}
        />

        {/* Checkmark */}
        <svg
          className="absolute inset-0 w-6 h-6 text-white p-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isChecked ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </svg>
      </div>

      <span className="text-zinc-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}
