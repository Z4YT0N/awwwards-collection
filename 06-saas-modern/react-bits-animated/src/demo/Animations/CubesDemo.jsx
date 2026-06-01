import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import { cubes } from '../../constants/code/Animations/cubesCode';
import Cubes from '../../content/Animations/Cubes/Cubes';

const DEFAULT_PROPS = {
  borderStyle: '2px dashed #B497CF',
  gridSize: 8,
  maxAngle: 45,
  radius: 3,
  autoAnimate: true,
  rippleOnClick: true
};

const CubesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { borderStyle, gridSize, maxAngle, radius, autoAnimate, rippleOnClick } = props;

  const borderOptions = [
    { value: '2px dotted #fff', label: 'Dotted White' },
    { value: '2px dashed #B497CF', label: 'Dashed Purple' },
    { value: '3px solid #fff', label: 'Solid White' }
  ];

  const propData = useMemo(
    () => [
      {
        name: 'gridSize',
        type: 'number',
        default: '10',
        description: 'The size of the grid (number of cubes per row/column)'
      },
      {
        name: 'cubeSize',
        type: 'number',
        default: 'undefined',
        description: 'Fixed size of each cube in pixels. If not provided, cubes will be responsive'
      },
      {
        name: 'maxAngle',
        type: 'number',
        default: '45',
        description: 'Maximum rotation angle for the tilt effect in degrees'
      },
      {
        name: 'radius',
        type: 'number',
        default: '3',
        description: 'Radius of the tilt effect (how many cubes around the cursor are affected)'
      },
      {
        name: 'easing',
        type: 'string',
        default: "'power3.out'",
        description: 'GSAP easing function for the tilt animation'
      },
      {
        name: 'duration',
        type: 'object',
        default: '{ enter: 0.3, leave: 0.6 }',
        description: 'Animation duration for enter and leave effects'
      },
      {
        name: 'cellGap',
        type: 'number | object',
        default: 'undefined',
        description: 'Gap between cubes. Can be a number or object with row/col properties'
      },
      {
        name: 'borderStyle',
        type: 'string',
        default: "'1px solid #fff'",
        description: 'CSS border style for cube faces'
      },
      {
        name: 'faceColor',
        type: 'string',
        default: "'#120F17'",
        description: 'Background color for cube faces'
      },
      {
        name: 'shadow',
        type: 'boolean | string',
        default: 'false',
        description: 'Shadow effect for cubes. Can be boolean or custom CSS shadow'
      },
      {
        name: 'autoAnimate',
        type: 'boolean',
        default: 'true',
        description: 'Whether to automatically animate when user is idle'
      },
      {
        name: 'rippleOnClick',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show ripple effect on click'
      },
      {
        name: 'rippleColor',
        type: 'string',
        default: "'#fff'",
        description: 'Color of the ripple effect'
      },
      {
        name: 'rippleSpeed',
        type: 'number',
        default: '2',
        description: 'Speed multiplier for the ripple animation'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={650} overflow="hidden">
            <Cubes
              borderStyle={borderStyle}
              gridSize={gridSize}
              maxAngle={maxAngle}
              radius={radius}
              autoAnimate={autoAnimate}
              rippleOnClick={rippleOnClick}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Border Style"
              options={borderOptions}
              value={borderStyle}
              onChange={val => updateProp('borderStyle', val)}
              width={150}
            />

            <PreviewSlider
              title="Grid Size"
              min={6}
              max={12}
              step={1}
              value={gridSize}
              onChange={val => updateProp('gridSize', val)}
              width={150}
            />

            <PreviewSlider
              title="Max Angle"
              min={15}
              max={180}
              step={5}
              value={maxAngle}
              valueUnit="°"
              onChange={val => updateProp('maxAngle', val)}
              width={150}
            />

            <PreviewSlider
              title="Radius"
              min={1}
              max={5}
              step={1}
              value={radius}
              onChange={val => updateProp('radius', val)}
              width={150}
            />

            <PreviewSwitch
              title="Auto Animate"
              isChecked={autoAnimate}
              onChange={val => updateProp('autoAnimate', val)}
            />

            <PreviewSwitch
              title="Ripple On Click"
              isChecked={rippleOnClick}
              onChange={val => updateProp('rippleOnClick', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={cubes} componentName="Cubes" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CubesDemo;
