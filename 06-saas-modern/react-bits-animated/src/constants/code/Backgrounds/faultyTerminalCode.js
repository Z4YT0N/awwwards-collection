import code from '@content/Backgrounds/FaultyTerminal/FaultyTerminal.jsx?raw';
import css from '@content/Backgrounds/FaultyTerminal/FaultyTerminal.css?raw';
import tailwind from '@tailwind/Backgrounds/FaultyTerminal/FaultyTerminal.jsx?raw';
import tsCode from '@ts-default/Backgrounds/FaultyTerminal/FaultyTerminal.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/FaultyTerminal/FaultyTerminal.tsx?raw';

export const faultyTerminal = {
  dependencies: `ogl`,
  usage: `import FaultyTerminal from './FaultyTerminal';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FaultyTerminal
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={1}
    pause={false}
    scanlineIntensity={1}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0}
    tint="#ffffff"
    mouseReact={true}
    mouseStrength={0.5}
    pageLoadAnimation={false}
    brightness={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
