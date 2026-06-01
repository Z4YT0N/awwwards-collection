"use client";
import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
};

export function SlideIn({ children, delay = 0, duration = 0.6 }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.animation = `slide-in ${duration}s ease ${delay}s forwards`;
          observer.unobserve(element);
        }
      },
      { threshold: 0, rootMargin: "-150px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <div ref={elementRef} className="slide-in-hidden">
      {children}
    </div>
  );
}
