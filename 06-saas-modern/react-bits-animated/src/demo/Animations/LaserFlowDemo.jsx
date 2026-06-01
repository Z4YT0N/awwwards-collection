import { useRef, useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Image } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from '@/components/common/Preview/RefreshButton';
import useForceRerender from '@/hooks/useForceRerender';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import LaserFlow from '@/content/Animations/LaserFlow/LaserFlow';
import { laserFlow } from '@/constants/code/Animations/laserFlowCode';

const DEFAULT_PROPS = {
  selectedExample: 'box',
  color: '#CF9EFF',
  horizontalSizing: 0.5,
  verticalSizing: 2.0,
  wispDensity: 1,
  wispSpeed: 15.0,
  wispIntensity: 5.0,
  flowSpeed: 0.35,
  flowStrength: 0.25,
  fogIntensity: 0.45,
  fogScale: 0.3,
  fogFallSpeed: 0.6,
  decay: 1.1,
  falloffStart: 1.2
};

const LaserFlowDemo = () => {
  const containerRef = useRef(null);
  const revealImgRef = useRef(null);
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    selectedExample,
    color,
    horizontalSizing,
    verticalSizing,
    wispDensity,
    wispSpeed,
    wispIntensity,
    flowSpeed,
    flowStrength,
    fogIntensity,
    fogScale,
    fogFallSpeed,
    decay,
    falloffStart
  } = props;

  const exampleOptions = [
    { label: 'Box', value: 'box' },
    { label: 'Basic', value: 'basic' }
  ];

  const propData = useMemo(
    () => [
      {
        name: 'horizontalBeamOffset',
        type: 'number',
        default: '0.1',
        description: 'Horizontal offset of the beam (0–1 of canvas width).'
      },
      {
        name: 'verticalBeamOffset',
        type: 'number',
        default: '0.0',
        description: 'Vertical offset of the beam (0–1 of canvas height).'
      },
      {
        name: 'horizontalSizing',
        type: 'number',
        default: '0.5',
        description: 'Horizontal sizing factor of the beam footprint.'
      },
      {
        name: 'verticalSizing',
        type: 'number',
        default: '2.0',
        description: 'Vertical sizing factor of the beam footprint.'
      },
      { name: 'wispDensity', type: 'number', default: '1', description: 'Density of micro-streak wisps.' },
      { name: 'wispSpeed', type: 'number', default: '15.0', description: 'Speed of wisp motion.' },
      { name: 'wispIntensity', type: 'number', default: '5.0', description: 'Brightness of wisps.' },
      { name: 'flowSpeed', type: 'number', default: '0.35', description: 'Speed of the beam’s flow modulation.' },
      { name: 'flowStrength', type: 'number', default: '0.25', description: 'Strength of the beam’s flow modulation.' },
      { name: 'fogIntensity', type: 'number', default: '0.45', description: 'Overall volumetric fog intensity.' },
      { name: 'fogScale', type: 'number', default: '0.3', description: 'Spatial scale for the fog noise.' },
      { name: 'fogFallSpeed', type: 'number', default: '0.6', description: 'Drift speed for the fog field.' },
      {
        name: 'mouseTiltStrength',
        type: 'number',
        default: '0.01',
        description: 'How much mouse x tilts the fog volume.'
      },
      { name: 'mouseSmoothTime', type: 'number', default: '0.0', description: 'Pointer smoothing time (seconds).' },
      { name: 'decay', type: 'number', default: '1.1', description: 'Beam decay shaping for sampling envelope.' },
      {
        name: 'falloffStart',
        type: 'number',
        default: '1.2',
        description: 'Falloff start radius used in inverse-square blending.'
      },
      {
        name: 'dpr',
        type: 'number',
        default: 'auto',
        description: 'Device pixel ratio override (defaults to window.devicePixelRatio).'
      },
      { name: 'color', type: 'string', default: '#FF79C6', description: 'Beam color (hex).' }
    ],
    []
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['selectedExample']}
    >
      <TabsLayout>
        <PreviewTab>
          <Box
            ref={containerRef}
            position="relative"
            className="demo-container"
            h={500}
            p={0}
            overflow="hidden"
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const el = revealImgRef.current;
              if (el) {
                el.style.setProperty('--mx', `${x}px`);
                el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
              }
            }}
            onMouseLeave={() => {
              const el = revealImgRef.current;
              if (el) {
                el.style.setProperty('--mx', `-9999px`);
                el.style.setProperty('--my', `-9999px`);
              }
            }}
          >
            <LaserFlow
              horizontalBeamOffset={selectedExample === 'box' ? 0.1 : 0.0}
              verticalBeamOffset={selectedExample === 'box' ? -0.2 : -0.5}
              horizontalSizing={horizontalSizing}
              verticalSizing={verticalSizing}
              wispDensity={wispDensity}
              wispSpeed={wispSpeed}
              wispIntensity={wispIntensity}
              flowSpeed={flowSpeed}
              flowStrength={flowStrength}
              fogIntensity={fogIntensity}
              fogScale={fogScale}
              fogFallSpeed={fogFallSpeed}
              decay={decay}
              falloffStart={falloffStart}
              color={color}
              key={key}
              className={`laser-flow-demo-${selectedExample}`}
            />

            {selectedExample === 'box' && (
              <>
                <Box
                  className="demo-container-dots"
                  zIndex={6}
                  position="absolute"
                  top="70%"
                  left="50%"
                  transform="translateX(-50%)"
                  width="86%"
                  height="60%"
                  backgroundColor="#120F17"
                  borderRadius="20px"
                  border={`2px solid ${color}`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="2xl"
                ></Box>
                <Image
                  ref={revealImgRef}
                  src="https://cdn.dribbble.com/userupload/15325964/file/original-25ae735b5d9255a4a31d3471fd1c346a.png?resize=1024x768&vertical=center"
                  position="absolute"
                  width="100%"
                  top="-50%"
                  zIndex={2}
                  mixBlendMode="lighten"
                  opacity={0.3}
                  pointerEvents="none"
                  style={{
                    ['--mx']: '-9999px',
                    ['--my']: '-9999px',
                    WebkitMaskImage:
                      'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    maskImage:
                      'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                  }}
                />
              </>
            )}

            <RefreshButton onClick={forceRerender} />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="laser-flow"
              currentProps={{
                color,
                wispDensity,
                flowSpeed,
                verticalSizing,
                horizontalSizing,
                fogIntensity,
                fogScale,
                wispSpeed,
                wispIntensity,
                flowStrength,
                decay
              }}
              defaultProps={DEFAULT_PROPS}
            />
          </Flex>

          <Customize>
            <PreviewSelect
              title="Demo Example"
              options={exampleOptions}
              value={selectedExample}
              onChange={v => updateProp('selectedExample', v)}
              width={120}
            />
            <PreviewColorPickerCustom title="Color" color={color} onChange={val => updateProp('color', val)} />

            <PreviewSlider
              title="Horizontal Sizing"
              min={0.1}
              max={2}
              step={0.01}
              value={horizontalSizing}
              onChange={v => updateProp('horizontalSizing', v)}
            />
            <PreviewSlider
              title="Vertical Sizing"
              min={0.1}
              max={5}
              step={0.1}
              value={verticalSizing}
              onChange={v => updateProp('verticalSizing', v)}
            />
            <PreviewSlider
              title="Wisp Density"
              min={0}
              max={5}
              step={0.1}
              value={wispDensity}
              onChange={v => updateProp('wispDensity', v)}
            />
            <PreviewSlider
              title="Wisp Speed"
              min={1}
              max={50}
              step={0.5}
              value={wispSpeed}
              onChange={v => updateProp('wispSpeed', v)}
            />
            <PreviewSlider
              title="Wisp Intensity"
              min={0}
              max={20}
              step={0.1}
              value={wispIntensity}
              onChange={v => updateProp('wispIntensity', v)}
            />
            <PreviewSlider
              title="Flow Speed"
              min={0}
              max={2}
              step={0.01}
              value={flowSpeed}
              onChange={v => updateProp('flowSpeed', v)}
            />
            <PreviewSlider
              title="Flow Strength"
              min={0}
              max={1}
              step={0.01}
              value={flowStrength}
              onChange={v => updateProp('flowStrength', v)}
            />
            <PreviewSlider
              title="Fog Intensity"
              min={0}
              max={1}
              step={0.01}
              value={fogIntensity}
              onChange={v => updateProp('fogIntensity', v)}
            />
            <PreviewSlider
              title="Fog Scale"
              min={0.1}
              max={1}
              step={0.01}
              value={fogScale}
              onChange={v => updateProp('fogScale', v)}
            />
            <PreviewSlider
              title="Fog Fall Speed"
              min={0}
              max={2}
              step={0.01}
              value={fogFallSpeed}
              onChange={v => updateProp('fogFallSpeed', v)}
            />
            <PreviewSlider
              title="Decay"
              min={0.5}
              max={3}
              step={0.01}
              value={decay}
              onChange={v => updateProp('decay', v)}
            />
            <PreviewSlider
              title="Falloff Start"
              min={0.5}
              max={3}
              step={0.01}
              value={falloffStart}
              onChange={v => updateProp('falloffStart', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={laserFlow} componentName="LaserFlow" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LaserFlowDemo;
