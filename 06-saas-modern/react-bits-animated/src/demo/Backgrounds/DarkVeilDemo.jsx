import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import { darkVeil } from '../../constants/code/Backgrounds/darkVeilCode';
import DarkVeil from '../../content/Backgrounds/DarkVeil/DarkVeil';

const DEFAULT_PROPS = {
  hueShift: 0,
  noiseIntensity: 0,
  scanlineIntensity: 0,
  speed: 0.5,
  scanlineFrequency: 0,
  warpAmount: 0
};

const DarkVeilDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount } = props;
  const [key] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'hueShift',
        type: 'number',
        default: '0',
        description: 'Shifts the hue of the entire animation.'
      },
      {
        name: 'noiseIntensity',
        type: 'number',
        default: '0',
        description: 'Intensity of the noise/grain effect.'
      },
      {
        name: 'scanlineIntensity',
        type: 'number',
        default: '0',
        description: 'Intensity of the scanline effect.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.5',
        description: 'Speed of the animation.'
      },
      {
        name: 'scanlineFrequency',
        type: 'number',
        default: '0',
        description: 'Frequency of the scanlines.'
      },
      {
        name: 'warpAmount',
        type: 'number',
        default: '0',
        description: 'Amount of warp distortion applied to the effect.'
      },
      {
        name: 'resolutionScale',
        type: 'number',
        default: '1',
        description: 'Scale factor for the resolution.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            <DarkVeil
              key={key}
              hueShift={hueShift}
              noiseIntensity={noiseIntensity}
              scanlineIntensity={scanlineIntensity}
              speed={speed}
              scanlineFrequency={scanlineFrequency}
              warpAmount={warpAmount}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Become emboldened by the flame of ambition" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="dark-veil"
              currentProps={{ hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount }}
              defaultProps={{
                hueShift: 0,
                noiseIntensity: 0,
                scanlineIntensity: 0,
                speed: 0.5,
                scanlineFrequency: 0,
                warpAmount: 0
              }}
            />
          </Flex>

          <Customize>
            <PreviewSlider
              title="Speed"
              min={0}
              max={3}
              step={0.1}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />
            <PreviewSlider
              title="Hue Shift"
              min={0}
              max={360}
              step={1}
              value={hueShift}
              onChange={val => updateProp('hueShift', val)}
            />
            <PreviewSlider
              title="Noise Intensity"
              min={0}
              max={0.2}
              step={0.01}
              value={noiseIntensity}
              onChange={val => updateProp('noiseIntensity', val)}
            />
            <PreviewSlider
              title="Scanline Frequency"
              min={0.5}
              max={5}
              step={0.1}
              value={scanlineFrequency}
              onChange={val => updateProp('scanlineFrequency', val)}
            />
            <PreviewSlider
              title="Scanline Intensity"
              min={0}
              max={1}
              step={0.01}
              value={scanlineIntensity}
              onChange={val => updateProp('scanlineIntensity', val)}
            />
            <PreviewSlider
              title="Warp Amount"
              min={0}
              max={5}
              step={0.1}
              value={warpAmount}
              onChange={val => updateProp('warpAmount', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={darkVeil} componentName="DarkVeil" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DarkVeilDemo;
