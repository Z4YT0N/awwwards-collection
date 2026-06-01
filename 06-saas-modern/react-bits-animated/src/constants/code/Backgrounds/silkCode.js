import code from '@content/Backgrounds/Silk/Silk.jsx?raw';
import tailwind from '@tailwind/Backgrounds/Silk/Silk.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Silk/Silk.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Silk/Silk.tsx?raw';

export const silkCode = {
  installation: 'npm install three @react-three/fiber',
  usage: `import Silk from './Silk';

<Silk
  speed={5}
  scale={1}
  color="#7B7481"
  noiseIntensity={1.5}
  rotation={0}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
