import code from '@content/Backgrounds/PixelBlast/PixelBlast.jsx?raw';
import css from '@content/Backgrounds/PixelBlast/PixelBlast.css?raw';
import tailwind from '@tailwind/Backgrounds/PixelBlast/PixelBlast.jsx?raw';
import tsCode from '@ts-default/Backgrounds/PixelBlast/PixelBlast.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/PixelBlast/PixelBlast.tsx?raw';

export const pixelBlast = {
  dependencies: `three postprocessing`,
  usage: `// Component inspired by github.com/zavalit/bayer-dithering-webgl-demo
  
import PixelBlast from './PixelBlast';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PixelBlast
    variant="circle"
    pixelSize={6}
    color="#B497CF"
    patternScale={3}
    patternDensity={1.2}
    pixelSizeJitter={0.5}
    enableRipples
    rippleSpeed={0.4}
    rippleThickness={0.12}
    rippleIntensityScale={1.5}
    liquid
    liquidStrength={0.12}
    liquidRadius={1.2}
    liquidWobbleSpeed={5}
    speed={0.6}
    edgeFade={0.25}
    transparent
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
