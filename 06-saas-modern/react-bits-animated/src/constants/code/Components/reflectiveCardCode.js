import code from '@content/Components/ReflectiveCard/ReflectiveCard.jsx?raw';
import css from '@content/Components/ReflectiveCard/ReflectiveCard.css?raw';
import tailwind from '@tailwind/Components/ReflectiveCard/ReflectiveCard.jsx?raw';
import tsCode from '@ts-default/Components/ReflectiveCard/ReflectiveCard.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ReflectiveCard/ReflectiveCard.tsx?raw';

export const reflectiveCard = {
  dependencies: `lucide-react`,
  usage: `import ReflectiveCard from './ReflectiveCard';

<div style={{ height: '600px', position: 'relative' }}>
  <ReflectiveCard
    overlayColor="rgba(0, 0, 0, 0.2)"
    blurStrength={10}
    glassDistortion={15}
    metalness={0.8}
    roughness={0.5}
    displacementStrength={25}
    noiseScale={1.5}
    specularConstant={2.0}
    grayscale={0.5}
    color="#ffffff"
  />
</div>
`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
