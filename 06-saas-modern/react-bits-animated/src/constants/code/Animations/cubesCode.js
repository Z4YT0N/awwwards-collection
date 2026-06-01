import code from '@content/Animations/Cubes/Cubes.jsx?raw';
import css from '@content/Animations/Cubes/Cubes.css?raw';
import tailwind from '@tailwind/Animations/Cubes/Cubes.jsx?raw';
import tsCode from '@ts-default/Animations/Cubes/Cubes.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/Cubes/Cubes.tsx?raw';

export const cubes = {
  dependencies: `gsap`,
  usage: `// CREDIT
// Component inspired from Can Tastemel's original work for the lambda.ai landing page
// https://cantastemel.com
  
import Cubes from './Cubes'

<div style={{ height: '600px', position: 'relative' }}>
  <Cubes 
    gridSize={8}
    maxAngle={60}
    radius={4}
    borderStyle="2px dashed #5227FF"
    faceColor="#1a1a2e"
    rippleColor="#ff6b6b"
    rippleSpeed={1.5}
    autoAnimate={true}
    rippleOnClick={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
