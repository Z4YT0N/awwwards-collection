import code from '@content/Animations/ShapeBlur/ShapeBlur.jsx?raw';
import tailwind from '@tailwind/Animations/ShapeBlur/ShapeBlur.jsx?raw';
import tsCode from '@ts-default/Animations/ShapeBlur/ShapeBlur.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/ShapeBlur/ShapeBlur.tsx?raw';

export const shapeBlur = {
  dependencies: `three`,
  usage: `import ShapeBlur from './ShapeBlur';

<div style={{position: 'relative', height: '500px', overflow: 'hidden'}}>
  <ShapeBlur
    variation={0}
    pixelRatioProp={window.devicePixelRatio || 1}
    shapeSize={0.5}
    roundness={0.5}
    borderSize={0.05}
    circleSize={0.5}
    circleEdge={1}
  />
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
