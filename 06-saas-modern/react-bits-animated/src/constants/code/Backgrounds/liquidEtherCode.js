import code from '@content/Backgrounds/LiquidEther/LiquidEther.jsx?raw';
import css from '@content/Backgrounds/LiquidEther/LiquidEther.css?raw';
import tailwind from '@tailwind/Backgrounds/LiquidEther/LiquidEther.jsx?raw';
import tsCode from '@ts-default/Backgrounds/LiquidEther/LiquidEther.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/LiquidEther/LiquidEther.tsx?raw';

export const liquidEther = {
  dependencies: `three`,
  usage: `import LiquidEther from './LiquidEther';

<div style={{ width: '100%', height: 600, position: 'relative' }}>
  <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B497CF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
