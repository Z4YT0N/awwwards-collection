import code from '@content/Components/ChromaGrid/ChromaGrid.jsx?raw';
import css from '@content/Components/ChromaGrid/ChromaGrid.css?raw';
import tailwind from '@tailwind/Components/ChromaGrid/ChromaGrid.jsx?raw';
import tsCode from '@ts-default/Components/ChromaGrid/ChromaGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/ChromaGrid/ChromaGrid.tsx?raw';

export const chromaGrid = {
  dependencies: `gsap`,
  usage: `import ChromaGrid from './ChromaGrid'

const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <ChromaGrid 
    items={items}
    radius={300}
    damping={0.45}
    fadeOut={0.6}
    ease="power3.out"
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
