import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { TabsLayout, PreviewTab, CodeTab } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import Customize from '../../components/common/Preview/Customize';

import DecryptedText from '../../content/TextAnimations/DecryptedText/DecryptedText';
import { decryptedText } from '../../constants/code/TextAnimations/decryptedTextCode';

const DEFAULT_PROPS = {
  speed: 60,
  maxIterations: 10,
  sequential: true,
  useOriginalCharsOnly: false,
  revealDirection: 'start',
  animateOn: 'view',
  clickMode: 'once'
};

const DecryptedTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { speed, maxIterations, sequential, useOriginalCharsOnly, revealDirection, animateOn, clickMode } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '""',
        description: 'The text content to decrypt.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '50',
        description: 'Time in ms between each iteration.'
      },
      {
        name: 'maxIterations',
        type: 'number',
        default: '10',
        description: 'Max # of random iterations (non-sequential mode).'
      },
      {
        name: 'sequential',
        type: 'boolean',
        default: 'false',
        description: 'Whether to reveal one character at a time in sequence.'
      },
      {
        name: 'revealDirection',
        type: `"start" | "end" | "center"`,
        default: `"start"`,
        description: 'From which position characters begin to reveal in sequential mode.'
      },
      {
        name: 'useOriginalCharsOnly',
        type: 'boolean',
        default: 'false',
        description: 'Restrict scrambling to only the characters already in the text.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'CSS class for revealed characters.'
      },
      {
        name: 'parentClassName',
        type: 'string',
        default: '""',
        description: 'CSS class for the main characters container.'
      },
      {
        name: 'encryptedClassName',
        type: 'string',
        default: '""',
        description: 'CSS class for encrypted characters.'
      },
      {
        name: 'animateOn',
        type: `"view" | "hover" | "inViewHover" | "click"`,
        default: `"hover"`,
        description: 'Trigger scrambling on hover or scroll-into-view.'
      },
      {
        name: 'clickMode',
        type: `"once" | "toggle"`,
        default: `"once"`,
        description: 'Controls click behavior; only applies when animateOn is "click".'
      }
    ],
    []
  );

  const animateOptions = [
    { label: 'View', value: 'view' },
    { label: 'Hover', value: 'hover' },
    { label: 'View & Hover', value: 'inViewHover' },
    { label: 'Click', value: 'click' }
  ];
  const clickOptions = [
    { label: 'Once', value: 'once' },
    { label: 'Toggle', value: 'toggle' }
  ];
  const directionOptions = [
    { label: 'Start', value: 'start' },
    { label: 'End', value: 'end' },
    { label: 'Center', value: 'center' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" py={{ md: 6, sm: 4 }} className="demo-container" h={400} overflow="hidden">
            <RefreshButton onClick={forceRerender} />

            <Flex width="80%" px=".5em">
              <DecryptedText
                key={key}
                speed={speed}
                text="Hacking into the mainframe..."
                maxIterations={maxIterations}
                sequential={sequential}
                revealDirection={revealDirection}
                parentClassName="decrypted-text"
                useOriginalCharsOnly={useOriginalCharsOnly}
                animateOn={animateOn}
                clickMode={clickMode}
              />
            </Flex>
          </Box>

          <Customize>
            <PreviewSelect
              title="Animate On"
              options={animateOptions}
              value={animateOn}
              name="animateOn"
              width={150}
              onChange={val => {
                updateProp('animateOn', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              isDisabled={animateOn !== 'click'}
              title="Click Mode"
              options={clickOptions}
              value={clickMode}
              name="clickMode"
              width={100}
              onChange={val => {
                updateProp('clickMode', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Direction"
              options={directionOptions}
              value={revealDirection}
              name="direction"
              width={100}
              onChange={val => {
                updateProp('revealDirection', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Speed"
              min={10}
              max={200}
              step={10}
              value={speed}
              valueUnit="ms"
              onChange={val => {
                updateProp('speed', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Iterations"
              min={1}
              max={50}
              step={1}
              value={maxIterations}
              onChange={val => {
                updateProp('maxIterations', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Sequential"
              isChecked={sequential}
              onChange={checked => {
                updateProp('sequential', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Original Chars"
              isChecked={useOriginalCharsOnly}
              onChange={checked => {
                updateProp('useOriginalCharsOnly', checked);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={decryptedText} componentName="DecryptedText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DecryptedTextDemo;
