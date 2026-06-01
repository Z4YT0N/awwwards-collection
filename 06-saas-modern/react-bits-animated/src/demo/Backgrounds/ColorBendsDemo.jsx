import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';

import { colorBends } from '@/constants/code/Backgrounds/colorBendsCode';
import ColorBends from '@/content/Backgrounds/ColorBends/ColorBends';

const DEFAULT_PROPS = {
  rotation: 90,
  autoRotate: 0,
  speed: 0.2,
  scale: 1,
  frequency: 1,
  warpStrength: 1,
  mouseInfluence: 1,
  parallax: 0.5,
  noise: 0.15,
  iterations: 1,
  intensity: 1.5,
  bandWidth: 6,
  color: '#A855F7'
};

const ColorBendsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { rotation, autoRotate, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise, iterations, intensity, bandWidth, color } = props;

  const propData = useMemo(
    () => [
      { name: 'rotation', type: 'number', default: '90', description: 'Base rotation angle in degrees.' },
      { name: 'autoRotate', type: 'number', default: '0', description: 'Automatic rotation speed in degrees/sec.' },
      { name: 'speed', type: 'number', default: '0.2', description: 'Animation time scale of the shader.' },
      {
        name: 'colors',
        type: 'string[]',
        default: '[]',
        description: 'Palette of up to 8 hex colors used to blend the bends.'
      },
      {
        name: 'transparent',
        type: 'boolean',
        default: 'true',
        description: 'Whether the background is transparent (uses alpha).'
      },
      { name: 'scale', type: 'number', default: '1', description: 'Zoom factor of the pattern.' },
      { name: 'frequency', type: 'number', default: '1', description: 'Wave frequency used in the pattern.' },
      {
        name: 'warpStrength',
        type: 'number',
        default: '1',
        description: 'Amount of warping/distortion applied to waves.'
      },
      {
        name: 'mouseInfluence',
        type: 'number',
        default: '1',
        description: 'How strongly the waves react to pointer movement.'
      },
      {
        name: 'parallax',
        type: 'number',
        default: '0.5',
        description: 'Parallax factor shifting content with pointer.'
      },
      { name: 'noise', type: 'number', default: '0.15', description: 'Adds subtle grain. 0 disables noise.' },
      { name: 'iterations', type: 'number', default: '1', description: 'Number of extra warp passes (1-5). Higher values create more complex patterns.' },
      { name: 'intensity', type: 'number', default: '1.5', description: 'Brightness multiplier for the final color output.' },
      { name: 'bandWidth', type: 'number', default: '6', description: 'Controls the width/falloff of each color band.' },
      { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the container.' },
      { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Inline styles for the container.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <ColorBends
              rotation={rotation}
              autoRotate={autoRotate}
              speed={speed}
              scale={scale}
              frequency={frequency}
              warpStrength={warpStrength}
              mouseInfluence={mouseInfluence}
              parallax={parallax}
              noise={noise}
              iterations={iterations}
              intensity={intensity}
              bandWidth={bandWidth}
              colors={[color]}
            />

            <BackgroundContent pillText="New Background" headline="You have the power to reshape your own destiny" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="color-bends"
              currentProps={{
                rotation,
                speed,
                colors: [color],
                transparent: true,
                autoRotate,
                scale,
                frequency,
                warpStrength,
                mouseInfluence,
                parallax,
                noise,
                iterations,
                intensity,
                bandWidth
              }}
              defaultProps={{
                rotation: 90,
                speed: 0.2,
                colors: ['#5227FF', '#FF9FFC', '#7cff67'],
                transparent: true,
                autoRotate: 0,
                scale: 1,
                frequency: 1,
                warpStrength: 1,
                mouseInfluence: 1,
                parallax: 0.5,
                noise: 0.15,
                iterations: 1,
                intensity: 1.5,
                bandWidth: 6
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom
              title="Color"
              color={color}
              onChange={v => updateProp('color', v)}
            />
            <PreviewSlider
              title="Rotation (deg)"
              min={-180}
              max={180}
              step={1}
              value={rotation}
              onChange={v => updateProp('rotation', v)}
            />
            <PreviewSlider
              title="Auto Rotate (deg/s)"
              min={-5}
              max={5}
              step={1}
              value={autoRotate}
              onChange={v => updateProp('autoRotate', v)}
            />
            <PreviewSlider
              title="Speed"
              min={0}
              max={1}
              step={0.01}
              value={speed}
              onChange={v => updateProp('speed', v)}
            />
            <PreviewSlider
              title="Scale"
              min={0.2}
              max={5}
              step={0.1}
              value={scale}
              onChange={v => updateProp('scale', v)}
            />
            <PreviewSlider
              title="Frequency"
              min={0.0}
              max={5}
              step={0.1}
              value={frequency}
              onChange={v => updateProp('frequency', v)}
            />
            <PreviewSlider
              title="Warp Strength"
              min={0.9}
              max={1}
              step={0.005}
              value={warpStrength}
              onChange={v => updateProp('warpStrength', v)}
            />
            <PreviewSlider
              title="Mouse Influence"
              min={0}
              max={2}
              step={0.05}
              value={mouseInfluence}
              onChange={v => updateProp('mouseInfluence', v)}
            />
            <PreviewSlider
              title="Parallax"
              min={0}
              max={2}
              step={0.05}
              value={parallax}
              onChange={v => updateProp('parallax', v)}
            />
            <PreviewSlider
              title="Noise"
              min={0}
              max={1}
              step={0.01}
              value={noise}
              onChange={v => updateProp('noise', v)}
            />
            <PreviewSlider
              title="Iterations"
              min={1}
              max={5}
              step={1}
              value={iterations}
              onChange={v => updateProp('iterations', v)}
            />
            <PreviewSlider
              title="Intensity"
              min={0.1}
              max={2}
              step={0.1}
              value={intensity}
              onChange={v => updateProp('intensity', v)}
            />
            <PreviewSlider
              title="Band Width"
              min={1}
              max={20}
              step={0.5}
              value={bandWidth}
              onChange={v => updateProp('bandWidth', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={colorBends} componentName="ColorBends" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ColorBendsDemo;
