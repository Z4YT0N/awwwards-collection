import code from '@content/Backgrounds/Galaxy/Galaxy.jsx?raw';
import css from '@content/Backgrounds/Galaxy/Galaxy.css?raw';
import tailwind from '@tailwind/Backgrounds/Galaxy/Galaxy.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Galaxy/Galaxy.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Galaxy/Galaxy.tsx?raw';

export const galaxy = {
  dependencies: `ogl`,
  usage: `import Galaxy from './Galaxy';

// Basic usage
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Galaxy />
</div>

// With custom prop values
<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Galaxy 
    mouseRepulsion={true}
    mouseInteraction={true}
    density={1.5}
    glowIntensity={0.5}
    saturation={0.8}
    hueShift={240}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
