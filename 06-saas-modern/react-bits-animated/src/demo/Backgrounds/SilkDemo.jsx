import { useCallback, useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import { silkCode } from '../../constants/code/Backgrounds/silkCode';
import Silk from '../../content/Backgrounds/Silk/Silk';

const DEFAULT_PROPS = {
  speed: 5,
  scale: 1,
  color: '#5227FF',
  noiseIntensity: 1.5,
  rotation: 0
};

const SilkDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { speed, scale, color, noiseIntensity, rotation } = props;

  const [key, forceRerender] = useForceRerender();

  const handleReset = useCallback(() => {
    resetProps();
    forceRerender();
  }, [resetProps, forceRerender]);

  const propData = useMemo(
    () => [
      {
        name: 'speed',
        type: 'number',
        default: '5',
        description: 'Controls the animation speed of the silk effect.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '1',
        description: 'Controls the scale of the silk pattern.'
      },
      {
        name: 'color',
        type: 'string',
        default: "'#7B7481'",
        description: 'Hex color code for the silk pattern.'
      },
      {
        name: 'noiseIntensity',
        type: 'number',
        default: '1.5',
        description: 'Controls the intensity of the noise effect.'
      },
      {
        name: 'rotation',
        type: 'number',
        default: '0',
        description: 'Controls the rotation of the silk pattern (in radians).'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={handleReset} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <Silk
              key={key}
              speed={speed}
              scale={scale}
              color={color}
              noiseIntensity={noiseIntensity}
              rotation={rotation}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Silk touch is a good enhancement, Steve!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="silk"
              currentProps={{ speed, scale, color, noiseIntensity, rotation }}
              defaultProps={{ speed: 5, scale: 1, color: '#7B7481', noiseIntensity: 1.5, rotation: 0 }}
            />
          </Flex>

          <Customize>
            <PreviewSlider
              title="Speed"
              min={0.1}
              max={20}
              step={0.1}
              value={speed}
              onChange={val => {
                updateProp('speed', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Scale"
              min={0.1}
              max={5}
              step={0.1}
              value={scale}
              onChange={val => {
                updateProp('scale', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Noise Intensity"
              min={0}
              max={10}
              step={0.1}
              value={noiseIntensity}
              onChange={val => {
                updateProp('noiseIntensity', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Rotation"
              min={0}
              max={Math.PI * 2}
              step={0.01}
              value={rotation}
              onChange={val => {
                updateProp('rotation', val);
                forceRerender();
              }}
            />

            <PreviewColorPickerCustom title="Color" color={color} onChange={val => { updateProp('color', val); forceRerender(); }} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', '@react-three/fiber']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={silkCode} componentName="Silk" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SilkDemo;
