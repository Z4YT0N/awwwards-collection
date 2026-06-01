import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '@/components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { gridScan } from '@/constants/code/Backgrounds/gridScanCode';
import { GridScan } from '@/content/Backgrounds/GridScan/GridScan';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

const DEFAULT_PROPS = {
  lineThickness: 1,
  gridScale: 0.1,
  lineJitter: 0.1,
  linesColor: '#2F293A',
  scanColor: '#FF9FFC',
  enablePost: true,
  chromaticAberration: 0.002,
  noiseIntensity: 0.01,
  scanGlow: 0.5,
  scanSoftness: 2,
  enableWebcam: false,
  showPreview: false
};

const GridScanDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    lineThickness,
    gridScale,
    lineJitter,
    linesColor,
    scanColor,
    enablePost,
    chromaticAberration,
    noiseIntensity,
    scanGlow,
    scanSoftness,
    enableWebcam,
    showPreview
  } = props;

  const propData = useMemo(
    () => [
      { name: 'enableWebcam', type: 'boolean', default: 'false', description: 'Enable face tracking via webcam.' },
      { name: 'showPreview', type: 'boolean', default: 'false', description: 'Show webcam preview/debug HUD.' },
      {
        name: 'modelsPath',
        type: 'string',
        default: 'CDN URL',
        description: 'Path/URL to face-api.js models.'
      },
      { name: 'sensitivity', type: 'number', default: '0.55', description: 'Overall responsiveness to input.' },
      { name: 'lineThickness', type: 'number', default: '1', description: 'Grid line thickness.' },
      { name: 'linesColor', type: 'string', default: "'#2F293A'", description: 'Color of the grid lines.' },
      { name: 'gridScale', type: 'number', default: '0.1', description: 'Grid spacing scale (smaller = denser).' },
      { name: 'lineStyle', type: "'solid' | 'dashed' | 'dotted'", default: "'solid'", description: 'Grid line style.' },
      { name: 'lineJitter', type: 'number', default: '0.1', description: 'Animated jitter along the grid lines.' },
      { name: 'enablePost', type: 'boolean', default: 'true', description: 'Enable post-processing effects.' },
      { name: 'bloomIntensity', type: 'number', default: '0', description: 'Bloom strength.' },
      { name: 'bloomThreshold', type: 'number', default: '0', description: 'Bloom luminance threshold.' },
      { name: 'bloomSmoothing', type: 'number', default: '0', description: 'Bloom threshold smoothing.' },
      {
        name: 'chromaticAberration',
        type: 'number',
        default: '0.002',
        description: 'Chromatic aberration offset (post).'
      },
      { name: 'noiseIntensity', type: 'number', default: '0.01', description: 'Additive film grain intensity.' },
      { name: 'scanColor', type: 'string', default: "'#FF9FFC'", description: 'Color of the scan beam/aura.' },
      { name: 'scanOpacity', type: 'number', default: '0.4', description: 'Opacity of the scan effect.' },
      {
        name: 'scanDirection',
        type: "'forward' | 'backward' | 'pingpong'",
        default: "'pingpong'",
        description: 'Scan motion.'
      },
      { name: 'scanSoftness', type: 'number', default: '2', description: 'Softness of scan band edges.' },
      { name: 'scanGlow', type: 'number', default: '0.5', description: 'Relative width/intensity of glow.' },
      { name: 'scanPhaseTaper', type: 'number', default: '0.9', description: 'Fade-in/out window for the phase.' },
      { name: 'scanDuration', type: 'number', default: '2.0', description: 'Duration of a scan cycle (seconds).' },
      { name: 'scanDelay', type: 'number', default: '2.0', description: 'Delay between scan cycles (seconds).' },
      { name: 'enableGyro', type: 'boolean', default: 'false', description: 'Use device orientation for input.' },
      { name: 'scanOnClick', type: 'boolean', default: 'false', description: 'Trigger a scan when clicking.' },
      { name: 'snapBackDelay', type: 'number', default: '250', description: 'Delay (ms) before input recenters.' },
      { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes.' },
      { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Inline style overrides.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <GridScan
              lineThickness={lineThickness}
              gridScale={gridScale}
              lineJitter={lineJitter}
              linesColor={linesColor}
              scanColor={scanColor}
              enablePost={enablePost}
              chromaticAberration={chromaticAberration}
              noiseIntensity={noiseIntensity}
              scanGlow={scanGlow}
              scanSoftness={scanSoftness}
              enableWebcam={enableWebcam}
              showPreview={showPreview}
            />

            <BackgroundContent pillText="New Background" headline="Hold on, scanning for Angular users." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="grid-scan"
              currentProps={{
                lineThickness,
                linesColor,
                scanColor,
                gridScale,
                lineJitter,
                noiseIntensity,
                scanGlow,
                scanSoftness
              }}
              defaultProps={{
                sensitivity: 0.55,
                lineThickness: 1,
                linesColor: '#2F293A',
                scanColor: '#FF9FFC',
                scanOpacity: 0.4,
                gridScale: 0.1,
                lineStyle: 'solid',
                lineJitter: 0.1,
                scanDirection: 'pingpong',
                noiseIntensity: 0.01,
                scanGlow: 0.5,
                scanSoftness: 2,
                scanDuration: 2,
                scanDelay: 2,
                scanOnClick: false
              }}
            />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom title="Lines Color" color={linesColor} onChange={val => updateProp('linesColor', val)} />
            <PreviewColorPickerCustom title="Scan Color" color={scanColor} onChange={val => updateProp('scanColor', val)} />

            <PreviewSlider
              title="Line Thickness"
              min={1}
              max={4}
              step={0.1}
              value={lineThickness}
              onChange={v => updateProp('lineThickness', v)}
            />

            <PreviewSlider
              title="Grid Scale"
              min={0.02}
              max={0.5}
              step={0.01}
              value={gridScale}
              onChange={v => updateProp('gridScale', v)}
            />

            <PreviewSlider
              title="Line Jitter"
              min={0}
              max={1}
              step={0.01}
              value={lineJitter}
              onChange={v => updateProp('lineJitter', v)}
            />

            <PreviewSlider
              title="Scan Glow"
              min={0.1}
              max={3}
              step={0.1}
              value={scanGlow}
              onChange={v => updateProp('scanGlow', v)}
            />

            <PreviewSlider
              title="Scan Softness"
              min={0.1}
              max={4}
              step={0.1}
              value={scanSoftness}
              onChange={v => updateProp('scanSoftness', v)}
            />

            <PreviewSwitch title="Enable Post" isChecked={enablePost} onChange={v => updateProp('enablePost', v)} />

            <PreviewSlider
              title="Chromatic Aberration"
              min={0}
              max={0.01}
              step={0.0005}
              value={chromaticAberration}
              onChange={v => updateProp('chromaticAberration', v)}
            />

            <PreviewSlider
              title="Noise Intensity"
              min={0}
              max={0.1}
              step={0.005}
              value={noiseIntensity}
              onChange={v => updateProp('noiseIntensity', v)}
            />

            <PreviewSwitch
              title="Enable Webcam"
              isChecked={enableWebcam}
              onChange={v => updateProp('enableWebcam', v)}
            />
            <PreviewSwitch
              title="Show Preview HUD"
              isChecked={showPreview}
              onChange={v => updateProp('showPreview', v)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', 'face-api.js']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gridScan} componentName="GridScan" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GridScanDemo;
