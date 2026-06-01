/**
 * 这个 SVG 没有宽高，只有 defs 元素，用于在 DOM 中绘制波浪线然后索引，
 * 这样页面上任何元素都可以引用而不必重复添加
 *
 */

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
            >
            </feTurbulence>
            <feDisplacementMap
              id="displacement"
              in2="noise"
              in="SourceGraphic"
              scale="4"
            >
            </feDisplacementMap>
          </filter>
        ))}
      </defs>
    </svg>
  )
}
