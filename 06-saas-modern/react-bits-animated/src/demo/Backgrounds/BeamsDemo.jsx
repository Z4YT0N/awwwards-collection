import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { beams } from '../../constants/code/Backgrounds/beamsCode';
import Beams from '../../content/Backgrounds/Beams/Beams';

const DEFAULT_PROPS = {
  beamWidth: 3,
  beamHeight: 30,
  beamNumber: 20,
  lightColor: '#ffffff',
  speed: 2,
  noiseIntensity: 1.75,
  scale: 0.2,
  rotation: 30
};

const BeamsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation } = props;

  const propData = useMemo(
    () => [
      {
        name: 'beamWidth',
        type: 'number',
        default: '2',
        description: 'Width of each beam.'
      },
      {
        name: 'beamHeight',
        type: 'number',
        default: '15',
        description: 'Height of each beam.'
      },
      {
        name: 'beamNumber',
        type: 'number',
        default: '12',
        description: 'Number of beams to display.'
      },
      {
        name: 'lightColor',
        type: 'string',
        default: "'#ffffff'",
        description: 'Color of the directional light.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '2',
        description: 'Speed of the animation.'
      },
      {
        name: 'noiseIntensity',
        type: 'number',
        default: '1.75',
        description: 'Intensity of the noise effect overlay.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '0.2',
        description: 'Scale of the noise pattern.'
      },
      {
        name: 'rotation',
        type: 'number',
        default: '0',
        description: 'Rotation of the entire beams system in degrees.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <Beams
              beamWidth={beamWidth}
              beamHeight={beamHeight}
              beamNumber={beamNumber}
              lightColor={lightColor}
              speed={speed}
              noiseIntensity={noiseIntensity}
              scale={scale}
              rotation={rotation}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Radiant beams for creative user interfaces" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="beams"
              currentProps={{ beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation }}
              defaultProps={{
                beamWidth: 2,
                beamHeight: 15,
                beamNumber: 12,
                lightColor: '#ffffff',
                speed: 2,
                noiseIntensity: 1.75,
                scale: 0.2,
                rotation: 0
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={lightColor} onChange={val => updateProp('lightColor', val)} />
            <PreviewSlider
              title="Beam Width"
              min={0.1}
              max={10}
              step={0.1}
              value={beamWidth}
              onChange={val => updateProp('beamWidth', val)}
            />
            <PreviewSlider
              title="Beam Height"
              min={1}
              max={25}
              step={1}
              value={beamHeight}
              onChange={val => updateProp('beamHeight', val)}
            />
            <PreviewSlider
              title="Beam Count"
              min={1}
              max={50}
              step={1}
              value={beamNumber}
              onChange={val => updateProp('beamNumber', val)}
            />
            <PreviewSlider
              title="Speed"
              min={0.1}
              max={10}
              step={0.1}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />
            <PreviewSlider
              title="Noise Intensity"
              min={0}
              max={5}
              step={0.05}
              value={noiseIntensity}
              onChange={val => updateProp('noiseIntensity', val)}
            />
            <PreviewSlider
              title="Noise Scale"
              min={0.01}
              max={1}
              step={0.01}
              value={scale}
              onChange={val => updateProp('scale', val)}
            />
            <PreviewSlider
              title="Rotation"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={val => updateProp('rotation', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', '@react-three/fiber', '@react-three/drei']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={beams} componentName="Beams" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default BeamsDemo;
