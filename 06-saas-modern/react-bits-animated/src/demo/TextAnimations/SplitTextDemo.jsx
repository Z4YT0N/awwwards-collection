import { useMemo } from 'react';
import { toast } from 'sonner';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import Dependencies from '../../components/code/Dependencies';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import { splitText } from '../../constants/code/TextAnimations/splitTextCode';
import SplitText from '../../content/TextAnimations/SplitText/SplitText';

// Default prop values for this component
const DEFAULT_PROPS = {
  text: 'Hello, you!',
  delay: 50,
  duration: 1.25,
  ease: 'power3.out',
  splitType: 'chars',
  showCallback: true
};

const SplitTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { delay, duration, ease, splitType, showCallback } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'tag',
        type: 'string',
        default: '"p"',
        description: 'HTML tag to render: "h1", "h2", "h3", "h4", "h5", "h6", "p",'
      },
      { name: 'text', type: 'string', default: '""', description: 'The text content to animate.' },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional class names to style the component.'
      },
      {
        name: 'delay',
        type: 'number',
        default: '50',
        description: 'Delay between animations for each letter (in ms).'
      },
      {
        name: 'duration',
        type: 'number',
        default: '1.25',
        description: 'Duration of each letter animation (in seconds).'
      },
      { name: 'ease', type: 'string', default: '"power3.out"', description: 'GSAP easing function for the animation.' },
      {
        name: 'splitType',
        type: 'string',
        default: '"chars"',
        description: 'Split type: "chars", "words", "lines", or "words, chars".'
      },
      {
        name: 'from',
        type: 'object',
        default: '{ opacity: 0, y: 40 }',
        description: 'Initial GSAP properties for each letter/word.'
      },
      {
        name: 'to',
        type: 'object',
        default: '{ opacity: 1, y: 0 }',
        description: 'Target GSAP properties for each letter/word.'
      },
      {
        name: 'threshold',
        type: 'number',
        default: '0.1',
        description: 'Intersection threshold to trigger the animation (0-1).'
      },
      { name: 'rootMargin', type: 'string', default: '"-100px"', description: 'Root margin for the ScrollTrigger.' },
      {
        name: 'textAlign',
        type: 'string',
        default: '"center"',
        description: "Text alignment: 'left', 'center', 'right', etc."
      },
      {
        name: 'onLetterAnimationComplete',
        type: 'function',
        default: 'undefined',
        description: 'Callback function when all animations complete.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400} overflow="hidden">
            <RefreshButton onClick={forceRerender} />
            <SplitText
              key={key}
              text={props.text}
              delay={delay}
              duration={duration}
              ease={ease}
              splitType={splitType}
              className="split-text-demo"
              onLetterAnimationComplete={showCallback ? () => toast('✅ Animation Finished!') : undefined}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Split Type"
              options={[
                { value: 'chars', label: 'Chars' },
                { value: 'words', label: 'Words' },
                { value: 'lines', label: 'Lines' }
              ]}
              value={splitType}
              onChange={val => {
                updateProp('splitType', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Ease"
              options={[
                { value: 'power3.out', label: 'power3.out' },
                { value: 'bounce.out', label: 'bounce.out' },
                { value: 'elastic.out(1, 0.3)', label: 'elastic.out' }
              ]}
              value={ease}
              onChange={val => {
                updateProp('ease', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Stagger Delay (ms)"
              min={10}
              max={500}
              step={10}
              value={delay}
              onChange={val => {
                updateProp('delay', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Duration (s)"
              min={0.1}
              max={2}
              step={0.1}
              value={duration}
              onChange={val => {
                updateProp('duration', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Show Completion Toast"
              isChecked={showCallback}
              onChange={checked => {
                updateProp('showCallback', checked);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap', '@gsap/react']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={splitText} componentName="SplitText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SplitTextDemo;
