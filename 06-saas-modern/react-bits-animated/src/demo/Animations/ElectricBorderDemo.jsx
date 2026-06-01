import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

import { electricBorder } from '../../constants/code/Animations/electricBorderCode';
import ElectricBorder from '../../content/Animations/ElectricBorder/ElectricBorder';

const DEFAULT_PROPS = {
  example: 'card',
  cardProps: {
    color: '#7df9ff',
    speed: 1,
    chaos: 0.12,
    borderRadius: 16
  },
  buttonProps: {
    color: '#B497CF',
    speed: 1,
    chaos: 0.12,
    borderRadius: 999
  },
  circleProps: {
    color: '#7df9ff',
    speed: 1,
    chaos: 0.12,
    borderRadius: 999
  }
};

const ElectricBorderDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { example, cardProps, buttonProps, circleProps } = props;

  const propData = useMemo(
    () => [
      {
        name: 'color',
        type: 'string',
        default: '"#5227FF"',
        description: 'Stroke/glow color. Any CSS color (hex, rgb, hsl).'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Animation speed multiplier (higher = faster).'
      },
      {
        name: 'chaos',
        type: 'number',
        default: '0.12',
        description: 'Distortion intensity (0 = no distortion, higher = more chaotic).'
      },
      {
        name: 'borderRadius',
        type: 'number',
        default: '24',
        description: 'Border radius in pixels for the electric border path.'
      },
      {
        name: 'className',
        type: 'string',
        default: '—',
        description: 'Optional className applied to the root wrapper.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: '—',
        description: 'Inline styles for the wrapper.'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '—',
        description: 'Content rendered inside the bordered container.'
      }
    ],
    []
  );

  const activePropsKey = example === 'card' ? 'cardProps' : example === 'button' ? 'buttonProps' : 'circleProps';
  const activeProps = props[activePropsKey];
  const updateActiveProps = updates => updateProp(activePropsKey, { ...activeProps, ...updates });

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['example', 'cardProps', 'buttonProps', 'circleProps']}
      computedProps={{
        color: activeProps.color,
        speed: activeProps.speed,
        chaos: activeProps.chaos,
        borderRadius: activeProps.borderRadius
      }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            {example === 'card' ? (
              <ElectricBorder
                color={cardProps.color}
                speed={cardProps.speed}
                chaos={cardProps.chaos}
                borderRadius={cardProps.borderRadius}
              >
                <div
                  style={{ width: '300px', height: '360px', borderRadius: cardProps.borderRadius }}
                  className="eb-demo-card"
                >
                  <div className="eb-demo-badge">Featured</div>
                  <h3 className="eb-demo-title">Electric Card</h3>
                  <p className="eb-demo-desc">An electric border for shocking your users, the right way.</p>
                  <div className="eb-demo-row">
                    <span className="eb-demo-chip">Live</span>
                    <span className="eb-demo-chip">v1.0</span>
                  </div>
                  <button className="eb-demo-cta">Get Started</button>
                </div>
              </ElectricBorder>
            ) : example === 'button' ? (
              <ElectricBorder
                color={buttonProps.color}
                speed={buttonProps.speed}
                chaos={buttonProps.chaos}
                borderRadius={buttonProps.borderRadius}
                className="eb-button-container"
              >
                <div className="eb-demo-button-wrap">
                  <button className="eb-demo-button" style={{ borderRadius: buttonProps.borderRadius }}>
                    Learn More
                  </button>
                </div>
              </ElectricBorder>
            ) : (
              <ElectricBorder
                color={circleProps.color}
                speed={circleProps.speed}
                chaos={circleProps.chaos}
                borderRadius={circleProps.borderRadius}
              >
                <div style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
              </ElectricBorder>
            )}
          </Box>

          <Customize>
            <PreviewSelect
              title="Example"
              name="electric-border-example"
              width={140}
              value={example}
              options={[
                { label: 'Card', value: 'card' },
                { label: 'Button', value: 'button' },
                { label: 'Circle', value: 'circle' }
              ]}
              onChange={v => updateProp('example', v)}
            />

            <PreviewColorPickerCustom title="Color" color={activeProps.color} onChange={val => updateActiveProps({ color: val })} />

            <PreviewSlider
              title="Speed"
              min={0.1}
              max={3}
              step={0.1}
              value={activeProps.speed}
              onChange={v => updateActiveProps({ speed: v })}
            />
            <PreviewSlider
              title="Chaos"
              min={0.01}
              max={0.3}
              step={0.01}
              value={activeProps.chaos}
              onChange={v => updateActiveProps({ chaos: v })}
            />
            <PreviewSlider
              title="Border Radius"
              min={0}
              max={100}
              step={1}
              value={activeProps.borderRadius}
              valueUnit="px"
              onChange={v => updateActiveProps({ borderRadius: v })}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={electricBorder} componentName="ElectricBorder" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ElectricBorderDemo;
