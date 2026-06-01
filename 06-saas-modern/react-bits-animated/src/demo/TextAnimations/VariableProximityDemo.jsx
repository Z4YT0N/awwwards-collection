import { useMemo, useRef } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PropTable from '../../components/common/Preview/PropTable';

import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import Customize from '../../components/common/Preview/Customize';

import VariableProximity from '../../content/TextAnimations/VariableProximity/VariableProximity';
import { variableProximity } from '../../constants/code/TextAnimations/variableProximityCode';

const DEFAULT_PROPS = {
  radius: 100,
  falloff: 'linear'
};

const VariableProximityDemo = () => {
  const containerRef = useRef(null);

  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { radius, falloff } = props;

  const propData = useMemo(
    () => [
      {
        name: 'label',
        type: 'string',
        default: '""',
        description: 'The text content to display.'
      },
      {
        name: 'fromFontVariationSettings',
        type: 'string',
        default: "'wght' 400, 'opsz' 9",
        description: 'The starting variation settings.'
      },
      {
        name: 'toFontVariationSettings',
        type: 'string',
        default: "'wght' 800, 'opsz' 40",
        description: 'The variation settings to reach at cursor proximity.'
      },
      {
        name: 'containerRef',
        type: 'RefObject<HTMLDivElement>',
        default: 'undefined',
        description: 'Reference to container for relative calculations.'
      },
      {
        name: 'radius',
        type: 'number',
        default: '50',
        description: 'Proximity radius to influence the effect.'
      },
      {
        name: 'falloff',
        type: "'linear' | 'exponential' | 'gaussian'",
        default: '"linear"',
        description: 'Type of falloff for the effect.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box ref={containerRef} position="relative" className="demo-container" minH={400} overflow="hidden" p={4}>
            <VariableProximity
              label={'Hover me! And then star React Bits on GitHub, or else...'}
              className={'variable-proximity-demo'}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={radius}
              falloff={falloff}
            />
          </Box>

          <Customize>
            <PreviewSlider
              title="Radius"
              min={50}
              max={300}
              step={10}
              value={radius}
              valueUnit="px"
              onChange={val => updateProp('radius', val)}
            />

            <PreviewSelect
              title="Falloff"
              options={[
                { value: 'linear', label: 'Linear' },
                { value: 'exponential', label: 'Exponential' },
                { value: 'gaussian', label: 'Gaussian' }
              ]}
              value={falloff}
              onChange={val => updateProp('falloff', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={variableProximity} componentName="VariableProximity" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default VariableProximityDemo;
