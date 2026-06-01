import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import Customize from '../../components/common/Preview/Customize';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import PreviewInput from '@/components/common/Preview/PreviewInput';

import Particles from '../../content/Backgrounds/Particles/Particles';
import { particles } from '../../constants/code/Backgrounds/particlesCode';

const DEFAULT_PROPS = {
  colors: '#ffffff',
  particleCount: 200,
  particleSpread: 10,
  speed: 0.1,
  particleBaseSize: 100,
  moveParticlesOnHover: true,
  alphaParticles: false,
  disableRotation: false,
  pixelRatio: 1
};

const ParticlesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    colors,
    particleCount,
    particleSpread,
    speed,
    particleBaseSize,
    moveParticlesOnHover,
    alphaParticles,
    disableRotation,
    pixelRatio
  } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'particleCount',
        type: 'number',
        default: '200',
        description: 'The number of particles to generate.'
      },
      {
        name: 'particleSpread',
        type: 'number',
        default: '10',
        description: 'Controls how far particles are spread from the center.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.1',
        description: 'Speed factor controlling the animation pace.'
      },
      {
        name: 'particleColors',
        type: 'string[]',
        default: "['#ffffff']",
        description: 'An array of hex color strings used to color the particles.'
      },
      {
        name: 'moveParticlesOnHover',
        type: 'boolean',
        default: 'false',
        description: 'Determines if particles should move in response to mouse hover.'
      },
      {
        name: 'particleHoverFactor',
        type: 'number',
        default: '1',
        description: 'Multiplier for the particle movement when hovering.'
      },
      {
        name: 'alphaParticles',
        type: 'boolean',
        default: 'false',
        description: 'If true, particles are rendered with varying transparency; otherwise, as solid circles.'
      },
      {
        name: 'particleBaseSize',
        type: 'number',
        default: '100',
        description: 'The base size of the particles.'
      },
      {
        name: 'sizeRandomness',
        type: 'number',
        default: '1',
        description: 'Controls the variation in particle sizes (0 means all particles have the same size).'
      },
      {
        name: 'cameraDistance',
        type: 'number',
        default: '20',
        description: 'Distance from the camera to the particle system.'
      },
      {
        name: 'disableRotation',
        type: 'boolean',
        default: 'false',
        description: 'If true, stops the particle system from rotating.'
      },
      {
        name: 'pixelRatio',
        type: 'number',
        default: '1',
        description: 'Sets the pixel ratio for sharper rendering on high-DPI screens.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['colors']}
      computedProps={{ particleColors: [colors] }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <Particles
              key={key}
              particleColors={[colors]}
              particleCount={particleCount}
              particleSpread={particleSpread}
              speed={speed}
              particleBaseSize={particleBaseSize}
              moveParticlesOnHover={moveParticlesOnHover}
              alphaParticles={alphaParticles}
              disableRotation={disableRotation}
              pixelRatio={pixelRatio}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Particles that mimick the dance of the cosmos" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="particles"
              currentProps={{
                particleCount,
                particleSpread,
                speed,
                particleColors: [colors],
                moveParticlesOnHover,
                alphaParticles,
                particleBaseSize,
                disableRotation
              }}
              defaultProps={{
                particleCount: 200,
                particleSpread: 10,
                speed: 0.1,
                particleColors: ['#ffffff', '#ffffff', '#ffffff'],
                moveParticlesOnHover: false,
                particleHoverFactor: 1,
                alphaParticles: false,
                particleBaseSize: 100,
                sizeRandomness: 1,
                cameraDistance: 20,
                disableRotation: false
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={colors} onChange={val => { updateProp('colors', val); forceRerender(); }} />

            <PreviewSlider
              title="Count"
              min={100}
              max={1000}
              step={100}
              value={particleCount}
              onChange={val => updateProp('particleCount', val)}
            />

            <PreviewSlider
              title="Spread"
              min={10}
              max={100}
              step={10}
              value={particleSpread}
              onChange={val => updateProp('particleSpread', val)}
            />

            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.1}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Base Size"
              min={100}
              max={1000}
              step={100}
              value={particleBaseSize}
              onChange={val => updateProp('particleBaseSize', val)}
            />

            <PreviewSwitch
              title="Mouse Interaction"
              isChecked={moveParticlesOnHover}
              onChange={checked => updateProp('moveParticlesOnHover', checked)}
            />

            <PreviewSwitch
              title="Particle Transparency"
              isChecked={alphaParticles}
              onChange={checked => updateProp('alphaParticles', checked)}
            />

            <PreviewSwitch
              title="Disable Rotation"
              isChecked={disableRotation}
              onChange={checked => updateProp('disableRotation', checked)}
            />

            <PreviewInput
              title="Pixel Ratio"
              width={150}
              value={pixelRatio}
              onChange={val => updateProp('pixelRatio', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={particles} componentName="Particles" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ParticlesDemo;
