import code from '@content/TextAnimations/GlitchText/GlitchText.jsx?raw';
import css from '@content/TextAnimations/GlitchText/GlitchText.css?raw';
import tailwind from '@tailwind/TextAnimations/GlitchText/GlitchText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/GlitchText/GlitchText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/GlitchText/GlitchText.tsx?raw';

export const glitchText = {
  usage: `import GlitchText from './GlitchText';
  
<GlitchText
  speed={1}
  enableShadows={true}
  enableOnHover={true}
  className='custom-class'
>
  React Bits
</GlitchText>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
