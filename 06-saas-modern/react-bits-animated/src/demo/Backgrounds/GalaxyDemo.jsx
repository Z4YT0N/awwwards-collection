import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import Galaxy from '../../content/Backgrounds/Galaxy/Galaxy';
import { galaxy } from '../../constants/code/Backgrounds/galaxyCode';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  density: 1,
  glowIntensity: 0.3,
  saturation: 0.0,
  hueShift: 140,
  twinkleIntensity: 0.3,
  rotationSpeed: 0.1,
  repulsionStrength: 2,
  autoCenterRepulsion: 0,
  starSpeed: 0.5,
  speed: 1.0,
  mouseRepulsion: true,
  mouseInteraction: true
};

const GalaxyDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    density,
    glowIntensity,
    saturation,
    hueShift,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    starSpeed,
    speed,
    mouseRepulsion,
    mouseInteraction
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'focal',
        type: '[number, number]',
        default: '[0.5, 0.5]',
        description: 'Sets the focal point of the galaxy effect as [x, y] coordinates from 0 to 1'
      },
      {
        name: 'rotation',
        type: '[number, number]',
        default: '[1.0, 0.0]',
        description: 'Controls the rotation matrix of the galaxy as [x, y] rotation values'
      },
      {
        name: 'starSpeed',
        type: 'number',
        default: '0.5',
        description: 'Controls the speed of star movement and animation'
      },
      {
        name: 'density',
        type: 'number',
        default: '1',
        description: 'Controls the density of stars in the galaxy'
      },
      {
        name: 'hueShift',
        type: 'number',
        default: '140',
        description: 'Shifts the hue of all stars by the specified degrees (0-360)'
      },
      {
        name: 'disableAnimation',
        type: 'boolean',
        default: 'false',
        description: 'When true, stops all time-based animations'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1.0',
        description: 'Global speed multiplier for all animations'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enables or disables mouse interaction with the galaxy'
      },
      {
        name: 'glowIntensity',
        type: 'number',
        default: '0.3',
        description: 'Controls the intensity of the star glow effect'
      },
      {
        name: 'saturation',
        type: 'number',
        default: '0.0',
        description: 'Controls color saturation of stars (0 = grayscale, 1 = full color)'
      },
      {
        name: 'mouseRepulsion',
        type: 'boolean',
        default: 'true',
        description: 'When true, stars are repelled by the mouse cursor'
      },
      {
        name: 'twinkleIntensity',
        type: 'number',
        default: '0.3',
        description: 'Controls how much stars twinkle (0 = no twinkle, 1 = maximum twinkle)'
      },
      {
        name: 'rotationSpeed',
        type: 'number',
        default: '0.1',
        description: 'Speed of automatic galaxy rotation'
      },
      {
        name: 'repulsionStrength',
        type: 'number',
        default: '2',
        description: 'Strength of mouse repulsion effect when mouseRepulsion is enabled'
      },
      {
        name: 'autoCenterRepulsion',
        type: 'number',
        default: '0',
        description: 'Creates repulsion from center of canvas. Overrides mouse repulsion when > 0'
      },
      {
        name: 'transparent',
        type: 'boolean',
        default: 'true',
        description: 'Makes the black background transparent, showing only stars'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <Galaxy
              density={density}
              glowIntensity={glowIntensity}
              saturation={saturation}
              hueShift={hueShift}
              twinkleIntensity={twinkleIntensity}
              rotationSpeed={rotationSpeed}
              repulsionStrength={repulsionStrength}
              autoCenterRepulsion={autoCenterRepulsion}
              starSpeed={starSpeed}
              speed={speed}
              mouseRepulsion={mouseRepulsion}
              mouseInteraction={mouseInteraction}
            />

            <BackgroundContent headline="Components you shall have, young padawan." pillText="New Background" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="galaxy"
              currentProps={{
                density,
                glowIntensity,
                saturation,
                hueShift,
                twinkleIntensity,
                rotationSpeed,
                repulsionStrength,
                starSpeed,
                speed,
                mouseRepulsion
              }}
              defaultProps={{
                starSpeed: 0.5,
                density: 1,
                hueShift: 140,
                speed: 1,
                glowIntensity: 0.3,
                saturation: 0,
                mouseRepulsion: true,
                repulsionStrength: 2,
                twinkleIntensity: 0.3,
                rotationSpeed: 0.1,
                transparent: true
              }}
            />
          </Flex>

          <Customize>
            <PreviewSwitch
              title="Mouse Interaction"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSwitch
              title="Mouse Repulsion"
              isChecked={mouseRepulsion}
              onChange={val => updateProp('mouseRepulsion', val)}
            />

            <PreviewSlider
              title="Density"
              min={0.1}
              max={3}
              step={0.1}
              value={density}
              onChange={val => updateProp('density', val)}
              width={200}
            />

            <PreviewSlider
              title="Glow Intensity"
              min={0}
              max={1}
              step={0.1}
              value={glowIntensity}
              onChange={val => updateProp('glowIntensity', val)}
              width={200}
            />

            <PreviewSlider
              title="Saturation"
              min={0}
              max={1}
              step={0.1}
              value={saturation}
              onChange={val => updateProp('saturation', val)}
              width={200}
            />

            <PreviewSlider
              title="Hue Shift"
              min={0}
              max={360}
              step={10}
              value={hueShift}
              valueUnit="°"
              onChange={val => updateProp('hueShift', val)}
              width={200}
            />

            <PreviewSlider
              title="Twinkle Intensity"
              min={0}
              max={1}
              step={0.1}
              value={twinkleIntensity}
              onChange={val => updateProp('twinkleIntensity', val)}
              width={200}
            />

            <PreviewSlider
              title="Rotation Speed"
              min={0}
              max={0.5}
              step={0.05}
              value={rotationSpeed}
              onChange={val => updateProp('rotationSpeed', val)}
              width={200}
            />

            <PreviewSlider
              title="Repulsion Strength"
              min={0}
              max={10}
              step={0.5}
              value={repulsionStrength}
              onChange={val => updateProp('repulsionStrength', val)}
              width={200}
            />

            <PreviewSlider
              title="Auto Center Repulsion"
              min={0}
              max={20}
              step={1}
              value={autoCenterRepulsion}
              onChange={val => updateProp('autoCenterRepulsion', val)}
              width={200}
            />

            <PreviewSlider
              title="Star Speed"
              min={0.1}
              max={2}
              step={0.1}
              value={starSpeed}
              onChange={val => updateProp('starSpeed', val)}
              width={200}
            />

            <PreviewSlider
              title="Animation Speed"
              min={0.1}
              max={3}
              step={0.1}
              value={speed}
              onChange={val => updateProp('speed', val)}
              width={200}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={galaxy} componentName="Galaxy" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GalaxyDemo;
