import { SVGProps } from "react";

export function Scribble({ color, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 166 306"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        className="origin-center opacity-60 transition-[stroke-dashoffset] duration-500 ease-in [stroke-dasharray:1700] [stroke-dashoffset:1700] group-hover:[stroke-dashoffset:0]"
        filter="url(#scribble)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        d="M126 8c-10 10-26 17-41 22-24 9-50 14-74 23a152 152 0 0 0 24 3l50 1c5 0 17 0 20 4 3 3-13 6-15 6a689 689 0 0 0-45 12c1 2 7 2 9 2 11 2 22 1 33 1l48-2 17 1c2 0-2 2-3 2l-8 2-60 11-32 7c-5 1-12 2-16 5-2 1 8 3 9 4 13 2 27 2 39 2 14 0 29-2 43 0 3 1 7 1 3 3-7 3-15 4-23 6l-41 7c-10 2-22 5-31 9-2 2-1 2 1 3l23 2c22 1 43 0 64 3 4 0 4 1 1 2l-20 7c-11 3-22 5-32 9l-14 6c-3 4 32 7 35 7 20 1 43 0 62 6 1 1 5 2 4 3-3 3-9 4-12 5-28 7-57 9-85 15l-30 7-9 3h1l13 1 53-1c15-1 31-1 47 1 10 1-2 4-6 5-14 4-29 5-44 8l-39 7c-2 1-22 5-22 7 0 3 58 4 65 5 6 0 17 0 23 3 1 1-4 3-4 3-16 6-36 7-52 10l-13 3a227 227 0 0 0 49 4c20 0 41 7 62 7"
      />
      <filter id="scribble">
        <feTurbulence
          baseFrequency="0.05"
          id="turbulence"
          numOctaves="2"
          result="noise"
          seed="0"
        />
        <feDisplacementMap
          id="displacement"
          in2="noise"
          in="SourceGraphic"
          scale="5"
        />
      </filter>
    </svg>
  );
}
