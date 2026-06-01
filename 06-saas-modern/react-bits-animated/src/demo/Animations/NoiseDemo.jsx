import { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PropTable from '../../components/common/Preview/PropTable';

import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import Customize from '../../components/common/Preview/Customize';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import Noise from '../../content/Animations/Noise/Noise';
import { noise } from '../../constants/code/Animations/noiseCode';

const DEFAULT_PROPS = {
  patternSize: 250,
  patternScaleX: 2,
  patternScaleY: 2,
  patternAlpha: 15
};

const NoiseDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { patternSize, patternScaleX, patternScaleY, patternAlpha } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'patternSize',
        type: 'number',
        default: 250,
        description: 'Defines the size of the grain pattern.'
      },
      {
        name: 'patternScaleX',
        type: 'number',
        default: 1,
        description: 'Scaling factor for the X-axis of the grain pattern.'
      },
      {
        name: 'patternScaleY',
        type: 'number',
        default: 1,
        description: 'Scaling factor for the Y-axis of the grain pattern.'
      },
      {
        name: 'patternRefreshInterval',
        type: 'number',
        default: 2,
        description: 'Number of frames before the grain pattern refreshes.'
      },
      {
        name: 'patternAlpha',
        type: 'number',
        default: 15,
        description: 'Opacity of the grain pattern (0-255).'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" background="#120F17" minH={400} overflow="hidden">
            <Text color="#2F293A" fontSize="6rem" fontWeight={900} textAlign={'center'}>
              Ooh, edgy!
            </Text>
            <Noise
              key={key}
              patternSize={patternSize}
              patternScaleX={patternScaleX}
              patternScaleY={patternScaleY}
              patternAlpha={patternAlpha}
            />
            <RefreshButton onClick={forceRerender} />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="noise"
              currentProps={{ patternSize, patternScaleX, patternScaleY, patternAlpha }}
              defaultProps={DEFAULT_PROPS}
            />
          </Flex>

          <Customize>
            <PreviewSlider
              title="Pattern Size"
              min={50}
              max={500}
              step={10}
              value={patternSize}
              valueUnit="px"
              onChange={val => {
                updateProp('patternSize', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Scale X"
              min={0.1}
              max={5}
              step={0.1}
              value={patternScaleX}
              onChange={val => {
                updateProp('patternScaleX', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Scale Y"
              min={0.1}
              max={5}
              step={0.1}
              value={patternScaleY}
              onChange={val => {
                updateProp('patternScaleY', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Pattern Alpha"
              min={0}
              max={25}
              step={5}
              value={patternAlpha}
              onChange={val => {
                updateProp('patternAlpha', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={noise} componentName="Noise" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default NoiseDemo;
