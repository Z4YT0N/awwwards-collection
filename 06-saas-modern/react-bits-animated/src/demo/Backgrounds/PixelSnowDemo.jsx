import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import PixelSnow from '../../content/Backgrounds/PixelSnow/PixelSnow';
import { pixelSnow } from '../../constants/code/Backgrounds/pixelSnowCode';

const DEFAULT_PROPS = {
  color: '#ffffff',
  flakeSize: 0.01,
  minFlakeSize: 1.25,
  pixelResolution: 200,
  speed: 1.25,
  depthFade: 8,
  farPlane: 20,
  brightness: 1,
  gamma: 0.4545,
  density: 0.3,
  variant: 'square',
  direction: 125
};

const PixelSnowDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color,
    flakeSize,
    minFlakeSize,
    pixelResolution,
    speed,
    depthFade,
    farPlane,
    brightness,
    gamma,
    density,
    variant,
    direction
  } = props;

  const variantOptions = [
    { label: 'Square', value: 'square' },
    { label: 'Round', value: 'round' },
    { label: 'Snowflake', value: 'snowflake' }
  ];

  const propData = useMemo(
    () => [
      {
        name: 'color',
        type: 'string',
        default: '"#ffffff"',
        description: 'Color of the snowflakes (hex or CSS color)'
      },
      {
        name: 'flakeSize',
        type: 'number',
        default: '0.01',
        description: 'Size of snowflakes in scene units'
      },
      {
        name: 'minFlakeSize',
        type: 'number',
        default: '1.25',
        description: 'Minimum flake size in pixels on screen'
      },
      {
        name: 'pixelResolution',
        type: 'number',
        default: '200',
        description: 'Pixel resolution - lower values create larger pixels for a more retro look'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1.25',
        description: 'Animation speed multiplier'
      },
      {
        name: 'depthFade',
        type: 'number',
        default: '8',
        description: 'Depth fade intensity - higher values make distant flakes fade faster'
      },
      {
        name: 'farPlane',
        type: 'number',
        default: '20',
        description: 'Far plane distance for rendering - higher values show more distant flakes'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1',
        description: 'Overall brightness multiplier'
      },
      {
        name: 'gamma',
        type: 'number',
        default: '0.4545',
        description: 'Gamma correction value for final color output'
      },
      {
        name: 'density',
        type: 'number',
        default: '0.3',
        description: 'Probability of snowflakes appearing (0-1) - lower values = fewer flakes'
      },
      {
        name: 'variant',
        type: '"square" | "round" | "snowflake"',
        default: '"square"',
        description: 'Shape of the snowflakes - square, round, or snowflake pattern'
      },
      {
        name: 'direction',
        type: 'number',
        default: '125',
        description: 'Wind direction angle in degrees (0-360)'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional CSS class name'
      },
      {
        name: 'style',
        type: 'object',
        default: '{}',
        description: 'Additional inline styles'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <PixelSnow
              color={color}
              flakeSize={flakeSize}
              minFlakeSize={minFlakeSize}
              pixelResolution={pixelResolution}
              speed={speed}
              depthFade={depthFade}
              farPlane={farPlane}
              brightness={brightness}
              gamma={gamma}
              density={density}
              variant={variant}
              direction={direction}
            />

            <BackgroundContent headline="Oh, the weather outside is frightful!" pillText="New Background" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="pixel-snow"
              currentProps={{
                color,
                flakeSize,
                minFlakeSize,
                pixelResolution,
                speed,
                depthFade,
                farPlane,
                brightness,
                gamma,
                density,
                variant,
                direction
              }}
              defaultProps={{
                color: '#ffffff',
                flakeSize: 0.01,
                minFlakeSize: 1.25,
                pixelResolution: 200,
                speed: 1.25,
                depthFade: 8,
                farPlane: 20,
                brightness: 1,
                gamma: 0.4545,
                density: 0.3,
                variant: 'square',
                direction: 125
              }}
            />
          </Flex>

          <Customize>
            <PreviewSelect
              title="Variant"
              options={variantOptions}
              value={variant}
              onChange={v => updateProp('variant', v)}
              width={120}
            />

            <PreviewColorPickerCustom title="Color" color={color} onChange={val => updateProp('color', val)} />

            <PreviewSlider
              title="Pixel Resolution"
              min={50}
              max={500}
              step={10}
              value={pixelResolution}
              onChange={v => updateProp('pixelResolution', v)}
              width={200}
            />

            <PreviewSlider
              title="Speed"
              min={0}
              max={5}
              step={0.1}
              value={speed}
              onChange={v => updateProp('speed', v)}
              width={200}
            />

            <PreviewSlider
              title="Density"
              min={0.1}
              max={1}
              step={0.05}
              value={density}
              onChange={v => updateProp('density', v)}
              width={200}
            />

            <PreviewSlider
              title="Flake Size"
              min={0.001}
              max={0.05}
              step={0.001}
              value={flakeSize}
              onChange={v => updateProp('flakeSize', v)}
              width={200}
            />

            <PreviewSlider
              title="Brightness"
              min={0.1}
              max={3}
              step={0.1}
              value={brightness}
              onChange={v => updateProp('brightness', v)}
              width={200}
            />

            <PreviewSlider
              title="Depth Fade"
              min={1}
              max={20}
              step={0.5}
              value={depthFade}
              onChange={v => updateProp('depthFade', v)}
              width={200}
            />

            <PreviewSlider
              title="Far Plane"
              min={5}
              max={50}
              step={1}
              value={farPlane}
              onChange={v => updateProp('farPlane', v)}
              width={200}
            />

            <PreviewSlider
              title="Direction"
              min={0}
              max={360}
              step={5}
              value={direction}
              onChange={v => updateProp('direction', v)}
              valueUnit="°"
              width={200}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={pixelSnow} componentName="PixelSnow" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PixelSnowDemo;
