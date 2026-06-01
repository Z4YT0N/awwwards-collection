import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Dither from '../../content/Backgrounds/Dither/Dither';
import { dither } from '../../constants/code/Backgrounds/ditherCode';

function rgbArrayToHex([r, g, b]) {
  const toHex = n => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgbArray(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

const DEFAULT_PROPS = {
  waveColor: [0.5, 0.5, 0.5],
  mouseRadius: 0.3,
  colorNum: 4,
  waveAmplitude: 0.3,
  waveFrequency: 3,
  waveSpeed: 0.05,
  enableMouseInteraction: true,
  disableAnimation: false
};

const DitherDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    waveColor,
    mouseRadius,
    colorNum,
    waveAmplitude,
    waveFrequency,
    waveSpeed,
    enableMouseInteraction,
    disableAnimation
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'waveSpeed',
        type: 'number',
        default: '0.05',
        description: 'Speed of the wave animation.'
      },
      {
        name: 'waveFrequency',
        type: 'number',
        default: '3',
        description: 'Frequency of the wave pattern.'
      },
      {
        name: 'waveAmplitude',
        type: 'number',
        default: '0.3',
        description: 'Amplitude of the wave pattern.'
      },
      {
        name: 'waveColor',
        type: '[number, number, number]',
        default: '[0.5, 0.5, 0.5]',
        description: 'Color of the wave, defined as an RGB array.'
      },
      {
        name: 'colorNum',
        type: 'number',
        default: '4',
        description: 'Number of colors to use in the dithering effect.'
      },
      {
        name: 'pixelSize',
        type: 'number',
        default: '2',
        description: 'Size of the pixels for the dithering effect.'
      },
      {
        name: 'disableAnimation',
        type: 'boolean',
        default: 'false',
        description: 'Disable the wave animation when true.'
      },
      {
        name: 'enableMouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enables mouse interaction to influence the wave effect.'
      },
      {
        name: 'mouseRadius',
        type: 'number',
        default: '1',
        description: 'Radius for the mouse interaction effect.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <Dither
              waveColor={waveColor}
              disableAnimation={disableAnimation}
              enableMouseInteraction={enableMouseInteraction}
              mouseRadius={mouseRadius}
              colorNum={colorNum}
              waveAmplitude={waveAmplitude}
              waveFrequency={waveFrequency}
              waveSpeed={waveSpeed}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Retro dithered waves to enhance your UI" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="dither"
              currentProps={{
                waveColor,
                disableAnimation,
                enableMouseInteraction,
                mouseRadius,
                colorNum,
                pixelSize: 2,
                waveAmplitude,
                waveFrequency,
                waveSpeed
              }}
              defaultProps={{
                waveColor: [0.32, 0.15, 1.0],
                disableAnimation: false,
                enableMouseInteraction: true,
                mouseRadius: 1,
                colorNum: 4,
                pixelSize: 2,
                waveAmplitude: 0.3,
                waveFrequency: 3,
                waveSpeed: 0.05
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom
              title="Wave Color"
              color={rgbArrayToHex(waveColor)}
              onChange={hex => updateProp('waveColor', hexToRgbArray(hex))}
            />

            <PreviewSlider
              title="Color Intensity"
              min={2.5}
              max={40}
              step={0.1}
              value={colorNum}
              onChange={val => {
                updateProp('colorNum', val);
              }}
            />

            <PreviewSlider
              title="Wave Amplitude"
              min={0}
              max={1}
              step={0.01}
              value={waveAmplitude}
              onChange={val => {
                updateProp('waveAmplitude', val);
              }}
            />

            <PreviewSlider
              title="Wave Frequency"
              min={0}
              max={10}
              step={0.1}
              value={waveFrequency}
              onChange={val => {
                updateProp('waveFrequency', val);
              }}
            />

            <PreviewSwitch
              title="Disable Animation"
              isChecked={disableAnimation}
              onChange={checked => {
                updateProp('disableAnimation', checked);
              }}
            />
            <PreviewSlider
              title="Wave Speed"
              min={0}
              max={0.1}
              isDisabled={disableAnimation}
              step={0.01}
              value={waveSpeed}
              onChange={val => {
                updateProp('waveSpeed', val);
              }}
            />

            <PreviewSwitch
              title="Mouse Interaction"
              isChecked={enableMouseInteraction}
              onChange={checked => {
                updateProp('enableMouseInteraction', checked);
              }}
            />

            <PreviewSlider
              title="Mouse Radius"
              min={0}
              isDisabled={!enableMouseInteraction}
              max={2}
              step={0.1}
              value={mouseRadius}
              onChange={val => {
                updateProp('mouseRadius', val);
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies
            dependencyList={['three', 'postprocessing', '@react-three/fiber', '@react-three/postprocessing']}
          />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={dither} componentName="Dither" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DitherDemo;
