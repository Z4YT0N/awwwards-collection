import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import PropTable from '../../components/common/Preview/PropTable';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import AnimatedContent from '../../content/Animations/AnimatedContent/AnimatedContent';
import { animatedContent } from '../../constants/code/Animations/animatedContentCode';

const DEFAULT_PROPS = {
  direction: 'vertical',
  distance: 100,
  delay: 0,
  reverse: false,
  duration: 0.8,
  ease: 'power3.out',
  initialOpacity: 0,
  animateOpacity: true,
  scale: 1,
  threshold: 0.1,
  disappearAfter: 0,
  disappearDuration: 0.5,
  disappearEase: 'power3.in'
};

const AnimatedContentDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    direction,
    distance,
    delay,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    disappearAfter,
    disappearDuration,
    disappearEase
  } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      { name: 'children', type: 'ReactNode', default: '', description: 'The content to be animated.' },
      {
        name: 'container',
        type: 'string | HTMLElement',
        default: 'null',
        description:
          'The scroll container to use for ScrollTrigger. Can be a selector string or an HTMLElement. Defaults to main container. Uses auto-detection (for snap-main-container id) if not provided.'
      },
      {
        name: 'distance',
        type: 'number',
        default: '100',
        description: 'Distance (in pixels) the component moves during animation.'
      },
      {
        name: 'direction',
        type: 'string',
        default: '"vertical"',
        description: 'Animation direction. Can be "vertical" or "horizontal".'
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        description: 'Whether the animation moves in the reverse direction.'
      },
      { name: 'duration', type: 'number', default: '0.8', description: 'Duration of the animation in seconds.' },
      { name: 'ease', type: 'string', default: '"power3.out"', description: 'GSAP easing function for the animation.' },
      { name: 'initialOpacity', type: 'number', default: '0', description: 'Initial opacity before animation begins.' },
      {
        name: 'animateOpacity',
        type: 'boolean',
        default: 'true',
        description: 'Whether to animate opacity during transition.'
      },
      { name: 'scale', type: 'number', default: '1', description: 'Initial scale of the component.' },
      {
        name: 'threshold',
        type: 'number',
        default: '0.1',
        description: 'Intersection threshold to trigger animation (0-1).'
      },
      { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (in seconds).' },
      {
        name: 'onComplete',
        type: 'function',
        default: 'undefined',
        description: 'Callback function called when animation completes.'
      },
      {
        name: 'dissappearAfter',
        type: 'number',
        default: '0',
        description: 'Time in seconds after which the content will disappear. Disabled if set to 0.'
      },
      {
        name: 'disappearDuration',
        type: 'number',
        default: '0.5',
        description: 'Duration of the disappearance animation in seconds.'
      },
      {
        name: 'disappearEase',
        type: 'string',
        default: '"power3.in"',
        description: 'GSAP easing function for the disappearance animation.'
      },
      {
        name: 'onDisappearanceComplete',
        type: 'function',
        default: 'undefined',
        description: 'Callback function called when disappearance animation completes.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes to apply to the animated component.'
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
            <AnimatedContent
              key={key}
              direction={direction}
              delay={delay}
              distance={distance}
              reverse={reverse}
              duration={duration}
              ease={ease}
              initialOpacity={initialOpacity}
              animateOpacity={animateOpacity}
              scale={scale}
              threshold={threshold}
              disappearAfter={disappearAfter}
              disappearDuration={disappearDuration}
              disappearEase={disappearEase}
            >
              <Flex
                fontSize="xl"
                fontWeight="bolder"
                justifyContent="center"
                alignItems="center"
                color="#fff"
                h={100}
                borderRadius="25px"
                border="1px solid #2F293A"
                w={200}
                bg={'#120F17'}
              >
                Animate Me
              </Flex>
            </AnimatedContent>
          </Box>

          <Customize>
            <PreviewSelect
              title="Direction"
              options={[
                { value: 'vertical', label: 'Vertical' },
                { value: 'horizontal', label: 'Horizontal' }
              ]}
              value={direction}
              onChange={val => {
                updateProp('direction', val);
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

            <PreviewSelect
              title="Disappear Ease"
              options={[
                { value: 'power3.in', label: 'power3.in' },
                { value: 'bounce.in', label: 'bounce.in' },
                { value: 'elastic.in(1, 0.3)', label: 'elastic.in' }
              ]}
              value={disappearEase}
              onChange={val => {
                updateProp('disappearEase', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Reverse Direction"
              isChecked={reverse}
              onChange={checked => {
                updateProp('reverse', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Animate Opacity"
              isChecked={animateOpacity}
              onChange={checked => {
                updateProp('animateOpacity', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Distance"
              min={50}
              max={300}
              step={10}
              value={distance}
              onChange={val => {
                updateProp('distance', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Duration"
              min={0.1}
              max={3}
              step={0.1}
              value={duration}
              onChange={val => {
                updateProp('duration', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Delay"
              min={0}
              max={2}
              step={0.1}
              value={delay}
              onChange={val => {
                updateProp('delay', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Initial Opacity"
              min={0}
              max={1}
              step={0.1}
              value={initialOpacity}
              onChange={val => {
                updateProp('initialOpacity', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Initial Scale"
              min={0.1}
              max={2}
              step={0.1}
              value={scale}
              onChange={val => {
                updateProp('scale', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Threshold"
              min={0.1}
              max={1}
              step={0.1}
              value={threshold}
              onChange={val => {
                updateProp('threshold', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Disappear After"
              min={0}
              max={5}
              step={0.1}
              value={disappearAfter}
              onChange={val => {
                updateProp('disappearAfter', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Disappear Duration"
              min={0.5}
              max={3}
              step={0.1}
              value={disappearDuration}
              onChange={val => {
                updateProp('disappearDuration', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={animatedContent} componentName="AnimatedContent" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default AnimatedContentDemo;
