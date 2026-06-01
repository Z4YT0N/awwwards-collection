import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';

import Magnet from '../../content/Animations/Magnet/Magnet';
import { magnet } from '../../constants/code/Animations/magnetCode';

const DEFAULT_PROPS = {
  disabled: false,
  padding: 100,
  magnetStrength: 2
};

const MagnetDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { disabled, padding, magnetStrength } = props;

  const propData = useMemo(
    () => [
      {
        name: 'padding',
        type: 'number',
        default: 100,
        description: 'Specifies the distance (in pixels) around the element that activates the magnet pull.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: false,
        description: 'Disables the magnet effect when set to true.'
      },
      {
        name: 'magnetStrength',
        type: 'number',
        default: 2,
        description: 'Controls the strength of the pull; higher values reduce movement, lower values increase it.'
      },
      {
        name: 'activeTransition',
        type: 'string',
        default: '"transform 0.3s ease-out"',
        description: 'CSS transition applied to the element when the magnet is active.'
      },
      {
        name: 'inactiveTransition',
        type: 'string',
        default: '"transform 0.5s ease-in-out"',
        description: 'CSS transition applied when the magnet is inactive (mouse out of range).'
      },
      {
        name: 'wrapperClassName',
        type: 'string',
        default: '""',
        description: 'Optional CSS class name for the outermost wrapper element.'
      },
      {
        name: 'innerClassName',
        type: 'string',
        default: '""',
        description: 'Optional CSS class name for the moving (inner) element.'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '',
        description: 'The content (JSX) to be displayed inside the magnetized element.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={400}>
            <Magnet padding={Math.floor(padding / 2)} disabled={disabled} magnetStrength={magnetStrength}>
              <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">
                <Flex
                  fontSize="lg"
                  color="#fff"
                  border="1px solid #5227FF"
                  borderRadius="15px"
                  p={4}
                  align="center"
                  gap={2}
                >
                  Hover This
                </Flex>
              </a>
            </Magnet>
          </Box>

          <Customize>
            <PreviewSwitch
              title="Disabled"
              isChecked={disabled}
              onChange={checked => updateProp('disabled', checked)}
            />

            <PreviewSlider
              title="Padding"
              min={0}
              max={300}
              step={10}
              value={padding}
              valueUnit="px"
              onChange={val => updateProp('padding', val)}
            />

            <PreviewSlider
              title="Strength"
              min={1}
              max={10}
              step={1}
              value={magnetStrength}
              onChange={val => updateProp('magnetStrength', val)}
            />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={magnet} componentName="Magnet" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default MagnetDemo;
