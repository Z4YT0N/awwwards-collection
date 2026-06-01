import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewInput from '../../components/common/Preview/PreviewInput';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { scrambledTextCode } from '../../constants/code/TextAnimations/scrambledTextCode';
import ScrambledText from '../../content/TextAnimations/ScrambledText/ScrambledText';

const DEFAULT_PROPS = {
  radius: 100,
  duration: 1.2,
  speed: 0.5,
  scrambleChars: '.:'
};

const ScrambledTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { radius, duration, speed, scrambleChars } = props;

  const propData = useMemo(
    () => [
      {
        name: 'radius',
        type: 'number',
        default: '100',
        description: 'The radius around the mouse pointer within which characters will scramble.'
      },
      {
        name: 'duration',
        type: 'number',
        default: '1.2',
        description: 'The duration of the scramble effect on a character.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.5',
        description: 'The speed of the scramble animation.'
      },
      {
        name: 'scrambleChars',
        type: 'string',
        default: "'.:'",
        description: 'The characters used for scrambling.'
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        default: '',
        description: 'The text content to be scrambled.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional CSS classes for the component.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '{}',
        description: 'Inline styles for the component.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <ScrambledText
              className="scrambled-text-demo"
              radius={radius}
              duration={duration}
              speed={speed}
              scrambleChars={scrambleChars}
            >
              Once you hover over me, you will see the effect in action! You can customize the radius, duration, and
              speed of the scramble effect.
            </ScrambledText>
          </Box>

          <Customize>
            <PreviewInput
              title="Scramble Characters"
              value={scrambleChars}
              placeholder="Enter text..."
              maxLength={5}
              width={50}
              onChange={val => updateProp('scrambleChars', val)}
            />

            <PreviewSlider
              title="Radius"
              min={10}
              max={300}
              step={10}
              value={radius}
              onChange={val => updateProp('radius', val)}
            />
            <PreviewSlider
              title="Duration"
              min={0.1}
              max={5}
              step={0.1}
              value={duration}
              onChange={val => updateProp('duration', val)}
            />
            <PreviewSlider
              title="Speed"
              min={0.1}
              max={2}
              step={0.1}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={scrambledTextCode} componentName="ScrambledText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ScrambledTextDemo;
