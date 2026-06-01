import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import GridMotion from '../../content/Backgrounds/GridMotion/GridMotion';
import { gridMotion } from '../../constants/code/Backgrounds/gridMotionCode';

const images = Array.from(
  { length: 30 },
  () =>
    'https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
);

const DEFAULT_PROPS = {
  items: images,
  gradientColor: 'black'
};

const GridMotionDemo = () => {
  const { props, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { items, gradientColor } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'array',
        default: '[]',
        description:
          'An array of items to display in the grid. Each item can be a string, JSX element, or an image URL.'
      },
      {
        name: 'gradientColor',
        type: 'string',
        default: 'black',
        description: 'Controls the color of the radial gradient used as the background.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} rounded="3xl" overflow="hidden">
            <GridMotion items={items} gradientColor={gradientColor} />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="grid-motion"
              currentProps={{ gradientColor }}
              defaultProps={{ gradientColor: '#5227FF' }}
            />
          </Flex>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gridMotion} componentName="GridMotion" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GridMotionDemo;
