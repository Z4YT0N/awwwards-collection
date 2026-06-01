import code from '@content/Backgrounds/ColorBends/ColorBends.jsx?raw';
import css from '@content/Backgrounds/ColorBends/ColorBends.css?raw';
import tailwind from '@tailwind/Backgrounds/ColorBends/ColorBends.jsx?raw';
import tsCode from '@ts-default/Backgrounds/ColorBends/ColorBends.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/ColorBends/ColorBends.tsx?raw';

export const colorBends = {
  dependencies: `three`,
  usage: `import ColorBends from './ColorBends';
  
<ColorBends
  colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
  rotation={90}
  speed={0.2}
  scale={1}
  frequency={1}
  warpStrength={1}
  mouseInfluence={1}
  noise={0.15}
  parallax={0.5}
  iterations={1}
  intensity={1.5}
  bandWidth={6}
  transparent
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
