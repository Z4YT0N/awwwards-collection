import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import TextType from '../../content/TextAnimations/TextType/TextType';
import { textType } from '../../constants/code/TextAnimations/textTypeCode';

const DEFAULT_PROPS = {
  texts: ['Welcome to React Bits! Good to see you!', 'Build some amazing experiences!'],
  typingSpeed: 75,
  pauseDuration: 1500,
  deletingSpeed: 50,
  showCursor: true,
  cursorCharacter: '_',
  variableSpeedEnabled: false,
  variableSpeedMin: 60,
  variableSpeedMax: 120,
  cursorBlinkDuration: 0.5
};

const TextTypeDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    texts,
    typingSpeed,
    pauseDuration,
    deletingSpeed,
    showCursor,
    cursorCharacter,
    variableSpeedEnabled,
    variableSpeedMin,
    variableSpeedMax,
    cursorBlinkDuration
  } = props;

  const cursorOptions = [
    { value: '_', label: 'Underscore (_)' },
    { value: '|', label: 'Pipe (|)' },
    { value: '▎', label: 'Block (▎)' },
    { value: '●', label: 'Dot (●)' },
    { value: '█', label: 'Full Block (█)' }
  ];

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string | string[]',
        default: '-',
        description: 'Text or array of texts to type out'
      },
      {
        name: 'as',
        type: 'ElementType',
        default: 'div',
        description: 'HTML tag to render the component as'
      },
      {
        name: 'typingSpeed',
        type: 'number',
        default: '50',
        description: 'Speed of typing in milliseconds'
      },
      {
        name: 'initialDelay',
        type: 'number',
        default: '0',
        description: 'Initial delay before typing starts'
      },
      {
        name: 'pauseDuration',
        type: 'number',
        default: '2000',
        description: 'Time to wait between typing and deleting'
      },
      {
        name: 'deletingSpeed',
        type: 'number',
        default: '30',
        description: 'Speed of deleting characters'
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Whether to loop through texts array'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Optional class name for styling'
      },
      {
        name: 'showCursor',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show the cursor'
      },
      {
        name: 'hideCursorWhileTyping',
        type: 'boolean',
        default: 'false',
        description: 'Hide cursor while typing'
      },
      {
        name: 'cursorCharacter',
        type: 'string | React.ReactNode',
        default: '|',
        description: 'Character or React node to use as cursor'
      },
      {
        name: 'cursorBlinkDuration',
        type: 'number',
        default: '0.5',
        description: 'Animation duration for cursor blinking'
      },
      {
        name: 'cursorClassName',
        type: 'string',
        default: "''",
        description: 'Optional class name for cursor styling'
      },
      {
        name: 'textColors',
        type: 'string[]',
        default: '[]',
        description: 'Array of colors for each sentence'
      },
      {
        name: 'variableSpeed',
        type: '{min: number, max: number}',
        default: 'undefined',
        description: 'Random typing speed within range for human-like feel'
      },
      {
        name: 'onSentenceComplete',
        type: '(sentence: string, index: number) => void',
        default: 'undefined',
        description: 'Callback fired after each sentence is finished'
      },
      {
        name: 'startOnVisible',
        type: 'boolean',
        default: 'false',
        description: 'Start typing when component is visible in viewport'
      },
      {
        name: 'reverseMode',
        type: 'boolean',
        default: 'false',
        description: 'Type backwards (right to left)'
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
            h={350}
            p={16}
            overflow="hidden"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <TextType
              key={key}
              text={texts}
              typingSpeed={typingSpeed}
              pauseDuration={pauseDuration}
              deletingSpeed={deletingSpeed}
              showCursor={showCursor}
              cursorCharacter={cursorCharacter}
              cursorBlinkDuration={cursorBlinkDuration}
              variableSpeed={variableSpeedEnabled ? { min: variableSpeedMin, max: variableSpeedMax } : undefined}
              className="custom-text-type"
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Cursor Character"
              options={cursorOptions}
              value={cursorCharacter}
              width={150}
              onChange={value => {
                updateProp('cursorCharacter', value);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Typing Speed"
              min={10}
              max={200}
              step={5}
              value={typingSpeed}
              valueUnit="ms"
              width={200}
              onChange={value => {
                updateProp('typingSpeed', value);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Pause Duration"
              min={500}
              max={5000}
              step={100}
              value={pauseDuration}
              valueUnit="ms"
              width={200}
              onChange={value => {
                updateProp('pauseDuration', value);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Deleting Speed"
              min={10}
              max={100}
              step={5}
              value={deletingSpeed}
              valueUnit="ms"
              width={200}
              onChange={value => {
                updateProp('deletingSpeed', value);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Cursor Blink Duration"
              min={0.1}
              max={2}
              step={0.1}
              value={cursorBlinkDuration}
              valueUnit="s"
              width={200}
              onChange={value => {
                updateProp('cursorBlinkDuration', value);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Show Cursor"
              isChecked={showCursor}
              onChange={checked => {
                updateProp('showCursor', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Variable Speed"
              isChecked={variableSpeedEnabled}
              onChange={checked => {
                updateProp('variableSpeedEnabled', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Variable Speed Min"
              isDisabled={!variableSpeedEnabled}
              min={10}
              max={150}
              step={5}
              value={variableSpeedMin}
              valueUnit="ms"
              width={200}
              onChange={value => {
                updateProp('variableSpeedMin', value);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Variable Speed Max"
              isDisabled={!variableSpeedEnabled}
              min={50}
              max={300}
              step={5}
              value={variableSpeedMax}
              valueUnit="ms"
              width={200}
              onChange={value => {
                updateProp('variableSpeedMax', value);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={textType} componentName="TextType" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default TextTypeDemo;
