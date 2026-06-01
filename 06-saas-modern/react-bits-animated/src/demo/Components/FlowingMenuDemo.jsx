import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import FlowingMenu from '../../content/Components/FlowingMenu/FlowingMenu';
import { flowingMenu } from '../../constants/code/Components/flowingMenuCode';

const DEFAULT_PROPS = {
  speed: 15,
  textColor: '#ffffff',
  bgColor: '#120F17',
  marqueeBgColor: '#ffffff',
  marqueeTextColor: '#120F17',
  borderColor: '#ffffff'
};

const FlowingMenuDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { speed, textColor, bgColor, marqueeBgColor, marqueeTextColor, borderColor } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'object[]',
        default: '[]',
        description: 'An array of objects containing: link, text, image.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '15',
        description: 'Duration of the marquee animation in seconds (lower = faster).'
      },
      {
        name: 'textColor',
        type: 'string',
        default: '#ffffff',
        description: 'Color of the static menu text.'
      },
      {
        name: 'bgColor',
        type: 'string',
        default: '#120F17',
        description: 'Background color of the menu container.'
      },
      {
        name: 'marqueeBgColor',
        type: 'string',
        default: '#ffffff',
        description: 'Background color of the marquee overlay.'
      },
      {
        name: 'marqueeTextColor',
        type: 'string',
        default: '#120F17',
        description: 'Text color inside the marquee.'
      },
      {
        name: 'borderColor',
        type: 'string',
        default: '#ffffff',
        description: 'Color of the dividing lines between menu items.'
      }
    ],
    []
  );

  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" px={0} pt="100px" pb="100px">
            <FlowingMenu
              items={demoItems}
              speed={speed}
              textColor={textColor}
              bgColor={bgColor}
              marqueeBgColor={marqueeBgColor}
              marqueeTextColor={marqueeTextColor}
              borderColor={borderColor}
            />
          </Box>

          <Customize>
            <PreviewSlider title="Speed" min={1} max={60} step={1} value={speed} onChange={v => updateProp('speed', v)} />
            <PreviewColorPickerCustom title="Text Color" color={textColor} onChange={v => updateProp('textColor', v)} />
            <PreviewColorPickerCustom title="Background Color" color={bgColor} onChange={v => updateProp('bgColor', v)} />
            <PreviewColorPickerCustom title="Marquee BG Color" color={marqueeBgColor} onChange={v => updateProp('marqueeBgColor', v)} />
            <PreviewColorPickerCustom title="Marquee Text Color" color={marqueeTextColor} onChange={v => updateProp('marqueeTextColor', v)} />
            <PreviewColorPickerCustom title="Border Color" color={borderColor} onChange={v => updateProp('borderColor', v)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={flowingMenu} componentName="FlowingMenu" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FlowingMenuDemo;
