export function SVGFilters() {
  return (
    <svg className="h-0 w-0">
      <defs>
        {Array.from({ length: 5 }).map((_, index) => (
          <filter id={`squiggle-${index}`} key={index}>
            <feTurbulence
              baseFrequency="0.05"
              id="turbulence"
              numOctaves="2"
              result="noise"
              seed={index}
            ></feTurbulence>
            <feDisplacementMap
              id="displacement"
              in2="noise"
              in="SourceGraphic"
              scale="4"
            ></feDisplacementMap>
          </filter>
        ))}
      </defs>
    </svg>
  );
}
