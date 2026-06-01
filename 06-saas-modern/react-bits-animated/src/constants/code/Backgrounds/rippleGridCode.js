import code from '@content/Backgrounds/RippleGrid/RippleGrid.jsx?raw';
import tailwind from '@tailwind/Backgrounds/RippleGrid/RippleGrid.jsx?raw';
import tsCode from '@ts-default/Backgrounds/RippleGrid/RippleGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/RippleGrid/RippleGrid.tsx?raw';

export const rippleGrid = {
  dependencies: `ogl`,
  usage: `import RippleGrid from './RippleGrid';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <RippleGrid
    enableRainbow={false}
    gridColor="#ffffff"
    rippleIntensity={0.05}
    gridSize={10}
    gridThickness={15}
    mouseInteraction={true}
    mouseInteractionRadius={1.2}
    opacity={0.8}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
