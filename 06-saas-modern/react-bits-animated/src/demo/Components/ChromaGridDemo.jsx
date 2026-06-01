import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import { chromaGrid } from '../../constants/code/Components/chromaGridCode';
import ChromaGrid from '../../content/Components/ChromaGrid/ChromaGrid';

const DEFAULT_PROPS = {
  radius: 300,
  damping: 0.45,
  fadeOut: 0.6
};

const ChromaGridDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { radius, damping, fadeOut } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'Array',
        default: 'Demo []',
        description: 'Array of ChromaItem objects to display in the grid'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes to apply to the grid container'
      },
      {
        name: 'radius',
        type: 'number',
        default: '300',
        description: 'Size of the spotlight effect in pixels'
      },
      {
        name: 'damping',
        type: 'number',
        default: '0.45',
        description: 'Cursor follow animation duration in seconds'
      },
      {
        name: 'fadeOut',
        type: 'number',
        default: '0.6',
        description: 'Fade-out animation duration in seconds when mouse leaves'
      },
      {
        name: 'ease',
        type: 'string',
        default: "'power3.out'",
        description: 'GSAP easing function for animations'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h="auto" overflow="hidden" p={0} py={6}>
            <ChromaGrid radius={radius} damping={damping} fadeOut={fadeOut} />
          </Box>

          <Customize>
            <PreviewSlider title="Radius" min={50} max={800} step={25} value={radius} onChange={v => updateProp('radius', v)} />
            <PreviewSlider title="Damping" min={0.1} max={2} step={0.05} value={damping} onChange={v => updateProp('damping', v)} />
            <PreviewSlider title="Fade Out" min={0.1} max={2} step={0.05} value={fadeOut} onChange={v => updateProp('fadeOut', v)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={chromaGrid} componentName="ChromaGrid" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ChromaGridDemo;
