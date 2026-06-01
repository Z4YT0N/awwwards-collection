"use client";

import { useRef, useEffect, useCallback, useId, ReactNode } from "react";
import { cn } from "@/lib/utils";

// =============================================================================
// MeshGradient — Stripe-style animated gradient using canvas + simplex noise
// =============================================================================

// Inline simplex noise (no external dependency)
function createNoise() {
  const perm = new Uint8Array(512);
  const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  ];
  const p = Array.from({ length: 256 }, () => Math.floor(Math.random() * 256));
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function dot(g: number[], x: number, y: number) {
    return g[0] * x + g[1] * y;
  }

  return function noise2D(xin: number, yin: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = perm[ii + perm[jj]] % 12;
    const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
    const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot(grad3[gi0], x0, y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot(grad3[gi1], x1, y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot(grad3[gi2], x2, y2); }
    return 70 * (n0 + n1 + n2);
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

interface MeshGradientProps {
  className?: string;
  /** Array of 3-5 hex colors */
  colors?: string[];
  /** Animation speed (lower = slower) */
  speed?: number;
  /** Noise scale (lower = smoother) */
  scale?: number;
  /** FBM octaves (more = more detail, slower) */
  octaves?: number;
}

export function MeshGradient({
  className,
  colors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"],
  speed = 0.0005,
  scale = 0.002,
  octaves = 4,
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef(createNoise());
  const rafRef = useRef<number>(0);

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const noise = noiseRef.current;
      const rgbColors = colors.map(hexToRgb);
      const t = time * speed;

      // Use low-res and scale up for performance
      const step = 4;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          // Fractal Brownian Motion
          let value = 0;
          let amplitude = 1;
          let frequency = 1;
          let maxAmp = 0;

          for (let o = 0; o < octaves; o++) {
            const nx = x * scale * frequency + t;
            const ny = y * scale * frequency + t * 0.7;
            value += noise(nx, ny) * amplitude;
            maxAmp += amplitude;
            amplitude *= 0.5;
            frequency *= 2;
          }

          value = (value / maxAmp + 1) * 0.5; // Normalize to 0-1

          // Sinusoidal warp for liquid feel
          const warpX = Math.sin(y * 0.003 + t * 2) * 0.1;
          const warpY = Math.cos(x * 0.002 + t * 1.5) * 0.1;
          const warped = Math.max(0, Math.min(1, value + warpX + warpY));

          // Map to color palette
          const colorPos = warped * (rgbColors.length - 1);
          const ci = Math.floor(colorPos);
          const cf = colorPos - ci;
          const c1 = rgbColors[Math.min(ci, rgbColors.length - 1)];
          const c2 = rgbColors[Math.min(ci + 1, rgbColors.length - 1)];

          const r = Math.round(c1[0] + (c2[0] - c1[0]) * cf);
          const g = Math.round(c1[1] + (c2[1] - c1[1]) * cf);
          const b = Math.round(c1[2] + (c2[2] - c1[2]) * cf);

          // Fill step x step block
          for (let dy = 0; dy < step && y + dy < h; dy++) {
            for (let dx = 0; dx < step && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    },
    [colors, speed, scale, octaves]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1); // Low res for performance
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr * 0.25; // Render at 1/4 res
      canvas.height = rect.height * dpr * 0.25;
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", updateSize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ imageRendering: "auto" }}
    />
  );
}

// =============================================================================
// DotPattern — SVG dot grid with radial gradient fade
// =============================================================================

interface DotPatternProps {
  className?: string;
  /** Dot radius */
  dotRadius?: number;
  /** Spacing between dots */
  spacing?: number;
  /** Dot color */
  color?: string;
  /** Dot opacity */
  dotOpacity?: number;
  /** Radial fade from center */
  radialFade?: boolean;
  /** Children rendered on top */
  children?: ReactNode;
}

export function DotPattern({
  className,
  dotRadius = 1,
  spacing = 20,
  color = "currentColor",
  dotOpacity = 0.3,
  radialFade = true,
  children,
}: DotPatternProps) {
  const patternId = useId().replace(/:/g, "");
  const maskId = `dot-mask-${patternId}`;

  return (
    <div className={cn("relative", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`dot-pattern-${patternId}`}
            x={0}
            y={0}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={dotRadius}
              fill={color}
              opacity={dotOpacity}
            />
          </pattern>
          {radialFade && (
            <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          )}
          {radialFade && (
            <mask id={`dot-mask-el-${patternId}`}>
              <rect width="100%" height="100%" fill={`url(#${maskId})`} />
            </mask>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#dot-pattern-${patternId})`}
          mask={radialFade ? `url(#dot-mask-el-${patternId})` : undefined}
        />
      </svg>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

// =============================================================================
// GridPattern — SVG/CSS grid lines with radial gradient fade (Vercel-style)
// =============================================================================

interface GridPatternProps {
  className?: string;
  /** Grid cell size */
  cellSize?: number;
  /** Line color */
  color?: string;
  /** Line opacity */
  lineOpacity?: number;
  /** Line width */
  lineWidth?: number;
  /** Radial fade from center */
  radialFade?: boolean;
  /** Children rendered on top */
  children?: ReactNode;
}

export function GridPattern({
  className,
  cellSize = 40,
  color = "currentColor",
  lineOpacity = 0.06,
  lineWidth = 1,
  radialFade = true,
  children,
}: GridPatternProps) {
  const patternId = useId().replace(/:/g, "");

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern
            id={`grid-${patternId}`}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={color}
              strokeWidth={lineWidth}
              strokeOpacity={lineOpacity}
            />
          </pattern>
          {radialFade && (
            <radialGradient id={`grid-fade-${patternId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="70%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          )}
          {radialFade && (
            <mask id={`grid-mask-${patternId}`}>
              <rect width="100%" height="100%" fill={`url(#grid-fade-${patternId})`} />
            </mask>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${patternId})`}
          mask={radialFade ? `url(#grid-mask-${patternId})` : undefined}
        />
      </svg>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

// =============================================================================
// FilmGrain — Canvas-based animated noise overlay for analog aesthetic
// =============================================================================

interface FilmGrainProps {
  className?: string;
  /** Grain intensity (0-1) */
  intensity?: number;
  /** Animation speed (fps, 0 = static) */
  fps?: number;
  /** Blend mode */
  blendMode?: string;
}

export function FilmGrain({
  className,
  intensity = 0.08,
  fps = 12,
  blendMode = "overlay",
}: FilmGrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = Math.ceil(canvas.offsetWidth * 0.5);
      canvas.height = Math.ceil(canvas.offsetHeight * 0.5);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    let lastFrame = 0;
    const interval = fps > 0 ? 1000 / fps : 0;

    const render = (time: number) => {
      if (fps > 0 && time - lastFrame < interval) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;

      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }

      ctx.putImageData(imgData, 0, 0);
      if (fps > 0) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", updateSize);
    };
  }, [fps]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      style={{
        opacity: intensity,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        imageRendering: "auto",
      }}
    />
  );
}
