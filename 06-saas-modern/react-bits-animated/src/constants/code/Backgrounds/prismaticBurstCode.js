import code from '@content/Backgrounds/PrismaticBurst/PrismaticBurst.jsx?raw';
import css from '@content/Backgrounds/PrismaticBurst/PrismaticBurst.css?raw';
import tailwind from '@tailwind/Backgrounds/PrismaticBurst/PrismaticBurst.jsx?raw';
import tsCode from '@ts-default/Backgrounds/PrismaticBurst/PrismaticBurst.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/PrismaticBurst/PrismaticBurst.tsx?raw';

export const prismaticBurst = {
  dependencies: `ogl`,
  usage: `import PrismaticBurst from './PrismaticBurst';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PrismaticBurst
    animationType="rotate3d"
    intensity={2}
    speed={0.5}
    distort={1.0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0.25}
    rayCount={24}
    mixBlendMode="lighten"
    colors={['#ff007a', '#4d3dff', '#ffffff']}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
