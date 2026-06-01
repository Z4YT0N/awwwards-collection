import code from '@content/Backgrounds/DotGrid/DotGrid.jsx?raw';
import css from '@content/Backgrounds/DotGrid/DotGrid.css?raw';
import tailwind from '@tailwind/Backgrounds/DotGrid/DotGrid.jsx?raw';
import tsCode from '@ts-default/Backgrounds/DotGrid/DotGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/DotGrid/DotGrid.tsx?raw';

export const dotGrid = {
  dependencies: `gsap`,
  usage: `import DotGrid from './DotGrid';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <DotGrid
    dotSize={10}
    gap={15}
    baseColor="#5227FF"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
