import code from '@content/Components/Stack/Stack.jsx?raw';
import css from '@content/Components/Stack/Stack.css?raw';
import tailwind from '@tailwind/Components/Stack/Stack.jsx?raw';
import tsCode from '@ts-default/Components/Stack/Stack.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/Stack/Stack.tsx?raw';

export const stack = {
  dependencies: `motion`,
  usage: `import Stack from './Stack'

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
];

<div style={{ width: 208, height: 208 }}>
  <Stack
    randomRotation={true}
    sensitivity={180}
    sendToBackOnClick={true}
    cards={images.map((src, i) => (
      <img 
        key={i} 
        src={src} 
        alt={\`card-\${i + 1}\`} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    ))}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
