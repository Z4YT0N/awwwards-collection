import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import Dependencies from '../../components/code/Dependencies';
import logo from '../../assets/logos/reactbits-gh-black.svg';

import BubbleMenu from '../../content/Components/BubbleMenu/BubbleMenu';
import { bubbleMenu } from '../../constants/code/Components/bubbleMenuCode';

const DEFAULT_PROPS = {
  animationEase: 'back.out(1.5)',
  menuBg: '#ffffff',
  menuContentColor: '#111111',
  animationDuration: 0.5,
  staggerDelay: 0.12
};

const BubbleMenuDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { animationEase, menuBg, menuContentColor, animationDuration, staggerDelay } = props;

  const easeOptions = useMemo(
    () => [
      { value: 'back.out(1.5)', label: 'back.out(1.5)' },
      { value: 'power3.out', label: 'power3.out' },
      { value: 'power2.out', label: 'power2.out' },
      { value: 'elastic.out(1,0.5)', label: 'elastic.out(1,0.5)' },
      { value: 'bounce.out', label: 'bounce.out' }
    ],
    []
  );
  const propData = useMemo(
    () => [
      {
        name: 'logo',
        type: 'ReactNode | string',
        default: '—',
        description: 'Logo content shown in the central bubble (string src or JSX).'
      },
      {
        name: 'onMenuClick',
        type: '(open: boolean) => void',
        default: '—',
        description: 'Callback fired whenever the menu toggle changes; receives open state.'
      },
      {
        name: 'className',
        type: 'string',
        default: '—',
        description: 'Additional class names for the root nav wrapper.'
      },
      {
        name: 'style',
        type: 'CSSProperties',
        default: '—',
        description: 'Inline styles applied to the root nav wrapper.'
      },
      {
        name: 'menuAriaLabel',
        type: 'string',
        default: '"Toggle menu"',
        description: 'Accessible aria-label for the toggle button.'
      },
      {
        name: 'menuBg',
        type: 'string',
        default: '"#fff"',
        description: 'Background color for the logo & toggle bubbles and base pill background.'
      },
      {
        name: 'menuContentColor',
        type: 'string',
        default: '"#111"',
        description: 'Color for the menu icon lines and default pill text.'
      },
      {
        name: 'useFixedPosition',
        type: 'boolean',
        default: 'false',
        description: 'If true positions the menu with fixed instead of absolute (follows viewport).'
      },
      {
        name: 'items',
        type: 'MenuItem[]',
        default: 'DEFAULT_ITEMS',
        description:
          'Custom menu items; each = { label, href, ariaLabel?, rotation?, hoverStyles?: { bgColor?, textColor? } }.'
      },
      {
        name: 'animationEase',
        type: 'string',
        default: '"back.out(1.5)"',
        description: 'GSAP ease string used for bubble scale-in animation.'
      },
      {
        name: 'animationDuration',
        type: 'number',
        default: '0.5',
        description: 'Duration (s) for each bubble & label animation.'
      },
      {
        name: 'staggerDelay',
        type: 'number',
        default: '0.12',
        description: 'Base stagger (s) between bubble animations (with slight random variance).'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container demo-container-dots" h={800} overflow="hidden">
            <BubbleMenu
              logo={logo}
              menuBg={menuBg}
              menuContentColor={menuContentColor}
              animationEase={animationEase}
              animationDuration={animationDuration}
              staggerDelay={staggerDelay}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Ease"
              options={easeOptions}
              value={animationEase}
              width={190}
              onChange={value => updateProp('animationEase', value)}
            />

            <PreviewColorPickerCustom title="Menu BG" color={menuBg} onChange={val => updateProp('menuBg', val)} />
            <PreviewColorPickerCustom title="Content Color" color={menuContentColor} onChange={val => updateProp('menuContentColor', val)} />

            <PreviewSlider
              title="Anim Duration"
              min={0.1}
              max={2}
              step={0.05}
              value={animationDuration}
              width={220}
              onChange={value => updateProp('animationDuration', value)}
            />

            <PreviewSlider
              title="Stagger"
              min={0}
              max={0.5}
              step={0.01}
              value={staggerDelay}
              width={220}
              onChange={value => updateProp('staggerDelay', value)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={bubbleMenu} componentName="BubbleMenu" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default BubbleMenuDemo;
