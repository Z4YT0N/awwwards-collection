import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import Customize from '../../components/common/Preview/Customize';

import ShapeBlur from '../../content/Animations/ShapeBlur/ShapeBlur';
import { shapeBlur } from '../../constants/code/Animations/shapeBlurCode';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  shapeSize: 1.0,
  roundness: 0.5,
  borderSize: 0.05,
  circleSize: 0.25,
  circleEdge: 1
};

const ShapeBlurDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { shapeSize, roundness, borderSize, circleSize, circleEdge } = props;

  const propData = useMemo(
    () => [
      {
        name: 'variation',
        type: 'number',
        default: '0',
        description: 'Selects the shape variation (0-3) used by the shader.'
      },
      {
        name: 'pixelRatioProp',
        type: 'number',
        default: '2',
        description: 'Overrides the pixel ratio, typically set to the device pixel ratio.'
      },
      {
        name: 'shapeSize',
        type: 'number',
        default: '1.2',
        description: 'Controls the size of the shape.'
      },
      {
        name: 'roundness',
        type: 'number',
        default: '0.4',
        description: "Determines the roundness of the shape's corners."
      },
      {
        name: 'borderSize',
        type: 'number',
        default: '0.05',
        description: 'Sets the thickness of the border.'
      },
      {
        name: 'circleSize',
        type: 'number',
        default: '0.3',
        description: 'Determines the size of the hover circle effect.'
      },
      {
        name: 'circleEdge',
        type: 'number',
        default: '0.5',
        description: 'Controls the edge softness of the hover circle.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" background="#120F17" height={500} overflow="hidden" p={0}>
            <ShapeBlur
              className="shapeblur-demo"
              variation={0}
              pixelRatioProp={window.devicePixelRatio || 1}
              shapeSize={shapeSize}
              roundness={roundness}
              borderSize={borderSize}
              circleSize={circleSize}
              circleEdge={circleEdge}
            />
            <Text
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              fontSize="6rem"
              fontWeight={900}
              zIndex={0}
              color="#2F293A"
            >
              Hover Me.
            </Text>
          </Box>

          <Customize>
            <PreviewSlider
              title="Shape Size"
              min={0.1}
              max={2}
              step={0.1}
              value={shapeSize}
              onChange={val => updateProp('shapeSize', val)}
            />

            <PreviewSlider
              title="Roundness"
              min={0}
              max={1}
              step={0.05}
              value={roundness}
              onChange={val => updateProp('roundness', val)}
            />

            <PreviewSlider
              title="Border Size"
              min={0.01}
              max={0.2}
              step={0.005}
              value={borderSize}
              onChange={val => updateProp('borderSize', val)}
            />

            <PreviewSlider
              title="Circle Size"
              min={0.1}
              max={0.5}
              step={0.01}
              value={circleSize}
              onChange={val => updateProp('circleSize', val)}
            />

            <PreviewSlider
              title="Circle Edge"
              min={0.1}
              max={2}
              step={0.1}
              value={circleEdge}
              onChange={val => updateProp('circleEdge', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={shapeBlur} componentName="ShapeBlur" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ShapeBlurDemo;
