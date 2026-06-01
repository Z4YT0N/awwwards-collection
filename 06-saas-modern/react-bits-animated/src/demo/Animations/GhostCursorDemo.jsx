import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import GhostCursor from '@/content/Animations/GhostCursor/GhostCursor';
import { ghostCursor } from '@/constants/code/Animations/ghostCursorCode';

const DEFAULT_PROPS = {
  trailLength: 50,
  inertia: 0.5,
  grainIntensity: 0.05,
  bloomStrength: 0.1,
  bloomRadius: 1.0,
  bloomThreshold: 0.025,
  brightness: 2,
  color: '#B497CF',
  fadeDelayMs: 1000,
  fadeDurationMs: 1500
};

const GhostCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    trailLength,
    inertia,
    grainIntensity,
    bloomStrength,
    bloomRadius,
    bloomThreshold,
    brightness,
    color,
    fadeDelayMs,
    fadeDurationMs
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS class names for the container.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '{}',
        description: 'Inline styles for the container element.'
      },
      {
        name: 'trailLength',
        type: 'number',
        default: '50',
        description: 'Number of points stored for the cursor trail (longer = longer smear).'
      },
      {
        name: 'inertia',
        type: 'number',
        default: '0.5',
        description: 'Velocity retention when the pointer stops. Higher values make the cursor glide longer.'
      },
      {
        name: 'grainIntensity',
        type: 'number',
        default: '0.05',
        description: 'Strength of the film grain post-processing pass.'
      },
      { name: 'bloomStrength', type: 'number', default: '0.1', description: 'UnrealBloom effect strength.' },
      {
        name: 'bloomRadius',
        type: 'number',
        default: '1.0',
        description: 'UnrealBloom radius controlling spread of glow.'
      },
      {
        name: 'bloomThreshold',
        type: 'number',
        default: '0.025',
        description: 'UnrealBloom threshold; lower includes more pixels in bloom.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1',
        description: 'Final brightness multiplier applied to the effect color.'
      },
      { name: 'color', type: 'string', default: "'#B497CF'", description: 'Base color of the ghost cursor effect.' },
      {
        name: 'mixBlendMode',
        type: 'CSS mix-blend-mode',
        default: "'screen'",
        description: 'Blend mode used when compositing with page content.'
      },
      {
        name: 'edgeIntensity',
        type: 'number',
        default: '0',
        description: 'Darkening near edges of the canvas. 0 = none, 1 = strongest.'
      },
      {
        name: 'maxDevicePixelRatio',
        type: 'number',
        default: '0.5',
        description: 'Upper cap for devicePixelRatio to control render cost on high-DPR displays.'
      },
      {
        name: 'targetPixels',
        type: 'number',
        default: 'auto (~1.3e6 desktop, ~0.9e6 touch)',
        description: 'Pixel budget. Resolution is dynamically scaled to keep total pixel count under this budget.'
      },
      {
        name: 'fadeDelayMs',
        type: 'number',
        default: 'auto (1000 desktop, 500 touch)',
        description: 'Idle delay before the trail starts to fade after pointer leaves/stops.'
      },
      {
        name: 'fadeDurationMs',
        type: 'number',
        default: 'auto (1500 desktop, 1000 touch)',
        description: 'Duration of the trail fade-out once the delay has elapsed.'
      },
      {
        name: 'zIndex',
        type: 'number',
        default: '10',
        description: 'z-index applied to the canvas for layering above/below content.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            <GhostCursor
              trailLength={trailLength}
              inertia={inertia}
              grainIntensity={grainIntensity}
              bloomStrength={bloomStrength}
              bloomRadius={bloomRadius}
              bloomThreshold={bloomThreshold}
              brightness={brightness}
              color={color}
              fadeDelayMs={fadeDelayMs}
              fadeDurationMs={fadeDurationMs}
            />

            <Text
              position="absolute"
              userSelect="none"
              fontSize="clamp(3rem, 8vw, 8rem)"
              zIndex={11}
              fontWeight={900}
              color="#120F17"
            >
              Boo!
            </Text>
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="ghost-cursor"
              currentProps={{
                trailLength,
                inertia,
                grainIntensity,
                bloomStrength,
                bloomRadius,
                brightness,
                color
              }}
              defaultProps={DEFAULT_PROPS}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={color} onChange={val => updateProp('color', val)} />

            <PreviewSlider
              title="Trail Length"
              min={10}
              max={50}
              step={5}
              value={trailLength}
              onChange={v => updateProp('trailLength', v)}
            />
            <PreviewSlider
              title="Inertia"
              min={0}
              max={0.99}
              step={0.01}
              value={inertia}
              onChange={v => updateProp('inertia', v)}
            />
            <PreviewSlider
              title="Grain Intensity"
              min={0}
              max={0.5}
              step={0.01}
              value={grainIntensity}
              onChange={v => updateProp('grainIntensity', v)}
            />
            <PreviewSlider
              title="Bloom Strength"
              min={0}
              max={10}
              step={0.05}
              value={bloomStrength}
              onChange={v => updateProp('bloomStrength', v)}
            />
            <PreviewSlider
              title="Bloom Radius"
              min={0}
              max={10}
              step={0.05}
              value={bloomRadius}
              onChange={v => updateProp('bloomRadius', v)}
            />
            <PreviewSlider
              title="Bloom Threshold"
              min={0}
              max={1}
              step={0.01}
              value={bloomThreshold}
              onChange={v => updateProp('bloomThreshold', v)}
            />
            <PreviewSlider
              title="Brightness"
              min={0}
              max={10}
              step={0.1}
              value={brightness}
              onChange={v => updateProp('brightness', v)}
            />
            <PreviewSlider
              title="Fade Delay (ms)"
              min={0}
              max={3000}
              step={100}
              value={fadeDelayMs}
              onChange={v => updateProp('fadeDelayMs', v)}
            />
            <PreviewSlider
              title="Fade Duration (ms)"
              min={100}
              max={5000}
              step={100}
              value={fadeDurationMs}
              onChange={v => updateProp('fadeDurationMs', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={ghostCursor} componentName="GhostCursor" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GhostCursorDemo;
