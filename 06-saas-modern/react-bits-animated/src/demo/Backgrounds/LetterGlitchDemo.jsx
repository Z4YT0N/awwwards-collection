import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import LetterGlitch from '../../content/Backgrounds/LetterGlitch/LetterGlitch';
import { letterGlitch } from '../../constants/code/Backgrounds/letterGlitchCode';

const DEFAULT_PROPS = {
  smooth: true,
  speed: 10,
  colors: ['#2b4539', '#61dca3', '#61b3dc'],
  showCenterVignette: true,
  showOuterVignette: false
};

const LetterGlitchDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { smooth, speed, colors, showCenterVignette, showOuterVignette } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'glitchColors',
        type: 'string[]',
        default: "['#2b4539', '#61dca3', '#61b3dc']",
        description: 'Controls the colors of the letters rendered in the canvas.'
      },
      {
        name: 'glitchSpeed',
        type: 'number',
        default: '50',
        description: 'Controls the speed at which letters scramble in the animation.'
      },
      {
        name: 'centerVignette',
        type: 'boolean',
        default: 'false',
        description: 'When true, renders a radial gradient in the center of the container'
      },
      {
        name: 'outerVignette',
        type: 'boolean',
        default: 'true',
        description: 'When true, renders an inner radial gradient around the edges of the container.'
      },
      {
        name: 'smooth',
        type: 'boolean',
        default: 'true',
        description: 'When true, smoothens the animation of the letters for a more subtle feel.'
      },
      {
        name: 'characters',
        type: 'string',
        default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
        description: 'String of characters to render in the canvas.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
            <LetterGlitch
              key={key}
              glitchColors={colors}
              glitchSpeed={speed}
              centerVignette={showCenterVignette}
              outerVignette={showOuterVignette}
              smooth={smooth}
            />

            {/* For Demo Purposes Only */}
            <BackgroundContent pillText="New Background" headline="Am I finally a real hacker now, mom?" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="letter-glitch"
              currentProps={{
                glitchColors: colors,
                glitchSpeed: speed,
                centerVignette: showCenterVignette,
                outerVignette: showOuterVignette,
                smooth
              }}
              defaultProps={{
                glitchColors: ['#5227FF', '#7cff67', '#ff6b6b'],
                glitchSpeed: 50,
                centerVignette: true,
                outerVignette: false,
                smooth: true
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom
              title="Color 1"
              color={colors[0]}
              onChange={val => {
                const newColors = [...colors];
                newColors[0] = val;
                updateProp('colors', newColors);
                forceRerender();
              }}
            />

            <PreviewColorPickerCustom
              title="Color 2"
              color={colors[1]}
              onChange={val => {
                const newColors = [...colors];
                newColors[1] = val;
                updateProp('colors', newColors);
                forceRerender();
              }}
            />

            <PreviewColorPickerCustom
              title="Color 3"
              color={colors[2]}
              onChange={val => {
                const newColors = [...colors];
                newColors[2] = val;
                updateProp('colors', newColors);
                forceRerender();
              }}
            />

            <PreviewSlider
              min={0}
              max={100}
              title="Glitch Speed"
              step={5}
              value={speed}
              onChange={val => {
                updateProp('speed', val);
              }}
            />

            <PreviewSwitch
              title="Smooth Animation"
              isChecked={smooth}
              onChange={checked => {
                updateProp('smooth', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Show Center Vignette"
              isChecked={showCenterVignette}
              onChange={checked => {
                updateProp('showCenterVignette', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Show Outer Vignette"
              isChecked={showOuterVignette}
              onChange={checked => {
                updateProp('showOuterVignette', checked);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={letterGlitch} componentName="LetterGlitch" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LetterGlitchDemo;
