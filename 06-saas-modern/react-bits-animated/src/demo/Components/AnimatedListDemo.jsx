import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import AnimatedList from '../../content/Components/AnimatedList/AnimatedList';
import { animatedList } from '../../constants/code/Components/animatedListCode';

const DEFAULT_PROPS = {
  showGradients: true,
  enableArrowNavigation: true,
  displayScrollbar: true
};

const AnimatedListDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { showGradients, enableArrowNavigation, displayScrollbar } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'string[]',
        default: "['Item 1', 'Item 2', ...]",
        description: 'An array of items to display in the scrollable list.'
      },
      {
        name: 'onItemSelect',
        type: 'function',
        default: 'undefined',
        description: 'Callback function triggered when an item is selected. Receives the selected item and its index.'
      },
      {
        name: 'showGradients',
        type: 'boolean',
        default: 'true',
        description: 'Toggle to display the top and bottom gradient overlays.'
      },
      {
        name: 'enableArrowNavigation',
        type: 'boolean',
        default: 'true',
        description: 'Toggle to enable keyboard navigation via arrow and tab keys.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS class names for the main container.'
      },
      {
        name: 'itemClassName',
        type: 'string',
        default: "''",
        description: 'Additional CSS class names for each list item.'
      },
      {
        name: 'displayScrollbar',
        type: 'boolean',
        default: 'true',
        description: 'Toggle to display or hide the custom scrollbar.'
      },
      {
        name: 'initialSelectedIndex',
        type: 'number',
        default: '-1',
        description: 'Initial index of the selected item. Set to -1 for no selection.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden">
            <AnimatedList
              key={key}
              showGradients={showGradients}
              enableArrowNavigation={enableArrowNavigation}
              displayScrollbar={displayScrollbar}
            />
          </Box>

          <Customize>
            <PreviewSwitch
              title="Fade Items"
              isChecked={showGradients}
              onChange={checked => {
                updateProp('showGradients', checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Keyboard Navigation"
              isChecked={enableArrowNavigation}
              onChange={checked => {
                updateProp('enableArrowNavigation', checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Show Scrollbar"
              isChecked={displayScrollbar}
              onChange={checked => {
                updateProp('displayScrollbar', checked);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['motion']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={animatedList} componentName="AnimatedList" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default AnimatedListDemo;
