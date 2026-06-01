import { useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PropTable from '../../components/common/Preview/PropTable';
import useComponentProps from '../../hooks/useComponentProps';
import useForceRerender from '../../hooks/useForceRerender';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import SplashCursor from '../../content/Animations/SplashCursor/SplashCursor';
import { splashCursor } from '../../constants/code/Animations/splashCursorCode';

const DEFAULT_PROPS = {
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  COLOR_UPDATE_SPEED: 10,
  SHADING: true,
  RAINBOW_MODE: false,
  COLOR: '#A855F7'
};

const SplashCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, CURL, SPLAT_RADIUS, SPLAT_FORCE, COLOR_UPDATE_SPEED, SHADING, RAINBOW_MODE, COLOR } = props;
  const [key, forceRerender] = useForceRerender();

  const handleReset = () => {
    resetProps();
    forceRerender();
  };

  const propData = useMemo(
    () => [
      {
        name: 'SIM_RESOLUTION',
        type: 'number',
        default: '128',
        description: 'Fluid simulation resolution for velocity fields.'
      },
      {
        name: 'DYE_RESOLUTION',
        type: 'number',
        default: '1440',
        description: 'Resolution of the color/dye texture.'
      },
      {
        name: 'CAPTURE_RESOLUTION',
        type: 'number',
        default: '512',
        description: 'Resolution used for certain capture operations (rarely changed).'
      },
      {
        name: 'DENSITY_DISSIPATION',
        type: 'number',
        default: '3.5',
        description: 'Rate at which color/density dissipates over time.'
      },
      {
        name: 'VELOCITY_DISSIPATION',
        type: 'number',
        default: '2',
        description: 'Rate at which velocity dissipates over time.'
      },
      {
        name: 'PRESSURE',
        type: 'number',
        default: '0.1',
        description: 'Base pressure for the fluid simulation.'
      },
      {
        name: 'PRESSURE_ITERATIONS',
        type: 'number',
        default: '20',
        description: 'Number of Jacobi iterations used for the pressure solver.'
      },
      {
        name: 'CURL',
        type: 'number',
        default: '3',
        description: 'Amount of vorticity/curl to apply for swirling effects.'
      },
      {
        name: 'SPLAT_RADIUS',
        type: 'number',
        default: '0.2',
        description: "Radius of the 'splat' effect when user interacts."
      },
      {
        name: 'SPLAT_FORCE',
        type: 'number',
        default: '6000',
        description: "Force of the fluid 'splat' on each interaction."
      },
      {
        name: 'SHADING',
        type: 'boolean',
        default: 'true',
        description: 'Toggles simple lighting/shading on the fluid.'
      },
      {
        name: 'COLOR_UPDATE_SPEED',
        type: 'number',
        default: '10',
        description: 'Frequency at which pointer colors are re-randomized.'
      },
      {
        name: 'RAINBOW_MODE',
        type: 'boolean',
        default: 'true',
        description: 'When true, uses randomly cycling rainbow colors. When false, uses the COLOR prop.'
      },
      {
        name: 'COLOR',
        type: 'string',
        default: "'#ff0000'",
        description: 'Hex color for the cursor effect when RAINBOW_MODE is false.'
      },
      {
        name: 'BACK_COLOR',
        type: 'object',
        default: '{ r: 0.5, g: 0, b: 0 }',
        description: 'Base background color for the fluid. Not always used if TRANSPARENT is true.'
      }
    ],
    []
  );

  return (
    <>
      <ComponentPropsProvider
        props={props}
        defaultProps={DEFAULT_PROPS}
        resetProps={handleReset}
        hasChanges={hasChanges}
      >
        <TabsLayout>
          <PreviewTab>
            <Flex
              overflow="hidden"
              justifyContent="center"
              flexDirection={'column'}
              minH={300}
              p={0}
              alignItems="center"
              className="demo-container"
              position={'relative'}
              zIndex={10}
            >
              <Text fontSize={'3rem'} textAlign="center" color="#2F293A" fontWeight={900} userSelect={'none'}>
                Move Your Cursor
              </Text>
            </Flex>

            <Flex justify="flex-end" mt={2} mb={-2}>
              <OpenInStudioButton backgroundId="splash-cursor" currentProps={props} defaultProps={DEFAULT_PROPS} />
            </Flex>

            <Customize>
              <PreviewSlider title="Density Dissipation" min={0.5} max={10} step={0.5} value={DENSITY_DISSIPATION} onChange={v => { updateProp('DENSITY_DISSIPATION', v); forceRerender(); }} />
              <PreviewSlider title="Velocity Dissipation" min={0.5} max={10} step={0.5} value={VELOCITY_DISSIPATION} onChange={v => { updateProp('VELOCITY_DISSIPATION', v); forceRerender(); }} />
              <PreviewSlider title="Pressure" min={0} max={1} step={0.05} value={PRESSURE} onChange={v => { updateProp('PRESSURE', v); forceRerender(); }} />
              <PreviewSlider title="Curl" min={0} max={50} step={1} value={CURL} onChange={v => { updateProp('CURL', v); forceRerender(); }} />
              <PreviewSlider title="Splat Radius" min={0.01} max={1} step={0.01} value={SPLAT_RADIUS} onChange={v => { updateProp('SPLAT_RADIUS', v); forceRerender(); }} />
              <PreviewSlider title="Splat Force" min={1000} max={20000} step={500} value={SPLAT_FORCE} onChange={v => { updateProp('SPLAT_FORCE', v); forceRerender(); }} />
              <PreviewSlider title="Color Update Speed" min={1} max={30} step={1} value={COLOR_UPDATE_SPEED} onChange={v => { updateProp('COLOR_UPDATE_SPEED', v); forceRerender(); }} />
              <PreviewSwitch title="Shading" isChecked={SHADING} onChange={v => { updateProp('SHADING', v); forceRerender(); }} />
              <PreviewSwitch title="Rainbow Mode" isChecked={RAINBOW_MODE} onChange={v => { updateProp('RAINBOW_MODE', v); forceRerender(); }} />
              {!RAINBOW_MODE && <PreviewColorPickerCustom title="Color" color={COLOR} onChange={v => { updateProp('COLOR', v); forceRerender(); }} />}
            </Customize>

            <PropTable data={propData} />
          </PreviewTab>

          <CodeTab>
            <CodeExample codeObject={splashCursor} componentName="SplashCursor" />
          </CodeTab>
        </TabsLayout>
      </ComponentPropsProvider>

      <SplashCursor
        key={key}
        DENSITY_DISSIPATION={DENSITY_DISSIPATION}
        VELOCITY_DISSIPATION={VELOCITY_DISSIPATION}
        PRESSURE={PRESSURE}
        CURL={CURL}
        SPLAT_RADIUS={SPLAT_RADIUS}
        SPLAT_FORCE={SPLAT_FORCE}
        COLOR_UPDATE_SPEED={COLOR_UPDATE_SPEED}
        SHADING={SHADING}
        RAINBOW_MODE={RAINBOW_MODE}
        COLOR={COLOR}
      />
    </>
  );
};

export default SplashCursorDemo;
