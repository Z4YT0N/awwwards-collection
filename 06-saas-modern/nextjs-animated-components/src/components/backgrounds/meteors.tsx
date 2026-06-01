"use client";

import { cn, random } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      style: {
        top: `${random(-5, 30)}%`,
        left: `${random(0, 100)}%`,
        animationDelay: `${random(0, 5)}s`,
        animationDuration: `${random(2, 10)}s`,
      },
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2",
            "before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={meteor.style}
        />
      ))}
    </div>
  );
}

// Shooting stars variant
interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

export function ShootingStars({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}: ShootingStarsProps) {
  const [star, setStar] = useState<{
    id: number;
    x: number;
    y: number;
    angle: number;
    scale: number;
    speed: number;
    distance: number;
  } | null>(null);

  useEffect(() => {
    const createStar = () => {
      const newStar = {
        id: Date.now(),
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight / 3),
        angle: 45,
        scale: 1,
        speed: random(minSpeed, maxSpeed),
        distance: 0,
      };
      setStar(newStar);

      const moveStar = () => {
        setStar((prev) => {
          if (!prev) return null;
          const newDistance = prev.distance + prev.speed;
          if (newDistance > window.innerWidth) {
            return null;
          }
          return { ...prev, distance: newDistance };
        });
      };

      const moveInterval = setInterval(moveStar, 16);

      setTimeout(() => {
        clearInterval(moveInterval);
        setStar(null);
      }, random(minDelay, maxDelay));
    };

    const interval = setInterval(createStar, random(minDelay, maxDelay));
    createStar(); // Create first star immediately

    return () => clearInterval(interval);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  if (!star) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg
        className="absolute"
        style={{
          left: star.x + star.distance * Math.cos((star.angle * Math.PI) / 180),
          top: star.y + star.distance * Math.sin((star.angle * Math.PI) / 180),
          transform: `rotate(${star.angle}deg) scale(${star.scale})`,
        }}
        width={starWidth}
        height={starHeight}
        viewBox="0 0 10 1"
        fill="none"
      >
        <rect width="10" height="1" fill={`url(#gradient-${star.id})`} />
        <defs>
          <linearGradient
            id={`gradient-${star.id}`}
            x1="0"
            y1="0"
            x2="10"
            y2="0"
          >
            <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
            <stop offset="100%" stopColor={starColor} stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
