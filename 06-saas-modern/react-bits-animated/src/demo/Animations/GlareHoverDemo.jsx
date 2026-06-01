import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { glareHover } from '../../constants/code/Animations/glareHoverCode';
import GlareHover from '../../content/Animations/GlareHover/GlareHover';

const DEFAULT_PROPS = {
  glareColor: '#ffffff',
  glareOpacity: 0.3,
  glareSize: 300,
  transitionDuration: 800,
  playOnce: false
};

const GlareHoverDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { glareColor, glareOpacity, glareSize, transitionDuration, playOnce } = props;

  const propData = useMemo(
    () => [
      {
        name: 'width',
        type: 'string',
        default: '500px',
        description: 'The width of the hover element.'
      },
      {
        name: 'height',
        type: 'string',
        default: '500px',
        description: 'The height of the hover element.'
      },
      {
        name: 'background',
        type: 'string',
        default: '#000',
        description: 'The background color of the element.'
      },
      {
        name: 'borderRadius',
        type: 'string',
        default: '10px',
        description: 'The border radius of the element.'
      },
      {
        name: 'borderColor',
        type: 'string',
        default: '#333',
        description: 'The border color of the element.'
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        default: 'undefined',
        description: 'The content to display inside the glare hover element.'
      },
      {
        name: 'glareColor',
        type: 'string',
        default: '#ffffff',
        description: 'The color of the glare effect (hex format).'
      },
      {
        name: 'glareOpacity',
        type: 'number',
        default: '0.5',
        description: 'The opacity of the glare effect (0-1).'
      },
      {
        name: 'glareAngle',
        type: 'number',
        default: '-45',
        description: 'The angle of the glare effect in degrees.'
      },
      {
        name: 'glareSize',
        type: 'number',
        default: '250',
        description: 'The size of the glare effect as a percentage (e.g. 250 = 250%).'
      },
      {
        name: 'transitionDuration',
        type: 'number',
        default: '650',
        description: 'The duration of the transition in milliseconds.'
      },
      {
        name: 'playOnce',
        type: 'boolean',
        default: 'false',
        description: "If true, the glare only animates on hover and doesn't return on mouse leave."
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional CSS class names.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '{}',
        description: 'Additional inline styles.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <GlareHover
              background="#120F17"
              borderColor="#2F293A"
              borderRadius="20px"
              width="400px"
              height="300px"
              glareColor={glareColor}
              glareOpacity={glareOpacity}
              glareSize={glareSize}
              transitionDuration={transitionDuration}
              playOnce={playOnce}
            >
              <Text textAlign="center" fontSize="3rem" fontWeight="900" color="#2F293A" m={0}>
                Hover Me
              </Text>
            </GlareHover>
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Glare Color" color={glareColor} onChange={val => updateProp('glareColor', val)} />

            <PreviewSlider
              title="Glare Opacity"
              min={0}
              max={1}
              step={0.1}
              value={glareOpacity}
              onChange={val => updateProp('glareOpacity', val)}
            />

            <PreviewSlider
              title="Glare Size"
              min={100}
              max={500}
              step={25}
              value={glareSize}
              onChange={val => updateProp('glareSize', val)}
              valueUnit="%"
            />

            <PreviewSlider
              title="Transition Duration"
              min={200}
              max={2000}
              step={50}
              value={transitionDuration}
              onChange={val => updateProp('transitionDuration', val)}
              valueUnit="ms"
            />

            <PreviewSwitch
              title="Play Once"
              isChecked={playOnce}
              onChange={checked => updateProp('playOnce', checked)}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={glareHover} componentName="GlareHover" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GlareHoverDemo;
