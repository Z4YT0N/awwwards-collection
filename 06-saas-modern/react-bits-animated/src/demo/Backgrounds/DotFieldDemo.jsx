import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

import PropTable from '../../components/common/Preview/PropTable';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import DotField from '../../content/Backgrounds/DotField/DotField';
import { dotField } from '../../constants/code/Backgrounds/dotFieldCode';

const DEFAULT_PROPS = {
  dotRadius: 1.5,
  dotSpacing: 14,
  cursorRadius: 500,
  cursorForce: 0.1,
  bulgeOnly: true,
  bulgeStrength: 67,
  glowRadius: 160,
  sparkle: false,
  waveAmplitude: 0,
  gradientFrom: '#A855F7',
  gradientTo: '#B497CF',
  glowColor: '#120F17'
};

const DotFieldDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, gradientFrom, gradientTo, glowColor } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'dotRadius',
        type: 'number',
        default: '1.5',
        description: 'Radius of each individual dot in the grid.'
      },
      {
        name: 'dotSpacing',
        type: 'number',
        default: '14',
        description: 'Spacing between dots in the grid.'
      },
      {
        name: 'cursorRadius',
        type: 'number',
        default: '500',
        description: 'Radius of the cursor interaction area.'
      },
      {
        name: 'cursorForce',
        type: 'number',
        default: '0.1',
        description: 'Force applied to dots when not in bulge mode.'
      },
      {
        name: 'bulgeOnly',
        type: 'boolean',
        default: 'true',
        description: 'When true, dots bulge away from cursor. When false, dots are pushed with physics.'
      },
      {
        name: 'bulgeStrength',
        type: 'number',
        default: '67',
        description: 'Strength of the bulge effect around the cursor.'
      },
      {
        name: 'glowRadius',
        type: 'number',
        default: '160',
        description: 'Radius of the SVG glow effect that follows the cursor.'
      },
      {
        name: 'sparkle',
        type: 'boolean',
        default: 'false',
        description: 'When enabled, ~3% of dots randomly sparkle at a larger size.'
      },
      {
        name: 'waveAmplitude',
        type: 'number',
        default: '0',
        description: 'Amplitude of the wave displacement animation applied to dots.'
      },
      {
        name: 'gradientFrom',
        type: 'string',
        default: "'rgba(168, 85, 247, 0.35)'",
        description: 'Start color of the diagonal gradient applied to dots.'
      },
      {
        name: 'gradientTo',
        type: 'string',
        default: "'rgba(180, 151, 207, 0.25)'",
        description: 'End color of the diagonal gradient applied to dots.'
      },
      {
        name: 'glowColor',
        type: 'string',
        default: "'#120F17'",
        description: 'Color of the radial glow effect that follows the cursor.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <DotField
              key={key}
              dotRadius={dotRadius}
              dotSpacing={dotSpacing}
              cursorRadius={cursorRadius}
              cursorForce={cursorForce}
              bulgeOnly={bulgeOnly}
              bulgeStrength={bulgeStrength}
              glowRadius={glowRadius}
              sparkle={sparkle}
              waveAmplitude={waveAmplitude}
              gradientFrom={gradientFrom}
              gradientTo={gradientTo}
              glowColor={glowColor}
            />

            <BackgroundContent />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="dot-field"
              currentProps={{ dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, gradientFrom, gradientTo, glowColor }}
              defaultProps={DEFAULT_PROPS}
            />
          </Flex>

          <Customize onReset={resetProps} onRerender={forceRerender} hasChanges={hasChanges}>
            <PreviewSlider
              title="Dot Radius"
              min={0.5}
              max={5}
              step={0.5}
              value={dotRadius}
              onChange={val => updateProp('dotRadius', val)}
            />

            <PreviewSlider
              title="Dot Spacing"
              min={5}
              max={30}
              step={1}
              value={dotSpacing}
              onChange={val => updateProp('dotSpacing', val)}
            />

            <PreviewSlider
              title="Cursor Radius"
              min={100}
              max={1000}
              step={50}
              value={cursorRadius}
              onChange={val => updateProp('cursorRadius', val)}
            />

            <PreviewSlider
              title="Cursor Force"
              min={0}
              max={1}
              step={0.01}
              value={cursorForce}
              onChange={val => updateProp('cursorForce', val)}
            />

            <PreviewSwitch
              title="Bulge Only"
              isChecked={bulgeOnly}
              onChange={checked => updateProp('bulgeOnly', checked)}
            />

            <PreviewSlider
              title="Bulge Strength"
              min={0}
              max={150}
              step={1}
              value={bulgeStrength}
              onChange={val => updateProp('bulgeStrength', val)}
            />

            <PreviewSlider
              title="Glow Radius"
              min={50}
              max={400}
              step={10}
              value={glowRadius}
              onChange={val => updateProp('glowRadius', val)}
            />

            <PreviewSlider
              title="Wave Amplitude"
              min={0}
              max={20}
              step={1}
              value={waveAmplitude}
              onChange={val => updateProp('waveAmplitude', val)}
            />

            <PreviewSwitch
              title="Sparkle"
              isChecked={sparkle}
              onChange={checked => updateProp('sparkle', checked)}
            />

            <PreviewColorPickerCustom
              title="Gradient From"
              color={gradientFrom}
              onChange={val => updateProp('gradientFrom', val)}
            />

            <PreviewColorPickerCustom
              title="Gradient To"
              color={gradientTo}
              onChange={val => updateProp('gradientTo', val)}
            />

            <PreviewColorPickerCustom
              title="Glow Color"
              color={glowColor}
              onChange={val => updateProp('glowColor', val)}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={dotField} componentName="DotField" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DotFieldDemo;
