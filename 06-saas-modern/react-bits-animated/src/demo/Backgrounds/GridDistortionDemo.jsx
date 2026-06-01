import { useRef, useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import GridDistortion from '../../content/Backgrounds/GridDistortion/GridDistortion';
import { gridDistortion } from '../../constants/code/Backgrounds/gridDistortionCode';

const DEFAULT_PROPS = {
  grid: 10,
  mouse: 0.25
};

const GridDistortionDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { grid, mouse } = props;

  const containerRef = useRef(null);

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'imgageSrc',
        type: 'string',
        default: '',
        description: 'The image you want to render inside the container.'
      },
      {
        name: 'grid',
        type: 'number',
        default: '15',
        description: 'The number of cells present in the distortion grid'
      },
      {
        name: 'mouse',
        type: 'number',
        default: '0.1',
        description: 'The size of the distortion effect that follows the cursor.'
      },
      {
        name: 'relaxation',
        type: 'number',
        default: '0.9',
        description: 'The speed at which grid cells return to their initial state.'
      },
      {
        name: 'strength',
        type: 'number',
        default: '0.15',
        description: 'The overall strength of the distortion effect.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Any custom class(es) you want to apply to the container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden" ref={containerRef}>
            <GridDistortion
              key={key}
              imageSrc="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              grid={grid}
              mouse={mouse}
              strength={0.15}
              relaxation={0.9}
              className="grid-distortion"
            />

            <BackgroundContent pillText="New Background" headline="Don't just sit there, move your cursor!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="grid-distortion"
              currentProps={{
                imageSrc:
                  'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                grid,
                mouse,
                strength: 0.15,
                relaxation: 0.9
              }}
              defaultProps={{
                imageSrc: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800',
                grid: 15,
                mouse: 0.1,
                strength: 0.15,
                relaxation: 0.9
              }}
            />
          </Flex>

          <Customize>
            <PreviewSlider
              title="Grid Size"
              min={6}
              max={200}
              step={1}
              value={grid}
              onChange={val => {
                updateProp('grid', val);
                forceRerender();
              }}
              width={200}
            />

            <PreviewSlider
              title="Mouse Size"
              min={0.1}
              max={0.5}
              step={0.01}
              value={mouse}
              onChange={val => {
                updateProp('mouse', val);
                forceRerender();
              }}
              width={200}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gridDistortion} componentName="GridDistortion" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GridDistortionDemo;
