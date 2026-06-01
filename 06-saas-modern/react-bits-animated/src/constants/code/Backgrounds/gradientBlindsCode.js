import code from '@content/Backgrounds/GradientBlinds/GradientBlinds.jsx?raw';
import css from '@content/Backgrounds/GradientBlinds/GradientBlinds.css?raw';
import tailwind from '@tailwind/Backgrounds/GradientBlinds/GradientBlinds.jsx?raw';
import tsCode from '@ts-default/Backgrounds/GradientBlinds/GradientBlinds.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/GradientBlinds/GradientBlinds.tsx?raw';

export const gradientBlinds = {
  dependencies: `ogl`,
  usage: `import GradientBlinds from './GradientBlinds';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GradientBlinds
    gradientColors={['#FF9FFC', '#5227FF']}
    angle={0}
    noise={0.3}
    blindCount={12}
    blindMinWidth={50}
    spotlightRadius={0.5}
    spotlightSoftness={1}
    spotlightOpacity={1}
    mouseDampening={0.15}
    distortAmount={0}
    shineDirection="left"
    mixBlendMode="lighten"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
