import { useRef, useMemo, useEffect } from 'react';
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

import ScrollFloat from '../../content/TextAnimations/ScrollFloat/ScrollFloat';
import { scrollFloat } from '../../constants/code/TextAnimations/scrollFloatCode';

const DEFAULT_PROPS = {
  stagger: 0.03,
  duration: 1
};

const ScrollFloatDemo = () => {
  const containerRef = useRef(null);
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { stagger, duration } = props;

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
        description: 'The content to animate. If a string, it will be split into individual characters.'
      },
      {
        name: 'scrollContainerRef',
        type: 'RefObject<HTMLElement>',
        default: 'window',
        description: 'Optional ref to the scroll container. Defaults to window if not provided.'
      },
      {
        name: 'containerClassName',
        type: 'string',
        default: '""',
        description: 'Additional Tailwind classes for the container element.'
      },
      {
        name: 'textClassName',
        type: 'string',
        default: '""',
        description: 'Additional Tailwind classes for the text element.'
      },
      {
        name: 'animationDuration',
        type: 'number',
        default: '1',
        description: 'Duration (in seconds) of the animation.'
      },
      {
        name: 'ease',
        type: 'string',
        default: '"back.inOut(2)"',
        description: 'Easing function used for the animation.'
      },
      {
        name: 'scrollStart',
        type: 'string',
        default: '"center bottom+=50%"',
        description: 'The scroll trigger start position.'
      },
      {
        name: 'scrollEnd',
        type: 'string',
        default: '"bottom bottom-=40%"',
        description: 'The scroll trigger end position.'
      },
      {
        name: 'stagger',
        type: 'number',
        default: '0.03',
        description: 'Delay between the animation start of each character.'
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
              <ScrollFloat stagger={stagger} animationDuration={duration} key={key} scrollContainerRef={containerRef}>
                React Bits
              </ScrollFloat>
            </Box>
          </Box>

          <div className="preview-options">
            <h2 className="demo-title-extra">Customize</h2>

            <PreviewSlider
              title="Stagger"
              min={0.01}
              max={0.1}
              step={0.01}
              value={stagger}
              onChange={val => {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                updateProp('stagger', val);
                forceRerender();
              }}
              width={150}
            />

            <PreviewSlider
              title="Duration"
              min={1}
              max={10}
              step={0.1}
              value={duration}
              onChange={val => {
                containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                updateProp('duration', val);
                forceRerender();
              }}
              width={150}
            />
          </div>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={scrollFloat} componentName="ScrollFloat" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ScrollFloatDemo;
