import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Spacer } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';

import FuzzyText from '../../content/TextAnimations/FuzzyText/FuzzyText';
import { fuzzyText } from '../../constants/code/TextAnimations/fuzzyTextCode';

const DEFAULT_PROPS = {
  baseIntensity: 0.2,
  hoverIntensity: 0.5,
  enableHover: true,
  fuzzRange: 30,
  fps: 60,
  direction: 'horizontal',
  transitionDuration: 0,
  clickEffect: false,
  glitchMode: false,
  glitchInterval: 2000,
  glitchDuration: 200,
  letterSpacing: 0
};

const FuzzyTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    baseIntensity,
    hoverIntensity,
    enableHover,
    fuzzRange,
    fps,
    direction,
    transitionDuration,
    clickEffect,
    glitchMode,
    glitchInterval,
    glitchDuration,
    letterSpacing
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'React.ReactNode',
        default: '',
        description: 'The text content to display inside the fuzzy text component.'
      },
      {
        name: 'fontSize',
        type: 'number | string',
        default: `"clamp(2rem, 8vw, 8rem)"`,
        description:
          'Specifies the font size of the text. Accepts any valid CSS font-size value or a number (interpreted as pixels).'
      },
      {
        name: 'fontWeight',
        type: 'string | number',
        default: '900',
        description: 'Specifies the font weight of the text.'
      },
      {
        name: 'fontFamily',
        type: 'string',
        default: `"inherit"`,
        description: "Specifies the font family of the text. 'inherit' uses the computed style from the parent."
      },
      {
        name: 'color',
        type: 'string',
        default: '#fff',
        description: 'Specifies the text color.'
      },
      {
        name: 'enableHover',
        type: 'boolean',
        default: 'true',
        description: 'Enables the hover effect for the fuzzy text.'
      },
      {
        name: 'baseIntensity',
        type: 'number',
        default: '0.18',
        description: 'The fuzz intensity when the text is not hovered.'
      },
      {
        name: 'hoverIntensity',
        type: 'number',
        default: '0.5',
        description: 'The fuzz intensity when the text is hovered.'
      },
      {
        name: 'fuzzRange',
        type: 'number',
        default: '30',
        description: 'Maximum pixel displacement for the fuzzy effect.'
      },
      {
        name: 'fps',
        type: 'number',
        default: '60',
        description: 'Frame rate cap for the animation. Lower values reduce CPU usage.'
      },
      {
        name: 'direction',
        type: `'horizontal' | 'vertical' | 'both'`,
        default: `'horizontal'`,
        description: 'The axis/axes for the fuzzy displacement effect.'
      },
      {
        name: 'transitionDuration',
        type: 'number',
        default: '0',
        description: 'Number of frames to ease between intensity states for smooth transitions.'
      },
      {
        name: 'clickEffect',
        type: 'boolean',
        default: 'false',
        description: 'Enables a momentary burst of maximum intensity on click.'
      },
      {
        name: 'glitchMode',
        type: 'boolean',
        default: 'false',
        description: 'Enables periodic random intensity spikes for a glitch effect.'
      },
      {
        name: 'glitchInterval',
        type: 'number',
        default: '2000',
        description: 'Milliseconds between glitch bursts when glitchMode is enabled.'
      },
      {
        name: 'glitchDuration',
        type: 'number',
        default: '200',
        description: 'Milliseconds duration of each glitch burst.'
      },
      {
        name: 'gradient',
        type: 'string[] | null',
        default: 'null',
        description: 'Array of colors to create a gradient text effect (e.g. ["#ff0000", "#00ff00"]).'
      },
      {
        name: 'letterSpacing',
        type: 'number',
        default: '0',
        description: 'Extra pixels between characters.'
      },
      {
        name: 'className',
        type: 'string',
        default: `''`,
        description: 'CSS class for the canvas element.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <Flex direction="column">
              <FuzzyText
                baseIntensity={baseIntensity}
                hoverIntensity={hoverIntensity}
                enableHover={enableHover}
                fuzzRange={fuzzRange}
                fps={fps}
                direction={direction}
                transitionDuration={transitionDuration}
                clickEffect={clickEffect}
                glitchMode={glitchMode}
                glitchInterval={glitchInterval}
                glitchDuration={glitchDuration}
                letterSpacing={letterSpacing}
                fontSize={140}
              >
                404
              </FuzzyText>
              <Spacer my={1} />
              <FuzzyText
                baseIntensity={baseIntensity}
                hoverIntensity={hoverIntensity}
                enableHover={enableHover}
                fuzzRange={fuzzRange}
                fps={fps}
                direction={direction}
                transitionDuration={transitionDuration}
                clickEffect={clickEffect}
                glitchMode={glitchMode}
                glitchInterval={glitchInterval}
                glitchDuration={glitchDuration}
                letterSpacing={letterSpacing}
                fontSize={70}
                fontFamily="Gochi Hand"
              >
                not found
              </FuzzyText>
            </Flex>
          </Box>

          <Customize>
            <PreviewSlider
              title="Base Intensity"
              min={0}
              max={1}
              step={0.01}
              value={baseIntensity}
              onChange={val => {
                updateProp('baseIntensity', val);
              }}
            />

            <PreviewSlider
              title="Hover Intensity"
              min={0}
              max={2}
              step={0.01}
              value={hoverIntensity}
              onChange={val => {
                updateProp('hoverIntensity', val);
              }}
            />

            <PreviewSlider
              title="Fuzz Range"
              min={5}
              max={100}
              step={1}
              value={fuzzRange}
              onChange={val => {
                updateProp('fuzzRange', val);
              }}
            />

            <PreviewSlider
              title="FPS"
              min={10}
              max={120}
              step={5}
              value={fps}
              onChange={val => {
                updateProp('fps', val);
              }}
            />

            <PreviewSlider
              title="Transition Duration"
              min={0}
              max={60}
              step={1}
              value={transitionDuration}
              onChange={val => {
                updateProp('transitionDuration', val);
              }}
            />

            <PreviewSlider
              title="Letter Spacing"
              min={-10}
              max={50}
              step={1}
              value={letterSpacing}
              onChange={val => {
                updateProp('letterSpacing', val);
              }}
            />

            <PreviewSelect
              title="Direction"
              options={[
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'vertical', label: 'Vertical' },
                { value: 'both', label: 'Both' }
              ]}
              value={direction}
              onChange={val => {
                updateProp('direction', val);
              }}
            />

            <PreviewSwitch
              title="Enable Hover"
              isChecked={enableHover}
              onChange={checked => {
                updateProp('enableHover', checked);
              }}
            />

            <PreviewSwitch
              title="Click Effect"
              isChecked={clickEffect}
              onChange={checked => {
                updateProp('clickEffect', checked);
              }}
            />

            <PreviewSwitch
              title="Glitch Mode"
              isChecked={glitchMode}
              onChange={checked => {
                updateProp('glitchMode', checked);
              }}
            />

            <PreviewSlider
              title="Glitch Interval"
              min={500}
              max={5000}
              step={100}
              value={glitchInterval}
              isDisabled={!glitchMode}
              onChange={val => {
                updateProp('glitchInterval', val);
              }}
            />

            <PreviewSlider
              title="Glitch Duration"
              min={50}
              max={1000}
              step={50}
              value={glitchDuration}
              isDisabled={!glitchMode}
              onChange={val => {
                updateProp('glitchDuration', val);
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={fuzzyText} componentName="FuzzyText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FuzzyTextDemo;
