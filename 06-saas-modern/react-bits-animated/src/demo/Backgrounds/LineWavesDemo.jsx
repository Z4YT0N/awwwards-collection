import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import LineWaves from '../../content/Backgrounds/LineWaves/LineWaves';
import { lineWaves } from '../../constants/code/Backgrounds/lineWavesCode';

const DEFAULT_PROPS = {
  speed: 0.3,
  innerLineCount: 32.0,
  outerLineCount: 36.0,
  warpIntensity: 1.0,
  rotation: -45,
  edgeFadeWidth: 0.0,
  colorCycleSpeed: 1.0,
  brightness: 0.2,
  color1: '#ffffff',
  color2: '#ffffff',
  color3: '#ffffff',
  enableMouseInteraction: true,
  mouseInfluence: 2.0
};

const LineWavesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    speed, innerLineCount, outerLineCount, warpIntensity, rotation,
    edgeFadeWidth, colorCycleSpeed, brightness,
    color1, color2, color3,
    enableMouseInteraction, mouseInfluence
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'speed',
        type: 'number',
        default: '0.3',
        description: 'Overall animation speed multiplier.'
      },
      {
        name: 'innerLineCount',
        type: 'number',
        default: '32.0',
        description: 'Number of lines in the inner (center) wave region.'
      },
      {
        name: 'outerLineCount',
        type: 'number',
        default: '36.0',
        description: 'Number of lines in the outer (edge) wave region.'
      },
      {
        name: 'warpIntensity',
        type: 'number',
        default: '1.0',
        description: 'Intensity of the wave distortion effect.'
      },
      {
        name: 'rotation',
        type: 'number',
        default: '-45',
        description: 'Rotation of the wave pattern in degrees.'
      },
      {
        name: 'edgeFadeWidth',
        type: 'number',
        default: '0.0',
        description: 'Width of the edge fade between inner and outer regions.'
      },
      {
        name: 'colorCycleSpeed',
        type: 'number',
        default: '1.0',
        description: 'Speed of color cycling animation.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '0.2',
        description: 'Overall brightness multiplier.'
      },
      {
        name: 'color1',
        type: 'string',
        default: '"#ffffff"',
        description: 'First color channel in HEX format.'
      },
      {
        name: 'color2',
        type: 'string',
        default: '"#ffffff"',
        description: 'Second color channel in HEX format.'
      },
      {
        name: 'color3',
        type: 'string',
        default: '"#ffffff"',
        description: 'Third color channel in HEX format.'
      },
      {
        name: 'enableMouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enable cursor-reactive wave distortion.'
      },
      {
        name: 'mouseInfluence',
        type: 'number',
        default: '2.0',
        description: 'Strength of mouse influence on the wave pattern.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <LineWaves
              speed={speed}
              innerLineCount={innerLineCount}
              outerLineCount={outerLineCount}
              warpIntensity={warpIntensity}
              rotation={rotation}
              edgeFadeWidth={edgeFadeWidth}
              colorCycleSpeed={colorCycleSpeed}
              brightness={brightness}
              color1={color1}
              color2={color2}
              color3={color3}
              enableMouseInteraction={enableMouseInteraction}
              mouseInfluence={mouseInfluence}
            />

            <BackgroundContent pillText="New Background" headline="Ride the waves of your creativity!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="line-waves"
              currentProps={{
                speed,
                innerLineCount,
                outerLineCount,
                warpIntensity,
                rotation,
                edgeFadeWidth,
                colorCycleSpeed,
                brightness,
                color1,
                color2,
                color3,
                enableMouseInteraction,
                mouseInfluence
              }}
              defaultProps={DEFAULT_PROPS}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color3} onChange={val => updateProp('color3', val)} />

            <PreviewSlider
              min={0.1}
              max={3}
              step={0.1}
              title="Speed"
              value={speed}
              onChange={val => {
                updateProp('speed', val);
              }}
            />

            <PreviewSlider
              min={2}
              max={40}
              step={1}
              title="Inner Line Count"
              value={innerLineCount}
              onChange={val => {
                updateProp('innerLineCount', val);
              }}
            />

            <PreviewSlider
              min={2}
              max={40}
              step={1}
              title="Outer Line Count"
              value={outerLineCount}
              onChange={val => {
                updateProp('outerLineCount', val);
              }}
            />

            <PreviewSlider
              min={0.1}
              max={3}
              step={0.1}
              title="Warp Intensity"
              value={warpIntensity}
              onChange={val => {
                updateProp('warpIntensity', val);
              }}
            />

            <PreviewSlider
              min={-180}
              max={180}
              step={1}
              title="Rotation"
              value={rotation}
              onChange={val => {
                updateProp('rotation', val);
              }}
            />

            <PreviewSlider
              min={0.0}
              max={1.0}
              step={0.05}
              title="Edge Fade Width"
              value={edgeFadeWidth}
              onChange={val => {
                updateProp('edgeFadeWidth', val);
              }}
            />

            <PreviewSlider
              min={0.1}
              max={5}
              step={0.1}
              title="Color Cycle Speed"
              value={colorCycleSpeed}
              onChange={val => {
                updateProp('colorCycleSpeed', val);
              }}
            />

            <PreviewSlider
              min={0.1}
              max={3}
              step={0.1}
              title="Brightness"
              value={brightness}
              onChange={val => {
                updateProp('brightness', val);
              }}
            />

            <PreviewSwitch
              title="Mouse Interaction"
              value={enableMouseInteraction}
              onChange={val => {
                updateProp('enableMouseInteraction', val);
              }}
            />

            {enableMouseInteraction && (
              <PreviewSlider
                min={0.1}
                max={2}
                step={0.1}
                title="Mouse Influence"
                value={mouseInfluence}
                onChange={val => {
                  updateProp('mouseInfluence', val);
                }}
              />
            )}
          </Customize>
          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={lineWaves} componentName="LineWaves" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LineWavesDemo;
