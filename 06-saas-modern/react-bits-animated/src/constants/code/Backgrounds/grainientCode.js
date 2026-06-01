import code from '@content/Backgrounds/Grainient/Grainient.jsx?raw';
import css from '@content/Backgrounds/Grainient/Grainient.css?raw';
import tailwind from '@tailwind/Backgrounds/Grainient/Grainient.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Grainient/Grainient.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Grainient/Grainient.tsx?raw';

export const grainient = {
  dependencies: `ogl`,
  usage: `import Grainient from './Grainient';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Grainient
    color1="#FF9FFC"
    color2="#5227FF"
    color3="#B497CF"
    timeSpeed={0.25}
    colorBalance={0.0}
    warpStrength={1.0}
    warpFrequency={5.0}
    warpSpeed={2.0}
    warpAmplitude={50.0}
    blendAngle={0.0}
    blendSoftness={0.05}
    rotationAmount={500.0}
    noiseScale={2.0}
    grainAmount={0.1}
    grainScale={2.0}
    grainAnimated={false}
    contrast={1.5}
    gamma={1.0}
    saturation={1.0}
    centerX={0.0}
    centerY={0.0}
    zoom={0.9}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
