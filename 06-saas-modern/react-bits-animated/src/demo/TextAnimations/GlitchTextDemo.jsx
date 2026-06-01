import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';

import GlitchText from '../../content/TextAnimations/GlitchText/GlitchText';
import { glitchText } from '../../constants/code/TextAnimations/glitchTextCode';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

const DEFAULT_PROPS = {
  speed: 1,
  enableShadows: true,
  enableOnHover: false
};

const GlitchTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { speed, enableShadows, enableOnHover } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'string',
        default: '',
        description: 'The text content that will display the glitch effect.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.5',
        description: 'Multiplier for the animation speed. Higher values slow down the glitch effect.'
      },
      {
        name: 'enableShadows',
        type: 'boolean',
        default: 'true',
        description: 'Toggle the colored text shadows on the glitch pseudo-elements.'
      },
      {
        name: 'enableOnHover',
        type: 'boolean',
        default: 'false',
        description: 'If true, the glitch animation is only activated on hover.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Additional custom classes to apply to the component.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <GlitchText key={key} speed={speed} enableShadows={enableShadows} enableOnHover={enableOnHover}>
              {enableOnHover ? 'Hover Me' : 'React Bits'}
            </GlitchText>
          </Box>

          <Customize>
            <PreviewSlider
              title="Refresh Delay"
              min={0.1}
              max={5}
              step={0.1}
              value={speed}
              onChange={val => {
                updateProp('speed', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Glitch Colors"
              isChecked={enableShadows}
              onChange={checked => {
                updateProp('enableShadows', checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Glitch On Hover"
              isChecked={enableOnHover}
              onChange={checked => {
                updateProp('enableOnHover', checked);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={glitchText} componentName="GlitchText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GlitchTextDemo;
