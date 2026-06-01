import code from '@content/Components/CardSwap/CardSwap.jsx?raw';
import css from '@content/Components/CardSwap/CardSwap.css?raw';
import tailwind from '@tailwind/Components/CardSwap/CardSwap.jsx?raw';
import tsCode from '@ts-default/Components/CardSwap/CardSwap.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/CardSwap/CardSwap.tsx?raw';

export const cardSwap = {
  dependencies: `gsap`,
  usage: `import CardSwap, { Card } from './CardSwap'

<div style={{ height: '600px', position: 'relative' }}>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={5000}
    pauseOnHover={false}
  >
    <Card>
      <h3>Card 1</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 2</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 3</h3>
      <p>Your content here</p>
    </Card>
  </CardSwap>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
