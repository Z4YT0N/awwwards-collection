import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Grainient from '@/content/Backgrounds/Grainient/Grainient';
import { grainient } from '../../constants/code/Backgrounds/grainientCode';

const DEFAULT_PROPS = {
  color1: '#FF9FFC',
  color2: '#5227FF',
  color3: '#B497CF',
  timeSpeed: 0.25,
  colorBalance: 0.0,
  warpStrength: 1.0,
  warpFrequency: 5.0,
  warpSpeed: 2.0,
  warpAmplitude: 50.0,
  blendAngle: 0.0,
  blendSoftness: 0.05,
  rotationAmount: 500.0,
  noiseScale: 2.0,
  grainAmount: 0.1,
  grainScale: 2.0,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1.0,
  saturation: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.9
};

const GrainientDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    color3,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'color1',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Primary light color used in the gradient blend.'
      },
      {
        name: 'color2',
        type: 'string',
        default: "'#5227FF'",
        description: 'Secondary accent color used in the gradient blend.'
      },
      {
        name: 'color3',
        type: 'string',
        default: "'#B497CF'",
        description: 'Deep base color used in the gradient blend.'
      },
      {
        name: 'timeSpeed',
        type: 'number',
        default: '0.25',
        description: 'Animation speed multiplier for the gradient motion.'
      },
      {
        name: 'colorBalance',
        type: 'number',
        default: '0.0',
        description: 'Shifts the palette balance toward dark or lighter tones.'
      },
      {
        name: 'warpStrength',
        type: 'number',
        default: '1.0',
        description: 'Strength of the wave warp distortion (0 = none).'
      },
      {
        name: 'warpFrequency',
        type: 'number',
        default: '5.0',
        description: 'Frequency of the wave warp.'
      },
      {
        name: 'warpSpeed',
        type: 'number',
        default: '2.0',
        description: 'Speed multiplier for the warp animation.'
      },
      {
        name: 'warpAmplitude',
        type: 'number',
        default: '50.0',
        description: 'Base amplitude for the warp distortion.'
      },
      {
        name: 'blendAngle',
        type: 'number',
        default: '0.0',
        description: 'Rotation angle for the color blend axis (degrees).'
      },
      {
        name: 'blendSoftness',
        type: 'number',
        default: '0.05',
        description: 'Softens the blend edges between color layers.'
      },
      {
        name: 'rotationAmount',
        type: 'number',
        default: '500.0',
        description: 'Rotation amount driven by noise.'
      },
      {
        name: 'noiseScale',
        type: 'number',
        default: '2.0',
        description: 'Scales the noise frequency that drives rotation.'
      },
      {
        name: 'grainAmount',
        type: 'number',
        default: '0.1',
        description: 'Amount of film grain applied to the gradient.'
      },
      {
        name: 'grainScale',
        type: 'number',
        default: '2.0',
        description: 'Scale of the grain pattern.'
      },
      {
        name: 'grainAnimated',
        type: 'boolean',
        default: 'false',
        description: 'Animate grain over time.'
      },
      {
        name: 'contrast',
        type: 'number',
        default: '1.5',
        description: 'Overall contrast applied to the final color.'
      },
      {
        name: 'gamma',
        type: 'number',
        default: '1.0',
        description: 'Gamma correction for the final color.'
      },
      {
        name: 'saturation',
        type: 'number',
        default: '1.0',
        description: 'Saturation amount for the final color.'
      },
      {
        name: 'centerX',
        type: 'number',
        default: '0.0',
        description: 'Horizontal offset of the gradient center.'
      },
      {
        name: 'centerY',
        type: 'number',
        default: '0.0',
        description: 'Vertical offset of the gradient center.'
      },
      {
        name: 'zoom',
        type: 'number',
        default: '0.9',
        description: 'Zoom level for the gradient field.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes applied to the container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <Grainient
              key={key}
              color1={color1}
              color2={color2}
              color3={color3}
              timeSpeed={timeSpeed}
              colorBalance={colorBalance}
              warpStrength={warpStrength}
              warpFrequency={warpFrequency}
              warpSpeed={warpSpeed}
              warpAmplitude={warpAmplitude}
              blendAngle={blendAngle}
              blendSoftness={blendSoftness}
              rotationAmount={rotationAmount}
              noiseScale={noiseScale}
              grainAmount={grainAmount}
              grainScale={grainScale}
              grainAnimated={grainAnimated}
              contrast={contrast}
              gamma={gamma}
              saturation={saturation}
              centerX={centerX}
              centerY={centerY}
              zoom={zoom}
            />
            <BackgroundContent pillText="New Background" headline="Grainy gradient colors with soft motion." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="grainient"
              currentProps={{
                color1,
                color2,
                color3,
                timeSpeed,
                colorBalance,
                warpStrength,
                warpFrequency,
                warpSpeed,
                warpAmplitude,
                blendAngle,
                blendSoftness,
                rotationAmount,
                noiseScale,
                grainAmount,
                grainScale,
                grainAnimated,
                contrast,
                gamma,
                saturation,
                centerX,
                centerY,
                zoom
              }}
              defaultProps={{
                color1: '#FF9FFC',
                color2: '#5227FF',
                color3: '#B497CF',
                timeSpeed: 0.25,
                colorBalance: 0.0,
                warpStrength: 1.0,
                warpFrequency: 5.0,
                warpSpeed: 2.0,
                warpAmplitude: 50.0,
                blendAngle: 0.0,
                blendSoftness: 0.05,
                rotationAmount: 500.0,
                noiseScale: 2.0,
                grainAmount: 0.1,
                grainScale: 2.0,
                grainAnimated: false,
                contrast: 1.5,
                gamma: 1.0,
                saturation: 1.0,
                centerX: 0.0,
                centerY: 0.0,
                zoom: 0.9
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color3} onChange={val => updateProp('color3', val)} />

            <PreviewSlider
              title="Time Speed"
              min={0}
              max={5}
              step={0.05}
              value={timeSpeed}
              onChange={val => updateProp('timeSpeed', val)}
            />

            <PreviewSlider
              title="Color Balance"
              min={-1}
              max={1}
              step={0.01}
              value={colorBalance}
              onChange={val => updateProp('colorBalance', val)}
            />

            <PreviewSlider
              title="Warp Strength"
              min={0}
              max={4}
              step={0.05}
              value={warpStrength}
              onChange={val => updateProp('warpStrength', val)}
            />

            <PreviewSlider
              title="Warp Frequency"
              min={0}
              max={12}
              step={0.1}
              value={warpFrequency}
              onChange={val => updateProp('warpFrequency', val)}
            />

            <PreviewSlider
              title="Warp Speed"
              min={0}
              max={6}
              step={0.1}
              value={warpSpeed}
              onChange={val => updateProp('warpSpeed', val)}
            />

            <PreviewSlider
              title="Warp Amplitude"
              min={5}
              max={80}
              step={1}
              value={warpAmplitude}
              onChange={val => updateProp('warpAmplitude', val)}
            />

            <PreviewSlider
              title="Blend Angle"
              min={-180}
              max={180}
              step={1}
              value={blendAngle}
              onChange={val => updateProp('blendAngle', val)}
            />

            <PreviewSlider
              title="Blend Softness"
              min={0}
              max={1}
              step={0.01}
              value={blendSoftness}
              onChange={val => updateProp('blendSoftness', val)}
            />

            <PreviewSlider
              title="Rotation Amount"
              min={0}
              max={1440}
              step={10}
              value={rotationAmount}
              onChange={val => updateProp('rotationAmount', val)}
            />

            <PreviewSlider
              title="Noise Scale"
              min={0}
              max={4}
              step={0.05}
              value={noiseScale}
              onChange={val => updateProp('noiseScale', val)}
            />

            <PreviewSlider
              title="Grain Amount"
              min={0}
              max={0.4}
              step={0.01}
              value={grainAmount}
              onChange={val => updateProp('grainAmount', val)}
            />

            <PreviewSlider
              title="Grain Scale"
              min={0.2}
              max={8}
              step={0.1}
              value={grainScale}
              onChange={val => updateProp('grainScale', val)}
            />

            <PreviewSwitch
              title="Grain Animated"
              isChecked={grainAnimated}
              onChange={val => updateProp('grainAnimated', val)}
            />

            <PreviewSlider
              title="Contrast"
              min={0}
              max={2.5}
              step={0.05}
              value={contrast}
              onChange={val => updateProp('contrast', val)}
            />

            <PreviewSlider
              title="Gamma"
              min={0.4}
              max={2.5}
              step={0.05}
              value={gamma}
              onChange={val => updateProp('gamma', val)}
            />

            <PreviewSlider
              title="Saturation"
              min={0}
              max={2.5}
              step={0.05}
              value={saturation}
              onChange={val => updateProp('saturation', val)}
            />

            <PreviewSlider
              title="Center Offset X"
              min={-1}
              max={1}
              step={0.01}
              value={centerX}
              onChange={val => updateProp('centerX', val)}
            />

            <PreviewSlider
              title="Center Offset Y"
              min={-1}
              max={1}
              step={0.01}
              value={centerY}
              onChange={val => updateProp('centerY', val)}
            />

            <PreviewSlider
              title="Zoom"
              min={0.3}
              max={3}
              step={0.05}
              value={zoom}
              onChange={val => updateProp('zoom', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={grainient} componentName="Grainient" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GrainientDemo;
