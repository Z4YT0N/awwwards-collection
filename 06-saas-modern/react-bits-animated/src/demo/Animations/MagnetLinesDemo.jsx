import { useMemo } from 'react';
import { Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PropTable from '../../components/common/Preview/PropTable';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import MagnetLines from '../../content/Animations/MagnetLines/MagnetLines';
import { magnetLines } from '../../constants/code/Animations/magnetLinesCode';

const DEFAULT_PROPS = {
  rows: 10,
  columns: 12,
  containerSize: '40vmin',
  lineWidth: '2px',
  lineHeight: '30px',
  baseAngle: -10,
  lineColor: '#efefef'
};

const MagnetLinesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { rows, columns, containerSize, lineWidth, lineHeight, baseAngle, lineColor } = props;

  const propData = useMemo(
    () => [
      {
        name: 'rows',
        type: 'number',
        default: '9',
        description: 'Number of grid rows.'
      },
      {
        name: 'columns',
        type: 'number',
        default: '9',
        description: 'Number of grid columns.'
      },
      {
        name: 'containerSize',
        type: 'string',
        default: '80vmin',
        description: 'Specifies the width and height of the entire grid container.'
      },
      {
        name: 'lineColor',
        type: 'string',
        default: '#efefef',
        description: 'Color for each line (the <span> elements).'
      },
      {
        name: 'lineWidth',
        type: 'string',
        default: '1vmin',
        description: 'Specifies each line’s thickness.'
      },
      {
        name: 'lineHeight',
        type: 'string',
        default: '6vmin',
        description: 'Specifies each line’s length.'
      },
      {
        name: 'baseAngle',
        type: 'number',
        default: '-10',
        description: 'Initial rotation angle (in degrees) before pointer movement.'
      },
      {
        name: 'className',
        type: 'string',
        default: '',
        description: 'Additional class name(s) applied to the container.'
      },
      {
        name: 'style',
        type: 'object',
        default: '{}',
        description: 'Inline styles for the container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Flex overflow="hidden" justifyContent="center" pb={'1em'} alignItems="center" className="demo-container">
            <MagnetLines
              rows={rows}
              columns={columns}
              containerSize={containerSize}
              lineWidth={lineWidth}
              lineHeight={lineHeight}
              baseAngle={baseAngle}
              lineColor={lineColor}
            />
          </Flex>

          <Customize>
            <PreviewSlider title="Rows" min={3} max={20} step={1} value={rows} onChange={v => updateProp('rows', v)} />
            <PreviewSlider title="Columns" min={3} max={20} step={1} value={columns} onChange={v => updateProp('columns', v)} />
            <PreviewSlider title="Base Angle" min={-180} max={180} step={5} value={baseAngle} onChange={v => updateProp('baseAngle', v)} />
            <PreviewColorPickerCustom title="Line Color" color={lineColor} onChange={v => updateProp('lineColor', v)} />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={magnetLines} componentName="MagnetLines" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default MagnetLinesDemo;
