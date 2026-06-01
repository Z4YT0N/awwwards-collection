import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Dependencies from '../../components/code/Dependencies';

import { domeGallery } from '../../constants/code/Components/domeGalleryCode';
import DomeGallery from '../../content/Components/DomeGallery/DomeGallery';

const DEFAULT_PROPS = {
  fit: 0.8,
  minRadius: 600,
  maxVerticalRotationDeg: 0,
  segments: 34,
  dragDampening: 2,
  grayscale: true
};

const DomeGalleryDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { fit, minRadius, maxVerticalRotationDeg, segments, dragDampening, grayscale } = props;

  const propData = useMemo(
    () => [
      {
        name: 'images',
        type: '(string | { src: string; alt?: string })[]',
        default: 'DEFAULT_IMAGES',
        description: 'Array of image URLs (strings) or image objects with src and optional alt text'
      },
      {
        name: 'fit',
        type: 'number',
        default: '0.5',
        description: 'Size factor for the dome radius based on container dimensions'
      },
      {
        name: 'fitBasis',
        type: "'auto' | 'min' | 'max' | 'width' | 'height'",
        default: "'auto'",
        description: 'Basis for calculating the dome size'
      },
      {
        name: 'minRadius',
        type: 'number',
        default: '600',
        description: 'Minimum radius for the dome in pixels'
      },
      {
        name: 'maxRadius',
        type: 'number',
        default: 'Infinity',
        description: 'Maximum radius for the dome in pixels'
      },
      {
        name: 'padFactor',
        type: 'number',
        default: '0.25',
        description: 'Padding factor for the viewer area'
      },
      {
        name: 'overlayBlurColor',
        type: 'string',
        default: "'#120F17'",
        description: 'Color for the outer portion of the radial overlay blur'
      },
      {
        name: 'maxVerticalRotationDeg',
        type: 'number',
        default: '5',
        description: 'Maximum vertical rotation angle in degrees'
      },
      {
        name: 'dragSensitivity',
        type: 'number',
        default: '20',
        description: 'Sensitivity of drag interactions'
      },
      {
        name: 'enlargeTransitionMs',
        type: 'number',
        default: '300',
        description: 'Duration of image enlargement transition in milliseconds'
      },
      {
        name: 'segments',
        type: 'number',
        default: '35',
        description: 'Number of segments for both X and Y to keep the dome proportional'
      },
      {
        name: 'dragDampening',
        type: 'number',
        default: '2',
        description: 'Damping factor for drag inertia (0-1, higher = more damping)'
      },
      {
        name: 'openedImageWidth',
        type: 'string',
        default: "'400px'",
        description: 'Width of the enlarged image'
      },
      {
        name: 'openedImageHeight',
        type: 'string',
        default: "'400px'",
        description: 'Height of the enlarged image'
      },
      {
        name: 'imageBorderRadius',
        type: 'string',
        default: "'30px'",
        description: 'Border radius for closed tile images'
      },
      {
        name: 'openedImageBorderRadius',
        type: 'string',
        default: "'30px'",
        description: 'Border radius for opened/enlarged images'
      },
      {
        name: 'grayscale',
        type: 'boolean',
        default: 'true',
        description: 'Whether to render all images in grayscale'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <DomeGallery
              fit={fit}
              minRadius={minRadius}
              maxVerticalRotationDeg={maxVerticalRotationDeg}
              segments={segments}
              dragDampening={dragDampening}
              grayscale={grayscale}
            />
          </Box>

          <Text display="flex" gap="0.4em" mt="1em" color="#B497CF" alignItems="center">
            <FiInfo />
            Click images to expand
          </Text>

          <Customize>
            <PreviewSlider
              title="Fit"
              min={0.5}
              max={1}
              step={0.05}
              value={fit}
              onChange={value => {
                updateProp('fit', value);
              }}
            />

            <PreviewSlider
              title="Min Radius"
              min={300}
              max={1000}
              step={50}
              value={minRadius}
              valueUnit="px"
              onChange={value => {
                updateProp('minRadius', value);
              }}
            />

            <PreviewSlider
              title="Max Vertical Rotation"
              min={0}
              max={20}
              step={1}
              value={maxVerticalRotationDeg}
              valueUnit="°"
              onChange={value => {
                updateProp('maxVerticalRotationDeg', value);
              }}
            />

            <PreviewSlider
              title="Segments"
              min={20}
              max={34}
              step={2}
              value={segments}
              onChange={value => {
                updateProp('segments', value);
              }}
            />

            <PreviewSlider
              title="Drag Dampening"
              min={0}
              max={5}
              step={0.2}
              value={dragDampening}
              onChange={value => {
                updateProp('dragDampening', value);
              }}
            />

            <PreviewSwitch
              title="Grayscale"
              isChecked={grayscale}
              onChange={checked => {
                updateProp('grayscale', checked);
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['@use-gesture/react']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={domeGallery} componentName="DomeGallery" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DomeGalleryDemo;
