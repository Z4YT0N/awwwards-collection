import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

import Waves from '../../content/Backgrounds/Waves/Waves';
import { waves } from '../../constants/code/Backgrounds/wavesCode';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  lineColor: '#ffffff',
  waveSpeedX: 0.0125
};

const WavesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { lineColor, waveSpeedX } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'lineColor',
        type: 'string',
        default: 'black',
        description: 'Defines the color of the wave lines drawn on the canvas.'
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: 'transparent',
        description: 'Sets the background color of the waves container.'
      },
      {
        name: 'waveSpeedX',
        type: 'number',
        default: '0.0125',
        description: 'Horizontal speed factor for the wave animation.'
      },
      {
        name: 'waveSpeedY',
        type: 'number',
        default: '0.005',
        description: 'Vertical speed factor for the wave animation.'
      },
      {
        name: 'waveAmpX',
        type: 'number',
        default: '32',
        description: 'Horizontal amplitude of each wave.'
      },
      {
        name: 'waveAmpY',
        type: 'number',
        default: '16',
        description: 'Vertical amplitude of each wave.'
      },
      {
        name: 'xGap',
        type: 'number',
        default: '10',
        description: 'Horizontal gap between individual wave lines.'
      },
      {
        name: 'yGap',
        type: 'number',
        default: '32',
        description: 'Vertical gap between points on each wave line.'
      },
      {
        name: 'friction',
        type: 'number',
        default: '0.925',
        description: 'Controls how quickly the cursor effect slows down.'
      },
      {
        name: 'tension',
        type: 'number',
        default: '0.005',
        description: "Determines the 'springiness' of the cursor effect on points."
      },
      {
        name: 'maxCursorMove',
        type: 'number',
        default: '100',
        description: 'Limits how far each point can shift due to cursor movement.'
      },
      {
        name: 'style',
        type: 'object',
        default: '{}',
        description: 'Inline styles applied to the container element.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Custom class name(s) applied to the container element.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" h={500} className="demo-container" overflow="hidden" p={0}>
            <Waves key={key} waveSpeedX={waveSpeedX} lineColor={lineColor} />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="waves"
              currentProps={{
                lineColor,
                waveSpeedX
              }}
              defaultProps={{
                lineColor: '#5227FF',
                backgroundColor: 'transparent',
                waveSpeedX: 0.02,
                waveSpeedY: 0.01,
                waveAmpX: 40,
                waveAmpY: 20,
                friction: 0.9,
                tension: 0.01,
                maxCursorMove: 120,
                xGap: 12,
                yGap: 36
              }}
            />
          </Flex>

          <Customize onRerender={forceRerender}>
            <PreviewSlider
              min={0}
              max={0.1}
              step={0.01}
              value={waveSpeedX}
              title="Wave Speed X"
              onChange={val => updateProp('waveSpeedX', val)}
            />

            <PreviewColorPickerCustom title="Waves Color" color={lineColor} onChange={val => updateProp('lineColor', val)} />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={waves} componentName="Waves" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default WavesDemo;
