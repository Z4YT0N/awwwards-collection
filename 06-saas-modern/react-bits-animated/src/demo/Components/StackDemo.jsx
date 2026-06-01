import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import PropTable from '../../components/common/Preview/PropTable';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Stack from '../../content/Components/Stack/Stack';
import { stack } from '../../constants/code/Components/stackCode';

const DEFAULT_PROPS = {
  randomRotation: false,
  sensitivity: 200,
  autoplay: false,
  autoplayDelay: 3000,
  pauseOnHover: false
};

const StackDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { randomRotation, sensitivity, autoplay, autoplayDelay, pauseOnHover } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'randomRotation',
        type: 'boolean',
        default: false,
        description: "Applies a random rotation to each card for a 'messy' look."
      },
      {
        name: 'sensitivity',
        type: 'number',
        default: 200,
        description: 'Drag sensitivity for sending a card to the back.'
      },
      {
        name: 'sendToBackOnClick',
        type: 'boolean',
        default: 'false',
        description: 'When enabled, the stack also shifts to the next card on click.'
      },
      {
        name: 'cards',
        type: 'ReactNode[]',
        default: '[]',
        description: 'The array of card elements to display in the stack.'
      },
      {
        name: 'animationConfig',
        type: 'object',
        default: '{ stiffness: 260, damping: 20 }',
        description: "Configures the spring animation's stiffness and damping."
      },
      {
        name: 'autoplay',
        type: 'boolean',
        default: 'false',
        description: 'When enabled, the stack automatically cycles through cards.'
      },
      {
        name: 'autoplayDelay',
        type: 'number',
        default: '3000',
        description: 'Delay in milliseconds between automatic card transitions.'
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        default: 'false',
        description: 'When enabled, autoplay pauses when hovering over the stack.'
      }
    ],
    []
  );

  const images = [
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400} overflow="hidden">
            <div style={{ width: 208, height: 208 }}>
              <Stack
                key={key}
                randomRotation={randomRotation}
                sensitivity={sensitivity}
                autoplay={autoplay}
                autoplayDelay={autoplayDelay}
                pauseOnHover={pauseOnHover}
                cards={images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ))}
              />
            </div>
          </Box>

          <Customize>
            <PreviewSwitch
              title="Random Rotation"
              isChecked={randomRotation}
              onChange={checked => {
                updateProp('randomRotation', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Autoplay"
              isChecked={autoplay}
              onChange={checked => {
                updateProp('autoplay', checked);
              }}
            />

            <PreviewSwitch
              title="Pause On Hover"
              isChecked={pauseOnHover}
              onChange={checked => {
                updateProp('pauseOnHover', checked);
              }}
            />

            <PreviewSlider
              title="Sensitivity"
              min={100}
              max={300}
              step={10}
              value={sensitivity}
              onChange={val => {
                updateProp('sensitivity', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Autoplay Delay"
              min={1000}
              max={5000}
              step={500}
              value={autoplayDelay}
              onChange={val => {
                updateProp('autoplayDelay', val);
              }}
              displayValue={val => `${val}ms`}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={stack} componentName="Stack" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default StackDemo;
