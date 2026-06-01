import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import { reflectiveCard } from '@/constants/code/Components/reflectiveCardCode';
import ReflectiveCard from '@/content/Components/ReflectiveCard/ReflectiveCard';

const DEFAULT_PROPS = {
  blurStrength: 12,
  metalness: 1,
  roughness: 0.75,
  displacementStrength: 20,
  noiseScale: 1,
  specularConstant: 5,
  grayscale: 0.15,
  glassDistortion: 30
};

const ReflectiveCardDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    blurStrength,
    metalness,
    roughness,
    displacementStrength,
    noiseScale,
    specularConstant,
    grayscale,
    glassDistortion
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'blurStrength',
        type: 'number',
        default: '12',
        description: 'The intensity of the blur effect (0-20px)'
      },
      {
        name: 'metalness',
        type: 'number',
        default: '1',
        description: 'The opacity of the metallic sheen (0-1)'
      },
      {
        name: 'roughness',
        type: 'number',
        default: '0.4',
        description: 'The opacity of the noise texture (0-1)'
      },
      {
        name: 'displacementStrength',
        type: 'number',
        default: '20',
        description: 'Strength of the displacement (how much it warps)'
      },
      {
        name: 'noiseScale',
        type: 'number',
        default: '1',
        description: 'Scale of the noise texture (size of the ripples)'
      },
      {
        name: 'specularConstant',
        type: 'number',
        default: '1.2',
        description: 'Specular constant for the lighting (shininess)'
      },
      {
        name: 'grayscale',
        type: 'number',
        default: '1',
        description: 'Grayscale intensity (0-1)'
      },
      {
        name: 'glassDistortion',
        type: 'number',
        default: '0',
        description: 'Strength of the glass edge distortion'
      },
      {
        name: 'color',
        type: 'string',
        default: 'white',
        description: 'The base text color'
      },
      {
        name: 'overlayColor',
        type: 'string',
        default: 'rgba(255, 255, 255, 0.1)',
        description: 'The color of the overlay tint'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={700} overflow="hidden">
            <ReflectiveCard
              blurStrength={blurStrength}
              metalness={metalness}
              roughness={roughness}
              displacementStrength={displacementStrength}
              noiseScale={noiseScale}
              specularConstant={specularConstant}
              grayscale={grayscale}
              glassDistortion={glassDistortion}
            />
          </Box>

          <Customize>
            <PreviewSlider
              title="Blur Strength"
              min={0}
              max={20}
              step={0.5}
              value={blurStrength}
              valueUnit="px"
              onChange={val => updateProp('blurStrength', val)}
            />
            <PreviewSlider
              title="Metalness"
              min={0}
              max={1}
              step={0.05}
              value={metalness}
              onChange={val => updateProp('metalness', val)}
            />
            <PreviewSlider
              title="Roughness"
              min={0}
              max={1}
              step={0.05}
              value={roughness}
              onChange={val => updateProp('roughness', val)}
            />
            <PreviewSlider
              title="Warp Strength"
              min={0}
              max={50}
              step={1}
              value={displacementStrength}
              onChange={val => updateProp('displacementStrength', val)}
            />
            <PreviewSlider
              title="Warp Scale"
              min={0.1}
              max={5}
              step={0.1}
              value={noiseScale}
              onChange={val => updateProp('noiseScale', val)}
            />
            <PreviewSlider
              title="Glass Distortion"
              min={0}
              max={50}
              step={1}
              value={glassDistortion}
              onChange={val => updateProp('glassDistortion', val)}
            />
            <PreviewSlider
              title="Shininess"
              min={0}
              max={5}
              step={0.1}
              value={specularConstant}
              onChange={val => updateProp('specularConstant', val)}
            />
            <PreviewSlider
              title="Grayscale"
              min={0}
              max={1}
              step={0.05}
              value={grayscale}
              onChange={val => updateProp('grayscale', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['lucide-react']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={reflectiveCard} componentName="ReflectiveCard" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ReflectiveCardDemo;
