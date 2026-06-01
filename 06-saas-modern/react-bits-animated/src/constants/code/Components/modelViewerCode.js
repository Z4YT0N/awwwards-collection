import code from '@content/Components/ModelViewer/ModelViewer.jsx?raw';
import tailwind from '@tailwind/Components/ModelViewer/ModelViewer.jsx?raw';
import tsCode from '@ts-default/Components/ModelViewer/ModelViewer.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ModelViewer/ModelViewer.tsx?raw';

export const modelViewer = {
  dependencies: `three @react-three/fiber @react-three/drei`,
  usage: `import ModelViewer from './ModelViewer';

<ModelViewer
  url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
  width={400}
  height={400}
/>
`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
