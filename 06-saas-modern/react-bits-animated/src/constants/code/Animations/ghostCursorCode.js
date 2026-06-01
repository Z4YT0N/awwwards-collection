import code from '@content/Animations/GhostCursor/GhostCursor.jsx?raw';
import css from '@content/Animations/GhostCursor/GhostCursor.css?raw';
import tailwind from '@tailwind/Animations/GhostCursor/GhostCursor.jsx?raw';
import tsCode from '@ts-default/Animations/GhostCursor/GhostCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GhostCursor/GhostCursor.tsx?raw';

export const ghostCursor = {
  dependencies: `three`,
  usage: `import GhostCursor from './GhostCursor'

<div style={{ height: 600, position: 'relative' }}>
  <GhostCursor
    // Visuals
    color="#B497CF"
    brightness={1}
    edgeIntensity={0}

    // Trail and motion
    trailLength={50}
    inertia={0.5}

    // Post-processing
    grainIntensity={0.05}
    bloomStrength={0.1}
    bloomRadius={1.0}
    bloomThreshold={0.025}

    // Fade-out behavior
    fadeDelayMs={1000}
    fadeDurationMs={1500}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
