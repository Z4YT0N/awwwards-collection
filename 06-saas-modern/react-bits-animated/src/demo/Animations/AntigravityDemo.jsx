import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';
import { useMemo, useEffect } from 'react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '@/components/code/Dependencies';
import CodeExample from '@/components/code/CodeExample';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import { antigravity } from '@/constants/code/Animations/antigravityCode';
import Antigravity from '../../ts-default/Animations/Antigravity/Antigravity';

const DEFAULT_PROPS = {
  magnetRadius: 6,
  ringRadius: 7,
  waveSpeed: 0.4,
  waveAmplitude: 1,
  particleSize: 1.5,
  lerpSpeed: 0.05,
  count: 300,
  color: '#5227FF',
  autoAnimate: true,
  particleVariance: 1,
  rotationSpeed: 0,
  depthFactor: 1,
  pulseSpeed: 3,
  particleShape: 'capsule',
  fieldStrength: 10
};

const AntigravityDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    count,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength
  } = props;

  const [key, forceRerender] = useForceRerender();

  useEffect(() => {
    forceRerender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    count,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength
  ]);

  const propData = useMemo(
    () => [
      {
        name: 'count',
        type: 'number',
        default: '300',
        description: 'Number of particles'
      },
      {
        name: 'magnetRadius',
        type: 'number',
        default: '10',
        description: 'Radius of the magnetic field'
      },
      {
        name: 'ringRadius',
        type: 'number',
        default: '10',
        description: 'Radius of the formed ring'
      },
      {
        name: 'waveSpeed',
        type: 'number',
        default: '0.4',
        description: 'Speed of the wave animation'
      },
      {
        name: 'waveAmplitude',
        type: 'number',
        default: '1',
        description: 'Intensity of the wave (0 for perfect circle)'
      },
      {
        name: 'particleSize',
        type: 'number',
        default: '2',
        description: 'Scale multiplier for particles'
      },
      {
        name: 'lerpSpeed',
        type: 'number',
        default: '0.1',
        description: 'How fast particles move to the ring'
      },
      {
        name: 'color',
        type: 'string',
        default: '#FF9FFC',
        description: 'Color of the particles'
      },
      {
        name: 'autoAnimate',
        type: 'boolean',
        default: 'false',
        description: 'Automatically animate when idle'
      },
      {
        name: 'particleVariance',
        type: 'number',
        default: '1',
        description: 'Variance in particle size (0-1)'
      },
      {
        name: 'rotationSpeed',
        type: 'number',
        default: '0',
        description: 'Rotation speed of the ring'
      },
      {
        name: 'depthFactor',
        type: 'number',
        default: '1',
        description: 'Z-axis depth multiplier'
      },
      {
        name: 'pulseSpeed',
        type: 'number',
        default: '3',
        description: 'Speed of particle size pulsation'
      },
      {
        name: 'particleShape',
        type: 'string',
        default: 'capsule',
        description: 'Shape of the particles'
      },
      {
        name: 'fieldStrength',
        type: 'number',
        default: '10',
        description: 'Tightness of the ring formation'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <Antigravity
              key={key}
              count={count}
              magnetRadius={magnetRadius}
              ringRadius={ringRadius}
              waveSpeed={waveSpeed}
              waveAmplitude={waveAmplitude}
              particleSize={particleSize}
              lerpSpeed={lerpSpeed}
              color={color}
              autoAnimate={autoAnimate}
              particleVariance={particleVariance}
              rotationSpeed={rotationSpeed}
              depthFactor={depthFactor}
              pulseSpeed={pulseSpeed}
              particleShape={particleShape}
              fieldStrength={fieldStrength}
            />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="antigravity"
              currentProps={{
                count,
                magnetRadius,
                ringRadius,
                waveSpeed,
                waveAmplitude,
                particleSize,
                lerpSpeed,
                color,
                autoAnimate,
                particleVariance,
                rotationSpeed,
                depthFactor,
                pulseSpeed,
                particleShape,
                fieldStrength
              }}
              defaultProps={DEFAULT_PROPS}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={color} onChange={val => updateProp('color', val)} />
            <PreviewSelect
              title="Particle Shape"
              options={[
                { value: 'capsule', label: 'Capsule' },
                { value: 'sphere', label: 'Sphere' },
                { value: 'box', label: 'Box' },
                { value: 'tetrahedron', label: 'Tetrahedron' }
              ]}
              value={particleShape}
              onChange={val => updateProp('particleShape', val)}
              width={150}
            />
            <PreviewSlider
              title="Magnet Radius"
              min={5}
              max={50}
              step={1}
              value={magnetRadius}
              onChange={val => updateProp('magnetRadius', val)}
            />
            <PreviewSlider
              title="Ring Radius"
              min={5}
              max={25}
              step={1}
              value={ringRadius}
              onChange={val => updateProp('ringRadius', val)}
            />
            <PreviewSlider
              title="Wave Speed"
              min={0}
              max={5}
              step={0.1}
              value={waveSpeed}
              onChange={val => updateProp('waveSpeed', val)}
            />
            <PreviewSlider
              title="Wave Amplitude"
              min={0}
              max={5}
              step={0.1}
              value={waveAmplitude}
              onChange={val => updateProp('waveAmplitude', val)}
            />
            <PreviewSlider
              title="Particle Size"
              min={0.1}
              max={2}
              step={0.1}
              value={particleSize}
              onChange={val => updateProp('particleSize', val)}
            />
            <PreviewSlider
              title="Particle Variance"
              min={0}
              max={1}
              step={0.1}
              value={particleVariance}
              onChange={val => updateProp('particleVariance', val)}
            />
            <PreviewSlider
              title="Lerp Speed"
              min={0.01}
              max={0.2}
              step={0.01}
              value={lerpSpeed}
              onChange={val => updateProp('lerpSpeed', val)}
            />
            <PreviewSlider
              title="Count"
              min={100}
              max={5000}
              step={100}
              value={count}
              onChange={val => updateProp('count', val)}
            />
            <PreviewSlider
              title="Rotation Speed"
              min={0}
              max={5}
              step={0.1}
              value={rotationSpeed}
              onChange={val => updateProp('rotationSpeed', val)}
            />
            <PreviewSlider
              title="Depth Factor"
              min={0}
              max={5}
              step={0.1}
              value={depthFactor}
              onChange={val => updateProp('depthFactor', val)}
            />
            <PreviewSlider
              title="Pulse Speed"
              min={0}
              max={10}
              step={0.1}
              value={pulseSpeed}
              onChange={val => updateProp('pulseSpeed', val)}
            />
            <PreviewSlider
              title="Field Strength"
              min={0.1}
              max={20}
              step={0.1}
              value={fieldStrength}
              onChange={val => updateProp('fieldStrength', val)}
            />

            <PreviewSwitch
              title="Auto Animate"
              isChecked={autoAnimate}
              onChange={val => updateProp('autoAnimate', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['@react-three/fiber', 'three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={antigravity} componentName="Antigravity" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default AntigravityDemo;
