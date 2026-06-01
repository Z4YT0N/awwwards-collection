"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

import { useIsSafari } from "@/lib/useIsSafari";

gsap.registerPlugin(useGSAP);

export function WavyPaths() {
  const isSafari = useIsSafari(true);

  const root = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!root.current) return;

    const paths = root.current.querySelectorAll(".wavy-path");
    gsap.set(paths, {
      strokeDasharray: "200, 1700",
      strokeDashoffset: 200,
    });

    gsap.to(paths, {
      strokeDashoffset: 2200,
      duration: 2,
      repeat: -1,
      stagger: { each: 1, from: "random" },
      ease: "none",
    });
  });

  return (
    <svg
      ref={root}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1242 308"
      width={1242}
      height={308}
      className={clsx(
        "pointer-events-none text-zinc-600",
        !isSafari && "animate-squiggle"
      )}
    >
      <path
        stroke="currentColor"
        className="wavy-path"
        strokeLinecap="round"
        strokeWidth="15"
        d="M21 146c61-33 128-73 200-54 67 18 133 90 200 132s133 54 200 18S754 122 821 74s133-60 200-54c69 7 135 31 200 54"
      />
      <path
        stroke="currentColor"
        className="wavy-path"
        strokeLinecap="round"
        strokeWidth="15"
        d="M21 115c58 43 124 97 200 90 67-6 133-66 200-102s133-48 200-42 133 30 200 72 133 102 200 126 133 12 167 6l33-6"
      />
      <path
        stroke="currentColor"
        className="wavy-path"
        strokeLinecap="round"
        strokeWidth="15"
        d="M21 71c50 52 100 116 171 138 120 37 222-91 343-66 57 12 115 60 172 90s114 42 171 18 114-84 172-114c54-28 112-30 171-30"
      />
      <path
        stroke="currentColor"
        className="wavy-path"
        strokeLinecap="round"
        strokeWidth="15"
        d="M21 289c50-52 100-116 171-138 120-37 222 91 343 66 57-12 115-60 172-90s114-42 171-18 114 84 172 114c54 28 112 30 171 30"
      />
      <path
        stroke="currentColor"
        className="wavy-path"
        strokeLinecap="round"
        strokeWidth="15"
        d="M21 94c56-23 112-48 171-60 58-12 115-12 172 30s114 126 171 144 115-30 172-66 114-60 171-66 114 6 172 18l171 36"
      />
      <path
        stroke="currentColor"
        className="wavy-path"
        strokeLinecap="round"
        strokeWidth="15"
        d="M21 207c56 23 112 47 171 60 58 12 115 12 172-30S478 111 535 93s115 30 172 66 114 60 171 66 114-6 172-18l171-36"
      />
    </svg>
  );
}
