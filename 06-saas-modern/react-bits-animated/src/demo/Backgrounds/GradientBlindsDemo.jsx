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

import { gradientBlinds } from '../../constants/code/Backgrounds/gradientBlindsCode';
import GradientBlinds from '../../ts-default/Backgrounds/GradientBlinds/GradientBlinds';

const DEFAULT_PROPS = {
  color1: '#FF9FFC',
  color2: '#5227FF',
  angle: 20,
  noise: 0.5,
  blindCount: 16,
  blindMinWidth: 60,
  spotlightRadius: 0.5,
  distortAmount: 0,
  mouseDampening: 0.15,
  shineDirection: 'left'
};

const GradientBlindsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    angle,
    noise,
    blindCount,
    blindMinWidth,
    spotlightRadius,
    distortAmount,
    mouseDampening,
    shineDirection
  } = props;

  const gradientColors = [color1, color2];

  const propData = useMemo(
    () => [
      {
        name: 'gradientColors',
        type: 'string[]',
        default: "['#FF9FFC', '#5227FF']",
        description:
          'Array of hex colors (up to 8) forming the animated gradient. If one color is provided it is duplicated.'
      },
      {
        name: 'angle',
        type: 'number',
        default: '0',
        description: 'Rotation of the gradient in degrees (0 = horizontal left→right).'
      },
      {
        name: 'noise',
        type: 'number',
        default: '0.3',
        description: 'Strength of per‑pixel noise added to the final color (0 = clean).'
      },
      {
        name: 'blindCount',
        type: 'number',
        default: '16',
        description: 'Target number of vertical blinds. Acts as an upper bound when blindMinWidth is set.'
      },
      {
        name: 'blindMinWidth',
        type: 'number',
        default: '60',
        description:
          'Minimum pixel width for each blind. Reduces effective blindCount if necessary to satisfy this width.'
      },
      {
        name: 'mouseDampening',
        type: 'number',
        default: '0.15',
        description: 'Easing time constant (seconds) for the spotlight to follow the cursor. 0 = immediate.'
      },
      {
        name: 'mirrorGradient',
        type: 'boolean',
        default: 'false',
        description: 'Creates a mirrored ping‑pong gradient progression instead of a linear wrap.'
      },
      {
        name: 'spotlightRadius',
        type: 'number',
        default: '0.5',
        description: 'Normalized spotlight radius relative to the shorter canvas dimension.'
      },
      {
        name: 'spotlightSoftness',
        type: 'number',
        default: '1',
        description: 'Falloff exponent for spotlight edge. Higher = sharper edge (values >1 increase contrast).'
      },
      {
        name: 'spotlightOpacity',
        type: 'number',
        default: '1',
        description: 'Overall intensity multiplier for the spotlight highlight.'
      },
      {
        name: 'distortAmount',
        type: 'number',
        default: '0',
        description: 'Sin/cos warp intensity applied to UVs for subtle wavy distortion.'
      },
      {
        name: 'shineDirection',
        type: "'left' | 'right'",
        default: 'left',
        description: 'Flips the bright side of each blind; useful for composition with other elements.'
      },
      {
        name: 'mixBlendMode',
        type: 'string',
        default: "'lighten'",
        description: "CSS mix-blend-mode applied to the canvas (e.g. 'screen', 'overlay', 'multiply')."
      },
      {
        name: 'paused',
        type: 'boolean',
        default: 'false',
        description: 'If true, stops rendering updates (freezing the current frame).'
      },
      {
        name: 'dpr',
        type: 'number',
        default: 'window.devicePixelRatio',
        description: 'Overrides device pixel ratio; lower for performance, higher for sharpness.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Additional class names for the root container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} hasChanges={hasChanges} resetProps={resetProps}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <GradientBlinds
              gradientColors={gradientColors}
              angle={angle}
              noise={noise}
              blindCount={blindCount}
              blindMinWidth={blindMinWidth}
              spotlightRadius={spotlightRadius}
              distortAmount={distortAmount}
              mouseDampening={mouseDampening}
              shineDirection={shineDirection}
            />

            <BackgroundContent pillText="New Background" headline="Smooth gradients make everything better" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="gradient-blinds"
              currentProps={{
                gradientColors,
                angle,
                noise,
                blindCount,
                blindMinWidth,
                spotlightRadius,
                distortAmount,
                mouseDampening,
                shineDirection
              }}
              defaultProps={{
                gradientColors: ['#FF9FFC', '#5227FF'],
                angle: 0,
                noise: 0.3,
                blindCount: 16,
                blindMinWidth: 60,
                mouseDampening: 0.15,
                mirrorGradient: false,
                spotlightRadius: 0.5,
                spotlightSoftness: 1,
                spotlightOpacity: 1,
                distortAmount: 0,
                shineDirection: 'left'
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />

            <PreviewSelect
              title="Light Direction"
              value={shineDirection}
              onChange={v => updateProp('shineDirection', v)}
              options={[
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' }
              ]}
            />

            <PreviewSlider
              title="Blinds Angle"
              min={0}
              max={360}
              step={1}
              value={angle}
              onChange={v => updateProp('angle', v)}
            />
            <PreviewSlider
              title="Noise Amount"
              min={0}
              max={1}
              step={0.01}
              value={noise}
              onChange={v => updateProp('noise', v)}
            />

            <PreviewSlider
              title="Blinds Count"
              min={1}
              max={64}
              step={1}
              value={blindCount}
              onChange={v => updateProp('blindCount', v)}
            />

            <PreviewSlider
              title="Min Blind W"
              min={10}
              max={200}
              step={5}
              value={blindMinWidth}
              onChange={v => updateProp('blindMinWidth', v)}
            />

            <PreviewSlider
              title="Spot Radius"
              min={0.05}
              max={1}
              step={0.05}
              value={spotlightRadius}
              onChange={v => updateProp('spotlightRadius', v)}
            />

            <PreviewSlider
              title="Distort"
              min={0}
              max={100}
              step={1}
              value={distortAmount}
              onChange={v => updateProp('distortAmount', v)}
            />
            <PreviewSlider
              title="Mouse Damp"
              min={0}
              max={1}
              step={0.01}
              value={mouseDampening}
              onChange={v => updateProp('mouseDampening', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gradientBlinds} componentName="GradientBlinds" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GradientBlindsDemo;
