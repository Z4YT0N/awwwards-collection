"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Image Reveal - Various reveal animations for images
// =============================================================================

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "wipe" | "blinds" | "pixelate" | "curtain" | "zoom" | "split" | "diagonal";
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className,
  variant = "wipe",
  direction = "left",
  duration = 1,
  delay = 0,
  once = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const getVariants = () => {
    switch (variant) {
      case "wipe":
        const wipeDirections = {
          left: { hidden: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)" } },
          right: { hidden: { clipPath: "inset(0 0 0 100%)" }, visible: { clipPath: "inset(0 0 0 0%)" } },
          up: { hidden: { clipPath: "inset(100% 0 0 0)" }, visible: { clipPath: "inset(0% 0 0 0)" } },
          down: { hidden: { clipPath: "inset(0 0 100% 0)" }, visible: { clipPath: "inset(0 0 0% 0)" } },
        };
        return wipeDirections[direction];

      case "blinds":
        return {
          hidden: { clipPath: "inset(0 0 0 0)" },
          visible: { clipPath: "inset(0 0 0 0)" },
        };

      case "curtain":
        return {
          hidden: { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
          visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        };

      case "zoom":
        return {
          hidden: { scale: 1.5, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };

      case "split":
        return {
          hidden: { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
          visible: { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" },
        };

      case "diagonal":
        return {
          hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        };

      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  // Blinds special case with multiple elements
  if (variant === "blinds") {
    const blindCount = 5;
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex">
          {Array.from({ length: blindCount }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-black"
              initial={{ scaleY: 1 }}
              animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{
                duration: duration / 2,
                delay: delay + i * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ transformOrigin: direction === "up" ? "bottom" : "top" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
        transition={{
          duration,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
}

// =============================================================================
// Parallax Image - Image with parallax scrolling effect
// =============================================================================

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.5,
  scale = 1.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          y,
          scale,
        }}
      />
    </div>
  );
}

// =============================================================================
// Video Reveal - Video that reveals on scroll
// =============================================================================

interface VideoRevealProps {
  src: string;
  className?: string;
  poster?: string;
  variant?: "fade" | "scale" | "wipe" | "mask";
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playOnView?: boolean;
}

export function VideoReveal({
  src,
  className,
  poster,
  variant = "fade",
  autoPlay = true,
  loop = true,
  muted = true,
  playOnView = true,
}: VideoRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    if (playOnView && videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, playOnView]);

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
    wipe: {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: { clipPath: "inset(0 0% 0 0)" },
    },
    mask: {
      hidden: { clipPath: "circle(0% at 50% 50%)" },
      visible: { clipPath: "circle(100% at 50% 50%)" },
    },
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        autoPlay={autoPlay && !playOnView}
        loop={loop}
        muted={muted}
        playsInline
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants[variant]}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </div>
  );
}

// =============================================================================
// Image Comparison Slider - Before/After comparison
// =============================================================================

interface ImageComparisonProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  initialPosition?: number;
}

export function ImageComparison({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
  initialPosition = 50,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-ew-resize select-none", className)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After image (background) */}
      <img src={afterSrc} alt={afterAlt} className="w-full h-full object-cover" />

      {/* Before image (foreground with clip) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeAlt} className="w-full h-full object-cover" />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 text-white text-sm rounded">
        {beforeAlt}
      </div>
      <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-sm rounded">
        {afterAlt}
      </div>
    </div>
  );
}

// =============================================================================
// Image Hover Reveal - Reveals another image on hover
// =============================================================================

interface ImageHoverRevealProps {
  src: string;
  hoverSrc: string;
  alt: string;
  className?: string;
  transition?: "fade" | "slide" | "zoom" | "flip";
}

export function ImageHoverReveal({
  src,
  hoverSrc,
  alt,
  className,
  transition = "fade",
}: ImageHoverRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariants = () => {
    switch (transition) {
      case "slide":
        return {
          initial: { x: "-100%" },
          hover: { x: "0%" },
        };
      case "zoom":
        return {
          initial: { scale: 0, opacity: 0 },
          hover: { scale: 1, opacity: 1 },
        };
      case "flip":
        return {
          initial: { rotateY: 180, opacity: 0 },
          hover: { rotateY: 0, opacity: 1 },
        };
      default:
        return {
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        };
    }
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={transition === "flip" ? { perspective: "1000px" } : undefined}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      <motion.img
        src={hoverSrc}
        alt={`${alt} hover`}
        className="absolute inset-0 w-full h-full object-cover"
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        variants={getVariants()}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

// =============================================================================
// Media Gallery with Lightbox
// =============================================================================

interface MediaItem {
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  alt?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  className?: string;
  columns?: number;
  gap?: number;
}

export function MediaGallery({
  items,
  className,
  columns = 3,
  gap = 4,
}: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn("grid", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap * 4}px`,
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-lg aspect-square"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedIndex(index)}
          >
            {item.type === "image" ? (
              <img
                src={item.thumbnail || item.src}
                alt={item.alt || ""}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.src}
                poster={item.thumbnail}
                className="w-full h-full object-cover"
                muted
              />
            )}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
              {item.type === "video" && (
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="ml-1">▶</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {items[selectedIndex].type === "image" ? (
                <img
                  src={items[selectedIndex].src}
                  alt={items[selectedIndex].alt || ""}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={items[selectedIndex].src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[90vh] rounded-lg"
                />
              )}

              {/* Navigation */}
              {selectedIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(selectedIndex - 1);
                  }}
                >
                  ←
                </button>
              )}
              {selectedIndex < items.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(selectedIndex + 1);
                  }}
                >
                  →
                </button>
              )}

              {/* Close button */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl"
                onClick={() => setSelectedIndex(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// =============================================================================
// Scroll Video - Video that scrubs based on scroll position
// =============================================================================

interface ScrollVideoProps {
  src: string;
  className?: string;
}

export function ScrollVideo({
  src,
  className,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (video.duration) {
        video.currentTime = video.duration * progress;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

// =============================================================================
// Ken Burns Effect - Slow zoom/pan on images
// =============================================================================

interface KenBurnsImageProps {
  src: string;
  alt: string;
  className?: string;
  duration?: number;
  direction?: "in" | "out" | "left" | "right";
}

export function KenBurnsImage({
  src,
  alt,
  className,
  duration = 20,
  direction = "in",
}: KenBurnsImageProps) {
  const getAnimation = () => {
    switch (direction) {
      case "in":
        return { scale: [1, 1.2] };
      case "out":
        return { scale: [1.2, 1] };
      case "left":
        return { x: ["0%", "-5%"], scale: [1, 1.1] };
      case "right":
        return { x: ["-5%", "0%"], scale: [1.1, 1] };
      default:
        return { scale: [1, 1.2] };
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={getAnimation()}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    </div>
  );
}

// =============================================================================
// Image Distortion on Hover
// =============================================================================

interface DistortionImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

export function DistortionImage({
  src,
  alt,
  className,
  intensity = 20,
}: DistortionImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * intensity;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.1 : 1,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
}
