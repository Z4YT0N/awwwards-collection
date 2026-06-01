"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
  speed?: number;
  connected?: boolean;
  connectionDistance?: number;
}

export function Particles({
  className,
  quantity = 50,
  color = "#ffffff",
  size = 2,
  speed = 0.5,
  connected = false,
  connectionDistance = 100,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < quantity; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * size + 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Draw connections
        if (connected) {
          particles.slice(i + 1).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = color;
              ctx.globalAlpha = 1 - distance / connectionDistance;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [quantity, color, size, speed, connected, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    />
  );
}

// Sparkles component
interface SparklesProps {
  className?: string;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  speed?: number;
}

export function Sparkles({
  className,
  particleColor = "#FFF",
  minSize = 1,
  maxSize = 3,
  particleDensity = 100,
  speed = 1,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sparkles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeDirection: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createSparkles = () => {
      sparkles = [];
      for (let i = 0; i < particleDensity; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random(),
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const drawSparkles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((sparkle) => {
        // Update opacity (twinkle effect)
        sparkle.opacity += sparkle.fadeDirection * 0.02 * speed;
        if (sparkle.opacity >= 1 || sparkle.opacity <= 0) {
          sparkle.fadeDirection *= -1;
        }

        // Draw sparkle
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, sparkle.opacity));
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawSparkles);
    };

    resize();
    createSparkles();
    drawSparkles();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [particleColor, minSize, maxSize, particleDensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none w-full h-full", className)}
    />
  );
}
