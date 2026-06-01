import code from '@content/Animations/BlobCursor/BlobCursor.jsx?raw';
import css from '@content/Animations/BlobCursor/BlobCursor.css?raw';
import tailwind from '@tailwind/Animations/BlobCursor/BlobCursor.jsx?raw';
import tsCode from '@ts-default/Animations/BlobCursor/BlobCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/BlobCursor/BlobCursor.tsx?raw';

export const blobCursor = {
  dependencies: `gsap`,
  usage: `import BlobCursor from './BlobCursor';

<BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
