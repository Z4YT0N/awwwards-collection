import { SVGProps } from "react";

export function HorizontalLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 266 8"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        d="M.74 5.43c16.62-3.7 7.17-2.5 43.93-.8 17.36.79 15.14-2.9 24.1-2.63 1.21.04 5.55 1.98 7.47 2.14 5.24.42 8.17-.7 13.42-.44 3 .14 5.77 2.11 8.77 2.1 8.33-.04 16.56-2.19 24.89-2.25 10.32-.07 23.74 1.66 34.49 1.07 8.49-.46 17.47-1.77 25.92-2.65 11.98-1.24 18.38 2.3 30.24 3.88 12.82 1.7 5.26-2.3 21.35-2.14 10.15.1 19.92 1.14 29.88 1.7"
      />
    </svg>
  );
}

export function VerticalLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 555"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        d="M4.42.73c-2.26 26.23.02-6.6 1.2 43.35.23 9.32-2.18 7.94-4.04 16.35a14.65 14.65 0 0 0 0 4.97c.97 7.34 3.34 14.33 3.57 21.8.25 8.41-2.29 16.65-2.16 25.08.34 22.7 4.9 14.96 2.83 34.25-.46 4.36-2.72 8.16-2.83 12.58-.25 10.5 1.83 20.9 1.79 31.4-.03 6.97-2.06 19.04-1.99 20.68.91 19.67 3.03 4.4 2.43 33.04-.84 39.25-3.08 33.75-2.85 51.02.13 9.92 2.04 19.65 2.3 29.56.18 7.18-1.19 14.32-.97 21.5.14 4.5 2.23 8.7 2.04 13.2-1.4 33.36-4.96 13.26-3.6 36.05 2.3 38.96 3.25 77.61.48 116.44-.24 3.35.3 7.14 1.08 11.1 2.16 10.89 2.16 23.87.92 31.24"
      />
    </svg>
  );
}
