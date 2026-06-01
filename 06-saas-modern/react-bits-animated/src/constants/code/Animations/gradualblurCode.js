import code from '@content/Animations/GradualBlur/GradualBlur.jsx?raw';
import tailwind from '@tailwind/Animations/GradualBlur/GradualBlur.jsx?raw';
import css from '@content/Animations/GradualBlur/GradualBlur.css?raw';
import tsCode from '@ts-default/Animations/GradualBlur/GradualBlur.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GradualBlur/GradualBlur.tsx?raw';

export const gradualBlur = {
  dependencies: `mathjs`,
  usage: `// Component added by Ansh - github.com/ansh-dhanani

import GradualBlur from './GradualBlur';

<section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>
    <!-- Content Here - such as an image or text -->
  </div>

  <GradualBlur
    target="parent"
    position="bottom"
    height="6rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential={true}
    opacity={1}
  />
</section>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
