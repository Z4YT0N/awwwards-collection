// Fun fact: this is the first component ever made for React Bits!
import code from '@content/TextAnimations/SplitText/SplitText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/SplitText/SplitText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SplitText/SplitText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SplitText/SplitText.tsx?raw';

export const splitText = {
  dependencies: 'gsap @gsap/react',
  usage: `import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

<SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
};
