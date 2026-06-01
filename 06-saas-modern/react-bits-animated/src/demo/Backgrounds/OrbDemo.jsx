import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDebounce } from 'react-haiku';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';

import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PropTable from '../../components/common/Preview/PropTable';

import { orb } from '../../constants/code/Backgrounds/orbCode';
import Orb from '../../content/Backgrounds/Orb/Orb';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  hue: 0,
  hoverIntensity: 2,
  rotateOnHover: true,
  forceHoverState: false,
  backgroundColor: '#000000'
};

const OrbDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { hue, hoverIntensity, rotateOnHover, forceHoverState, backgroundColor } = props;
  const [key] = useForceRerender();

  const debouncedHue = useDebounce(hue, 300);
  const debouncedHoverIntensity = useDebounce(hoverIntensity, 300);

  const propData = useMemo(
    () => [
      {
        name: 'hue',
        type: 'number',
        default: '0',
        description: 'The base hue for the orb (in degrees).'
      },
      {
        name: 'hoverIntensity',
        type: 'number',
        default: '0.2',
        description: 'Controls the intensity of the hover distortion effect.'
      },
      {
        name: 'rotateOnHover',
        type: 'boolean',
        default: 'true',
        description: 'Toggle to enable or disable continuous rotation on hover.'
      },
      {
        name: 'forceHoverState',
        type: 'boolean',
        default: 'false',
        description: 'Force hover animations even when the orb is not actually hovered.'
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: '#000000',
        description: 'The background color of the container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <Orb
              key={key}
              hoverIntensity={debouncedHoverIntensity}
              rotateOnHover={rotateOnHover}
              hue={debouncedHue}
              forceHoverState={forceHoverState}
              backgroundColor={backgroundColor}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="This orb is hiding something, try hovering!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="orb"
              currentProps={{ hue, hoverIntensity, rotateOnHover, forceHoverState }}
              defaultProps={{ hue: 0, hoverIntensity: 0.5, rotateOnHover: true, forceHoverState: false }}
            />
          </Flex>

          <Customize>
            <PreviewSlider
              title="Hue Shift"
              min={0}
              max={360}
              step={1}
              value={hue}
              onChange={val => updateProp('hue', val)}
            />

            <PreviewSlider
              title="Hover Intensity"
              min={0}
              max={5}
              step={0.01}
              value={hoverIntensity}
              onChange={val => updateProp('hoverIntensity', val)}
            />

            <PreviewSwitch
              title="Rotate On Hover"
              isChecked={rotateOnHover}
              onChange={checked => updateProp('rotateOnHover', checked)}
            />

            <PreviewSwitch
              title="Force Hover State"
              isChecked={forceHoverState}
              onChange={checked => updateProp('forceHoverState', checked)}
            />

            <PreviewColorPickerCustom title="Orb Background Color" color={backgroundColor} onChange={val => updateProp('backgroundColor', val)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={orb} componentName="Orb" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default OrbDemo;
