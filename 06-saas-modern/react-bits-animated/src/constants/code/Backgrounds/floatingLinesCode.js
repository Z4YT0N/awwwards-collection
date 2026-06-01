import code from '@content/Backgrounds/FloatingLines/FloatingLines.jsx?raw';
import css from '@content/Backgrounds/FloatingLines/FloatingLines.css?raw';
import tailwind from '@tailwind/Backgrounds/FloatingLines/FloatingLines.jsx?raw';
import tsCode from '@ts-default/Backgrounds/FloatingLines/FloatingLines.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/FloatingLines/FloatingLines.tsx?raw';

export const floatingLines = {
  dependencies: `three`,
  usage: `import FloatingLines from './FloatingLines';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <FloatingLines 
    enabledWaves={['top', 'middle', 'bottom']}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={[10, 15, 20]}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={[8, 6, 4]}
    bendRadius={5.0}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
