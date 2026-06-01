import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import PrismaticBurst from '../../content/Backgrounds/PrismaticBurst/PrismaticBurst';
import { prismaticBurst } from '../../constants/code/Backgrounds/prismaticBurstCode';

const DEFAULT_PROPS = {
  animationType: 'rotate3d',
  intensity: 2,
  speed: 0.5,
  distort: 0,
  hoverDampness: 0.25,
  rayCount: 0,
  color0: '#A855F7',
  color1: '#7C3AED',
  color2: '#6366F1'
};

const PrismaticBurstDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { animationType, intensity, speed, distort, hoverDampness, rayCount, color0, color1, color2 } = props;
  const userColors = [color0, color1, color2].filter(Boolean);

  const propData = useMemo(
    () => [
      {
        name: 'intensity',
        type: 'number',
        default: '2',
        description: 'Overall brightness multiplier applied after accumulation.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.5',
        description: 'Global time multiplier controlling ray motion & distortion.'
      },
      {
        name: 'animationType',
        type: '"rotate" | "rotate3d" | "hover"',
        default: '"rotate3d"',
        description: 'Core motion style: planar rotation, full 3D rotation, or pointer hover orbit'
      },
      {
        name: 'colors',
        type: 'string[]',
        default: '[]',
        description: 'Optional array of hex colors used as a gradient (otherwise spectral)'
      },
      {
        name: 'distort',
        type: 'number',
        default: '0',
        description: 'Amount of bend/distortion applied to marching space (adds organic wobble)'
      },
      {
        name: 'paused',
        type: 'boolean',
        default: 'false',
        description: 'Freeze time progression when true (animation stops)'
      },
      {
        name: 'offset',
        type: '{ x?: number|string; y?: number|string }',
        default: '{ x: 0, y: 0 }',
        description: 'Pixel (or CSS length) offset of focal origin from center'
      },
      {
        name: 'hoverDampness',
        type: 'number',
        default: '0',
        description: "Smoothing factor (0-1) for pointer tracking when animationType='hover'"
      },
      {
        name: 'rayCount',
        type: 'number',
        default: 'undefined',
        description: 'If > 0 applies an angular comb filter to produce discrete ray spokes'
      },
      {
        name: 'mixBlendMode',
        type: "CSSProperties['mixBlendMode'] | 'none'",
        default: '"lighten"',
        description: "Canvas CSS mix-blend-mode (e.g. lighten, screen) or 'none' for normal"
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <PrismaticBurst
              animationType={animationType}
              intensity={intensity}
              speed={speed}
              distort={distort}
              hoverDampness={hoverDampness}
              rayCount={rayCount || undefined}
              {...(userColors.length ? { colors: userColors } : {})}
            />

            <BackgroundContent pillText="New Background" headline="A burst of dancing colors, beautifully unleashed" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="prismatic-burst"
              currentProps={{
                animationType,
                intensity,
                speed,
                distort,
                hoverDampness,
                rayCount,
                colors: userColors.length ? userColors : undefined
              }}
              defaultProps={{
                animationType: 'rotate3d',
                intensity: 2,
                speed: 0.5,
                distort: 0,
                hoverDampness: 0.25,
                rayCount: 0
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color 1" color={color0} onChange={val => updateProp('color0', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color2} onChange={val => updateProp('color2', val)} />

            <PreviewSelect
              title="Animation Type"
              options={[
                { value: 'rotate', label: 'Rotate' },
                { value: 'rotate3d', label: 'Rotate 3D' },
                { value: 'hover', label: 'Hover' }
              ]}
              value={animationType}
              onChange={val => updateProp('animationType', val)}
              width={140}
            />

            <PreviewSlider
              title="Intensity"
              min={0.1}
              max={5}
              step={0.1}
              value={intensity}
              onChange={val => updateProp('intensity', val)}
            />

            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Distort"
              min={0}
              max={10}
              step={0.1}
              value={distort}
              onChange={val => updateProp('distort', val)}
            />

            <PreviewSlider
              title="Ray Count"
              min={0}
              max={64}
              step={1}
              value={rayCount}
              onChange={val => updateProp('rayCount', val)}
            />

            {animationType === 'hover' && (
              <PreviewSlider
                title="Hover Dampness"
                min={0}
                max={1}
                step={0.01}
                value={hoverDampness}
                onChange={val => updateProp('hoverDampness', val)}
              />
            )}
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={prismaticBurst} componentName="PrismaticBurst" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PrismaticBurstDemo;
