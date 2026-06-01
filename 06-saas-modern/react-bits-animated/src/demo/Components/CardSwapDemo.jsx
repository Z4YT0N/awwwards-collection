import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Icon, Text } from '@chakra-ui/react';
import { FaCircle, FaCode, FaSliders } from 'react-icons/fa6';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import useForceRerender from '../../hooks/useForceRerender';

import cs1 from '../../assets/demo/cs1.webp';
import cs2 from '../../assets/demo/cs2.webp';
import cs3 from '../../assets/demo/cs3.webp';

import { cardSwap } from '../../constants/code/Components/cardSwapCode';
import CardSwap, { Card } from '../../content/Components/CardSwap/CardSwap';

const DEFAULT_PROPS = {
  cardDistance: 60,
  verticalDistance: 70,
  delay: 5000,
  skewAmount: 6,
  easing: 'elastic',
  pauseOnHover: false
};

const CardSwapDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { cardDistance, verticalDistance, delay, skewAmount, easing, pauseOnHover } = props;

  const propData = useMemo(
    () => [
      {
        name: 'width',
        type: 'number | string',
        default: '500',
        description: 'Width of the card container'
      },
      {
        name: 'height',
        type: 'number | string',
        default: '400',
        description: 'Height of the card container'
      },
      {
        name: 'cardDistance',
        type: 'number',
        default: '60',
        description: 'X-axis spacing between cards'
      },
      {
        name: 'verticalDistance',
        type: 'number',
        default: '70',
        description: 'Y-axis spacing between cards'
      },
      {
        name: 'delay',
        type: 'number',
        default: '5000',
        description: 'Milliseconds between card swaps'
      },
      {
        name: 'pauseOnHover',
        type: 'boolean',
        default: 'false',
        description: 'Whether to pause animation on hover'
      },
      {
        name: 'onCardClick',
        type: '(idx: number) => void',
        default: 'undefined',
        description: 'Callback function when a card is clicked'
      },
      {
        name: 'skewAmount',
        type: 'number',
        default: '6',
        description: 'Degree of slope for top/bottom edges'
      },
      {
        name: 'easing',
        type: "'linear' | 'elastic'",
        default: "'elastic'",
        description: 'Animation easing type'
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: 'required',
        description: 'Card components to display in the stack'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            className="demo-container"
            h={500}
            overflow="hidden"
            display="flex"
            flexDirection={{ base: 'column', lg: 'row' }}
            position="relative"
          >
            <Box
              pl={{ base: 0, lg: 0 }}
              w={{ base: '100%', lg: '50%' }}
              h={{ base: 'auto', lg: '100%' }}
              display="flex"
              flexDirection="column"
              justifyContent={{ base: 'flex-start', lg: 'center' }}
              alignItems={{ base: 'center', lg: 'flex-start' }}
              textAlign={{ base: 'center', lg: 'left' }}
              pt={{ base: 8, lg: 0 }}
              pb={{ base: 4, lg: 0 }}
              px={{ base: 0, lg: 0 }}
            >
              <Text
                fontSize={{ base: '2xl', md: '3xl', lg: '3xl' }}
                mb={4}
                fontWeight={500}
                lineHeight={1.1}
                pl={{ base: 0, lg: '6rem' }}
              >
                Card stacks have never{' '}
                <Box as="span" display={{ base: 'inline', lg: 'block' }}>
                  looked so good
                </Box>
              </Text>
              <Text
                fontSize={{ base: 'lg', lg: 'xl' }}
                mb={4}
                fontWeight={400}
                lineHeight={1.1}
                color="#999"
                pl={{ base: 0, lg: '6rem' }}
              >
                Just look at it go!
              </Text>
            </Box>
            <Box w={{ base: '100%', lg: '50%' }} h={{ base: '400px', lg: '100%' }} position="relative">
              <CardSwap
                key={key}
                cardDistance={cardDistance}
                verticalDistance={verticalDistance}
                delay={delay}
                skewAmount={skewAmount}
                easing={easing}
                pauseOnHover={pauseOnHover}
              >
                <Card customClass="one" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Box borderBottom="1px solid #fff" bg="linear-gradient(to top, #1B1722, #060606)" flexShrink={0}>
                    <Text m={2}>
                      <Icon as={FaCircle} mr={2} />
                      Smooth
                    </Text>
                  </Box>
                  <Box position="relative" flex={1}>
                    <img
                      src={cs1}
                      alt="Card Swap Demo 1"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>
                </Card>
                <Card customClass="two" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Box borderBottom="1px solid #fff" bg="linear-gradient(to top, #1B1722, #060606)" flexShrink={0}>
                    <Text m={2}>
                      <Icon as={FaCode} mr={2} />
                      Reliable
                    </Text>
                  </Box>
                  <Box position="relative" flex={1}>
                    <img
                      src={cs2}
                      alt="Card Swap Demo 2"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>
                </Card>
                <Card customClass="three" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Box borderBottom="1px solid #fff" bg="linear-gradient(to top, #1B1722, #060606)" flexShrink={0}>
                    <Text m={2}>
                      <Icon as={FaSliders} mr={2} />
                      Customizable
                    </Text>
                  </Box>
                  <Box position="relative" flex={1}>
                    <img
                      src={cs3}
                      alt="Card Swap Demo 3"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </Box>
                </Card>
              </CardSwap>
            </Box>
          </Box>

          <Customize>
            <PreviewSwitch
              title="Pause On Hover"
              isChecked={pauseOnHover}
              onChange={checked => {
                updateProp('pauseOnHover', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Card Distance"
              min={30}
              max={100}
              step={5}
              value={cardDistance}
              onChange={val => {
                updateProp('cardDistance', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Vertical Distance"
              min={40}
              max={120}
              step={5}
              value={verticalDistance}
              onChange={val => {
                updateProp('verticalDistance', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Delay (ms)"
              min={3000}
              max={8000}
              step={500}
              value={delay}
              onChange={val => {
                updateProp('delay', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Skew Amount"
              min={0}
              max={12}
              step={1}
              value={skewAmount}
              onChange={val => {
                updateProp('skewAmount', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Easing"
              options={[
                { value: 'elastic', label: 'Elastic' },
                { value: 'linear', label: 'Linear' }
              ]}
              value={easing}
              onChange={val => {
                updateProp('easing', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={cardSwap} componentName="CardSwap" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CardSwapDemo;
