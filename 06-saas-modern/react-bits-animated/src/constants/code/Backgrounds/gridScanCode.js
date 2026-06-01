import code from '@content/Backgrounds/GridScan/GridScan.jsx?raw';
import css from '@content/Backgrounds/GridScan/GridScan.css?raw';
import tailwind from '@tailwind/Backgrounds/GridScan/GridScan.jsx?raw';
import tsCode from '@ts-default/Backgrounds/GridScan/GridScan.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/GridScan/GridScan.tsx?raw';

export const gridScan = {
  dependencies: `three face-api.js`,
  usage: `import GridScan from './GridScan';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GridScan
    sensitivity={0.55}
    lineThickness={1}
    linesColor="#2F293A"
    gridScale={0.1}
    scanColor="#FF9FFC"
    scanOpacity={0.4}
    enablePost
    bloomIntensity={0.6}
    chromaticAberration={0.002}
    noiseIntensity={0.01}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
