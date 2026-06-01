import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { useMemo } from 'react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';

import TargetCursor from '../../content/Animations/TargetCursor/TargetCursor';
import { targetCursor } from '../../constants/code/Animations/targetCursorCode';

const DEFAULT_PROPS = {
  spinDuration: 2,
  hideDefaultCursor: true,
  hoverDuration: 0.2,
  parallaxOn: true
};

const TargetCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { spinDuration, hideDefaultCursor, hoverDuration, parallaxOn } = props;

  const propData = useMemo(
    () => [
      {
        name: 'targetSelector',
        type: 'string',
        default: '".cursor-target"',
        description: 'CSS selector for elements that should trigger the cursor targeting effect'
      },
      {
        name: 'spinDuration',
        type: 'number',
        default: '2',
        description: "Duration in seconds for the cursor's spinning animation when not targeting"
      },
      {
        name: 'hideDefaultCursor',
        type: 'boolean',
        default: 'true',
        description: 'Whether to hide the default browser cursor when the component is active'
      },
      {
        name: 'hoverDuration',
        type: 'number',
        default: '0.2',
        description: 'Duration in seconds for the transition when the cursor locks onto a target'
      },
      {
        name: 'parallaxOn',
        type: 'boolean',
        default: 'true',
        description: 'Enables a subtle parallax effect on the corners when moving over a target'
      }
    ],
    []
  );

  return (
    <>
      <ComponentPropsProvider
        props={props}
        defaultProps={DEFAULT_PROPS}
        resetProps={resetProps}
        hasChanges={hasChanges}
      >
        <TabsLayout>
          <PreviewTab>
            <Box position="relative" className="demo-container" flexDirection="column" h={400} overflow="hidden">
              <Text fontSize="clamp(2rem, 6vw, 3rem)" fontWeight={900} mb={6} color="#2F293A">
                Hover Below.
              </Text>

              <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={2}>
                <GridItem>
                  <Text
                    borderRadius="15px"
                    color="#B497CF"
                    border="1px dashed #B497CF"
                    fontWeight={900}
                    fontSize="clamp(1rem, 4vw, 2rem)"
                    className="cursor-target"
                    py={2}
                    px={6}
                    textAlign="center"
                  >
                    THIS
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    borderRadius="15px"
                    color="#B497CF"
                    border="1px dashed #B497CF"
                    fontWeight={900}
                    fontSize="clamp(1rem, 4vw, 2rem)"
                    className="cursor-target"
                    py={2}
                    px={6}
                    textAlign="center"
                  >
                    FEELS
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    borderRadius="15px"
                    color="#B497CF"
                    border="1px dashed #B497CF"
                    fontWeight={900}
                    fontSize="clamp(1rem, 4vw, 2rem)"
                    className="cursor-target"
                    py={2}
                    px={6}
                    textAlign="center"
                  >
                    QUITE
                  </Text>
                </GridItem>
                <GridItem colSpan={3}>
                  <Text
                    textAlign="center"
                    borderRadius="15px"
                    color="#B497CF"
                    border="1px dashed #B497CF"
                    fontWeight={900}
                    fontSize="clamp(1rem, 4vw, 2rem)"
                    className="cursor-target"
                    py={2}
                    px={6}
                  >
                    SNAPPY!
                  </Text>
                </GridItem>
              </Grid>
            </Box>

            <Customize>
              <PreviewSlider
                title="Spin Duration"
                min={0.5}
                max={5}
                step={0.1}
                value={spinDuration}
                valueUnit="s"
                width={200}
                onChange={val => updateProp('spinDuration', val)}
              />
              <PreviewSlider
                title="Hover Duration"
                min={0.1}
                max={1}
                step={0.05}
                value={hoverDuration}
                valueUnit="s"
                width={200}
                onChange={val => updateProp('hoverDuration', val)}
              />
              <PreviewSwitch
                title="Hide Default Cursor"
                isChecked={hideDefaultCursor}
                onChange={val => updateProp('hideDefaultCursor', val)}
              />
              <PreviewSwitch
                title="Enable Parallax"
                isChecked={parallaxOn}
                onChange={val => updateProp('parallaxOn', val)}
              />
            </Customize>

            <PropTable data={propData} />
            <Dependencies dependencyList={['gsap']} />
          </PreviewTab>

          <CodeTab>
            <CodeExample codeObject={targetCursor} componentName="TargetCursor" />
          </CodeTab>
        </TabsLayout>
      </ComponentPropsProvider>

      <TargetCursor
        spinDuration={spinDuration}
        hideDefaultCursor={hideDefaultCursor}
        hoverDuration={hoverDuration}
        parallaxOn={parallaxOn}
      />
    </>
  );
};

export default TargetCursorDemo;
