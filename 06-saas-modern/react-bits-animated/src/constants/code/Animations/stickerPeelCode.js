import code from '@content/Animations/StickerPeel/StickerPeel.jsx?raw';
import css from '@content/Animations/StickerPeel/StickerPeel.css?raw';
import tailwind from '@tailwind/Animations/StickerPeel/StickerPeel.jsx?raw';
import tsCode from '@ts-default/Animations/StickerPeel/StickerPeel.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/StickerPeel/StickerPeel.tsx?raw';

export const stickerPeel = {
  installation: 'npm install gsap',
  usage: `import StickerPeel from './StickerPeel'
import logo from './assets/sticker.png'
  
<StickerPeel
  imageSrc={logo}
  width={200}
  rotate={30}
  peelBackHoverPct={20}
  peelBackActivePct={40}
  shadowIntensity={0.6}
  lightingIntensity={0.1}
  initialPosition={{ x: -100, y: 100 }}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
