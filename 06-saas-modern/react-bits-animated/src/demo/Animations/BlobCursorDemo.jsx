import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PropTable from '../../components/common/Preview/PropTable';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { blobCursor } from '../../constants/code/Animations/blobCursorCode';
import BlobCursor from '../../ts-tailwind/Animations/BlobCursor/BlobCursor';

const DEFAULT_PROPS = {
  blobType: 'circle',
  fillColor: '#5227FF',
  trailCount: 3,
  sizes: [60, 125, 75],
  innerSizes: [20, 35, 25],
  innerColor: 'rgba(255,255,255,0.8)',
  opacities: [0.6, 0.6, 0.6],
  shadowColor: 'rgba(0,0,0,0.75)',
  shadowBlur: 5,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  fastDuration: 0.1,
  slowDuration: 0.5,
  zIndex: 100
};

const BlobCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    blobType,
    fillColor,
    trailCount,
    sizes,
    innerSizes,
    innerColor,
    opacities,
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    fastDuration,
    slowDuration,
    zIndex
  } = props;

  const propData = useMemo(
    () => [
      { name: 'blobType', type: "'circle' | 'square'", default: "'circle'", description: 'Shape of the blobs.' },
      { name: 'fillColor', type: 'string', default: "'#5227FF'", description: 'Background color of each blob.' },
      { name: 'trailCount', type: 'number', default: '3', description: 'How many trailing blobs.' },
      {
        name: 'sizes',
        type: 'number[]',
        default: '[60, 125, 75]',
        description: 'Sizes (px) of each blob. Length must be ≥ trailCount.'
      },
      {
        name: 'innerSizes',
        type: 'number[]',
        default: '[20, 35, 25]',
        description: 'Sizes (px) of inner dots. Length must be ≥ trailCount.'
      },
      {
        name: 'innerColor',
        type: 'string',
        default: "'rgba(255,255,255,0.8)'",
        description: 'Background color of the inner dot.'
      },
      {
        name: 'opacities',
        type: 'number[]',
        default: '[0.6, 0.6, 0.6]',
        description: 'Opacity of each blob. Length ≥ trailCount.'
      },
      { name: 'shadowColor', type: 'string', default: "'rgba(0,0,0,0.75)'", description: 'Box-shadow color.' },
      { name: 'shadowBlur', type: 'number', default: '5', description: 'Box-shadow blur radius (px).' },
      { name: 'shadowOffsetX', type: 'number', default: '10', description: 'Box-shadow X offset (px).' },
      { name: 'shadowOffsetY', type: 'number', default: '10', description: 'Box-shadow Y offset (px).' },
      {
        name: 'filterId',
        type: 'string',
        default: "'blob'",
        description: 'Optional custom filter ID (for multiple instances).'
      },
      {
        name: 'filterStdDeviation',
        type: 'number',
        default: '30',
        description: 'feGaussianBlur stdDeviation for SVG filter.'
      },
      {
        name: 'filterColorMatrixValues',
        type: 'string',
        default: "'1 0 0 ...'",
        description: 'feColorMatrix values for SVG filter.'
      },
      { name: 'useFilter', type: 'boolean', default: 'true', description: 'Enable the SVG filter.' },
      { name: 'fastDuration', type: 'number', default: '0.1', description: 'GSAP duration for the lead blob.' },
      { name: 'slowDuration', type: 'number', default: '0.5', description: 'GSAP duration for the following blobs.' },
      { name: 'fastEase', type: 'string', default: "'power3.out'", description: 'GSAP ease for the lead blob.' },
      { name: 'slowEase', type: 'string', default: "'power1.out'", description: 'GSAP ease for the following blobs.' },
      { name: 'zIndex', type: 'number', default: '100', description: 'CSS z-index of the whole component.' }
    ],
    []
  );

  const handleSizeChange = (newSize, index, propName, currentArray) => {
    const updatedArray = [...currentArray];
    updatedArray[index] = newSize;
    updateProp(propName, updatedArray);
  };

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box height={600} position="relative" className="demo-container" overflow="hidden">
            <BlobCursor
              blobType={blobType}
              fillColor={fillColor}
              trailCount={trailCount}
              sizes={sizes}
              innerSizes={innerSizes}
              innerColor={innerColor}
              opacities={opacities}
              shadowColor={shadowColor}
              shadowBlur={shadowBlur}
              shadowOffsetX={shadowOffsetX}
              shadowOffsetY={shadowOffsetY}
              fastDuration={fastDuration}
              slowDuration={slowDuration}
              zIndex={zIndex}
            />
          </Box>

          <Customize>
            <PreviewColorPickerCustom
              title="Fill Color"
              color={fillColor}
              onChange={val => updateProp('fillColor', val)}
            />

            <PreviewColorPickerCustom
              title="Inner Color"
              color={innerColor}
              onChange={val => updateProp('innerColor', val)}
            />

            <PreviewColorPickerCustom
              title="Shadow Color"
              color={shadowColor}
              onChange={val => updateProp('shadowColor', val)}
            />

            <PreviewSelect
              title="Blob Type"
              options={[
                { value: 'circle', label: 'Circle' },
                { value: 'square', label: 'Square' }
              ]}
              value={blobType}
              onChange={val => updateProp('blobType', val)}
            />

            <PreviewSlider
              title="Trail Count"
              min={1}
              max={5}
              step={1}
              value={trailCount}
              onChange={val => {
                updateProp('trailCount', val);
                const newSizes = Array(val)
                  .fill(0)
                  .map((_, i) => sizes[i] || sizes[sizes.length - 1] || 60);
                const newInnerSizes = Array(val)
                  .fill(0)
                  .map((_, i) => innerSizes[i] || innerSizes[innerSizes.length - 1] || 20);
                const newOpacities = Array(val)
                  .fill(0)
                  .map((_, i) => opacities[i] || opacities[opacities.length - 1] || 0.6);
                updateProp('sizes', newSizes);
                updateProp('innerSizes', newInnerSizes);
                updateProp('opacities', newOpacities);
              }}
            />
            <PreviewSlider
              title="Lead Blob Size"
              min={10}
              max={200}
              step={1}
              value={sizes[0]}
              onChange={val => handleSizeChange(val, 0, 'sizes', sizes)}
              isDisabled={trailCount < 1}
            />
            <PreviewSlider
              title="Lead Inner Dot Size"
              min={1}
              max={100}
              step={1}
              value={innerSizes[0]}
              onChange={val => handleSizeChange(val, 0, 'innerSizes', innerSizes)}
              isDisabled={trailCount < 1}
            />
            <PreviewSlider
              title="Lead Blob Opacity"
              min={0.1}
              max={1}
              step={0.05}
              value={opacities[0]}
              onChange={val => handleSizeChange(val, 0, 'opacities', opacities)}
              isDisabled={trailCount < 1}
            />
            <PreviewSlider
              title="Shadow Blur"
              min={0}
              max={50}
              step={1}
              value={shadowBlur}
              onChange={val => updateProp('shadowBlur', val)}
            />
            <PreviewSlider
              title="Shadow Offset X"
              min={-50}
              max={50}
              step={1}
              value={shadowOffsetX}
              onChange={val => updateProp('shadowOffsetX', val)}
            />
            <PreviewSlider
              title="Shadow Offset Y"
              min={-50}
              max={50}
              step={1}
              value={shadowOffsetY}
              onChange={val => updateProp('shadowOffsetY', val)}
            />
            <PreviewSlider
              title="Fast Duration (Lead)"
              min={0.01}
              max={2}
              step={0.01}
              value={fastDuration}
              onChange={val => updateProp('fastDuration', val)}
            />
            <PreviewSlider
              title="Slow Duration (Trail)"
              min={0.01}
              max={3}
              step={0.01}
              value={slowDuration}
              onChange={val => updateProp('slowDuration', val)}
            />
            <PreviewSlider
              title="Z-Index"
              min={0}
              max={1000}
              step={10}
              value={zIndex}
              onChange={val => updateProp('zIndex', val)}
            />
          </Customize>

          <p className="demo-extra-info" style={{ marginTop: '20px' }}>
            <FiAlertTriangle position="relative" top="-1px" mr="2" /> SVG filters are not fully supported on Safari.
            Performance may vary.
          </p>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={blobCursor} componentName="BlobCursor" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default BlobCursorDemo;
