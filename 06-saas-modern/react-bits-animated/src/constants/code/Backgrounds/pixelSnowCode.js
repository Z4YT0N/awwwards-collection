import code from '@content/Backgrounds/PixelSnow/PixelSnow.jsx?raw';
import css from '@content/Backgrounds/PixelSnow/PixelSnow.css?raw';
import tailwind from '@tailwind/Backgrounds/PixelSnow/PixelSnow.jsx?raw';
import tsCode from '@ts-default/Backgrounds/PixelSnow/PixelSnow.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/PixelSnow/PixelSnow.tsx?raw';

export const pixelSnow = {
  dependencies: `three`,
  usage: `import PixelSnow from './PixelSnow';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PixelSnow 
    color="#ffffff"
    flakeSize={0.01}
    minFlakeSize={1.25}
    pixelResolution={200}
    speed={1.25}
    density={0.3}
    direction={125}
    brightness={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
