import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PlasmaWave from '../../content/Backgrounds/PlasmaWave/PlasmaWave';
import { plasmaWave } from '../../constants/code/Backgrounds/plasmaWaveCode';

const DEFAULT_PROPS = {
  color1: '#A855F7',
  color2: '#06B6D4',
  speed1: 0.05,
  speed2: 0.05,
  focalLength: 0.8,
  bend1: 1,
  bend2: 0.5,
  dir2: 1.0,
  rotationDeg: 0
};

const PlasmaWaveDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { color1, color2, speed1, speed2, focalLength, bend1, bend2, dir2, rotationDeg } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'colors',
        type: '[string, string]',
        default: '["#A855F7", "#06B6D4"]',
        description: 'Array of two hex colors — one for each plasma wave band.'
      },
      {
        name: 'speed1',
        type: 'number',
        default: '0.05',
        description: 'Speed of the first plasma wave.'
      },
      {
        name: 'speed2',
        type: 'number',
        default: '0.05',
        description: 'Speed of the second plasma wave.'
      },
      {
        name: 'dir2',
        type: 'number',
        default: '1.0',
        description: 'Direction multiplier for the second wave. Use -1 to reverse.'
      },
      {
        name: 'focalLength',
        type: 'number',
        default: '0.8',
        description: 'Focal length of the camera projection.'
      },
      {
        name: 'bend1',
        type: 'number',
        default: '1',
        description: 'Bend intensity of the first wave.'
      },
      {
        name: 'bend2',
        type: 'number',
        default: '0.5',
        description: 'Bend intensity of the second wave.'
      },
      {
        name: 'rotationDeg',
        type: 'number',
        default: '0',
        description: 'Rotation angle of the scene in degrees.'
      },
      {
        name: 'xOffset',
        type: 'number',
        default: '0',
        description: 'Horizontal offset of the viewport.'
      },
      {
        name: 'yOffset',
        type: 'number',
        default: '0',
        description: 'Vertical offset of the viewport.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['color1', 'color2']}
      computedProps={{ colors: [color1, color2] }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <PlasmaWave
              key={key}
              colors={[color1, color2]}
              speed1={speed1}
              speed2={speed2}
              focalLength={focalLength}
              bend1={bend1}
              bend2={bend2}
              dir2={dir2}
              rotationDeg={rotationDeg}
            />

            <BackgroundContent pillText="New Background" headline="Raymarched plasma waves powered by OGL" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="plasma-wave"
              currentProps={{ colors: [color1, color2], speed1, speed2, focalLength, bend1, bend2, dir2 }}
              defaultProps={{ colors: ['#A855F7', '#06B6D4'], speed1: 0.05, speed2: 0.05, focalLength: 0.8, bend1: 1, bend2: 0.5, dir2: 1.0 }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => { updateProp('color1', val); forceRerender(); }} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => { updateProp('color2', val); forceRerender(); }} />

            <PreviewSlider title="Speed 1" min={0} max={0.2} step={0.005} value={speed1} onChange={val => { updateProp('speed1', val); forceRerender(); }} />
            <PreviewSlider title="Speed 2" min={0} max={0.2} step={0.005} value={speed2} onChange={val => { updateProp('speed2', val); forceRerender(); }} />
            <PreviewSlider title="Focal Length" min={0.1} max={2} step={0.05} value={focalLength} onChange={val => { updateProp('focalLength', val); forceRerender(); }} />
            <PreviewSlider title="Bend 1" min={0} max={3} step={0.1} value={bend1} onChange={val => { updateProp('bend1', val); forceRerender(); }} />
            <PreviewSlider title="Bend 2" min={0} max={3} step={0.1} value={bend2} onChange={val => { updateProp('bend2', val); forceRerender(); }} />
            <PreviewSlider title="Direction 2" min={-1} max={1} step={0.1} value={dir2} onChange={val => { updateProp('dir2', val); forceRerender(); }} />
            <PreviewSlider title="Rotation" min={0} max={360} step={1} value={rotationDeg} onChange={val => { updateProp('rotationDeg', val); forceRerender(); }} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={plasmaWave} componentName="PlasmaWave" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PlasmaWaveDemo;
