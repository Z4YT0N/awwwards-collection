import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';

import TextCursor from '../../content/TextAnimations/TextCursor/TextCursor';
import { textCursor } from '../../constants/code/TextAnimations/textCursorCode';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

const DEFAULT_PROPS = {
  text: '⚛️',
  followMouseDirection: true,
  randomFloat: true
};

const TextCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { text, followMouseDirection, randomFloat } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '⚛️',
        description: 'The text string to display as the trail.'
      },
      {
        name: 'spacing',
        type: 'number',
        default: '100',
        description: 'The spacing in pixels between each trail point.'
      },
      {
        name: 'followMouseDirection',
        type: 'boolean',
        default: 'true',
        description: 'If true, each text rotates to follow the mouse direction.'
      },
      {
        name: 'randomFloat',
        type: 'boolean',
        default: 'true',
        description: 'If true, enables random floating offsets in position and rotation for a dynamic effect.'
      },
      {
        name: 'exitDuration',
        type: 'number',
        default: '0.5',
        description: 'The duration in seconds for the exit animation of each trail item.'
      },
      {
        name: 'removalInterval',
        type: 'number',
        default: '30',
        description: 'The interval in milliseconds between removing trail items when the mouse stops moving.'
      },
      {
        name: 'maxPoints',
        type: 'number',
        default: '5',
        description: 'The maximum number of trail points to display.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <TextCursor key={key} text={text} followMouseDirection={followMouseDirection} randomFloat={randomFloat} />
            <Text
              pointerEvents="none"
              position="absolute"
              textAlign="center"
              fontSize="4rem"
              fontWeight={900}
              userSelect="none"
              color="#2F293A"
            >
              Hover Around!
            </Text>
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Enter text..."
              width={160}
              maxLength={10}
              onChange={val => updateProp('text', val)}
            />

            <PreviewSwitch
              title="Follow Mouse Direction"
              isChecked={followMouseDirection}
              onChange={checked => {
                updateProp('followMouseDirection', checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Enable Random Floating"
              isChecked={randomFloat}
              onChange={checked => {
                updateProp('randomFloat', checked);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={textCursor} componentName="TextCursor" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default TextCursorDemo;
