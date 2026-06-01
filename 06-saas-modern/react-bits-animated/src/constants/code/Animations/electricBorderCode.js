import code from '@content/Animations/ElectricBorder/ElectricBorder.jsx?raw';
import css from '@content/Animations/ElectricBorder/ElectricBorder.css?raw';
import tailwind from '@tailwind/Animations/ElectricBorder/ElectricBorder.jsx?raw';
import tsCode from '@ts-default/Animations/ElectricBorder/ElectricBorder.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/ElectricBorder/ElectricBorder.tsx?raw';

export const electricBorder = {
  usage: `// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN
  
import ElectricBorder from './ElectricBorder'

<ElectricBorder
  color="#7df9ff"
  speed={1}
  chaos={0.5}
  thickness={2}
  style={{ borderRadius: 16 }}
>
  <div>
    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
      A glowing, animated border wrapper.
    </p>
  </div>
</ElectricBorder>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
