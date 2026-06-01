import { useEffect, useMemo, useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Spinner } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import InfiniteMenu from '../../content/Components/InfiniteMenu/InfiniteMenu';
import { infiniteMenu } from '../../constants/code/Components/infiniteMenuCode';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '@/components/common/Preview/Customize';

const DEFAULT_PROPS = {
  scale: 1.0
};

const InfiniteMenuDemo = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { scale } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'object[]',
        default: '[{...}]',
        description: 'List of items containing an image, link, title, and description - or just add what you need.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '1.0',
        description: 'Controls camera zoom'
      }
    ],
    []
  );

  const items = [
    {
      image: 'https://picsum.photos/300/300?grayscale',
      link: 'https://google.com/',
      title: 'Item 1',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/400/400?grayscale',
      link: 'https://google.com/',
      title: 'Item 2',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/500/500?grayscale',
      link: 'https://google.com/',
      title: 'Item 3',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/600/600?grayscale',
      link: 'https://google.com/',
      title: 'Item 4',
      description: 'This is pretty cool, right?'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsHidden(false);
    }, 1000);
  }, []);

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            {isHidden && <Spinner size="lg" position="absolute" />}
            <Box
              h={500}
              overflow="hidden"
              w="100%"
              p={0}
              opacity={isHidden ? 0 : 1}
              transform={isHidden ? 'scale(5)' : 'scale(1)'}
              transition="1s ease"
            >
              <InfiniteMenu items={items} scale={scale} />
            </Box>
          </Box>

          <Customize>
            <PreviewSlider
              title="Scale"
              min={0.1}
              max={3}
              step={0.1}
              value={scale}
              onChange={val => updateProp('scale', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gl-matrix']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={infiniteMenu} componentName="InfiniteMenu" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default InfiniteMenuDemo;
