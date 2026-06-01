import code from '@content/Backgrounds/Plasma/Plasma.jsx?raw';
import css from '@content/Backgrounds/Plasma/Plasma.css?raw';
import tailwind from '@tailwind/Backgrounds/Plasma/Plasma.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Plasma/Plasma.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Plasma/Plasma.tsx?raw';

export const plasma = {
  dependencies: `ogl`,
  usage: `import Plasma from './Plasma';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Plasma 
    color="#ff6b35"
    speed={0.6}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
