import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PropTable from '../../components/common/Preview/PropTable';

import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import Customize from '../../components/common/Preview/Customize';

import FadeContent from '../../content/Animations/FadeContent/FadeContent';
import { fadeContent } from '../../constants/code/Animations/fadeContentCode';

const DEFAULT_PROPS = {
  ease: 'power2.out',
  blur: false,
  delay: 0,
  duration: 1,
  threshold: 0.1,
  initialOpacity: 0,
  disappearEase: 'power2.in',
  disappearAfter: 0,
  disappearDuration: 0.5
};

const FadeDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { ease, blur, delay, duration, threshold, initialOpacity, disappearEase, disappearAfter, disappearDuration } =
    props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'ReactNode',
        default: '',
        description: 'The content to be animated.'
      },
      {
        name: 'blur',
        type: 'boolean',
        default: 'false',
        description: 'Enables a blur effect during the animation.'
      },
      {
        name: 'duration',
        type: 'number',
        default: 1000,
        description: 'Specifies the duration of the fade animation in seconds.'
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Adds a delay in seconds before triggering the animation.'
      },
      {
        name: 'ease',
        type: 'string',
        default: 'power2.out',
        description: 'GSAP easing function for the fade animation.'
      },
      {
        name: 'threshold',
        type: 'number',
        default: 0.1,
        description: 'IntersectionObserver threshold for triggering the fade animation.'
      },
      {
        name: 'initialOpacity',
        type: 'number',
        default: 0,
        description: 'The starting opacity of the component before it enters the viewport.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Custom class(es) to be added to the container.'
      },
      {
        name: 'disappearAfter',
        type: 'number',
        default: 0,
        description: 'Time in seconds after which the content will start to disappear. Disables if set to 0.'
      },
      {
        name: 'disappearDuration',
        type: 'number',
        default: 0.5,
        description: 'Duration of the disappearance animation in seconds.'
      },
      {
        name: 'disappearEase',
        type: 'string',
        default: 'power2.in',
        description: 'GSAP easing function for the disappearance animation.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400}>
            <FadeContent
              key={key}
              blur={blur}
              duration={duration}
              delay={delay}
              threshold={threshold}
              initialOpacity={initialOpacity}
              disappearAfter={disappearAfter}
              disappearDuration={disappearDuration}
              disappearEase={disappearEase}
              ease={ease}
            >
              <Flex
                fontSize="xl"
                fontWeight="bolder"
                justifyContent="center"
                alignItems="center"
                color="#fff"
                h={100}
                borderRadius="25px"
                border="1px solid #2F293A"
                w={200}
                bg={'#120F17'}
              >
                Fade
              </Flex>
            </FadeContent>
            <RefreshButton onClick={forceRerender} />
          </Box>

          <Customize>
            <PreviewSelect
              title="Ease"
              options={[
                { value: 'power2.out', label: 'power2.out' },
                { value: 'bounce.out', label: 'bounce.out' },
                { value: 'elastic.out(1, 0.3)', label: 'elastic.out' }
              ]}
              value={ease}
              onChange={val => {
                updateProp('ease', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Disappear Ease"
              options={[
                { value: 'power2.in', label: 'power2.in' },
                { value: 'bounce.in', label: 'bounce.in' },
                { value: 'elastic.in(1, 0.3)', label: 'elastic.in' }
              ]}
              value={disappearEase}
              onChange={val => {
                updateProp('disappearEase', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Enable Blur"
              isChecked={blur}
              onChange={checked => {
                updateProp('blur', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Duration"
              min={0.5}
              max={3}
              step={0.1}
              value={duration}
              valueUnit="s"
              onChange={val => {
                updateProp('duration', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Delay"
              min={0}
              max={2}
              step={0.1}
              value={delay}
              valueUnit="s"
              onChange={val => {
                updateProp('delay', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Threshold"
              min={0.1}
              max={1}
              step={0.1}
              value={threshold}
              onChange={val => {
                updateProp('threshold', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Initial Opacity"
              min={0}
              max={1}
              step={0.1}
              value={initialOpacity}
              onChange={val => {
                updateProp('initialOpacity', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Disappear After"
              min={0}
              max={5}
              step={0.1}
              value={disappearAfter}
              onChange={val => {
                updateProp('disappearAfter', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Disappear Duration"
              min={0.5}
              max={3}
              step={0.1}
              value={disappearDuration}
              onChange={val => {
                updateProp('disappearDuration', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={fadeContent} componentName="FadeContent" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FadeDemo;
