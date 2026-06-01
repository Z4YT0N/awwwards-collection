"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
}

export function InfiniteScroll({
  children,
  className,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    // Duplicate items for seamless loop
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    setStart(true);
  }, []);

  const speedDuration = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-4 w-max",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          ["--animation-duration" as string]: speedDuration[speed],
          ["--animation-direction" as string]:
            direction === "left" ? "forwards" : "reverse",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Infinite logo scroll
interface LogoScrollProps {
  logos: Array<{
    name: string;
    src: string;
  }>;
  className?: string;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}

export function LogoScroll({
  logos,
  className,
  direction = "left",
  speed = "normal",
}: LogoScrollProps) {
  return (
    <InfiniteScroll
      className={className}
      direction={direction}
      speed={speed}
      pauseOnHover
    >
      {logos.map((logo, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center w-[150px] h-[60px] px-6 grayscale hover:grayscale-0 transition-all duration-300"
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </InfiniteScroll>
  );
}

// Testimonial scroll
interface TestimonialScrollProps {
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
  }>;
  className?: string;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}

export function TestimonialScroll({
  testimonials,
  className,
  direction = "left",
  speed = "slow",
}: TestimonialScrollProps) {
  return (
    <InfiniteScroll
      className={className}
      direction={direction}
      speed={speed}
      pauseOnHover
    >
      {testimonials.map((testimonial, idx) => (
        <div
          key={idx}
          className="flex flex-col w-[350px] p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <p className="text-zinc-300 mb-4 flex-1">"{testimonial.quote}"</p>
          <div className="flex items-center gap-3">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-white">{testimonial.author}</p>
              {testimonial.role && (
                <p className="text-sm text-zinc-500">{testimonial.role}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}

// Vertical infinite scroll
interface VerticalScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
}

export function VerticalScroll({
  children,
  className,
  direction = "up",
  speed = "normal",
  pauseOnHover = true,
}: VerticalScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    setStart(true);
  }, []);

  const speedDuration = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex flex-col gap-4",
          start && "animate-[scroll_var(--animation-duration)_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          ["--animation-duration" as string]: speedDuration[speed],
          animationDirection: direction === "up" ? "normal" : "reverse",
        }}
      >
        {children}
      </div>
    </div>
  );
}
