import code from '@content/Backgrounds/EvilEye/EvilEye.jsx?raw';
import css from '@content/Backgrounds/EvilEye/EvilEye.css?raw';
import tailwind from '@tailwind/Backgrounds/EvilEye/EvilEye.jsx?raw';
import tsCode from '@ts-default/Backgrounds/EvilEye/EvilEye.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/EvilEye/EvilEye.tsx?raw';

export const evilEye = {
  dependencies: `ogl`,
  usage: `import EvilEye from './EvilEye';

<EvilEye
  eyeColor="#FF6F37"
  intensity={1.5}
  pupilSize={0.6}
  irisWidth={0.25}
  glowIntensity={0.35}
  scale={0.8}
  noiseScale={1.0}
  pupilFollow={1.0}
  flameSpeed={1.0}
  backgroundColor="#000000"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
