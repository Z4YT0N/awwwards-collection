import { useRef, useEffect, useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';
import { gsap } from 'gsap';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';

import ScrollReveal from '../../content/TextAnimations/ScrollReveal/ScrollReveal';
import { scrollReveal } from '../../constants/code/TextAnimations/scrollRevealCode';

const DEFAULT_PROPS = {
  enableBlur: true,
  baseOpacity: 0.1,
  baseRotation: 3,
  blurStrength: 4
};

const ScrollRevealDemo = () => {
  const containerRef = useRef(null);

  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { enableBlur, baseOpacity, baseRotation, blurStrength } = props;

  const [key, forceRerender] = useForceRerender();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const smoothScroll = e => {
      e.preventDefault();
      const delta = e.deltaY || e.detail || e.wheelDelta;
      const scrollAmount = delta * 2;

      gsap.to(container, {
        scrollTop: container.scrollTop + scrollAmount,
        duration: 2,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    container.addEventListener('wheel', smoothScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', smoothScroll);
    };
  }, []);

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'ReactNode',
        default: '—',
        description: 'The text or elements to be animated. If a string is provided, it will be split into words.'
      },
      {
        name: 'scrollContainerRef',
        type: 'React.RefObject',
        default: 'window',
        description:
          'Optional ref for the scroll container. If provided, GSAP will use this container for scroll triggers; otherwise, it defaults to the window.'
      },
      {
        name: 'enableBlur',
        type: 'boolean',
        default: 'true',
        description: 'Enables the blur animation effect on the words.'
      },
      {
        name: 'baseOpacity',
        type: 'number',
        default: '0.1',
        description: 'The initial opacity value for the words before the animation.'
      },
      {
        name: 'baseRotation',
        type: 'number',
        default: '3',
        description: 'The starting rotation (in degrees) for the container before it animates to 0.'
      },
      {
        name: 'blurStrength',
        type: 'number',
        default: '4',
        description: 'The strength of the blur effect (in pixels) applied at the start of the animation.'
      },
      {
        name: 'containerClassName',
        type: 'string',
        default: '""',
        description: 'Additional CSS class(es) to apply to the container element.'
      },
      {
        name: 'textClassName',
        type: 'string',
        default: '""',
        description: 'Additional CSS class(es) to apply to the text element.'
      },
      {
        name: 'rotationEnd',
        type: 'string',
        default: '"bottom bottom"',
        description: 'The scroll trigger end point for the container rotation animation.'
      },
      {
        name: 'wordAnimationEnd',
        type: 'string',
        default: '"bottom bottom"',
        description:
          'The scroll trigger end point for the word opacity and blur animations. The animation will complete when the bottom of the text reaches the bottom of the container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            className="demo-container"
            style={{ height: '400px', maxHeight: '400px' }}
            overflowY="scroll"
            overflowX="hidden"
            ref={containerRef}
            position="relative"
          >
            <Text
              textAlign="center"
              color="#2F293A"
              fontSize="clamp(4rem, 6vw, 4rem)"
              fontWeight={900}
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
            >
              Scroll Down
            </Text>
            <Box position="relative" pt={1600} pb={600} px="3rem">
              <ScrollReveal
                key={key}
                scrollContainerRef={containerRef}
                baseOpacity={baseOpacity}
                enableBlur={enableBlur}
                baseRotation={baseRotation}
                blurStrength={blurStrength}
              >
                When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup
                made out of a poisonous mushroom? No! A man dies when he is forgotten!
              </ScrollReveal>
            </Box>
          </Box>

          <Customize>
            <PreviewSwitch
              title="Enable Blur"
              isChecked={enableBlur}
              onChange={checked => {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                updateProp('enableBlur', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Blur Strength"
              min={0}
              max={15}
              step={1}
              value={blurStrength}
              onChange={val => {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                updateProp('blurStrength', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Starting Opacity"
              min={0}
              max={1}
              step={0.1}
              value={baseOpacity}
              onChange={val => {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                updateProp('baseOpacity', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Starting Rotation"
              min={0}
              max={10}
              step={1}
              value={baseRotation}
              onChange={val => {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                updateProp('baseRotation', val);
                forceRerender();
              }}
              valueUnit="°"
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={scrollReveal} componentName="ScrollReveal" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ScrollRevealDemo;
