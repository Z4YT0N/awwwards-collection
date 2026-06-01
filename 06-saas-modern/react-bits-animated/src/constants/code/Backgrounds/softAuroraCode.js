import code from '@content/Backgrounds/SoftAurora/SoftAurora.jsx?raw';
import css from '@content/Backgrounds/SoftAurora/SoftAurora.css?raw';
import tailwind from '@tailwind/Backgrounds/SoftAurora/SoftAurora.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SoftAurora/SoftAurora.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SoftAurora/SoftAurora.tsx?raw';

export const softAurora = {
  dependencies: `ogl`,
  usage: `import SoftAurora from './SoftAurora';
  
<SoftAurora
  speed={0.6}
  scale={1.5}
  brightness={1.0}
  color1="#f7f7f7"
  color2="#e100ff"
  noiseFrequency={2.5}
  noiseAmplitude={1.0}
  bandHeight={0.5}
  bandSpread={1.0}
  octaveDecay={0.1}
  layerOffset={0}
  colorSpeed={1.0}
  enableMouseInteraction={true}
  mouseInfluence={0.25}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
