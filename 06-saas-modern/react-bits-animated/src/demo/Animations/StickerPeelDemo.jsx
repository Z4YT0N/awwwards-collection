import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import logo from '../../assets/logos/react-bits-sticker.png';
import Dependencies from '../../components/code/Dependencies';

import StickerPeel from '../../content/Animations/StickerPeel/StickerPeel';
import { stickerPeel } from '../../constants/code/Animations/stickerPeelCode';

const DEFAULT_PROPS = {
  rotate: 0,
  width: 200,
  peelBackHoverPct: 30,
  peelBackActivePct: 40,
  lightingIntensity: 0.1,
  shadowIntensity: 0.5,
  peelDirection: 0
};

const StickerPeelDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { rotate, width, peelBackHoverPct, peelBackActivePct, lightingIntensity, shadowIntensity, peelDirection } =
    props;

  const propData = useMemo(
    () => [
      {
        name: 'imageSrc',
        type: 'string',
        default: 'required',
        description: 'The source URL for the sticker image'
      },
      {
        name: 'rotate',
        type: 'number',
        default: '30',
        description: 'The rotation angle in degrees when dragging'
      },
      {
        name: 'peelBackHoverPct',
        type: 'number',
        default: '30',
        description: 'Percentage of peel effect on hover (0-100)'
      },
      {
        name: 'peelBackActivePct',
        type: 'number',
        default: '40',
        description: 'Percentage of peel effect when active/clicked (0-100)'
      },
      {
        name: 'peelDirection',
        type: 'number',
        default: '0',
        description: 'Direction of the peel effect in degrees (0-360)'
      },
      {
        name: 'peelEasing',
        type: 'string',
        default: 'power3.out',
        description: 'GSAP easing function for peel animations'
      },
      {
        name: 'peelHoverEasing',
        type: 'string',
        default: 'power2.out',
        description: 'GSAP easing function for hover transitions'
      },
      {
        name: 'width',
        type: 'number',
        default: '200',
        description: 'Width of the sticker in pixels'
      },
      {
        name: 'shadowIntensity',
        type: 'number',
        default: '0.6',
        description: 'Intensity of the shadow effect (0-1)'
      },
      {
        name: 'lightingIntensity',
        type: 'number',
        default: '0.1',
        description: 'Intensity of the lighting effect (0-1)'
      },
      {
        name: 'initialPosition',
        type: 'string',
        default: 'center',
        description:
          "Initial position of the sticker ('center', 'top-left', 'top-right', 'bottom-left', 'bottom-right')"
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Custom class name for additional styling'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            position="relative"
            className="demo-container"
            h={400}
            overflow="hidden"
            bg="linear-gradient(to bottom, #120F17, #1B1722, #1B1722 , #120F17)"
          >
            <StickerPeel
              imageSrc={logo}
              rotate={rotate}
              width={width}
              peelBackHoverPct={peelBackHoverPct}
              peelBackActivePct={peelBackActivePct}
              lightingIntensity={lightingIntensity}
              shadowIntensity={shadowIntensity}
              peelDirection={peelDirection}
              className="sticker-peel-demo"
            />

            <Text
              position="absolute"
              zIndex={0}
              left="50%"
              top="1em"
              transform="translateX(-50%)"
              fontSize="clamp(1.5rem, 4vw, 3rem)"
              fontWeight={900}
              color="#2F293A"
            >
              Try dragging it!
            </Text>
          </Box>

          <Customize>
            <PreviewSlider
              title="Peel Direction"
              min={0}
              max={360}
              step={1}
              value={peelDirection}
              valueUnit="°"
              width={200}
              onChange={v => updateProp('peelDirection', v)}
            />

            <PreviewSlider
              title="Rotate"
              min={0}
              max={60}
              step={1}
              value={rotate}
              valueUnit="°"
              width={200}
              onChange={v => updateProp('rotate', v)}
            />

            <PreviewSlider
              title="Width"
              min={100}
              max={300}
              step={10}
              value={width}
              valueUnit="px"
              width={200}
              onChange={v => updateProp('width', v)}
            />

            <PreviewSlider
              title="Peel Hover %"
              min={0}
              max={50}
              step={1}
              value={peelBackHoverPct}
              valueUnit="%"
              width={200}
              onChange={v => updateProp('peelBackHoverPct', v)}
            />

            <PreviewSlider
              title="Peel Active %"
              min={0}
              max={70}
              step={1}
              value={peelBackActivePct}
              valueUnit="%"
              width={200}
              onChange={v => updateProp('peelBackActivePct', v)}
            />

            <PreviewSlider
              title="Lighting Intensity"
              min={0}
              max={0.5}
              step={0.01}
              value={lightingIntensity}
              valueUnit=""
              width={200}
              onChange={v => updateProp('lightingIntensity', v)}
            />

            <PreviewSlider
              title="Shadow Intensity"
              min={0}
              max={1}
              step={0.01}
              value={shadowIntensity}
              valueUnit=""
              width={200}
              onChange={v => updateProp('shadowIntensity', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={stickerPeel} componentName="StickerPeel" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default StickerPeelDemo;
