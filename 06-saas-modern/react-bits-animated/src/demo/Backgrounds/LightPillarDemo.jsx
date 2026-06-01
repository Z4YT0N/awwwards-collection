import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import LightPillar from '@/content/Backgrounds/LightPillar/LightPillar';
import { lightPillar } from '../../constants/code/Backgrounds/lightPillarCode';

const DEFAULT_PROPS = {
  topColor: '#5227FF',
  bottomColor: '#FF9FFC',
  intensity: 1.0,
  rotationSpeed: 0.3,
  interactive: false,
  glowAmount: 0.002,
  pillarWidth: 3.0,
  pillarHeight: 0.4,
  noiseIntensity: 0.5,
  mixBlendMode: 'screen',
  pillarRotation: 25,
  quality: 'high'
};

const LightPillarDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    interactive,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    mixBlendMode,
    pillarRotation,
    quality
  } = props;

  const [key, forceRerender] = useForceRerender();

  const blendModeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'screen', label: 'Screen' },
    { value: 'darken', label: 'Darken' },
    { value: 'lighten', label: 'Lighten' },
    { value: 'color-dodge', label: 'Color Dodge' },
    { value: 'luminosity', label: 'Luminosity' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const propData = useMemo(
    () => [
      {
        name: 'topColor',
        type: 'string',
        default: "'#5227FF'",
        description: 'Hex color string for the top gradient color of the light pillar.'
      },
      {
        name: 'bottomColor',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Hex color string for the bottom gradient color of the light pillar.'
      },
      {
        name: 'intensity',
        type: 'number',
        default: '1.0',
        description: 'Controls the overall brightness and intensity of the effect.'
      },
      {
        name: 'rotationSpeed',
        type: 'number',
        default: '0.3',
        description: 'Speed multiplier for the pillar rotation animation.'
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'false',
        description: 'Enable mouse interaction to control the pillar rotation.'
      },
      {
        name: 'glowAmount',
        type: 'number',
        default: '0.005',
        description: 'Controls the glow intensity and spread of the light effect.'
      },
      {
        name: 'pillarWidth',
        type: 'number',
        default: '3.0',
        description: 'Width/radius of the light pillar.'
      },
      {
        name: 'pillarHeight',
        type: 'number',
        default: '0.4',
        description: 'Height scaling factor for the pillar distortion.'
      },
      {
        name: 'noiseIntensity',
        type: 'number',
        default: '0.5',
        description: 'Intensity of the film grain noise postprocessing effect.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS class names to apply to the container element.'
      },
      {
        name: 'mixBlendMode',
        type: 'string',
        default: "'screen'",
        description: 'CSS mix-blend-mode property to control how the component blends with its background.'
      },
      {
        name: 'pillarRotation',
        type: 'number',
        default: '0',
        description: 'Rotation angle of the pillar in degrees (0-360).'
      },
      {
        name: 'quality',
        type: "'low' | 'medium' | 'high'",
        default: "'high'",
        description:
          'Rendering quality level. Lower settings improve performance on mobile devices. Mobile devices automatically downgrade from high to medium.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <LightPillar
              key={key}
              topColor={topColor}
              bottomColor={bottomColor}
              intensity={intensity}
              rotationSpeed={rotationSpeed}
              interactive={interactive}
              glowAmount={glowAmount}
              pillarWidth={pillarWidth}
              pillarHeight={pillarHeight}
              noiseIntensity={noiseIntensity}
              mixBlendMode={mixBlendMode}
              pillarRotation={pillarRotation}
              quality={quality}
            />
            <BackgroundContent pillText="New Background" headline="Ethereal light pillar for your hero sections." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="light-pillar"
              currentProps={{
                topColor,
                bottomColor,
                intensity,
                rotationSpeed,
                interactive,
                glowAmount,
                pillarWidth,
                pillarHeight,
                noiseIntensity,
                pillarRotation
              }}
              defaultProps={{
                topColor: '#5227FF',
                bottomColor: '#FF9FFC',
                intensity: 1,
                rotationSpeed: 0.3,
                interactive: false,
                glowAmount: 0.005,
                pillarWidth: 3,
                pillarHeight: 0.4,
                noiseIntensity: 0.5,
                pillarRotation: 0
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom title="Top Color" color={topColor} onChange={val => updateProp('topColor', val)} />
            <PreviewColorPickerCustom title="Bottom Color" color={bottomColor} onChange={val => updateProp('bottomColor', val)} />
            <PreviewSlider
              title="Intensity"
              min={0.1}
              max={3}
              step={0.1}
              value={intensity}
              onChange={v => updateProp('intensity', v)}
            />
            <PreviewSlider
              title="Rotation Speed"
              min={0}
              max={2}
              step={0.1}
              value={rotationSpeed}
              onChange={v => updateProp('rotationSpeed', v)}
            />
            <PreviewSlider
              title="Glow Amount"
              min={0.001}
              max={0.02}
              step={0.001}
              value={glowAmount}
              onChange={v => updateProp('glowAmount', v)}
            />
            <PreviewSlider
              title="Pillar Width"
              min={1}
              max={10}
              step={0.1}
              value={pillarWidth}
              onChange={v => updateProp('pillarWidth', v)}
            />
            <PreviewSlider
              title="Pillar Height"
              min={0.1}
              max={2}
              step={0.1}
              value={pillarHeight}
              onChange={v => updateProp('pillarHeight', v)}
            />
            <PreviewSlider
              title="Noise Intensity"
              min={0}
              max={2}
              step={0.1}
              value={noiseIntensity}
              onChange={v => updateProp('noiseIntensity', v)}
            />
            <PreviewSlider
              title="Pillar Rotation"
              min={0}
              max={360}
              step={1}
              value={pillarRotation}
              onChange={v => updateProp('pillarRotation', v)}
            />
            <PreviewSwitch
              title="Interactive"
              isChecked={interactive}
              onChange={() => updateProp('interactive', !interactive)}
            />
            <PreviewSelect
              title="Mix Blend Mode"
              options={blendModeOptions}
              value={mixBlendMode}
              onChange={v => updateProp('mixBlendMode', v)}
              width={150}
            />
            <PreviewSelect
              title="Quality"
              options={qualityOptions}
              value={quality}
              onChange={v => updateProp('quality', v)}
              width={150}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={lightPillar} componentName="LightPillar" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LightPillarDemo;
