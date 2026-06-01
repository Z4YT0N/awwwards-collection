import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { LayoutGroup, motion } from 'motion/react';
import { Box } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import RotatingText from '../../content/TextAnimations/RotatingText/RotatingText';
import { rotatingText } from '../../constants/code/TextAnimations/rotatingTextCode';

const DEFAULT_PROPS = {
  rotationInterval: 2000,
  staggerDuration: 0.025,
  staggerFrom: 'last',
  splitBy: 'characters',
  auto: true,
  loop: true
};

const RotatingTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { rotationInterval, staggerDuration, staggerFrom, splitBy, auto, loop } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'texts',
        type: 'string[]',
        default: '[]',
        description: 'An array of text strings to be rotated.'
      },
      {
        name: 'rotationInterval',
        type: 'number',
        default: '2000',
        description: 'The interval (in milliseconds) between text rotations.'
      },
      {
        name: 'initial',
        type: 'object',
        default: '{ y: "100%", opacity: 0 }',
        description: 'Initial animation state for each element.'
      },
      {
        name: 'animate',
        type: 'object',
        default: '{ y: 0, opacity: 1 }',
        description: 'Animation state when elements enter.'
      },
      {
        name: 'exit',
        type: 'object',
        default: '{ y: "-120%", opacity: 0 }',
        description: 'Exit animation state for elements.'
      },
      {
        name: 'animatePresenceMode',
        type: 'string',
        default: '"wait"',
        description: "Mode for AnimatePresence; for example, 'wait' to finish exit animations before entering."
      },
      {
        name: 'animatePresenceInitial',
        type: 'boolean',
        default: 'false',
        description: 'Determines whether the AnimatePresence component should run its initial animation.'
      },
      {
        name: 'staggerDuration',
        type: 'number',
        default: '0',
        description: "Delay between each character's animation."
      },
      {
        name: 'staggerFrom',
        type: 'string',
        default: '"first"',
        description: 'Specifies the order from which the stagger starts.'
      },
      {
        name: 'transition',
        type: 'object',
        default: '',
        description: 'Transition settings for the animations.'
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Determines if the rotation should loop back to the first text after the last one.'
      },
      {
        name: 'auto',
        type: 'boolean',
        default: 'true',
        description: 'If true, the text rotation starts automatically.'
      },
      {
        name: 'splitBy',
        type: 'string',
        default: '"characters"',
        description: 'Determines how the text is split into animatable elements (e.g., by characters, words, or lines).'
      },
      {
        name: 'onNext',
        type: 'function',
        default: 'undefined',
        description: 'Callback function invoked when the text rotates to the next item.'
      },
      {
        name: 'mainClassName',
        type: 'string',
        default: "''",
        description: 'Additional class names for the main container element.'
      },
      {
        name: 'splitLevelClassName',
        type: 'string',
        default: "''",
        description: 'Additional class names for the container wrapping each split group (e.g., a word).'
      },
      {
        name: 'elementLevelClassName',
        type: 'string',
        default: "''",
        description: 'Additional class names for each individual animated element.'
      }
    ],
    []
  );

  const words = ['thinking', 'coding', 'components!'];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400} maxH={400} overflow="hidden">
            <div className="rotating-text-demo">
              <LayoutGroup>
                <motion.p className="rotating-text-ptag" layout>
                  <motion.span
                    className="pt-0.5 sm:pt-1 md:pt-2"
                    layout
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  >
                    Creative{' '}
                  </motion.span>
                  <RotatingText
                    key={key}
                    texts={words}
                    mainClassName="rotating-text-main"
                    staggerFrom={staggerFrom}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={staggerDuration}
                    splitLevelClassName="rotating-text-split"
                    splitBy={splitBy}
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    rotationInterval={rotationInterval}
                    auto={auto}
                    loop={loop}
                  />
                </motion.p>
              </LayoutGroup>
            </div>
          </Box>

          <Customize>
            <PreviewSlider
              title="Rotation Interval (ms)"
              min={500}
              max={5000}
              step={100}
              value={rotationInterval}
              onChange={v => { updateProp('rotationInterval', v); forceRerender(); }}
            />
            <PreviewSlider
              title="Stagger Duration"
              min={0}
              max={0.1}
              step={0.005}
              value={staggerDuration}
              onChange={v => { updateProp('staggerDuration', v); forceRerender(); }}
            />
            <PreviewSelect
              title="Stagger From"
              value={staggerFrom}
              options={[
                { value: 'first', label: 'First' },
                { value: 'last', label: 'Last' },
                { value: 'center', label: 'Center' },
                { value: 'random', label: 'Random' }
              ]}
              onChange={v => { updateProp('staggerFrom', v); forceRerender(); }}
            />
            <PreviewSelect
              title="Split By"
              value={splitBy}
              options={[
                { value: 'characters', label: 'Characters' },
                { value: 'words', label: 'Words' },
                { value: 'lines', label: 'Lines' }
              ]}
              onChange={v => { updateProp('splitBy', v); forceRerender(); }}
            />
            <PreviewSwitch
              title="Auto"
              isChecked={auto}
              onChange={v => { updateProp('auto', v); forceRerender(); }}
            />
            <PreviewSwitch
              title="Loop"
              isChecked={loop}
              onChange={v => { updateProp('loop', v); forceRerender(); }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={rotatingText} componentName="RotatingText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default RotatingTextDemo;
