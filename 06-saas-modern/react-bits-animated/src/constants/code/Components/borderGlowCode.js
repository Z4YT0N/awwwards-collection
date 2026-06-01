import code from '@content/Components/BorderGlow/BorderGlow.jsx?raw';
import css from '@content/Components/BorderGlow/BorderGlow.css?raw';
import tailwind from '@tailwind/Components/BorderGlow/BorderGlow.jsx?raw';
import tsCode from '@ts-default/Components/BorderGlow/BorderGlow.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/BorderGlow/BorderGlow.tsx?raw';

export const borderGlow = {
  usage: `import BorderGlow from './BorderGlow';

<BorderGlow
  edgeSensitivity={30}
  glowColor="40 80 80"
  backgroundColor="#120F17"
  borderRadius={28}
  glowRadius={40}
  glowIntensity={1.0}
  coneSpread={25}
  animated={false}
  colors={['#c084fc', '#f472b6', '#38bdf8']}
>
  <div style={{ padding: '2em' }}>
    <h2>Your Content Here</h2>
    <p>Hover near the edges to see the glow.</p>
  </div>
</BorderGlow>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
