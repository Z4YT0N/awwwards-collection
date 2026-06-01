import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from '@/components/common/Preview/RefreshButton';
import useForceRerender from '@/hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { shuffle } from '../../constants/code/TextAnimations/shuffleCode';
import Shuffle from '@content/TextAnimations/Shuffle/Shuffle';

const DEFAULT_PROPS = {
  duration: 0.35,
  shuffleTimes: 1,
  stagger: 0.03,
  shuffleDirection: 'right',
  ease: 'power3.out',
  loop: false,
  loopDelay: 0,
  triggerOnHover: true
};

const ShuffleDemo = () => {
  const propData = useMemo(
    () => [
      { name: 'text', type: 'string', default: '""', description: 'The text content to shuffle.' },
      { name: 'className', type: 'string', default: '""', description: 'Optional CSS class for the wrapper element.' },
      { name: 'style', type: 'object', default: '{}', description: 'Inline styles applied to the wrapper element.' },
      {
        name: 'shuffleDirection',
        type: '"left" | "right" | "up" | "down"',
        default: '"right"',
        description: 'Direction the per-letter strip slides to reveal the final character.'
      },
      { name: 'duration', type: 'number', default: '0.35', description: 'Duration (s) of the strip slide per letter.' },
      {
        name: 'maxDelay',
        type: 'number',
        default: '0',
        description: 'Max random delay per strip when animationMode = "random".'
      },
      {
        name: 'ease',
        type: 'string | Function',
        default: '"power3.out"',
        description: 'GSAP ease for sliding and color tween.'
      },
      {
        name: 'threshold',
        type: 'number',
        default: '0.1',
        description: 'Portion of the element that must enter view before starting.'
      },
      {
        name: 'rootMargin',
        type: 'string',
        default: '"-100px"',
        description: 'ScrollTrigger start offset (px, %, etc.).'
      },
      {
        name: 'tag',
        type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"',
        default: '"p"',
        description: 'HTML tag to render for the text container.'
      },
      {
        name: 'textAlign',
        type: 'CSS text-align',
        default: '"center"',
        description: 'Text alignment applied via inline style.'
      },
      {
        name: 'onShuffleComplete',
        type: '() => void',
        default: 'undefined',
        description: 'Called after a full run completes (and on each loop repeat).'
      },
      {
        name: 'shuffleTimes',
        type: 'number',
        default: '1',
        description: 'How many interim scrambled glyphs to scroll past before the final char.'
      },
      {
        name: 'animationMode',
        type: '"evenodd" | "random"',
        default: '"evenodd"',
        description: 'Odd/even staggered strips or random per-strip delays.'
      },
      { name: 'loop', type: 'boolean', default: 'false', description: 'Repeat the shuffle indefinitely.' },
      { name: 'loopDelay', type: 'number', default: '0', description: 'Delay (s) between loop repeats.' },
      { name: 'stagger', type: 'number', default: '0.03', description: 'Stagger (s) for strips in "evenodd" mode.' },
      {
        name: 'scrambleCharset',
        type: 'string',
        default: '""',
        description: 'Characters to use for interim scrambles; empty keeps original copies.'
      },
      {
        name: 'colorFrom',
        type: 'string',
        default: 'undefined',
        description: 'Optional starting text color while shuffling.'
      },
      { name: 'colorTo', type: 'string', default: 'undefined', description: 'Optional final text color to tween to.' },
      {
        name: 'triggerOnce',
        type: 'boolean',
        default: 'true',
        description: 'Auto-run only on first scroll into view.'
      },
      {
        name: 'respectReducedMotion',
        type: 'boolean',
        default: 'true',
        description: 'Skip animation if user prefers reduced motion.'
      },
      {
        name: 'triggerOnHover',
        type: 'boolean',
        default: 'true',
        description: 'Allow re-playing the animation on hover after it completes.'
      }
    ],
    []
  );

  const [key, forceRerender] = useForceRerender();

  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { duration, shuffleTimes, stagger, shuffleDirection, ease, loop, loopDelay, triggerOnHover } = props;

  const directionOptions = [
    { label: 'Right', value: 'right' },
    { label: 'Left', value: 'left' },
    { label: 'Up', value: 'up' },
    { label: 'Down', value: 'down' }
  ];

  const easeOptions = [
    { label: 'power2.out', value: 'power2.out' },
    { label: 'power3.out', value: 'power3.out' },
    { label: 'back.out(1.1)', value: 'back.out(1.1)' },
    { label: 'expo.out', value: 'expo.out' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            position="relative"
            className="flex justify-center items-center demo-container"
            h={400}
            overflow="hidden"
          >
            <Shuffle
              key={key}
              text="REACT BITS"
              ease={ease}
              duration={duration}
              shuffleTimes={shuffleTimes}
              stagger={stagger}
              shuffleDirection={shuffleDirection}
              loop={loop}
              loopDelay={loopDelay}
              triggerOnHover={triggerOnHover}
            />

            <RefreshButton onClick={forceRerender} />
          </Box>

          <Customize>
            <PreviewSelect
              title="Direction"
              options={directionOptions}
              value={shuffleDirection}
              name="shuffleDirection"
              width={130}
              onChange={val => {
                updateProp('shuffleDirection', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Ease"
              options={easeOptions}
              value={ease}
              name="ease"
              width={150}
              onChange={val => {
                updateProp('ease', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Duration"
              min={0.1}
              max={1.5}
              step={0.05}
              value={duration}
              valueUnit="s"
              onChange={val => {
                updateProp('duration', Number(val));
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Shuffle Times"
              min={1}
              max={8}
              step={1}
              value={shuffleTimes}
              onChange={val => {
                updateProp('shuffleTimes', Number(val));
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Stagger"
              min={0}
              max={0.2}
              step={0.01}
              value={stagger}
              valueUnit="s"
              onChange={val => {
                updateProp('stagger', Number(val));
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Hover Replay"
              isChecked={triggerOnHover}
              onChange={checked => {
                updateProp('triggerOnHover', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Loop"
              isChecked={loop}
              onChange={checked => {
                updateProp('loop', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Loop Delay"
              min={0}
              max={2}
              step={0.1}
              value={loopDelay}
              isDisabled={!loop}
              valueUnit="s"
              onChange={val => {
                updateProp('loopDelay', Number(val));
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap', '@gsap/react']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={shuffle} componentName="Shuffle" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ShuffleDemo;
