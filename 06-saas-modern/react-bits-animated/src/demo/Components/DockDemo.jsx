import { useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { VscAccount, VscArchive, VscHome, VscSettingsGear } from 'react-icons/vsc';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Dock from '../../content/Components/Dock/Dock';
import { dock } from '../../constants/code/Components/dockCode';

const DEFAULT_PROPS = {
  panelHeight: 68,
  baseItemSize: 50,
  magnification: 70
};

const DockDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { panelHeight, baseItemSize, magnification } = props;

  const [key, forceRerender] = useForceRerender();

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') }
  ];

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'DockItemData[]',
        default: '[]',
        description:
          'Array of dock items. Each item should include an icon, label, onClick handler, and an optional className.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional CSS classes for the dock panel.'
      },
      {
        name: 'distance',
        type: 'number',
        default: '200',
        description: 'Pixel distance used to calculate the magnification effect based on mouse proximity.'
      },
      {
        name: 'panelHeight',
        type: 'number',
        default: '68',
        description: 'Height (in pixels) of the dock panel.'
      },
      {
        name: 'baseItemSize',
        type: 'number',
        default: '50',
        description: 'The base size (in pixels) for each dock item.'
      },
      {
        name: 'dockHeight',
        type: 'number',
        default: '256',
        description: 'Maximum height (in pixels) of the dock container.'
      },
      {
        name: 'magnification',
        type: 'number',
        default: '70',
        description: 'The magnified size (in pixels) applied to a dock item when hovered.'
      },
      {
        name: 'spring',
        type: 'SpringOptions',
        default: '{ mass: 0.1, stiffness: 150, damping: 12 }',
        description: 'Configuration options for the spring animation.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400}>
            <Text fontSize="2rem" fontWeight={900} color="#2F293A">
              Try it out!
            </Text>
            <Dock
              key={key}
              items={items}
              panelHeight={panelHeight}
              baseItemSize={baseItemSize}
              magnification={magnification}
            />
          </Box>

          <Customize>
            <PreviewSlider
              title="Background Height"
              min={30}
              max={200}
              step={10}
              value={panelHeight}
              onChange={val => {
                updateProp('panelHeight', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Item Size"
              min={20}
              max={60}
              step={10}
              value={baseItemSize}
              onChange={val => {
                updateProp('baseItemSize', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Magnification"
              min={50}
              max={100}
              step={10}
              value={magnification}
              onChange={val => {
                updateProp('magnification', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={dock} componentName="Dock" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DockDemo;
