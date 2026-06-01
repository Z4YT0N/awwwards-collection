import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { dotGrid } from '../../constants/code/Backgrounds/dotGridCode';
import DotGrid from '../../content/Backgrounds/DotGrid/DotGrid';

const DEFAULT_PROPS = {
  dotSize: 5,
  gap: 15,
  baseColor: '#2F293A',
  activeColor: '#5227FF',
  proximity: 120,
  shockRadius: 250,
  shockStrength: 5,
  resistance: 750,
  returnDuration: 1.5
};

const DotGridDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration } =
    props;
  const [key] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'dotSize',
        type: 'number',
        default: '16',
        description: 'Size of each dot in pixels.'
      },
      {
        name: 'gap',
        type: 'number',
        default: '32',
        description: 'Gap between each dot in pixels.'
      },
      {
        name: 'baseColor',
        type: 'string',
        default: "'#5227FF'",
        description: 'Base color of the dots.'
      },
      {
        name: 'activeColor',
        type: 'string',
        default: "'#5227FF'",
        description: 'Color of dots when hovered or activated.'
      },
      {
        name: 'proximity',
        type: 'number',
        default: '150',
        description: 'Radius around the mouse pointer within which dots react.'
      },
      {
        name: 'speedTrigger',
        type: 'number',
        default: '100',
        description: 'Mouse speed threshold to trigger inertia effect.'
      },
      {
        name: 'shockRadius',
        type: 'number',
        default: '250',
        description: 'Radius of the shockwave effect on click.'
      },
      {
        name: 'shockStrength',
        type: 'number',
        default: '5',
        description: 'Strength of the shockwave effect on click.'
      },
      {
        name: 'maxSpeed',
        type: 'number',
        default: '5000',
        description: 'Maximum speed for inertia calculation.'
      },
      {
        name: 'resistance',
        type: 'number',
        default: '750',
        description: 'Resistance for the inertia effect.'
      },
      {
        name: 'returnDuration',
        type: 'number',
        default: '1.5',
        description: 'Duration for dots to return to their original position after inertia.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes for the component.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '{}',
        description: 'Inline styles for the component.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            <DotGrid
              key={key}
              dotSize={dotSize}
              gap={gap}
              baseColor={baseColor}
              activeColor={activeColor}
              proximity={proximity}
              shockRadius={shockRadius}
              shockStrength={shockStrength}
              resistance={resistance}
              returnDuration={returnDuration}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Organized chaos with every cursor movement!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="dot-grid"
              currentProps={{
                dotSize,
                gap,
                baseColor,
                activeColor,
                proximity,
                shockRadius,
                shockStrength,
                resistance,
                returnDuration
              }}
              defaultProps={{
                dotSize: 16,
                gap: 32,
                baseColor: '#5227FF',
                activeColor: '#5227FF',
                proximity: 150,
                speedTrigger: 100,
                shockRadius: 250,
                shockStrength: 5,
                maxSpeed: 5000,
                resistance: 750,
                returnDuration: 1.5
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Base Color" color={baseColor} onChange={val => updateProp('baseColor', val)} />
            <PreviewColorPickerCustom title="Active Color" color={activeColor} onChange={val => updateProp('activeColor', val)} />
            <PreviewSlider
              title="Dot Size"
              min={2}
              max={50}
              step={1}
              value={dotSize}
              onChange={val => updateProp('dotSize', val)}
            />
            <PreviewSlider
              title="Gap"
              min={5}
              max={100}
              step={1}
              value={gap}
              onChange={val => updateProp('gap', val)}
            />
            <PreviewSlider
              title="Proximity"
              min={50}
              max={500}
              step={10}
              value={proximity}
              onChange={val => updateProp('proximity', val)}
            />
            <PreviewSlider
              title="Shock Radius"
              min={50}
              max={500}
              step={10}
              value={shockRadius}
              onChange={val => updateProp('shockRadius', val)}
            />
            <PreviewSlider
              title="Shock Strength"
              min={1}
              max={20}
              step={1}
              value={shockStrength}
              onChange={val => updateProp('shockStrength', val)}
            />
            <PreviewSlider
              title="Resistance (Inertia)"
              min={100}
              max={2000}
              step={50}
              value={resistance}
              onChange={val => updateProp('resistance', val)}
            />
            <PreviewSlider
              title="Return Duration (Inertia)"
              min={0.1}
              max={5}
              step={0.1}
              value={returnDuration}
              onChange={val => updateProp('returnDuration', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={dotGrid} componentName="DotGrid" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DotGridDemo;
