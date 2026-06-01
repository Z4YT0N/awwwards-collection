import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Lanyard from '../../content/Components/Lanyard/Lanyard';
import { lanyard } from '../../constants/code/Components/lanyardCode';

const DEFAULT_PROPS = {
  cameraDistance: 24,
  stopGravity: false
};

const LanyardDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { cameraDistance, stopGravity } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'position',
        type: 'array',
        default: '[0, 0, 30]',
        description: 'Initial camera position for the canvas.'
      },
      {
        name: 'gravity',
        type: 'array',
        default: '[0, -40, 0]',
        description: 'Gravity vector for the physics simulation.'
      },
      {
        name: 'fov',
        type: 'number',
        default: '20',
        description: 'Camera field of view.'
      },
      {
        name: 'transparent',
        type: 'boolean',
        default: 'true',
        description: 'Enables a transparent background for the canvas.'
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
      demoOnlyProps={['cameraDistance', 'stopGravity']}
      computedProps={{ position: [0, 0, cameraDistance], gravity: stopGravity ? [0, 0, 0] : [0, -40, 0] }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box
            position="relative"
            className="demo-container"
            h={500}
            p={0}
            overflow="hidden"
            bg="linear-gradient(180deg, #2F293A 0%, #120F17 100%)"
          >
            <RefreshButton onClick={forceRerender} />
            <Text position="absolute" fontSize="clamp(2rem, 6vw, 6rem)" fontWeight={900} color="#2F293A">
              Drag It!
            </Text>
            <Lanyard key={key} position={[0, 0, cameraDistance]} gravity={stopGravity ? [0, 0, 0] : [0, -40, 0]} />
          </Box>

          <Customize>
            <PreviewSlider
              title="Camera Distance"
              min={20}
              max={50}
              step={1}
              value={cameraDistance}
              onChange={val => {
                updateProp('cameraDistance', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Disable Gravity"
              isChecked={stopGravity}
              onChange={checked => updateProp('stopGravity', checked)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies
            dependencyList={['three', 'meshline', '@react-three/fiber', '@react-three/drei', '@react-three/rapier']}
          />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={lanyard} componentName="Lanyard" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LanyardDemo;
