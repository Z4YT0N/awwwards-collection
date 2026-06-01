import code from '@content/TextAnimations/CountUp/CountUp.jsx?raw';
import tailwind from '@tailwind/TextAnimations/CountUp/CountUp.jsx?raw';
import tsCode from '@ts-default/TextAnimations/CountUp/CountUp.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/CountUp/CountUp.tsx?raw';

export const countup = {
  dependencies: `motion`,
  usage: `import CountUp from './CountUp'

<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
