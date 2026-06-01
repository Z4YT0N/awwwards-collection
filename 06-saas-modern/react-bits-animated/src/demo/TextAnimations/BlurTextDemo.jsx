import { useMemo } from 'react';
import { toast } from 'sonner';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import PropTable from '../../components/common/Preview/PropTable';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import BlurText from '../../content/TextAnimations/BlurText/BlurText';
import { blurText } from '../../constants/code/TextAnimations/blurTextCode';

// Default prop values for this component
const DEFAULT_PROPS = {
  text: "Isn't this so cool?!",
  animateBy: 'words',
  direction: 'top',
  delay: 200
};

const BlurTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { animateBy, direction, delay } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '""',
        description: 'The text content to animate.'
      },
      {
        name: 'animateBy',
        type: 'string',
        default: '"words"',
        description: "Determines whether to animate by 'words' or 'letters'."
      },
      {
        name: 'direction',
        type: 'string',
        default: '"top"',
        description: "Direction from which the words/letters appear ('top' or 'bottom')."
      },
      {
        name: 'delay',
        type: 'number',
        default: '200',
        description: 'Delay between animations for each word/letter (in ms).'
      },
      {
        name: 'stepDuration',
        type: 'number',
        default: '0.35',
        description: 'The time taken for each letter/word to animate (in seconds).'
      },
      {
        name: 'threshold',
        type: 'number',
        default: '0.1',
        description: 'Intersection threshold for triggering the animation.'
      },
      {
        name: 'rootMargin',
        type: 'string',
        default: '"0px"',
        description: 'Root margin for the intersection observer.'
      },
      {
        name: 'onAnimationComplete',
        type: 'function',
        default: 'undefined',
        description: 'Callback function triggered when all animations complete.'
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
            <BlurText
              key={key}
              text={props.text}
              animateBy={animateBy}
              direction={direction}
              delay={delay}
              onAnimationComplete={() => toast('✅ Animation Finished!')}
              className="blur-text-demo"
            />
          </Box>
          <Customize>
            <PreviewSelect
              title="Animate By"
              options={[
                { value: 'words', label: 'Words' },
                { value: 'letters', label: 'Letters' }
              ]}
              value={animateBy}
              onChange={val => {
                updateProp('animateBy', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Direction"
              options={[
                { value: 'top', label: 'Top' },
                { value: 'bottom', label: 'Bottom' }
              ]}
              value={direction}
              onChange={val => {
                updateProp('direction', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Delay"
              min={50}
              max={500}
              step={10}
              value={delay}
              valueUnit="ms"
              onChange={val => {
                updateProp('delay', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={blurText} componentName="BlurText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default BlurTextDemo;
