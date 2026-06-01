import { useMemo, useEffect, useRef } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Lenis from 'lenis';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import useComponentProps from '../../hooks/useComponentProps';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import { gradualBlur } from '../../constants/code/Animations/gradualblurCode';
import GradualBlur from '../../content/Animations/GradualBlur/GradualBlur';

const DEFAULT_PROPS = {
  position: 'bottom',
  strength: 2,
  height: '7rem',
  divCount: 5,
  curve: 'bezier',
  target: 'parent',
  exponential: true,
  opacity: 1
};

const GradualBlurDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { position, strength, height, divCount, curve, target, exponential, opacity } = props;

  const propData = useMemo(
    () => [
      {
        name: 'position',
        type: `"top" | "bottom" | "left" | "right"`,
        default: `"bottom"`,
        description: 'Edge to attach the blur overlay.'
      },
      {
        name: 'strength',
        type: 'number',
        default: '2',
        description: 'Base blur strength multiplier (affects each layer).'
      },
      {
        name: 'height',
        type: 'string',
        default: `"6rem"`,
        description: 'Overlay height (for top / bottom positions).'
      },
      {
        name: 'width',
        type: 'string',
        default: '—',
        description:
          'Custom width (optional). Defaults to 100% for vertical positions or matches height for horizontal positions.'
      },
      {
        name: 'divCount',
        type: 'number',
        default: '5',
        description: 'Number of stacked blur layers (higher = smoother gradient).'
      },
      {
        name: 'exponential',
        type: 'boolean',
        default: 'false',
        description: 'Use exponential progression for stronger end blur.'
      },
      {
        name: 'curve',
        type: `"linear" | "bezier" | "ease-in"`,
        default: `"linear"`,
        description: 'Distribution curve applied to layer progression.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1',
        description: 'Opacity applied to each blur layer.'
      },
      {
        name: 'animated',
        type: `"boolean" | "scroll"`,
        default: 'false',
        description: 'Fade in (true) or reveal on scroll ("scroll").'
      },
      {
        name: 'duration',
        type: 'string',
        default: `"0.3s"`,
        description: 'Animation duration (when animated).'
      },
      {
        name: 'easing',
        type: 'string',
        default: `"ease-out"`,
        description: 'Animation easing (opacity / backdrop-filter).'
      },
      {
        name: 'hoverIntensity',
        type: 'number',
        default: '—',
        description: 'Multiplier applied to strength while hovered.'
      },
      {
        name: 'target',
        type: `"parent" | "page"`,
        default: `"parent"`,
        description: 'Position relative to parent container or the entire page (fixed).'
      },
      {
        name: 'preset',
        type: `"top" | "bottom" | "left" | "right"`,
        default: '—',
        description: 'Apply a predefined configuration bundle.'
      },
      {
        name: 'responsive',
        type: 'boolean',
        default: 'false',
        description: 'Enable internal responsive recalculation (experimental).'
      },
      {
        name: 'zIndex',
        type: 'number',
        default: '1000',
        description: 'Base z-index (page target adds +100).'
      },
      {
        name: 'onAnimationComplete',
        type: '() => void',
        default: '—',
        description: 'Callback fired after animated reveal completes.'
      },
      {
        name: 'className',
        type: 'string',
        default: '—',
        description: 'Additional class names appended to root element.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '—',
        description: 'Inline style overrides merged into container style.'
      }
    ],
    []
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || isReducedMotion) return;

    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild,
      duration: 2,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
      lerp: 0.1
    });

    let rafId;
    const raf = time => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container demo-container-dots" h={400} p={0} overflow="hidden">
            <Flex
              ref={scrollRef}
              flexDirection="column"
              alignItems="center"
              h="100%"
              overflowY="auto"
              overflowX="hidden"
              px={6}
              py="100px"
              position="relative"
              w="100%"
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <Text fontSize="clamp(2rem, 4vw, 5rem)" fontWeight={900} zIndex={0} color="#B497CF">
                Scroll Down.
              </Text>

              <Image
                borderRadius="50px"
                my="100px"
                src="https://images.unsplash.com/photo-1656536665219-da2b7deb314b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Lighthouse in the distance with purple colors."
                w="100%"
                maxW="600px"
                border="1px solid #2F293A"
                filter={'grayscale(0) brightness(2)'}
              />

              <Text fontSize="clamp(2rem, 4vw, 5rem)" fontWeight={900} zIndex={0} color="#B497CF">
                Gradual Blur
              </Text>
            </Flex>

            <GradualBlur
              position={position}
              strength={strength}
              height={position === 'top' || position === 'bottom' ? height : '100%'}
              divCount={divCount}
              curve={curve}
              target={target}
              exponential={exponential}
              opacity={opacity}
              zIndex={10}
              width={position === 'left' || position === 'right' ? '8rem' : '100%'}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Position"
              name="gradual-blur-position"
              value={position}
              options={[
                { label: 'Top', value: 'top' },
                { label: 'Bottom', value: 'bottom' }
              ]}
              onChange={v => updateProp('position', v)}
            />

            <PreviewSelect
              title="Target"
              name="gradual-blur-target"
              value={target}
              options={[
                { label: 'Page', value: 'page' },
                { label: 'Parent', value: 'parent' }
              ]}
              onChange={v => updateProp('target', v)}
            />

            <PreviewSwitch
              title="Exponential"
              isChecked={exponential}
              onChange={checked => updateProp('exponential', checked)}
            />

            <PreviewSlider
              title="Strength"
              min={1}
              max={5}
              step={0.5}
              value={strength}
              onChange={v => updateProp('strength', v)}
            />

            <PreviewSlider
              title="Div Count"
              min={1}
              max={10}
              step={1}
              value={divCount}
              onChange={v => updateProp('divCount', v)}
            />

            <PreviewSlider
              title="Opacity"
              min={0.1}
              max={1}
              step={0.1}
              value={opacity}
              onChange={v => updateProp('opacity', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['mathjs']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gradualBlur} componentName="GradualBlur" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GradualBlurDemo;
