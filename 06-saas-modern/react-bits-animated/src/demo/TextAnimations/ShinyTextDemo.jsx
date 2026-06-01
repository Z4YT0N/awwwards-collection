import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';

import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import Customize from '../../components/common/Preview/Customize';

import ShinyText from '../../content/TextAnimations/ShinyText/ShinyText';
import { shinyText } from '../../constants/code/TextAnimations/shinyTextCode';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  speed: 2,
  delay: 0,
  color: '#b5b5b5',
  shineColor: '#ffffff',
  spread: 120,
  direction: 'left',
  yoyo: false,
  pauseOnHover: false,
  disabled: false
};

const DIRECTION_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
];

const ShinyTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { speed, delay, color, shineColor, spread, direction, yoyo, pauseOnHover, disabled } = props;

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '-',
        description: 'The text to be displayed with the shiny effect.'
      },
      {
        name: 'color',
        type: 'string',
        default: '"#b5b5b5"',
        description: 'The base color of the text.'
      },
      {
        name: 'shineColor',
        type: 'string',
        default: '"#ffffff"',
        description: 'The color of the shine/highlight effect.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '2',
        description: 'Duration of one animation cycle in seconds.'
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Pause duration (in seconds) between animation cycles.'
      },
      {
        name: 'spread',
        type: 'number',
        default: '120',
        description: 'The angle (in degrees) of the gradient spread.'
      },
      {
        name: 'yoyo',
        type: 'boolean',
        default: 'false',
        description: 'If true, the animation reverses direction instead of looping.'
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        default: 'false',
        description: 'Pauses the animation when the user hovers over the text.'
      },
      {
        name: 'direction',
        type: "'left' | 'right'",
        default: '"left"',
        description: 'The direction the shine moves across the text.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the shiny effect when set to true.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Adds custom classes to the root element.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400} fontSize="32px" fontWeight="600">
            <ShinyText
              text="✨ Shiny Text Effect"
              speed={speed}
              delay={delay}
              color={color}
              shineColor={shineColor}
              spread={spread}
              direction={direction}
              yoyo={yoyo}
              pauseOnHover={pauseOnHover}
              disabled={disabled}
            />
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Text Color" color={color} onChange={val => updateProp('color', val)} />
            <PreviewColorPickerCustom
              title="Shine Color"
              color={shineColor}
              onChange={val => updateProp('shineColor', val)}
            />

            <PreviewSlider
              title="Speed"
              min={0.5}
              max={5}
              step={0.1}
              value={speed}
              valueUnit="s"
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Delay"
              min={0}
              max={3}
              step={0.1}
              value={delay}
              valueUnit="s"
              onChange={val => updateProp('delay', val)}
            />

            <PreviewSlider
              title="Spread"
              min={0}
              max={180}
              step={5}
              value={spread}
              valueUnit="°"
              onChange={val => updateProp('spread', val)}
            />

            <PreviewSelect
              title="Direction"
              options={DIRECTION_OPTIONS}
              value={direction}
              onChange={val => updateProp('direction', val)}
            />

            <PreviewSwitch title="Yoyo Mode" isChecked={yoyo} onChange={val => updateProp('yoyo', val)} />
            <PreviewSwitch
              title="Pause on Hover"
              isChecked={pauseOnHover}
              onChange={val => updateProp('pauseOnHover', val)}
            />
            <PreviewSwitch title="Disabled" isChecked={disabled} onChange={val => updateProp('disabled', val)} />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={shinyText} componentName="ShinyText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ShinyTextDemo;
