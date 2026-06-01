import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewInput from '../../components/common/Preview/PreviewInput';

import CircularText from '../../content/TextAnimations/CircularText/CircularText';
import { circularText } from '../../constants/code/TextAnimations/circularTextCode';

const DEFAULT_PROPS = {
  text: 'REACT*BITS*COMPONENTS*',
  onHover: 'speedUp',
  spinDuration: 20
};

const CircularTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { text, onHover, spinDuration } = props;

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: "''",
        description: 'The text to display in a circular layout.'
      },
      {
        name: 'spinDuration',
        type: 'number',
        default: '20',
        description: 'The duration (in seconds) for one full rotation.'
      },
      {
        name: 'onHover',
        type: "'slowDown' | 'speedUp' | 'pause' | 'goBonkers'",
        default: 'undefined',
        description:
          "Specifies the hover behavior variant. Options include 'slowDown', 'speedUp', 'pause', and 'goBonkers'."
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Optional additional CSS classes to apply to the component.'
      }
    ],
    []
  );

  const options = [
    { label: 'Slow Down', value: 'slowDown' },
    { label: 'Speed Up', value: 'speedUp' },
    { label: 'Pause', value: 'pause' },
    { label: 'Go Bonkers', value: 'goBonkers' }
  ];

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <CircularText text={text} onHover={onHover} spinDuration={spinDuration} />
          </Box>

          <Customize className="preview-options">
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Enter text..."
              width={220}
              maxLength={25}
              onChange={val => updateProp('text', val)}
            />

            <PreviewSelect
              title="On Hover"
              options={options}
              value={onHover}
              name="setOnHover"
              width={150}
              onChange={val => updateProp('onHover', val)}
            />

            <PreviewSlider
              min={1}
              title="Spin Duration (s)"
              max={60}
              step={1}
              value={spinDuration}
              onChange={val => updateProp('spinDuration', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={circularText} componentName="CircularText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CircularTextDemo;
