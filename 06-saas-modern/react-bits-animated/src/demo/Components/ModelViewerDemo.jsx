import { useState, useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import ModelViewer from '../../content/Components/ModelViewer/ModelViewer';
import { modelViewer } from '../../constants/code/Components/modelViewerCode';

const DEFAULT_PROPS = {
  selectedModel: 'toyCar',
  modelXOffset: 0.5,
  modelYOffset: 0,
  enableMouseParallax: true,
  enableHoverRotation: true,
  environmentPreset: 'forest',
  fadeIn: false,
  autoRotate: false,
  autoRotateSpeed: 0.35,
  showScreenshotButton: true
};

const ModelViewerDemo = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [key, forceRerender] = useForceRerender();

  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    selectedModel,
    modelXOffset,
    modelYOffset,
    enableMouseParallax,
    enableHoverRotation,
    environmentPreset,
    fadeIn,
    autoRotate,
    autoRotateSpeed,
    showScreenshotButton
  } = props;

  const urlMap = {
    toyCar: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb',
    sheenChair:
      'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/SheenChair/glTF-Binary/SheenChair.glb'
  };
  const textMap = {
    toyCar: 'Fast as lightning.',
    sheenChair: 'Ultra comfortable.'
  };
  const handleModelChange = value => {
    setIsTextVisible(false);
    updateProp('selectedModel', value);
    forceRerender();
  };

  const propData = useMemo(
    () => [
      { name: 'url', type: 'string', default: '-', description: 'URL of the 3D model file (glb/gltf/fbx/obj)' },
      { name: 'width', type: 'number | string', default: '400', description: 'Width of the canvas container' },
      { name: 'height', type: 'number | string', default: '400', description: 'Height of the canvas container' },
      { name: 'modelXOffset', type: 'number', default: '0', description: 'Horizontal offset of the model' },
      { name: 'modelYOffset', type: 'number', default: '0', description: 'Vertical offset of the model' },
      {
        name: 'defaultRotationX',
        type: 'number',
        default: '-50',
        description: 'Initial rotation on the X axis in degrees'
      },
      {
        name: 'defaultRotationY',
        type: 'number',
        default: '20',
        description: 'Initial rotation on the Y axis in degrees'
      },
      { name: 'defaultZoom', type: 'number', default: '0.5', description: 'Initial zoom distance factor' },
      { name: 'minZoomDistance', type: 'number', default: '0.5', description: 'Minimum zoom distance' },
      { name: 'maxZoomDistance', type: 'number', default: '10', description: 'Maximum zoom distance' },
      {
        name: 'enableMouseParallax',
        type: 'boolean',
        default: 'true',
        description: 'Enable mouse-based parallax effect'
      },
      {
        name: 'enableManualRotation',
        type: 'boolean',
        default: 'true',
        description: 'Enable manual rotation via drag'
      },
      {
        name: 'enableHoverRotation',
        type: 'boolean',
        default: 'true',
        description: 'Enable rotation on hover based on cursor'
      },
      {
        name: 'enableManualZoom',
        type: 'boolean',
        default: 'true',
        description: 'Enable manual zoom via mouse wheel or gestures'
      },
      { name: 'ambientIntensity', type: 'number', default: '0.3', description: 'Intensity of ambient light' },
      { name: 'keyLightIntensity', type: 'number', default: '1', description: 'Intensity of key light' },
      { name: 'fillLightIntensity', type: 'number', default: '0.5', description: 'Intensity of fill light' },
      { name: 'rimLightIntensity', type: 'number', default: '0.8', description: 'Intensity of rim light' },
      {
        name: 'environmentPreset',
        type: 'string',
        default: '"forest"',
        description: 'Environment preset for scene lighting'
      },
      { name: 'autoFrame', type: 'boolean', default: 'false', description: 'Automatically frame the model in view' },
      { name: 'fadeIn', type: 'boolean', default: 'false', description: 'Enable fade-in transition on load' },
      { name: 'autoRotate', type: 'boolean', default: 'false', description: 'Enable automatic rotation animation' },
      { name: 'autoRotateSpeed', type: 'number', default: '0.35', description: 'Speed of automatic rotation' },
      {
        name: 'showScreenshotButton',
        type: 'boolean',
        default: 'true',
        description: 'Show the screenshot button overlay'
      },
      { name: 'placeholderSrc', type: 'string', default: '-', description: 'Placeholder image source while loading' },
      { name: 'onModelLoaded', type: 'function', default: '-', description: 'Callback when model finishes loading' }
    ],
    []
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['selectedModel']}
      computedProps={{ url: urlMap[selectedModel] }}
    >
      <TabsLayout>
        <PreviewTab>
          <Box
            position="relative"
            className="demo-container"
            h={400}
            overflow="hidden"
            p={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {isTextVisible && (
              <Text
                userSelect="none"
                position="absolute"
                top="50%"
                left="6em"
                transform="translate(-50%, -50%)"
                fontSize="3rem"
                whiteSpace="nowrap"
                fontWeight="900"
                color="white"
                textAlign="center"
                textShadow="0 0 10px rgba(255, 255, 255, 0.8)"
                zIndex={1}
                display={{ base: 'none', md: 'block' }}
              >
                {textMap[selectedModel]}
              </Text>
            )}
            <ModelViewer
              key={key}
              url={urlMap[selectedModel]}
              width="100%"
              height="100%"
              modelXOffset={modelXOffset}
              modelYOffset={modelYOffset}
              maxZoomDistance={0.7}
              enableMouseParallax={enableMouseParallax}
              enableHoverRotation={enableHoverRotation}
              environmentPreset={environmentPreset}
              fadeIn={fadeIn}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              showScreenshotButton={showScreenshotButton}
              onModelLoaded={() => setIsTextVisible(true)}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Model"
              width={150}
              options={[
                { label: 'Car', value: 'toyCar' },
                { label: 'Chair', value: 'sheenChair' }
              ]}
              value={selectedModel}
              onChange={handleModelChange}
            />

            <PreviewSelect
              title="Environment"
              width={150}
              options={[
                { label: 'City', value: 'city' },
                { label: 'Sunset', value: 'sunset' },
                { label: 'Night', value: 'night' },
                { label: 'Dawn', value: 'dawn' },
                { label: 'Studio', value: 'studio' },
                { label: 'Apartment', value: 'apartment' },
                { label: 'Forest', value: 'forest' },
                { label: 'Park', value: 'park' },
                { label: 'None', value: 'none' }
              ]}
              value={environmentPreset}
              onChange={val => {
                updateProp('environmentPreset', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Horizontal Offset"
              min={-1}
              max={1}
              step={0.1}
              value={modelXOffset}
              onChange={val => {
                updateProp('modelXOffset', val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Vertical Offset"
              min={-1}
              max={1}
              step={0.1}
              value={modelYOffset}
              onChange={val => {
                updateProp('modelYOffset', val);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Mouse Parallax"
              isChecked={enableMouseParallax}
              onChange={checked => {
                updateProp('enableMouseParallax', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Hover Rotation"
              isChecked={enableHoverRotation}
              onChange={checked => {
                updateProp('enableHoverRotation', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Screenshot Button"
              isChecked={showScreenshotButton}
              onChange={checked => {
                updateProp('showScreenshotButton', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Fade In On Load"
              isChecked={fadeIn}
              onChange={checked => {
                updateProp('fadeIn', checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Auto Rotate"
              isChecked={autoRotate}
              onChange={checked => {
                updateProp('autoRotate', checked);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Rotate Speed"
              min={0.1}
              max={2}
              step={0.1}
              value={autoRotateSpeed}
              isDisabled={!autoRotate}
              onChange={val => {
                updateProp('autoRotateSpeed', val);
                forceRerender();
              }}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three', '@react-three/fiber', '@react-three/drei']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={modelViewer} componentName="ModelViewer" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ModelViewerDemo;
