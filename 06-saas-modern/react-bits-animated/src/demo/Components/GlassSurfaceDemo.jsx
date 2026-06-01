import { useMemo, useEffect, useRef, useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { TbBackground, TbMenu } from 'react-icons/tb';
import Lenis from 'lenis';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import logo from '../../assets/logos/react-bits-logo-small.svg';

import LiquidEther from '@/content/Backgrounds/LiquidEther/LiquidEther';
import { glassSurface } from '../../constants/code/Components/glassSurfaceCode';
import GlassSurface from '../../content/Components/GlassSurface/GlassSurface';

const DEFAULT_PROPS = {
  borderRadius: 50,
  borderWidth: 0.07,
  brightness: 50,
  opacity: 0.93,
  blur: 11,
  displace: 0.5,
  backgroundOpacity: 0.1,
  saturation: 1,
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20
};

const GlassSurfaceDemo = () => {
  const [selectedExample, setSelectedExample] = useState('scroll');
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);

  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    backgroundOpacity,
    saturation,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset
  } = props;

  const exampleOptions = [
    { value: 'scroll', label: 'Scroll' },
    { value: 'landingPage', label: 'Landing Page' }
  ];

  const commonGlassProps = {
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    backgroundOpacity,
    saturation,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    displace
  };

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'React.ReactNode',
        default: 'undefined',
        description: 'Content to display inside the glass surface'
      },
      {
        name: 'width',
        type: 'number | string',
        default: '200',
        description: "Width of the glass surface (pixels or CSS value like '100%')"
      },
      {
        name: 'height',
        type: 'number | string',
        default: '80',
        description: "Height of the glass surface (pixels or CSS value like '100vh')"
      },
      {
        name: 'borderRadius',
        type: 'number',
        default: '20',
        description: 'Border radius in pixels'
      },
      {
        name: 'borderWidth',
        type: 'number',
        default: '0.07',
        description: 'Border width factor for displacement map'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '50',
        description: 'Brightness percentage for displacement map'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '0.93',
        description: 'Opacity of displacement map elements'
      },
      {
        name: 'blur',
        type: 'number',
        default: '11',
        description: 'Input blur amount in pixels'
      },
      {
        name: 'displace',
        type: 'number',
        default: '0',
        description: 'Output blur (stdDeviation)'
      },
      {
        name: 'backgroundOpacity',
        type: 'number',
        default: '0',
        description: 'Background frost opacity (0-1)'
      },
      {
        name: 'saturation',
        type: 'number',
        default: '1',
        description: 'Backdrop filter saturation factor'
      },
      {
        name: 'distortionScale',
        type: 'number',
        default: '-180',
        description: 'Main displacement scale'
      },
      {
        name: 'redOffset',
        type: 'number',
        default: '0',
        description: 'Red channel extra displacement offset'
      },
      {
        name: 'greenOffset',
        type: 'number',
        default: '10',
        description: 'Green channel extra displacement offset'
      },
      {
        name: 'blueOffset',
        type: 'number',
        default: '20',
        description: 'Blue channel extra displacement offset'
      },
      {
        name: 'xChannel',
        type: "'R' | 'G' | 'B'",
        default: "'R'",
        description: 'X displacement channel selector'
      },
      {
        name: 'yChannel',
        type: "'R' | 'G' | 'B'",
        default: "'G'",
        description: 'Y displacement channel selector'
      },
      {
        name: 'mixBlendMode',
        type: 'BlendMode',
        default: "'difference'",
        description: 'Mix blend mode for displacement map'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS class names'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '{}',
        description: 'Inline styles object'
      }
    ],
    []
  );

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldUseNative = isTouch || isReducedMotion;

    if (shouldUseNative) {
      el.style.overflowY = 'auto';
      el.style.webkitOverflowScrolling = 'touch';
      return;
    } else {
      el.style.overflowY = 'hidden';
    }

    if (selectedExample !== 'scroll') return;

    let rafId;
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild,
      duration: 2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1
    });
    lenisRef.current = lenis;

    const raf = time => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [selectedExample]);

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            ref={scrollContainerRef}
            position="relative"
            className="demo-container"
            h={500}
            p={0}
            css={{
              overflow: 'hidden'
            }}
          >
            {selectedExample === 'scroll' && (
              <>
                <GlassSurface
                  width={360}
                  height={100}
                  {...commonGlassProps}
                  style={{
                    position: 'sticky',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                  }}
                />

                <Flex gap={16} alignItems="center" direction="column" position="absolute" top={0} left={0} right={0}>
                  <Text
                    position="absolute"
                    left="50%"
                    textAlign="center"
                    whiteSpace="nowrap"
                    top="3em"
                    transform="translate(-50%, -50%)"
                    fontSize="2.6rem"
                    fontWeight={900}
                    zIndex={0}
                    color="#2F293A"
                  >
                    Try scrolling.
                  </Text>

                  <Box height="240px" width="100%" />

                  {[
                    {
                      src: 'https://images.unsplash.com/photo-1500673587002-1d2548cfba1b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      text: 'The Summer Of Glass'
                    },
                    {
                      src: 'https://images.unsplash.com/photo-1594576547505-1be67997401e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      text: 'Can Hold Any Content'
                    },
                    {
                      src: 'https://images.unsplash.com/photo-1543127172-4b33cb699e35?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      text: 'Has Built-In Fallback'
                    }
                  ].map((item, index) => (
                    <Box key={index} position="relative">
                      <Image w="500px" borderRadius="20px" objectFit="cover" src={item.src} filter="grayscale(100%)" />
                      <Text
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        color="white"
                        fontWeight={900}
                        textAlign="center"
                        lineHeight="100%"
                        fontSize="3rem"
                        minW="300px"
                        zIndex={5}
                        mixBlendMode="overlay"
                      >
                        {item.text}
                      </Text>
                    </Box>
                  ))}

                  <Box height="240px" width="100%" />
                </Flex>
              </>
            )}

            {selectedExample === 'landingPage' && (
              <>
                <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={0}>
                  <LiquidEther isBounce />
                </Box>

                <Box position="absolute" top="2em" left={0} width="100%" height="60px" zIndex={0} pointerEvents="none">
                  <GlassSurface className="custom-glass-surface" width="90%" height={60} {...commonGlassProps}>
                    <img src={logo} alt="React Bits Logo" style={{ height: '24px', borderRadius: '50px' }} />

                    <Box display={{ base: 'flex', md: 'none' }} alignItems="center" color="white">
                      <TbMenu size={20} />
                    </Box>

                    <Box display={{ base: 'none', md: 'flex' }} alignItems="center" gap={6} fontWeight={600}>
                      <Text color="white" fontSize="14px" display="flex" alignItems="center">
                        Home
                      </Text>
                      <Text color="white" fontSize="14px" display="flex" alignItems="center">
                        Docs
                      </Text>
                    </Box>
                  </GlassSurface>
                </Box>

                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  width="100%"
                  height="100%"
                  zIndex={1}
                  pointerEvents="none"
                >
                  <GlassSurface height={40} width={160} {...commonGlassProps}>
                    <TbBackground />
                    <Text ml={1}>Super Shiny</Text>
                  </GlassSurface>

                  <Text
                    textShadow="0 0 16px rgba(0, 0, 0, 0.5)"
                    mt={4}
                    color="white"
                    fontSize="clamp(2rem, 4vw, 2.6rem)"
                    lineHeight="1.2"
                    textAlign="center"
                    letterSpacing="-2px"
                    maxWidth="18ch"
                    fontWeight="bold"
                  >
                    The summer of glass, thanks a lot Apple!
                  </Text>

                  <Box display="flex" gap={4} mt={8} alignItems="center">
                    <Box
                      as="button"
                      px={10}
                      py={3}
                      bg="white"
                      color="black"
                      borderRadius="50px"
                      fontSize="14px"
                      fontWeight="500"
                      border="none"
                      cursor="pointer"
                      _hover={{
                        bg: 'gray.100',
                        transform: 'translateY(-1px)'
                      }}
                      transition="all 0.2s ease"
                    >
                      Get Started
                    </Box>

                    <GlassSurface height={44.98} width={154.31} borderRadius={100} {...commonGlassProps}>
                      Learn More
                    </GlassSurface>
                  </Box>
                </Box>
              </>
            )}
          </Box>

          <Customize>
            <PreviewSelect
              title="Example"
              options={exampleOptions}
              value={selectedExample}
              onChange={setSelectedExample}
              width={160}
            />

            <PreviewSlider
              title="Border Radius"
              min={0}
              max={50}
              step={1}
              value={borderRadius}
              valueUnit="px"
              onChange={val => updateProp('borderRadius', val)}
            />

            <PreviewSlider
              title="Background Opacity"
              min={0}
              max={1}
              step={0.01}
              value={backgroundOpacity}
              onChange={val => updateProp('backgroundOpacity', val)}
            />

            <PreviewSlider
              title="Saturation"
              min={0}
              max={3}
              step={0.1}
              value={saturation}
              onChange={val => updateProp('saturation', val)}
            />

            <PreviewSlider
              title="Border Width"
              min={0}
              max={0.2}
              step={0.01}
              value={borderWidth}
              onChange={val => updateProp('borderWidth', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0}
              max={100}
              step={1}
              value={brightness}
              valueUnit="%"
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSlider
              title="Opacity"
              min={0}
              max={1}
              step={0.01}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
            />

            <PreviewSlider
              title="Blur"
              min={0}
              max={30}
              step={1}
              value={blur}
              valueUnit="px"
              onChange={val => updateProp('blur', val)}
            />

            <PreviewSlider
              title="Displace"
              min={0}
              max={5}
              step={0.1}
              value={displace}
              onChange={val => updateProp('displace', val)}
            />

            <PreviewSlider
              title="Distortion Scale"
              min={-300}
              max={300}
              step={10}
              value={distortionScale}
              onChange={val => updateProp('distortionScale', val)}
            />

            <PreviewSlider
              title="Red Offset"
              min={-50}
              max={50}
              step={1}
              value={redOffset}
              onChange={val => updateProp('redOffset', val)}
            />

            <PreviewSlider
              title="Green Offset"
              min={-50}
              max={50}
              step={1}
              value={greenOffset}
              onChange={val => updateProp('greenOffset', val)}
            />

            <PreviewSlider
              title="Blue Offset"
              min={-50}
              max={50}
              step={1}
              value={blueOffset}
              onChange={val => updateProp('blueOffset', val)}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={glassSurface} componentName="GlassSurface" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GlassSurfaceDemo;
