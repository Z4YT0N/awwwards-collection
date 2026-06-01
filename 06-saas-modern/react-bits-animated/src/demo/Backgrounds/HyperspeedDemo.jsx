import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { hyperspeedPresets } from '../../content/Backgrounds/Hyperspeed/HyperSpeedPresets';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PropTable from '../../components/common/Preview/PropTable';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import Customize from '../../components/common/Preview/Customize';

import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import Hyperspeed from '../../content/Backgrounds/Hyperspeed/Hyperspeed';
import { hyperspeed } from '../../constants/code/Backgrounds/hyperspeedCode';

const DEFAULT_PROPS = {
  activePreset: 'one'
};

const HyperspeedDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { activePreset } = props;
  const [key] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'effectOptions',
        type: 'object',
        default: 'See the "code" tab for default values and presets.',
        description:
          'The highly customizable configuration object for the effect, controls things like colors, distortion, line properties, etc.'
      }
    ],
    []
  );

  const options = [
    { value: 'one', label: 'Cyberpunk' },
    { value: 'two', label: 'Akira' },
    { value: 'three', label: 'Golden' },
    { value: 'four', label: 'Split' },
    { value: 'five', label: 'Highway' }
  ];

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['activePreset']}
      computedProps={{ effectOptions: hyperspeedPresets[activePreset] }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box
            key={key}
            position="relative"
            className="demo-container"
            overflow="hidden"
            h={500}
            cursor="pointer"
            p={0}
            mb={4}
          >
            <Hyperspeed effectOptions={hyperspeedPresets[activePreset]} />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Click & hold to see the real magic of hyperspeed!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="hyperspeed"
              currentProps={{ preset: activePreset }}
              defaultProps={{ preset: 'one' }}
            />
          </Flex>

          <Customize>
            <PreviewSelect
              title="Animation Preset"
              options={options}
              value={activePreset}
              name="tiltDirection"
              width={150}
              onChange={val => {
                updateProp('activePreset', val);
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', 'postprocessing']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={hyperspeed} componentName="Hyperspeed" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default HyperspeedDemo;
