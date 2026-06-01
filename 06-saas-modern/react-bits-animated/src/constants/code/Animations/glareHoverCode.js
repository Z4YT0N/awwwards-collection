import code from '@content/Animations/GlareHover/GlareHover.jsx?raw';
import css from '@content/Animations/GlareHover/GlareHover.css?raw';
import tailwind from '@tailwind/Animations/GlareHover/GlareHover.jsx?raw';
import tsCode from '@ts-default/Animations/GlareHover/GlareHover.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GlareHover/GlareHover.tsx?raw';

export const glareHover = {
  usage: `import GlareHover from './GlareHover'

<div style={{ height: '600px', position: 'relative' }}>
  <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
  >
    <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#333', margin: 0 }}>
      Hover Me
    </h2>
  </GlareHover>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
