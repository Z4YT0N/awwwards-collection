import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import CountUp from '../../content/TextAnimations/CountUp/CountUp';
import { countup } from '../../constants/code/TextAnimations/countUpCode';

const DEFAULT_PROPS = {
  from: 0,
  to: 100,
  duration: 1,
  delay: 0,
  direction: 'up',
  separator: ','
};

const CountUpDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { from, to, duration, delay, direction, separator } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'to',
        type: 'number',
        default: '—',
        description: 'The target number to count up to.'
      },
      {
        name: 'from',
        type: 'number',
        default: '0',
        description: 'The initial number from which the count starts.'
      },
      {
        name: 'direction',
        type: 'string',
        default: '"up"',
        description:
          'Direction of the count; can be "up" or "down". When this is set to "down", "from" and "to" become reversed, in order to count down.'
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay in seconds before the counting starts.'
      },
      {
        name: 'duration',
        type: 'number',
        default: '2',
        description:
          'Duration of the count animation - based on the damping and stiffness configured inside the component.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'CSS class to apply to the component for additional styling.'
      },
      {
        name: 'startWhen',
        type: 'boolean',
        default: 'true',
        description:
          'A boolean to control whether the animation should start when the component is in view. It basically works like an if statement, if this is true, the count will start.'
      },
      {
        name: 'separator',
        type: 'string',
        default: '""',
        description: 'Character to use as a thousands separator in the displayed number.'
      },
      {
        name: 'onStart',
        type: 'function',
        default: '—',
        description: 'Callback function that is called when the count animation starts.'
      },
      {
        name: 'onEnd',
        type: 'function',
        default: '—',
        description: 'Callback function that is called when the count animation ends.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={200}>
            <CountUp
              key={key}
              from={from}
              to={to}
              duration={duration}
              delay={delay}
              direction={direction}
              separator={separator}
              className="count-up-text"
            />
            <RefreshButton onClick={forceRerender} />
          </Box>

          <Customize>
            <PreviewSlider
              title="To"
              min={0}
              max={10000}
              step={100}
              value={to}
              onChange={v => { updateProp('to', v); forceRerender(); }}
            />
            <PreviewSlider
              title="From"
              min={0}
              max={1000}
              step={10}
              value={from}
              onChange={v => { updateProp('from', v); forceRerender(); }}
            />
            <PreviewSlider
              title="Duration"
              min={0.5}
              max={10}
              step={0.5}
              value={duration}
              onChange={v => { updateProp('duration', v); forceRerender(); }}
            />
            <PreviewSlider
              title="Delay"
              min={0}
              max={5}
              step={0.5}
              value={delay}
              onChange={v => { updateProp('delay', v); forceRerender(); }}
            />
            <PreviewSelect
              title="Direction"
              value={direction}
              options={[
                { value: 'up', label: 'Up' },
                { value: 'down', label: 'Down' }
              ]}
              onChange={v => { updateProp('direction', v); forceRerender(); }}
            />
            <PreviewInput
              title="Separator"
              value={separator}
              placeholder=","
              maxLength={1}
              onChange={v => { updateProp('separator', v); forceRerender(); }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={countup} componentName="CountUp" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CountUpDemo;
