import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import LiquidEther from '@/content/Backgrounds/LiquidEther/LiquidEther';
import { liquidEther } from '@/constants/code/Backgrounds/liquidEtherCode';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

const DEFAULT_PROPS = {
  color0: '#5227FF',
  color1: '#FF9FFC',
  color2: '#B497CF',
  mouseForce: 20,
  cursorSize: 100,
  resolution: 0.5,
  isViscous: true,
  viscous: 30,
  iterationsViscous: 32,
  iterationsPoisson: 32,
  isBounce: false,
  autoDemo: true,
  autoSpeed: 0.5,
  autoIntensity: 2.2
};

const LiquidEtherDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color0,
    color1,
    color2,
    mouseForce,
    cursorSize,
    resolution,
    isViscous,
    viscous,
    iterationsViscous,
    iterationsPoisson,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity
  } = props;
  const userColors = [color0, color1, color2].filter(Boolean);
  const [key] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'colors',
        type: 'string[]',
        default: `["#5227FF", "#FF9FFC", "#B497CF"]`,
        description: 'Array of hex color stops used to build the velocity-to-color palette.'
      },
      {
        name: 'mouseForce',
        type: 'number',
        default: '20',
        description: 'Strength multiplier applied to mouse / touch movement when injecting velocity.'
      },
      {
        name: 'cursorSize',
        type: 'number',
        default: '100',
        description: 'Radius (in pixels at base resolution) of the force brush.'
      },
      {
        name: 'resolution',
        type: 'number',
        default: '0.5',
        description: 'Simulation texture scale relative to canvas size (lower = better performance, more blur).'
      },
      {
        name: 'dt',
        type: 'number',
        default: '0.014',
        description: 'Fixed simulation timestep used inside the advection / diffusion passes.'
      },
      {
        name: 'BFECC',
        type: 'boolean',
        default: 'true',
        description: 'Enable BFECC advection (error-compensated) for crisper flow; disable for slight performance gain.'
      },
      {
        name: 'isViscous',
        type: 'boolean',
        default: 'false',
        description: 'Toggle iterative viscosity solve (smoother, thicker motion when enabled).'
      },
      {
        name: 'viscous',
        type: 'number',
        default: '30',
        description: 'Viscosity coefficient used when isViscous is true.'
      },
      {
        name: 'iterationsViscous',
        type: 'number',
        default: '32',
        description: 'Number of Gauss-Seidel iterations for viscosity (higher = smoother, slower).'
      },
      {
        name: 'iterationsPoisson',
        type: 'number',
        default: '32',
        description: 'Number of pressure Poisson iterations to enforce incompressibility.'
      },
      {
        name: 'isBounce',
        type: 'boolean',
        default: 'false',
        description: 'If true, shows bounce boundaries (velocity clamped at edges).'
      },
      {
        name: 'autoDemo',
        type: 'boolean',
        default: 'true',
        description: 'Enable idle auto-driving of the pointer when no user interaction.'
      },
      {
        name: 'autoSpeed',
        type: 'number',
        default: '0.5',
        description: 'Speed (normalized units/sec) for auto pointer motion.'
      },
      {
        name: 'autoIntensity',
        type: 'number',
        default: '2.2',
        description: 'Multiplier applied to velocity delta while in auto mode.'
      },
      {
        name: 'takeoverDuration',
        type: 'number',
        default: '0.25',
        description: 'Seconds to interpolate from auto pointer to real cursor when user moves mouse.'
      },
      {
        name: 'autoResumeDelay',
        type: 'number',
        default: '1000',
        description: 'Milliseconds of inactivity before auto mode resumes.'
      },
      {
        name: 'autoRampDuration',
        type: 'number',
        default: '0.6',
        description: 'Seconds to ramp auto movement speed from 0 to full after activation.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Optional class for the root container.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '{}',
        description: 'Inline styles applied to the root container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <LiquidEther
              key={key}
              colors={userColors}
              mouseForce={mouseForce}
              cursorSize={cursorSize}
              resolution={resolution}
              isViscous={isViscous}
              viscous={viscous}
              iterationsViscous={iterationsViscous}
              iterationsPoisson={iterationsPoisson}
              isBounce={isBounce}
              autoDemo={autoDemo}
              autoSpeed={autoSpeed}
              autoIntensity={autoIntensity}
              autoResumeDelay={500}
            />

            <BackgroundContent pillText="New Background" headline="The web, made fluid at your fingertips." />
          </Box>
          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="liquid-ether"
              currentProps={{
                colors: userColors,
                mouseForce,
                cursorSize,
                isViscous,
                viscous,
                autoDemo,
                autoSpeed,
                autoIntensity,
                isBounce,
                resolution
              }}
              defaultProps={{
                mouseForce: 20,
                cursorSize: 100,
                isViscous: false,
                viscous: 30,
                colors: ['#5227FF', '#FF9FFC', '#B497CF'],
                autoDemo: true,
                autoSpeed: 0.5,
                autoIntensity: 2.2,
                isBounce: false,
                resolution: 0.5
              }}
            />
          </Flex>
          <Customize className="preview-options">
            <PreviewColorPickerCustom title="Color 1" color={color0} onChange={val => updateProp('color0', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color2} onChange={val => updateProp('color2', val)} />

            <PreviewSlider
              title="Mouse Force"
              min={0}
              max={60}
              step={1}
              value={mouseForce}
              onChange={val => updateProp('mouseForce', val)}
            />
            <PreviewSlider
              title="Cursor Size"
              min={10}
              max={300}
              step={5}
              value={cursorSize}
              onChange={val => updateProp('cursorSize', val)}
            />
            <PreviewSlider
              title="Resolution"
              min={0.2}
              max={0.5}
              step={0.05}
              value={resolution}
              onChange={val => updateProp('resolution', val)}
            />
            <PreviewSlider
              title="Auto Speed"
              min={0}
              max={1}
              step={0.05}
              value={autoSpeed}
              onChange={val => updateProp('autoSpeed', val)}
            />
            <PreviewSlider
              title="Auto Intensity"
              min={0}
              max={4}
              step={0.1}
              value={autoIntensity}
              onChange={val => updateProp('autoIntensity', val)}
            />
            <PreviewSlider
              title="Pressure"
              min={1}
              max={64}
              step={1}
              value={iterationsPoisson}
              onChange={val => updateProp('iterationsPoisson', val)}
            />

            <PreviewSwitch title="Bounce Edges" isChecked={isBounce} onChange={val => updateProp('isBounce', val)} />
            <PreviewSwitch title="Auto Animate" isChecked={autoDemo} onChange={val => updateProp('autoDemo', val)} />
            <PreviewSwitch title="Viscous" isChecked={isViscous} onChange={val => updateProp('isViscous', val)} />
            {isViscous && (
              <>
                <PreviewSlider
                  title="Viscous Coef"
                  min={1}
                  max={100}
                  step={1}
                  value={viscous}
                  onChange={val => updateProp('viscous', val)}
                />
                <PreviewSlider
                  title="Viscous Iterations"
                  min={1}
                  max={64}
                  step={1}
                  value={iterationsViscous}
                  onChange={val => updateProp('iterationsViscous', val)}
                />
              </>
            )}
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={liquidEther} componentName="LiquidEther" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LiquidEtherDemo;
