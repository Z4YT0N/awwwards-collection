import { useMemo } from 'react';
import { toast } from 'sonner';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Input, Text } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import Stepper, { Step } from '../../content/Components/Stepper/Stepper';
import { stepper } from '../../constants/code/Components/stepperCode';

const DEFAULT_PROPS = {
  name: '',
  step: 1,
  backButtonText: 'Previous',
  nextButtonText: 'Next',
  disableStepIndicators: false
};

const StepperDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { name, step, backButtonText, nextButtonText, disableStepIndicators } = props;

  const propData = useMemo(
    () => [
      {
        name: 'children',
        type: 'ReactNode',
        default: '—',
        description: 'The Step components (or any custom content) rendered inside the stepper.'
      },
      {
        name: 'initialStep',
        type: 'number',
        default: '1',
        description: 'The first step to display when the stepper is initialized.'
      },
      {
        name: 'onStepChange',
        type: '(step: number) => void',
        default: '() => {}',
        description: 'Callback fired whenever the step changes.'
      },
      {
        name: 'onFinalStepCompleted',
        type: '() => void',
        default: '() => {}',
        description: 'Callback fired when the stepper completes its final step.'
      },
      {
        name: 'stepCircleContainerClassName',
        type: 'string',
        default: '',
        description: 'Custom class name for the container holding the step indicators.'
      },
      {
        name: 'stepContainerClassName',
        type: 'string',
        default: '',
        description: 'Custom class name for the row holding the step circles/connectors.'
      },
      {
        name: 'contentClassName',
        type: 'string',
        default: '',
        description: 'Custom class name for the step’s main content container.'
      },
      {
        name: 'footerClassName',
        type: 'string',
        default: '',
        description: 'Custom class name for the footer area containing navigation buttons.'
      },
      {
        name: 'backButtonProps',
        type: 'object',
        default: '{}',
        description: 'Extra props passed to the Back button.'
      },
      {
        name: 'nextButtonProps',
        type: 'object',
        default: '{}',
        description: 'Extra props passed to the Next/Complete button.'
      },
      {
        name: 'backButtonText',
        type: 'string',
        default: '"Back"',
        description: 'Text for the Back button.'
      },
      {
        name: 'nextButtonText',
        type: 'string',
        default: '"Continue"',
        description: 'Text for the Next button when not on the last step.'
      },
      {
        name: 'disableStepIndicators',
        type: 'boolean',
        default: 'false',
        description: 'Disables click interaction on step indicators.'
      },
      {
        name: 'renderStepIndicator',
        type: '{}',
        default: 'undefined',
        description: 'Renders a custom step indicator.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['name', 'step']}
      computedProps={{ initialStep: step }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} overflow="hidden">
            <Stepper
              initialStep={step}
              onStepChange={newStep => {
                if (newStep === 4) {
                  name ? toast(`👋🏻 Hello ${name}!`) : toast(`You didn't provide your name :(`);
                  updateProp('step', 4);
                } else {
                  toast(`✅ Step ${newStep}!`);
                  updateProp('step', newStep);
                }
              }}
              onFinalStepCompleted={() => toast('✅ All steps completed!')}
              nextButtonProps={{ disabled: step === 3 && !name }}
              disableStepIndicators={disableStepIndicators || (step === 3 && !name)}
              backButtonText={backButtonText}
              nextButtonText={nextButtonText}
            >
              <Step>
                <Text color="#5227FF" fontSize="1.2rem" fontWeight={600}>
                  Welcome to the React Bits stepper!
                </Text>
                <p>Check out the next step!</p>
              </Step>

              <Step>
                <h2>Step 2</h2>
                <img
                  style={{
                    height: '100px',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center -70px',
                    borderRadius: '15px',
                    marginTop: '1em'
                  }}
                  src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
                />
                <p style={{ marginTop: '1em' }}>Custom step content!</p>
              </Step>

              <Step>
                <h2>How about an input?</h2>
                <Input
                  value={name}
                  onChange={e => updateProp('name', e.target.value)}
                  mt={2}
                  placeholder="Your name?"
                />
              </Step>

              <Step>
                <Text color="#5227FF" fontSize="1.2rem" fontWeight={600}>
                  Final Step
                </Text>
                <p>You made it!</p>
              </Step>
            </Stepper>
          </Box>

          <Customize>
            <PreviewInput title="Back Button Text" value={backButtonText} placeholder="Back" onChange={v => updateProp('backButtonText', v)} />
            <PreviewInput title="Next Button Text" value={nextButtonText} placeholder="Continue" onChange={v => updateProp('nextButtonText', v)} />
            <PreviewSwitch title="Disable Step Indicators" isChecked={disableStepIndicators} onChange={v => updateProp('disableStepIndicators', v)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={stepper} componentName="Stepper" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default StepperDemo;
