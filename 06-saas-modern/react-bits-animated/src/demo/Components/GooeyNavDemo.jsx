import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import GooeyNav from '../../content/Components/GooeyNav/GooeyNav';
import { gooeyNav } from '../../constants/code/Components/gooeyNavCode';

const DEFAULT_PROPS = {
  particleCount: 15,
  timeVariance: 300,
  particleR: 100
};

const GooeyNavDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { particleCount, timeVariance, particleR } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'GooeyNavItem[]',
        default: '[]',
        description: 'Array of navigation items.'
      },
      {
        name: 'animationTime',
        type: 'number',
        default: '600',
        description: 'Duration (ms) of the main animation.'
      },
      {
        name: 'particleCount',
        type: 'number',
        default: '15',
        description: 'Number of bubble particles per transition.'
      },
      {
        name: 'particleDistances',
        type: '[number, number]',
        default: '[90, 10]',
        description: 'Outer and inner distances of bubble spread.'
      },
      {
        name: 'particleR',
        type: 'number',
        default: '100',
        description: 'Radius factor influencing random particle rotation.'
      },
      {
        name: 'timeVariance',
        type: 'number',
        default: '300',
        description: 'Random time variance (ms) for particle animations.'
      },
      {
        name: 'colors',
        type: 'number[]',
        default: '[1, 2, 3, 1, 2, 3, 1, 4]',
        description: 'Color indices used when creating bubble particles.'
      },
      {
        name: 'initialActiveIndex',
        type: 'number',
        default: '0',
        description: 'Which item is selected on mount.'
      }
    ],
    []
  );

  const items = [
    { label: 'Home', href: null },
    { label: 'About', href: null },
    { label: 'Contact', href: null }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <GooeyNav
              items={items}
              animationTime={500}
              particleCount={particleCount}
              particleDistances={[90, 0]}
              particleR={particleR}
              timeVariance={timeVariance}
              initialActiveIndex={0}
            />
          </Box>

          <Customize>
            <PreviewSlider
              title="Particle Count"
              min={1}
              max={50}
              step={1}
              value={particleCount}
              onChange={val => {
                updateProp('particleCount', val);
              }}
            />

            <PreviewSlider
              title="Animation Variance"
              min={0}
              max={2000}
              step={100}
              value={timeVariance}
              onChange={val => {
                updateProp('timeVariance', val);
              }}
            />

            <PreviewSlider
              title="Radius Factor"
              min={0}
              max={1000}
              step={100}
              value={particleR}
              onChange={val => {
                updateProp('particleR', val);
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gooeyNav} componentName="GooeyNav" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GooeyNavDemo;
