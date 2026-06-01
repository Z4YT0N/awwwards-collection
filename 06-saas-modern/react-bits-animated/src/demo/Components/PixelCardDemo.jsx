import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Text } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import { pixelCard } from '../../constants/code/Components/pixelCardCode';
import PixelCard from '../../content/Components/PixelCard/PixelCard';

const DEFAULT_PROPS = {
  variant: 'default'
};

const PixelCardDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { variant } = props;

  const propData = useMemo(
    () => [
      {
        name: 'variant',
        type: 'string',
        default: '"default"',
        description: 'Defines the color scheme and animation style.',
        options: 'default | yellow | blue | pink'
      },
      {
        name: 'gap',
        type: 'number',
        default: 'varies by variant',
        description: 'Pixel grid gap size in pixels.'
      },
      {
        name: 'speed',
        type: 'number',
        default: 'varies by variant',
        description: 'Animation speed modifier (lower is slower).'
      },
      {
        name: 'colors',
        type: 'string',
        default: '"#f8fafc,#f1f5f9,#cbd5e1"',
        description: 'Comma-separated list of colors for the pixel effect.'
      },
      {
        name: 'noFocus',
        type: 'boolean',
        default: 'false',
        description: 'If true, prevents animation from triggering on focus.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional CSS class for the wrapper.'
      },
      {
        name: 'style',
        type: 'object',
        default: '{}',
        description: 'Inline styles for the wrapper.'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: 'null',
        description: 'Content to render inside the pixel effect container.'
      }
    ],
    []
  );

  const options = [
    { value: 'default', label: 'Default' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'blue', label: 'Blue' },
    { value: 'pink', label: 'Pink' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            <PixelCard variant={variant}>
              <Flex w="100%" h="100%" position="absolute" justifyContent="center" alignItems="center">
                <Text fontSize="3rem" userSelect="none" fontWeight={900} mixBlendMode="screen" color="#2F293A">
                  Hover Me.
                </Text>
              </Flex>
            </PixelCard>
          </Box>

          <Customize>
            <PreviewSelect
              title="Variant"
              options={options}
              value={variant}
              name="variant"
              width={150}
              onChange={val => {
                updateProp('variant', val);
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={pixelCard} componentName="PixelCard" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PixelCardDemo;
