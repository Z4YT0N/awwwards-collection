import code from '@content/Backgrounds/Beams/Beams.jsx?raw';
import css from '@content/Backgrounds/Beams/Beams.css?raw';
import tailwind from '@tailwind/Backgrounds/Beams/Beams.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Beams/Beams.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Beams/Beams.tsx?raw';

export const beams = {
  dependencies: `three @react-three/fiber @react-three/drei`,
  usage: `import Beams from './Beams';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Beams
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
