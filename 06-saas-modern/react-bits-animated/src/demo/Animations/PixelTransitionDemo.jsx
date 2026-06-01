import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import { Flex, Text } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PixelTransition from '../../content/Animations/PixelTransition/PixelTransition';
import { pixelTransition } from '../../constants/code/Animations/pixelTransitionCode';
import PreviewSwitch from '@/components/common/Preview/PreviewSwitch';

const propData = [
  {
    name: 'firstContent',
    type: 'ReactNode | string',
    default: '—',
    description: 'Content to show by default (e.g., an <img> or text).'
  },
  {
    name: 'secondContent',
    type: 'ReactNode | string',
    default: '—',
    description: 'Content revealed upon hover or click.'
  },
  {
    name: 'gridSize',
    type: 'number',
    default: '7',
    description: 'Number of rows/columns in the pixel grid.'
  },
  {
    name: 'pixelColor',
    type: 'string',
    default: 'currentColor',
    description: 'Background color used for each pixel block.'
  },
  {
    name: 'animationStepDuration',
    type: 'number',
    default: '0.3',
    description: 'Length of the pixel reveal/hide in seconds.'
  },
  {
    name: 'aspectRatio',
    type: 'string',
    default: `"100%"`,
    description: "Sets the 'padding-top' (or aspect-ratio) for the container."
  },
  {
    name: 'once',
    type: 'boolean',
    default: 'false',
    description: 'If true, the transition will not revert on mouse leave or subsequent clicks.'
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Optional additional class names for styling.'
  },
  {
    name: 'style',
    type: 'object',
    default: '{}',
    description: 'Optional inline styles for the container.'
  }
];

const DEFAULT_PROPS = {
  gridSize: 8,
  pixelColor: '#ffffff',
  animationStepDuration: 0.4,
  once: false
};

const PixelTransitionDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { gridSize, pixelColor, animationStepDuration, once } = props;
  const [key, forceRerender] = useForceRerender();

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Flex
            direction="column"
            position="relative"
            className="demo-container"
            minH={400}
            maxH={400}
            overflow="hidden"
          >
            <PixelTransition
              key={key}
              firstContent={
                <img
                  src="https://i.kym-cdn.com/entries/icons/original/000/054/270/rigrig.jpg"
                  alt="Default"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              }
              secondContent={
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: '#111'
                  }}
                >
                  <p style={{ fontWeight: 900, fontSize: '3rem', color: '#ffffff' }}>Meow!</p>
                </div>
              }
              gridSize={gridSize}
              pixelColor={pixelColor}
              animationStepDuration={animationStepDuration}
              once={once}
              className="custom-pixel-card"
            />
            <Text mt={2} color="#a6a6a6">
              Psst, hover the card!
            </Text>
          </Flex>

          <Customize>
            <PreviewSlider
              title="Grid Size"
              min={2}
              max={50}
              step={1}
              value={gridSize}
              onChange={val => {
                updateProp('gridSize', val);
                forceRerender();
              }}
              width={200}
            />

            <PreviewSlider
              title="Animation Duration"
              min={0.1}
              max={2}
              step={0.1}
              value={animationStepDuration}
              valueUnit="s"
              onChange={val => {
                updateProp('animationStepDuration', val);
                forceRerender();
              }}
              width={200}
            />

            <PreviewColorPickerCustom title="Pixel Color" color={pixelColor} onChange={val => { updateProp('pixelColor', val); forceRerender(); }} />
            <PreviewSwitch title="Once" isChecked={once} onChange={checked => updateProp('once', checked)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={pixelTransition} componentName="PixelTransition" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PixelTransitionDemo;
