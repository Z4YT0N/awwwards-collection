import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import { fluidGlass } from '../../constants/code/Components/fluidGlassCode';
import FluidGlass from '../../content/Components/FluidGlass/FluidGlass';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  mode: 'lens',
  scale: 0.25,
  ior: 1.15,
  thickness: 2,
  transmission: 1,
  roughness: 0,
  chromaticAberration: 0.05,
  anisotropy: 0.01
};

const FluidGlassDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { mode, scale, ior, thickness, transmission, roughness, chromaticAberration, anisotropy } = props;

  const modeOptions = [
    { value: 'lens', label: 'Lens' },
    { value: 'bar', label: 'Bar' },
    { value: 'cube', label: 'Cube' }
  ];

  const handleModeChange = newMode => {
    updateProp('mode', newMode);

    if (newMode === 'bar') {
      updateProp('scale', 0.15);
      updateProp('transmission', 1);
      updateProp('roughness', 0);
      updateProp('thickness', 10);
      updateProp('ior', 1.15);
    } else if (newMode === 'lens' || newMode === 'cube') {
      updateProp('scale', 0.25);
      updateProp('ior', 1.15);
      updateProp('thickness', 5);
      updateProp('chromaticAberration', 0.1);
      updateProp('anisotropy', 0.01);
    }

    forceRerender();
  };

  const getModeProps = () => {
    const baseProps = {
      scale,
      ior,
      thickness,
      chromaticAberration,
      anisotropy
    };

    if (mode === 'bar') {
      return {
        ...baseProps,
        transmission,
        roughness,
        color: '#ffffff',
        attenuationColor: '#ffffff',
        attenuationDistance: 0.25
      };
    }

    return baseProps;
  };

  const propData = useMemo(
    () => [
      {
        name: 'mode',
        type: 'string',
        default: "'lens'",
        description: "Display mode of the fluid glass effect. Options: 'lens', 'bar', 'cube'"
      },
      {
        name: 'lensProps',
        type: 'object',
        default: '{}',
        description: 'Props specific to lens mode including material properties like ior, thickness, transmission'
      },
      {
        name: 'barProps',
        type: 'object',
        default: '{}',
        description: 'Props specific to bar mode including navItems array and material properties'
      },
      {
        name: 'cubeProps',
        type: 'object',
        default: '{}',
        description: 'Props specific to cube mode including material properties and interaction settings'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <FluidGlass
              key={key}
              mode={mode}
              lensProps={mode === 'lens' ? getModeProps() : {}}
              barProps={mode === 'bar' ? getModeProps() : {}}
              cubeProps={mode === 'cube' ? getModeProps() : {}}
            />
          </Box>

          <Customize>
            <PreviewSelect title="Mode:" options={modeOptions} value={mode} onChange={handleModeChange} width={120} />

            <PreviewSlider
              title="Scale:"
              min={0.05}
              max={0.5}
              step={0.05}
              value={scale}
              onChange={val => updateProp('scale', val)}
              width={150}
            />

            <PreviewSlider
              title="IOR:"
              min={1.0}
              max={2.0}
              step={0.05}
              value={ior}
              onChange={val => updateProp('ior', val)}
              width={150}
            />

            <PreviewSlider
              title="Thickness:"
              min={1}
              max={20}
              step={1}
              value={thickness}
              onChange={val => updateProp('thickness', val)}
              width={150}
            />

            <PreviewSlider
              title="Chromatic Aberration:"
              min={0}
              max={0.5}
              step={0.01}
              value={chromaticAberration}
              onChange={val => updateProp('chromaticAberration', val)}
              width={150}
            />

            <PreviewSlider
              title="Anisotropy:"
              min={0}
              max={0.1}
              step={0.01}
              value={anisotropy}
              onChange={val => updateProp('anisotropy', val)}
              width={150}
            />

            {mode === 'bar' && (
              <>
                <PreviewSlider
                  title="Transmission:"
                  min={0}
                  max={1}
                  step={0.1}
                  value={transmission}
                  onChange={val => updateProp('transmission', val)}
                  width={150}
                />

                <PreviewSlider
                  title="Roughness:"
                  min={0}
                  max={1}
                  step={0.1}
                  value={roughness}
                  onChange={val => updateProp('roughness', val)}
                  width={150}
                />
              </>
            )}
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', '@react-three/fiber', '@react-three/drei', 'maath']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={fluidGlass} componentName="FluidGlass" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FluidGlassDemo;
