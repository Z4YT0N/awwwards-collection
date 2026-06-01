import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PropTable from '../../components/common/Preview/PropTable';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import Lightning from '../../content/Backgrounds/Lightning/Lightning';
import { lightning } from '../../constants/code/Backgrounds/lightningCode';

const DEFAULT_PROPS = {
  hue: 260,
  xOffset: 0,
  speed: 1,
  intensity: 1,
  size: 1
};

const LightningDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { hue, xOffset, speed, intensity, size } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'hue',
        type: 'number',
        default: '230',
        description: 'Hue of the lightning in degrees (0 to 360).'
      },
      {
        name: 'xOffset',
        type: 'number',
        default: '0',
        description: 'Horizontal offset of the lightning in normalized units.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Animation speed multiplier for the lightning.'
      },
      {
        name: 'intensity',
        type: 'number',
        default: '1',
        description: 'Brightness multiplier for the lightning.'
      },
      {
        name: 'size',
        type: 'number',
        default: '1',
        description: 'Scale factor for the bolt size.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <Lightning key={key} hue={hue} xOffset={xOffset} speed={speed} intensity={intensity} size={size} />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="The power of nature's fury, with React Bits!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="lightning"
              currentProps={{ hue, xOffset, speed, intensity, size }}
              defaultProps={{ hue: 230, xOffset: 0, speed: 1, intensity: 1, size: 1 }}
            />
          </Flex>

          <Customize>
            <PreviewSlider
              title="Hue"
              min={0}
              max={360}
              step={1}
              value={hue}
              onChange={val => {
                updateProp('hue', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="X Offset"
              min={-2}
              max={2}
              step={0.1}
              value={xOffset}
              onChange={val => {
                updateProp('xOffset', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Speed"
              min={0.5}
              max={2}
              step={0.1}
              value={speed}
              onChange={val => {
                updateProp('speed', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Intensity"
              min={0.1}
              max={2}
              step={0.1}
              value={intensity}
              onChange={val => {
                updateProp('intensity', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Size"
              min={0.1}
              max={3}
              step={0.1}
              value={size}
              onChange={val => {
                updateProp('size', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={lightning} componentName="Lightning" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LightningDemo;
