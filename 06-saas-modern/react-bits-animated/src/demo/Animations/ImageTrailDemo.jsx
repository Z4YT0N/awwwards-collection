import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Text } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import { imageTrail } from '../../constants/code/Animations/imageTrailCode';
import ImageTrail from '../../content/Animations/ImageTrail/ImageTrail';

const DEFAULT_PROPS = {
  variant: '1'
};

const ImageTrailDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { variant } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'string[]',
        default: '[]',
        description: 'An array of image URLs which will be animated in the trail.'
      },
      {
        name: 'variant',
        type: 'number',
        default: '1',
        description: 'A number from 1 to 8 - all different animation styles.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <ImageTrail
              key={key}
              items={[
                'https://picsum.photos/id/287/300/300',
                'https://picsum.photos/id/1001/300/300',
                'https://picsum.photos/id/1025/300/300',
                'https://picsum.photos/id/1026/300/300',
                'https://picsum.photos/id/1027/300/300',
                'https://picsum.photos/id/1028/300/300',
                'https://picsum.photos/id/1029/300/300',
                'https://picsum.photos/id/1030/300/300'
              ]}
              variant={variant}
            />

            <Flex position="absolute" justifyContent="center" flexDirection="column" alignItems="center">
              <Text fontSize="clamp(2rem, 6vw, 6rem)" fontWeight={900} color="#2F293A" mb={0}>
                Hover Me.
              </Text>
              <Text fontSize="18px" fontWeight={900} color="#a6a6a6" mt={0}>
                Variant {variant}
              </Text>
            </Flex>
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton backgroundId="image-trail" currentProps={{ variant }} defaultProps={DEFAULT_PROPS} />
          </Flex>

          <Customize>
            <PreviewSelect
              title="Variant"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' }
              ]}
              value={variant}
              onChange={val => {
                updateProp('variant', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={imageTrail} componentName="ImageTrail" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ImageTrailDemo;
