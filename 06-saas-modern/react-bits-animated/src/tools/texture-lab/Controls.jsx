import { Box, Flex, Text, Icon, Input } from '@chakra-ui/react';
import {
  Upload,
  Link,
  Image as ImageIcon,
  Sparkles,
  Grid3X3,
  Circle,
  Type,
  Layers,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  RotateCcw,
  Shuffle,
  Wand2,
  X,
  Aperture,
  ScanLine,
  Grid2X2,
  Droplets,
  Waves,
  Palette,
  Focus,
  Blend,
  Sliders,
  GripVertical,
  FileUp,
  FileDown,
  Eclipse,
  Zap,
  Monitor,
  Contrast,
  Paintbrush,
  Maximize,
  CircleDot,
  Move,
  Sun,
  Sparkle,
  Target,
  Hexagon,
  SunDim,
  Lightbulb,
  Palette as PaletteIcon,
  Dices
} from 'lucide-react';
import { useState, useCallback, useRef, useMemo, memo } from 'react';
import { toaster } from '../../components/setup/toaster';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import {
  EFFECT_TYPES,
  BLEND_MODES,
  DITHER_METHODS,
  ASCII_PRESETS,
  HALFTONE_SHAPES,
  OVERLAY_TEXTURES,
  PRESETS,
  EXPORT_SCALES,
  createEffect
} from './types';

const SectionHeader = ({ children, collapsible, isOpen, onToggle }) => (
  <Flex
    align="center"
    justify="space-between"
    cursor={collapsible ? 'pointer' : 'default'}
    onClick={collapsible ? onToggle : undefined}
    mb={3}
  >
    <Text fontSize="11px" color="var(--text-muted)" fontWeight={600} textTransform="uppercase" letterSpacing="0.5px">
      {children}
    </Text>
    {collapsible && <Icon as={isOpen ? ChevronUp : ChevronDown} boxSize={4} color="var(--text-muted)" />}
  </Flex>
);

const EFFECT_ICONS = {
  [EFFECT_TYPES.NOISE]: Sparkles,
  [EFFECT_TYPES.DITHER]: Grid3X3,
  [EFFECT_TYPES.HALFTONE]: Circle,
  [EFFECT_TYPES.ASCII]: Type,
  [EFFECT_TYPES.OVERLAY]: Layers,
  [EFFECT_TYPES.CHROMATIC]: Aperture,
  [EFFECT_TYPES.VIGNETTE]: Eclipse,
  [EFFECT_TYPES.SCANLINES]: ScanLine,
  [EFFECT_TYPES.PIXELATE]: Grid2X2,
  [EFFECT_TYPES.BLUR]: Droplets,
  [EFFECT_TYPES.DISTORTION]: Waves,
  [EFFECT_TYPES.POSTERIZE]: Palette,
  [EFFECT_TYPES.EDGE]: Focus,
  [EFFECT_TYPES.GRAIN]: Blend,
  [EFFECT_TYPES.COLOR_GRADE]: Sliders,
  [EFFECT_TYPES.GLITCH]: Zap,
  [EFFECT_TYPES.CRT]: Monitor,
  [EFFECT_TYPES.DUOTONE]: Contrast,
  [EFFECT_TYPES.KUWAHARA]: Paintbrush,
  [EFFECT_TYPES.BARREL]: Maximize,
  [EFFECT_TYPES.RIPPLE]: CircleDot,
  [EFFECT_TYPES.DISPLACEMENT]: Move,
  [EFFECT_TYPES.LIGHT_LEAK]: Sun,
  [EFFECT_TYPES.BLOOM]: Sparkle,
  [EFFECT_TYPES.RADIAL_BLUR]: Target,
  [EFFECT_TYPES.MOSAIC]: Hexagon,
  [EFFECT_TYPES.TILT_SHIFT]: SunDim,
  [EFFECT_TYPES.EXPOSURE]: Lightbulb,
  [EFFECT_TYPES.VIBRANCE]: PaletteIcon,
  [EFFECT_TYPES.DOT_DITHER]: CircleDot
};

const EFFECT_NAMES = {
  [EFFECT_TYPES.NOISE]: 'Grain',
  [EFFECT_TYPES.DITHER]: 'Dithering',
  [EFFECT_TYPES.HALFTONE]: 'Halftone',
  [EFFECT_TYPES.ASCII]: 'ASCII',
  [EFFECT_TYPES.OVERLAY]: 'Texture Overlay',
  [EFFECT_TYPES.CHROMATIC]: 'Chr. Aberration',
  [EFFECT_TYPES.VIGNETTE]: 'Vignette',
  [EFFECT_TYPES.SCANLINES]: 'Scan Lines',
  [EFFECT_TYPES.PIXELATE]: 'Pixelate',
  [EFFECT_TYPES.BLUR]: 'Blur',
  [EFFECT_TYPES.DISTORTION]: 'Distortion',
  [EFFECT_TYPES.POSTERIZE]: 'Posterize',
  [EFFECT_TYPES.EDGE]: 'Edge Detection',
  [EFFECT_TYPES.GRAIN]: 'Film Grain',
  [EFFECT_TYPES.COLOR_GRADE]: 'Color Grading',
  [EFFECT_TYPES.GLITCH]: 'Glitch Split',
  [EFFECT_TYPES.CRT]: 'CRT Monitor',
  [EFFECT_TYPES.DUOTONE]: 'Duotone',
  [EFFECT_TYPES.KUWAHARA]: 'Oil Paint',
  [EFFECT_TYPES.BARREL]: 'Barrel Distortion',
  [EFFECT_TYPES.RIPPLE]: 'Ripple',
  [EFFECT_TYPES.DISPLACEMENT]: 'Displacement',
  [EFFECT_TYPES.LIGHT_LEAK]: 'Light Leak',
  [EFFECT_TYPES.BLOOM]: 'Bloom',
  [EFFECT_TYPES.RADIAL_BLUR]: 'Zoom Blur',
  [EFFECT_TYPES.MOSAIC]: 'Stained Glass',
  [EFFECT_TYPES.TILT_SHIFT]: 'Tilt Shift',
  [EFFECT_TYPES.EXPOSURE]: 'Exposure',
  [EFFECT_TYPES.VIBRANCE]: 'Vibrance',
  [EFFECT_TYPES.DOT_DITHER]: 'Dot Dither'
};

const ToggleButton = ({ icon: IconComponent, label, onClick, flex, disabled, title, ...rest }) => (
  <Flex
    as="button"
    type="button"
    align="center"
    justify="center"
    gap={1.5}
    px={label ? 3 : 2}
    py={2}
    bg="var(--bg-elevated)"
    border="1px solid var(--border-primary)"
    borderRadius="var(--radius-sm)"
    cursor={disabled ? 'not-allowed' : 'pointer'}
    opacity={disabled ? 0.5 : 1}
    onClick={disabled ? undefined : onClick}
    transition="all 0.15s"
    _hover={disabled ? {} : { bg: 'rgba(168, 85, 247, 0.1)', borderColor: 'var(--color-primary)' }}
    flex={flex}
    title={title}
    {...rest}
  >
    <Icon as={IconComponent} boxSize={3.5} color="var(--text-muted)" />
    {label && (
      <Text fontSize="11px" color="var(--text-primary)" fontWeight={500}>
        {label}
      </Text>
    )}
  </Flex>
);

const NoiseParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Scale" value={params.scale} onChange={v => onChange({ ...params, scale: v })} min={0.5} max={4} step={0.1} />
    <PreviewSwitch title="Monochrome" isChecked={params.monochrome} onChange={v => onChange({ ...params, monochrome: v })} />
    <PreviewSelect
      title="Blend Mode"
      value={params.blendMode}
      onChange={v => onChange({ ...params, blendMode: v })}
      options={[
        { value: BLEND_MODES.OVERLAY, label: 'Overlay' },
        { value: BLEND_MODES.SOFT_LIGHT, label: 'Soft Light' },
        { value: BLEND_MODES.MULTIPLY, label: 'Multiply' },
        { value: BLEND_MODES.SCREEN, label: 'Screen' }
      ]}
    />
  </>
);

const DitherParams = ({ params, onChange }) => (
  <>
    <PreviewSelect
      title="Method"
      value={params.method}
      onChange={v => onChange({ ...params, method: v })}
      options={[
        { value: DITHER_METHODS.BAYER_2X2, label: 'Bayer 2×2' },
        { value: DITHER_METHODS.BAYER_4X4, label: 'Bayer 4×4' },
        { value: DITHER_METHODS.BAYER_8X8, label: 'Bayer 8×8' }
      ]}
    />
    <PreviewSlider title="Color Levels" value={params.levels} onChange={v => onChange({ ...params, levels: v })} min={2} max={16} step={1} />
    <PreviewSlider title="Threshold" value={params.threshold} onChange={v => onChange({ ...params, threshold: v })} min={0} max={2} step={0.05} />
    <PreviewSlider title="Pattern Scale" value={params.scale || 1} onChange={v => onChange({ ...params, scale: v })} min={0.5} max={4} step={0.1} valueUnit="×" />
  </>
);

const HalftoneParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Grid Size" value={params.gridSize} onChange={v => onChange({ ...params, gridSize: v })} min={3} max={40} step={1} valueUnit="px" />
    <PreviewSlider title="Dot Scale" value={params.dotScale} onChange={v => onChange({ ...params, dotScale: v })} min={0.2} max={2.0} step={0.05} />
    <PreviewSlider title="Angle" value={params.angle} onChange={v => onChange({ ...params, angle: v })} min={0} max={90} step={1} valueUnit="°" />
    <PreviewSelect
      title="Shape"
      value={params.shape}
      onChange={v => onChange({ ...params, shape: v })}
      options={[
        { value: HALFTONE_SHAPES.CIRCLE, label: 'Circle' },
        { value: HALFTONE_SHAPES.SQUARE, label: 'Square' },
        { value: HALFTONE_SHAPES.DIAMOND, label: 'Diamond' },
        { value: HALFTONE_SHAPES.ELLIPSE, label: 'Ellipse' },
        { value: HALFTONE_SHAPES.LINE, label: 'Line' },
        { value: HALFTONE_SHAPES.CROSS, label: 'Cross' },
        { value: HALFTONE_SHAPES.RING, label: 'Ring' }
      ]}
    />
    <PreviewSlider title="Softness" value={params.softness} onChange={v => onChange({ ...params, softness: v })} min={0} max={1} step={0.05} />
    <PreviewSlider title="Contrast" value={params.contrast} onChange={v => onChange({ ...params, contrast: v })} min={-1} max={1} step={0.05} />
    <PreviewSelect
      title="Color Mode"
      value={params.colorMode}
      onChange={v => onChange({ ...params, colorMode: v })}
      options={[
        { value: 'original', label: 'Original Colors' },
        { value: 'monochrome', label: 'Monochrome' },
        { value: 'duotone', label: 'Duotone' },
        { value: 'cmyk', label: 'CMYK' }
      ]}
    />
    {(params.colorMode === 'monochrome' || params.colorMode === 'duotone') && (
      <>
        <PreviewColorPickerCustom title="Dot Color" color={params.dotColor} onChange={v => onChange({ ...params, dotColor: v })} />
        <PreviewColorPickerCustom title="Background" color={params.backgroundColor} onChange={v => onChange({ ...params, backgroundColor: v })} />
      </>
    )}
    <PreviewSwitch title="Invert" isChecked={params.invert} onChange={v => onChange({ ...params, invert: v })} />
    <PreviewSlider title="Mix Original" value={params.mixOriginal} onChange={v => onChange({ ...params, mixOriginal: v })} min={0} max={1} step={0.05} />
  </>
);

const ASCIIParams = ({ params, onChange }) => (
  <>
    <PreviewSelect
      title="Character Set"
      value={params.charset}
      onChange={v => onChange({ ...params, charset: v })}
      options={[
        { value: ASCII_PRESETS.STANDARD, label: 'Standard' },
        { value: ASCII_PRESETS.BLOCKS, label: 'Block Elements' },
        { value: ASCII_PRESETS.SIMPLE, label: 'Simple' },
        { value: ASCII_PRESETS.DETAILED, label: 'Detailed' }
      ]}
    />
    <PreviewSlider title="Cell Size" value={params.cellSize} onChange={v => onChange({ ...params, cellSize: v })} min={4} max={20} step={1} valueUnit="px" />
    <PreviewSlider title="Brightness" value={params.brightness ?? 1.0} onChange={v => onChange({ ...params, brightness: v })} min={0.5} max={2.0} step={0.05} />
    <PreviewSlider title="Contrast" value={params.contrast ?? 1.0} onChange={v => onChange({ ...params, contrast: v })} min={0.5} max={2.0} step={0.05} />
    <PreviewSlider title="Gamma" value={params.gamma ?? 1.0} onChange={v => onChange({ ...params, gamma: v })} min={0.2} max={3.0} step={0.05} />
    <PreviewSlider title="Character Brightness" value={params.charBrightness ?? 1.0} onChange={v => onChange({ ...params, charBrightness: v })} min={0.5} max={3.0} step={0.1} />
    <PreviewSwitch title="Color Output" isChecked={params.color} onChange={v => onChange({ ...params, color: v })} />
    {!params.color && (
      <PreviewColorPickerCustom title="Character Color" color={params.charColor || '#ffffff'} onChange={v => onChange({ ...params, charColor: v })} />
    )}
    <PreviewColorPickerCustom title="Background Color" color={params.backgroundColor || '#000000'} onChange={v => onChange({ ...params, backgroundColor: v })} />
    <PreviewSlider title="Background Blend" value={params.backgroundBlend ?? 1.0} onChange={v => onChange({ ...params, backgroundBlend: v })} min={0} max={1} step={0.05} />
    <PreviewSlider title="Cell Gap" value={params.cellGap ?? 0.0} onChange={v => onChange({ ...params, cellGap: v })} min={0} max={0.5} step={0.01} />
    <PreviewSlider title="Edge Enhance" value={params.edgeEnhance ?? 0.0} onChange={v => onChange({ ...params, edgeEnhance: v })} min={0} max={1} step={0.05} />
    <PreviewSwitch title="Invert Brightness" isChecked={params.invert || false} onChange={v => onChange({ ...params, invert: v })} />
  </>
);

const OverlayParams = ({ params, onChange }) => {
  const fileInputRef = useRef(null);

  const handleCustomTextureUpload = useCallback(
    e => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange({ ...params, texture: OVERLAY_TEXTURES.CUSTOM, customTextureUrl: url });
      }
      e.target.value = '';
    },
    [params, onChange]
  );

  return (
    <>
      <PreviewSelect
        title="Texture"
        value={params.texture}
        onChange={v => onChange({ ...params, texture: v })}
        options={[
          { value: OVERLAY_TEXTURES.PAPER, label: 'Paper' },
          { value: OVERLAY_TEXTURES.FILM_GRAIN, label: 'Film Grain' },
          { value: OVERLAY_TEXTURES.CANVAS, label: 'Canvas' },
          { value: OVERLAY_TEXTURES.DUST, label: 'Dust & Scratches' },
          { value: OVERLAY_TEXTURES.CUSTOM, label: 'Custom Upload' }
        ]}
      />

      {params.texture === OVERLAY_TEXTURES.CUSTOM && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomTextureUpload}
            accept="image/png,image/jpeg,image/webp"
            style={{ display: 'none' }}
          />
          <Flex
            as="button"
            type="button"
            direction="column"
            align="center"
            justify="center"
            gap={2}
            p={3}
            bg={params.customTextureUrl ? 'transparent' : 'var(--bg-elevated)'}
            border="1px dashed var(--color-primary)"
            borderRadius="var(--radius-sm)"
            cursor="pointer"
            onClick={() => fileInputRef.current?.click()}
            transition="all 0.15s"
            _hover={{ bg: 'rgba(168, 85, 247, 0.1)' }}
            position="relative"
            overflow="hidden"
            minH="60px"
          >
            {params.customTextureUrl ? (
              <>
                <Box
                  as="img"
                  src={params.customTextureUrl}
                  position="absolute"
                  top={0}
                  left={0}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity={0.5}
                />
                <Text fontSize="11px" color="var(--color-primary)" fontWeight={500} zIndex={1}>
                  Click to change texture
                </Text>
              </>
            ) : (
              <>
                <Icon as={Upload} boxSize={4} color="#ffffff" />
                <Text fontSize="11px" color="#ffffff" fontWeight={500}>
                  Upload custom texture
                </Text>
              </>
            )}
          </Flex>
        </>
      )}

      <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
      <PreviewSlider title="Scale" value={params.scale} onChange={v => onChange({ ...params, scale: v })} min={0.25} max={4} step={0.05} />
      <PreviewSlider title="Rotation" value={params.rotation} onChange={v => onChange({ ...params, rotation: v })} min={0} max={360} step={1} valueUnit="°" />
      <PreviewSelect
        title="Blend Mode"
        value={params.blendMode}
        onChange={v => onChange({ ...params, blendMode: v })}
        options={[
          { value: BLEND_MODES.OVERLAY, label: 'Overlay' },
          { value: BLEND_MODES.SOFT_LIGHT, label: 'Soft Light' },
          { value: BLEND_MODES.MULTIPLY, label: 'Multiply' },
          { value: BLEND_MODES.SCREEN, label: 'Screen' }
        ]}
      />
    </>
  );
};

const ChromaticParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={0.05} step={0.001} />
    <PreviewSlider title="Angle" value={params.angle} onChange={v => onChange({ ...params, angle: v })} min={0} max={360} step={1} valueUnit="°" />
    <PreviewSwitch title="Radial" isChecked={params.radial} onChange={v => onChange({ ...params, radial: v })} />
  </>
);

const VignetteParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Size" value={params.size} onChange={v => onChange({ ...params, size: v })} min={0.1} max={1} step={0.01} />
    <PreviewSlider title="Softness" value={params.softness} onChange={v => onChange({ ...params, softness: v })} min={0} max={1} step={0.01} />
    <PreviewColorPickerCustom title="Color" color={params.color} onChange={v => onChange({ ...params, color: v })} />
  </>
);

const ScanlinesParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Spacing" value={params.spacing} onChange={v => onChange({ ...params, spacing: v })} min={2} max={20} step={1} valueUnit="px" />
    <PreviewSlider title="Thickness" value={params.thickness} onChange={v => onChange({ ...params, thickness: v })} min={1} max={10} step={0.5} valueUnit="px" />
    <PreviewSlider title="Opacity" value={params.opacity} onChange={v => onChange({ ...params, opacity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Offset" value={params.offset} onChange={v => onChange({ ...params, offset: v })} min={0} max={20} step={0.5} valueUnit="px" />
    <PreviewSwitch title="Horizontal" isChecked={params.horizontal} onChange={v => onChange({ ...params, horizontal: v })} />
  </>
);

const PixelateParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Pixel Size" value={params.size} onChange={v => onChange({ ...params, size: v })} min={2} max={64} step={1} valueUnit="px" />
    <PreviewSwitch title="Maintain Aspect" isChecked={params.maintainAspect} onChange={v => onChange({ ...params, maintainAspect: v })} />
  </>
);

const BlurParams = ({ params, onChange }) => (
  <>
    <PreviewSelect
      title="Type"
      value={params.type}
      onChange={v => onChange({ ...params, type: v })}
      options={[
        { value: 'gaussian', label: 'Gaussian' },
        { value: 'radial', label: 'Radial' },
        { value: 'motion', label: 'Motion' }
      ]}
    />
    <PreviewSlider title="Radius" value={params.radius} onChange={v => onChange({ ...params, radius: v })} min={0} max={7} step={0.1} />
    {params.type === 'motion' && (
      <PreviewSlider title="Angle" value={params.angle} onChange={v => onChange({ ...params, angle: v })} min={0} max={360} step={1} valueUnit="°" />
    )}
  </>
);

const DistortionParams = ({ params, onChange }) => (
  <>
    <PreviewSelect
      title="Type"
      value={params.type}
      onChange={v => onChange({ ...params, type: v })}
      options={[
        { value: 'wave', label: 'Wave' },
        { value: 'swirl', label: 'Swirl' },
        { value: 'bulge', label: 'Bulge' }
      ]}
    />
    <PreviewSlider title="Amplitude" value={params.amplitude} onChange={v => onChange({ ...params, amplitude: v })} min={0} max={50} step={1} />
    <PreviewSlider title="Frequency" value={params.frequency} onChange={v => onChange({ ...params, frequency: v })} min={1} max={20} step={0.5} />
    {(params.type === 'swirl' || params.type === 'bulge') && (
      <>
        <PreviewSlider title="Center X" value={params.centerX} onChange={v => onChange({ ...params, centerX: v })} min={0} max={1} step={0.01} />
        <PreviewSlider title="Center Y" value={params.centerY} onChange={v => onChange({ ...params, centerY: v })} min={0} max={1} step={0.01} />
      </>
    )}
  </>
);

const PosterizeParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Levels" value={params.levels} onChange={v => onChange({ ...params, levels: v })} min={2} max={16} step={1} />
    <PreviewSwitch title="Preserve Hue" isChecked={params.preserveHue} onChange={v => onChange({ ...params, preserveHue: v })} />
  </>
);

const EdgeParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Strength" value={params.strength} onChange={v => onChange({ ...params, strength: v })} min={0} max={3} step={0.1} />
    <PreviewSlider title="Threshold" value={params.threshold} onChange={v => onChange({ ...params, threshold: v })} min={0} max={0.5} step={0.01} />
    <PreviewSwitch title="Invert" isChecked={params.invert} onChange={v => onChange({ ...params, invert: v })} />
    <PreviewSwitch title="Colorize" isChecked={params.colorize} onChange={v => onChange({ ...params, colorize: v })} />
  </>
);

const GrainParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={0.5} step={0.01} />
    <PreviewSlider title="Size" value={params.size} onChange={v => onChange({ ...params, size: v })} min={0.5} max={5} step={0.1} />
    <PreviewSlider title="Luminance Response" value={params.luminanceResponse} onChange={v => onChange({ ...params, luminanceResponse: v })} min={0} max={1} step={0.01} />
    <PreviewSwitch title="Colored" isChecked={params.colored} onChange={v => onChange({ ...params, colored: v })} />
  </>
);

const ColorGradeParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Brightness" value={params.brightness} onChange={v => onChange({ ...params, brightness: v })} min={-0.5} max={0.5} step={0.01} />
    <PreviewSlider title="Contrast" value={params.contrast} onChange={v => onChange({ ...params, contrast: v })} min={-0.5} max={0.5} step={0.01} />
    <PreviewSlider title="Saturation" value={params.saturation} onChange={v => onChange({ ...params, saturation: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Temperature" value={params.temperature} onChange={v => onChange({ ...params, temperature: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Tint" value={params.tint} onChange={v => onChange({ ...params, tint: v })} min={-1} max={1} step={0.01} />
    <PreviewColorPickerCustom title="Shadows" color={params.shadows} onChange={v => onChange({ ...params, shadows: v })} />
    <PreviewSlider title="Shadow Influence" value={params.shadowInfluence} onChange={v => onChange({ ...params, shadowInfluence: v })} min={0} max={1} step={0.01} />
    <PreviewColorPickerCustom title="Highlights" color={params.highlights} onChange={v => onChange({ ...params, highlights: v })} />
    <PreviewSlider title="Highlight Influence" value={params.highlightInfluence} onChange={v => onChange({ ...params, highlightInfluence: v })} min={0} max={1} step={0.01} />
  </>
);

const GlitchParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Slice Count" value={params.sliceCount} onChange={v => onChange({ ...params, sliceCount: v })} min={2} max={50} step={1} />
    <PreviewSlider title="RGB Shift" value={params.rgbShift} onChange={v => onChange({ ...params, rgbShift: v })} min={0} max={0.1} step={0.001} />
    <PreviewSlider title="Angle" value={params.angle} onChange={v => onChange({ ...params, angle: v })} min={0} max={360} step={1} valueUnit="°" />
    <PreviewSlider title="Block Size" value={params.blockSize} onChange={v => onChange({ ...params, blockSize: v })} min={0.02} max={0.3} step={0.01} />
    <PreviewSwitch title="Color Shift" isChecked={params.colorShift} onChange={v => onChange({ ...params, colorShift: v })} />
  </>
);

const CRTParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Curvature" value={params.curvature} onChange={v => onChange({ ...params, curvature: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Scanline Intensity" value={params.scanlineIntensity} onChange={v => onChange({ ...params, scanlineIntensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Scanline Count" value={params.scanlineCount} onChange={v => onChange({ ...params, scanlineCount: v })} min={100} max={800} step={10} />
    <PreviewSlider title="Vignette" value={params.vignetteIntensity} onChange={v => onChange({ ...params, vignetteIntensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Brightness" value={params.brightness} onChange={v => onChange({ ...params, brightness: v })} min={0.5} max={1.5} step={0.01} />
    <PreviewSlider title="RGB Offset" value={params.rgbOffset} onChange={v => onChange({ ...params, rgbOffset: v })} min={0} max={0.01} step={0.0005} />
    <PreviewSlider title="Flicker" value={params.flickerIntensity} onChange={v => onChange({ ...params, flickerIntensity: v })} min={0} max={0.2} step={0.01} />
    <PreviewSlider title="Static Noise" value={params.staticNoise} onChange={v => onChange({ ...params, staticNoise: v })} min={0} max={0.2} step={0.01} />
  </>
);

const DuotoneParams = ({ params, onChange }) => (
  <>
    <PreviewColorPickerCustom title="Shadow Color" color={params.shadowColor} onChange={v => onChange({ ...params, shadowColor: v })} />
    <PreviewColorPickerCustom title="Highlight Color" color={params.highlightColor} onChange={v => onChange({ ...params, highlightColor: v })} />
    <PreviewSlider title="Contrast" value={params.contrast} onChange={v => onChange({ ...params, contrast: v })} min={0.5} max={2} step={0.05} />
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
  </>
);

const KuwaharaParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Radius" value={params.radius} onChange={v => onChange({ ...params, radius: v })} min={1} max={5} step={1} valueUnit="px" />
    <PreviewSlider title="Sharpness" value={params.sharpness} onChange={v => onChange({ ...params, sharpness: v })} min={0} max={1} step={0.05} />
  </>
);

const BarrelParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Amount" value={params.amount} onChange={v => onChange({ ...params, amount: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Center X" value={params.centerX} onChange={v => onChange({ ...params, centerX: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Center Y" value={params.centerY} onChange={v => onChange({ ...params, centerY: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Zoom" value={params.zoom} onChange={v => onChange({ ...params, zoom: v })} min={0.5} max={2} step={0.01} />
  </>
);

const RippleParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Amplitude" value={params.amplitude} onChange={v => onChange({ ...params, amplitude: v })} min={0} max={0.1} step={0.001} />
    <PreviewSlider title="Wavelength" value={params.wavelength} onChange={v => onChange({ ...params, wavelength: v })} min={10} max={200} step={5} />
    <PreviewSlider title="Speed" value={params.speed} onChange={v => onChange({ ...params, speed: v })} min={0} max={5} step={0.1} />
    <PreviewSlider title="Center X" value={params.centerX} onChange={v => onChange({ ...params, centerX: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Center Y" value={params.centerY} onChange={v => onChange({ ...params, centerY: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Damping" value={params.damping} onChange={v => onChange({ ...params, damping: v })} min={0} max={2} step={0.05} />
  </>
);

const DisplacementParams = ({ params, onChange }) => {
  const fileInputRef = useRef(null);

  const handleMapUpload = useCallback(
    e => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange({ ...params, customMapUrl: url });
      }
      e.target.value = '';
    },
    [params, onChange]
  );

  return (
    <>
      <PreviewSlider title="Scale X" value={params.scaleX} onChange={v => onChange({ ...params, scaleX: v })} min={0} max={0.2} step={0.005} />
      <PreviewSlider title="Scale Y" value={params.scaleY} onChange={v => onChange({ ...params, scaleY: v })} min={0} max={0.2} step={0.005} />
      <PreviewSwitch title="Use Red/Green Channels" isChecked={params.useRedGreen} onChange={v => onChange({ ...params, useRedGreen: v })} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleMapUpload}
        accept="image/png,image/jpeg,image/webp"
        style={{ display: 'none' }}
      />
      <Flex
        as="button"
        type="button"
        direction="column"
        align="center"
        justify="center"
        gap={2}
        p={3}
        bg={params.customMapUrl ? 'transparent' : 'var(--bg-elevated)'}
        border="1px dashed var(--color-primary)"
        borderRadius="var(--radius-sm)"
        cursor="pointer"
        onClick={() => fileInputRef.current?.click()}
        transition="all 0.15s"
        _hover={{ bg: 'rgba(168, 85, 247, 0.1)' }}
        position="relative"
        overflow="hidden"
        minH="60px"
      >
        {params.customMapUrl ? (
          <Box
            as="img"
            src={params.customMapUrl}
            alt="Displacement Map"
            w="100%"
            h="100%"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
            opacity={0.6}
          />
        ) : null}
        <Text fontSize="11px" color="var(--text-muted)" zIndex={1}>
          {params.customMapUrl ? 'Click to change' : 'Upload Displacement Map'}
        </Text>
        <Text fontSize="10px" color="var(--text-dimmed)" zIndex={1}>
          (Leave empty for procedural noise)
        </Text>
      </Flex>
    </>
  );
};

const LightLeakParams = ({ params, onChange }) => (
  <>
    <PreviewColorPickerCustom title="Color 1" color={params.color1} onChange={v => onChange({ ...params, color1: v })} />
    <PreviewColorPickerCustom title="Color 2" color={params.color2} onChange={v => onChange({ ...params, color2: v })} />
    <PreviewSlider title="Position" value={params.position} onChange={v => onChange({ ...params, position: v })} min={-1} max={2} step={0.01} />
    <PreviewSlider title="Angle" value={params.angle} onChange={v => onChange({ ...params, angle: v })} min={0} max={360} step={1} valueUnit="°" />
    <PreviewSlider title="Size" value={params.size} onChange={v => onChange({ ...params, size: v })} min={0.1} max={2} step={0.05} />
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Softness" value={params.softness} onChange={v => onChange({ ...params, softness: v })} min={0} max={1} step={0.01} />
    <PreviewSelect
      title="Blend Mode"
      value={params.blendMode}
      onChange={v => onChange({ ...params, blendMode: v })}
      options={[
        { value: BLEND_MODES.SCREEN, label: 'Screen' },
        { value: BLEND_MODES.OVERLAY, label: 'Overlay' },
        { value: BLEND_MODES.SOFT_LIGHT, label: 'Soft Light' },
        { value: BLEND_MODES.MULTIPLY, label: 'Multiply' }
      ]}
    />
  </>
);

const BloomParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Radius" value={params.radius} onChange={v => onChange({ ...params, radius: v })} min={1} max={6} step={1} valueUnit="px" />
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={3} step={0.05} />
    <PreviewSlider title="Threshold" value={params.threshold} onChange={v => onChange({ ...params, threshold: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Soft Threshold" value={params.softThreshold} onChange={v => onChange({ ...params, softThreshold: v })} min={0} max={1} step={0.01} />
    <PreviewSelect
      title="Blend Mode"
      value={params.blendMode}
      onChange={v => onChange({ ...params, blendMode: v })}
      options={[
        { value: BLEND_MODES.SCREEN, label: 'Screen' },
        { value: BLEND_MODES.OVERLAY, label: 'Overlay' },
        { value: BLEND_MODES.SOFT_LIGHT, label: 'Soft Light' },
        { value: BLEND_MODES.MULTIPLY, label: 'Multiply' }
      ]}
    />
  </>
);

const RadialBlurParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Intensity" value={params.intensity} onChange={v => onChange({ ...params, intensity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Center X" value={params.centerX} onChange={v => onChange({ ...params, centerX: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Center Y" value={params.centerY} onChange={v => onChange({ ...params, centerY: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Samples" value={params.samples} onChange={v => onChange({ ...params, samples: v })} min={8} max={64} step={1} />
    <PreviewSwitch title="Zoom Blur" isChecked={params.zoom} onChange={v => onChange({ ...params, zoom: v })} />
  </>
);

const MosaicParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Cell Size" value={params.cellSize} onChange={v => onChange({ ...params, cellSize: v })} min={5} max={100} step={1} valueUnit="px" />
    <PreviewSlider title="Irregularity" value={params.irregularity} onChange={v => onChange({ ...params, irregularity: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Edge Thickness" value={params.edgeThickness} onChange={v => onChange({ ...params, edgeThickness: v })} min={0} max={0.1} step={0.005} />
    <PreviewColorPickerCustom title="Edge Color" color={params.edgeColor} onChange={v => onChange({ ...params, edgeColor: v })} />
    <PreviewSlider title="Color Variation" value={params.colorVariation} onChange={v => onChange({ ...params, colorVariation: v })} min={0} max={0.5} step={0.01} />
  </>
);

const TiltShiftParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Focus Position" value={params.focusPosition} onChange={v => onChange({ ...params, focusPosition: v })} min={0} max={1} step={0.01} />
    <PreviewSlider title="Focus Width" value={params.focusWidth} onChange={v => onChange({ ...params, focusWidth: v })} min={0.05} max={0.5} step={0.01} />
    <PreviewSlider title="Blur Radius" value={params.blurRadius} onChange={v => onChange({ ...params, blurRadius: v })} min={1} max={8} step={1} valueUnit="px" />
    <PreviewSlider title="Angle" value={params.angle} onChange={v => onChange({ ...params, angle: v })} min={-90} max={90} step={1} valueUnit="°" />
    <PreviewSlider title="Gradient Smooth" value={params.gradientSmooth} onChange={v => onChange({ ...params, gradientSmooth: v })} min={0.05} max={0.5} step={0.01} />
  </>
);

const ExposureParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Exposure" value={params.exposure} onChange={v => onChange({ ...params, exposure: v })} min={-3} max={3} step={0.05} valueUnit=" EV" />
    <PreviewSlider title="Highlights" value={params.highlights} onChange={v => onChange({ ...params, highlights: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Shadows" value={params.shadows} onChange={v => onChange({ ...params, shadows: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Blacks" value={params.blacks} onChange={v => onChange({ ...params, blacks: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Whites" value={params.whites} onChange={v => onChange({ ...params, whites: v })} min={-1} max={1} step={0.01} />
  </>
);

const VibranceParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Vibrance" value={params.vibrance} onChange={v => onChange({ ...params, vibrance: v })} min={-1} max={1} step={0.01} />
    <PreviewSlider title="Saturation" value={params.saturation} onChange={v => onChange({ ...params, saturation: v })} min={-1} max={1} step={0.01} />
  </>
);

const DotDitherParams = ({ params, onChange }) => (
  <>
    <PreviewSlider title="Dot Size" value={params.scale} onChange={v => onChange({ ...params, scale: v })} min={1} max={8} step={1} valueUnit="px" />
    <PreviewSlider title="Threshold" value={params.threshold} onChange={v => onChange({ ...params, threshold: v })} min={0.1} max={0.9} step={0.05} />
    <PreviewSwitch title="Invert" isChecked={params.invert} onChange={v => onChange({ ...params, invert: v })} />
  </>
);

const PARAMS_COMPONENTS = {
  [EFFECT_TYPES.NOISE]: NoiseParams,
  [EFFECT_TYPES.DITHER]: DitherParams,
  [EFFECT_TYPES.HALFTONE]: HalftoneParams,
  [EFFECT_TYPES.ASCII]: ASCIIParams,
  [EFFECT_TYPES.OVERLAY]: OverlayParams,
  [EFFECT_TYPES.CHROMATIC]: ChromaticParams,
  [EFFECT_TYPES.VIGNETTE]: VignetteParams,
  [EFFECT_TYPES.SCANLINES]: ScanlinesParams,
  [EFFECT_TYPES.PIXELATE]: PixelateParams,
  [EFFECT_TYPES.BLUR]: BlurParams,
  [EFFECT_TYPES.DISTORTION]: DistortionParams,
  [EFFECT_TYPES.POSTERIZE]: PosterizeParams,
  [EFFECT_TYPES.EDGE]: EdgeParams,
  [EFFECT_TYPES.GRAIN]: GrainParams,
  [EFFECT_TYPES.COLOR_GRADE]: ColorGradeParams,
  [EFFECT_TYPES.GLITCH]: GlitchParams,
  [EFFECT_TYPES.CRT]: CRTParams,
  [EFFECT_TYPES.DUOTONE]: DuotoneParams,
  [EFFECT_TYPES.KUWAHARA]: KuwaharaParams,
  [EFFECT_TYPES.BARREL]: BarrelParams,
  [EFFECT_TYPES.RIPPLE]: RippleParams,
  [EFFECT_TYPES.DISPLACEMENT]: DisplacementParams,
  [EFFECT_TYPES.LIGHT_LEAK]: LightLeakParams,
  [EFFECT_TYPES.BLOOM]: BloomParams,
  [EFFECT_TYPES.RADIAL_BLUR]: RadialBlurParams,
  [EFFECT_TYPES.MOSAIC]: MosaicParams,
  [EFFECT_TYPES.TILT_SHIFT]: TiltShiftParams,
  [EFFECT_TYPES.EXPOSURE]: ExposureParams,
  [EFFECT_TYPES.VIBRANCE]: VibranceParams,
  [EFFECT_TYPES.DOT_DITHER]: DotDitherParams
};

const EffectCard = memo(({
  effect,
  onUpdate,
  onDelete,
  onToggle,
  onDuplicate,
  isDragging,
  onDragStart,
  onDragEnd,
  onDragOver,
  isExpanded,
  onExpandToggle
}) => {
  const EffectIcon = EFFECT_ICONS[effect.type];
  const ParamsComponent = PARAMS_COMPONENTS[effect.type];

  return (
    <Box
      bg="var(--bg-elevated)"
      border={isDragging ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)'}
      borderRadius="var(--radius-sm)"
      overflow="hidden"
      opacity={isDragging ? 0.5 : 1}
      transition="all 0.2s ease"
      transform={isDragging ? 'scale(0.95)' : 'scale(1)'}
      onDragOver={onDragOver}
    >
      <Flex
        align="center"
        justify="space-between"
        p={3}
        cursor="pointer"
        onClick={onExpandToggle}
        _hover={{ bg: 'rgba(168, 85, 247, 0.05)' }}
      >
        <Flex align="center" gap={1}>
          <Flex
            align="center"
            justify="center"
            w={5}
            h={5}
            cursor="grab"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={e => e.stopPropagation()}
            opacity={0.4}
            _hover={{ opacity: 1 }}
            _active={{ cursor: 'grabbing' }}
          >
            <Icon as={GripVertical} boxSize={3} color="var(--text-muted)" />
          </Flex>
          <Icon as={EffectIcon} boxSize={3} color={effect.enabled ? 'var(--color-primary)' : 'var(--text-muted)'} />
          <Text fontSize="12px" color={effect.enabled ? 'var(--text-primary)' : 'var(--text-muted)'} fontWeight={500}>
            {EFFECT_NAMES[effect.type]}
          </Text>
        </Flex>
        <Flex align="center" gap={1}>
          <Flex
            as="button"
            align="center"
            justify="center"
            w={6}
            h={6}
            borderRadius="4px"
            cursor="pointer"
            onClick={e => {
              e.stopPropagation();
              onToggle(effect.id);
            }}
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            title={effect.enabled ? 'Disable effect' : 'Enable effect'}
          >
            <Icon as={effect.enabled ? Eye : EyeOff} boxSize={3.5} color="var(--text-muted)" />
          </Flex>
          <Flex
            as="button"
            align="center"
            justify="center"
            w={6}
            h={6}
            borderRadius="4px"
            cursor="pointer"
            onClick={e => {
              e.stopPropagation();
              onDuplicate(effect);
            }}
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            title="Duplicate effect"
          >
            <Icon as={Copy} boxSize={3.5} color="var(--text-muted)" />
          </Flex>
          <Flex
            as="button"
            align="center"
            justify="center"
            w={6}
            h={6}
            borderRadius="4px"
            cursor="pointer"
            onClick={e => {
              e.stopPropagation();
              onDelete(effect.id);
            }}
            _hover={{ bg: 'rgba(255,100,100,0.1)' }}
            title="Delete effect"
          >
            <Icon as={Trash2} boxSize={3.5} color="var(--text-muted)" />
          </Flex>
          <Flex
            as="button"
            align="center"
            justify="center"
            w={6}
            h={6}
            borderRadius="4px"
            cursor="pointer"
            onClick={e => {
              e.stopPropagation();
              onExpandToggle();
            }}
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            <Icon as={isExpanded ? ChevronUp : ChevronDown} boxSize={4} color="var(--text-muted)" />
          </Flex>
        </Flex>
      </Flex>

      {isExpanded && ParamsComponent && (
        <Flex direction="column" gap={2} p={3} borderTop="1px solid var(--border-primary)">
          <ParamsComponent params={effect.params} onChange={params => onUpdate(effect.id, { params })} />
        </Flex>
      )}
    </Box>
  );
});

const EFFECT_CATEGORIES = {
  texture: {
    label: 'Texture',
    effects: [
      EFFECT_TYPES.NOISE,
      EFFECT_TYPES.GRAIN,
      EFFECT_TYPES.DITHER,
      EFFECT_TYPES.HALFTONE,
      EFFECT_TYPES.DOT_DITHER,
      EFFECT_TYPES.SCANLINES
    ]
  },
  stylize: {
    label: 'Stylize',
    effects: [
      EFFECT_TYPES.ASCII,
      EFFECT_TYPES.PIXELATE,
      EFFECT_TYPES.POSTERIZE,
      EFFECT_TYPES.EDGE,
      EFFECT_TYPES.KUWAHARA,
      EFFECT_TYPES.GLITCH,
      EFFECT_TYPES.CRT,
      EFFECT_TYPES.DUOTONE,
      EFFECT_TYPES.MOSAIC
    ]
  },
  color: {
    label: 'Color & Light',
    effects: [
      EFFECT_TYPES.COLOR_GRADE,
      EFFECT_TYPES.EXPOSURE,
      EFFECT_TYPES.VIBRANCE,
      EFFECT_TYPES.CHROMATIC,
      EFFECT_TYPES.VIGNETTE,
      EFFECT_TYPES.LIGHT_LEAK,
      EFFECT_TYPES.BLOOM
    ]
  },
  distort: {
    label: 'Distort',
    effects: [
      EFFECT_TYPES.BLUR,
      EFFECT_TYPES.RADIAL_BLUR,
      EFFECT_TYPES.TILT_SHIFT,
      EFFECT_TYPES.DISTORTION,
      EFFECT_TYPES.BARREL,
      EFFECT_TYPES.RIPPLE,
      EFFECT_TYPES.DISPLACEMENT
    ]
  },
  overlay: {
    label: 'Overlay',
    effects: [EFFECT_TYPES.OVERLAY]
  }
};

const AddEffectPanel = ({ onAddEffect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box bg="var(--bg-elevated)" border="1px solid var(--border-primary)" borderRadius="var(--radius-sm)" overflow="hidden" mb={3}>
      <Flex
        as="button"
        type="button"
        align="center"
        justify="space-between"
        w="100%"
        p={3}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ bg: 'rgba(168, 85, 247, 0.1)' }}
        transition="all 0.15s"
      >
        <Flex align="center" gap={2}>
          <Icon as={Plus} boxSize={4} color="var(--text-muted)" />
          <Text fontSize="12px" color="var(--text-primary)" fontWeight={500}>
            Add Effect
          </Text>
        </Flex>
        <Icon as={isOpen ? ChevronUp : ChevronDown} boxSize={4} color="var(--text-muted)" />
      </Flex>

      {isOpen && (
        <Flex direction="column" gap={3} p={3} borderTop="1px solid var(--border-primary)">
          {Object.entries(EFFECT_CATEGORIES).map(([catKey, category]) => (
            <Box key={catKey}>
              <Text
                fontSize="10px"
                color="var(--text-muted)"
                fontWeight={600}
                textTransform="uppercase"
                letterSpacing="0.5px"
                mb={2}
              >
                {category.label}
              </Text>
              <Flex
                gap={1.5}
                flexWrap="wrap"
                css={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '6px'
                }}
              >
                {category.effects.map(type => (
                  <Flex
                    key={type}
                    as="button"
                    type="button"
                    align="center"
                    gap={2}
                    px={2.5}
                    py={2}
                    bg="var(--bg-body)"
                    border="1px solid var(--border-primary)"
                    borderRadius="var(--radius-sm)"
                    cursor="pointer"
                    onClick={() => {
                      onAddEffect(type);
                      setIsOpen(false);
                    }}
                    transition="all 0.15s"
                    _hover={{ borderColor: 'var(--color-primary)', bg: 'rgba(168, 85, 247, 0.08)' }}
                  >
                    <Icon as={EFFECT_ICONS[type]} boxSize={3.5} color="var(--text-muted)" flexShrink={0} />
                    <Text fontSize="11px" color="var(--text-primary)" whiteSpace="nowrap" fontWeight={450}>
                      {EFFECT_NAMES[type]}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

const PresetsPanel = ({ onLoadPreset }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box bg="var(--bg-elevated)" border="1px solid var(--border-primary)" borderRadius="var(--radius-sm)" overflow="hidden" mb={4}>
      <Flex
        as="button"
        type="button"
        align="center"
        justify="space-between"
        w="100%"
        p={3}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ bg: 'rgba(168, 85, 247, 0.1)' }}
        transition="all 0.15s"
      >
        <Flex align="center" gap={2}>
          <Icon as={Wand2} boxSize={4} color="var(--text-muted)" />
          <Text fontSize="12px" color="var(--text-primary)" fontWeight={500}>
            Presets
          </Text>
        </Flex>
        <Icon as={isOpen ? ChevronUp : ChevronDown} boxSize={4} color="var(--text-muted)" />
      </Flex>

      {isOpen && (
        <Box
          p={3}
          borderTop="1px solid var(--border-primary)"
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '6px'
          }}
        >
          {Object.entries(PRESETS).map(([key, preset]) => (
            <Flex
              key={key}
              as="button"
              type="button"
              align="center"
              gap={2}
              px={2.5}
              py={2}
              bg="var(--bg-body)"
              border="1px solid var(--border-primary)"
              borderRadius="var(--radius-sm)"
              cursor="pointer"
              onClick={() => onLoadPreset(key)}
              transition="all 0.15s"
              _hover={{ borderColor: 'var(--color-primary)', bg: 'rgba(168, 85, 247, 0.08)' }}
            >
              <Icon as={Wand2} boxSize={3.5} color="var(--text-muted)" flexShrink={0} />
              <Text fontSize="11px" color="var(--text-primary)" whiteSpace="nowrap" fontWeight={450}>
                {preset.name}
              </Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
};

const ExportSettingsPanel = ({
  mediaType,
  exportFormat,
  exportQuality,
  exportScale,
  previewQuality,
  onExportFormatChange,
  onExportQualityChange,
  onExportScaleChange,
  onPreviewQualityChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isVideo = mediaType === 'video';

  return (
    <Box bg="var(--bg-elevated)" border="1px solid var(--border-primary)" borderRadius="var(--radius-sm)" overflow="hidden">
      <Flex
        as="button"
        type="button"
        align="center"
        justify="space-between"
        w="100%"
        p={3}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ bg: 'rgba(168, 85, 247, 0.1)' }}
        transition="all 0.15s"
      >
        <Flex align="center" gap={2}>
          <Icon as={Sliders} boxSize={4} color="var(--text-muted)" />
          <Text fontSize="12px" color="var(--text-primary)" fontWeight={500}>
            Export Settings
          </Text>
        </Flex>
        <Icon as={isOpen ? ChevronUp : ChevronDown} boxSize={4} color="var(--text-muted)" />
      </Flex>

      {isOpen && (
        <Flex direction="column" gap={3} p={3}>
          {isVideo ? (
            <Text fontSize="11px" color="var(--text-muted)">
              Videos export as WebM format.
            </Text>
          ) : (
            <>
              <PreviewSelect
                title="Format"
                value={exportFormat}
                onChange={onExportFormatChange}
                options={[
                  { value: 'png', label: 'PNG (lossless)' },
                  { value: 'jpg', label: 'JPG (smaller file)' }
                ]}
              />

              {exportFormat === 'jpg' && (
                <PreviewSlider
                  title="Quality"
                  value={exportQuality}
                  onChange={onExportQualityChange}
                  min={0.7}
                  max={1}
                  step={0.01}
                />
              )}

              <PreviewSelect
                title="Scale"
                value={exportScale.toString()}
                onChange={v => onExportScaleChange(parseInt(v))}
                options={EXPORT_SCALES.map(s => ({
                  value: s.toString(),
                  label: `${s}× ${s === 1 ? '(original)' : ''}`
                }))}
              />
            </>
          )}

          <PreviewSelect
            title="Preview Quality"
            value={previewQuality}
            onChange={onPreviewQualityChange}
            options={[
              { value: 'draft', label: 'Draft (fast)' },
              { value: 'high', label: 'High (accurate)' }
            ]}
          />
        </Flex>
      )}
    </Box>
  );
};

export default function Controls({
  image,
  video,
  mediaType,
  corsError,
  effects,
  previewQuality,
  exportFormat,
  exportQuality,
  exportScale,
  isExporting,
  exportProgress,
  exportStatus,
  onMediaLoad,
  onClearMedia,
  onEffectsChange,
  onSeedChange,
  onPreviewQualityChange,
  onExportFormatChange,
  onExportQualityChange,
  onExportScaleChange,
  onCopyToClipboard,
  onExport,
  onReset,
  toolSelector
}) {
  const fileInputRef = useRef(null);
  const [urlInput, setUrlInput] = useState('');
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);

  const handleFileSelect = useCallback(
    e => {
      const file = e.target.files?.[0];
      if (file) {
        onMediaLoad(file, 'file');
      }
      e.target.value = '';
    },
    [onMediaLoad]
  );

  const handleLoadUrl = useCallback(async () => {
    if (!urlInput.trim()) return;
    setIsLoadingUrl(true);
    try {
      await onMediaLoad(urlInput.trim(), 'url');
      setUrlInput('');
    } catch (err) {
      toaster.create({
        title: 'Failed to load media',
        description: err.message,
        type: 'error',
        duration: 3000
      });
    }
    setIsLoadingUrl(false);
  }, [urlInput, onMediaLoad]);

  const [expandedEffectId, setExpandedEffectId] = useState(null);

  const handleAddEffect = useCallback(
    type => {
      const effect = createEffect(type);
      onEffectsChange([effect, ...effects]);
      setExpandedEffectId(effect.id);
    },
    [effects, onEffectsChange]
  );

  const handleUpdateEffect = useCallback(
    (id, updates) => {
      onEffectsChange(effects.map(e => (e.id === id ? { ...e, ...updates } : e)));
    },
    [effects, onEffectsChange]
  );

  const handleDeleteEffect = useCallback(
    id => {
      onEffectsChange(effects.filter(e => e.id !== id));
    },
    [effects, onEffectsChange]
  );

  const handleToggleEffect = useCallback(
    id => {
      onEffectsChange(effects.map(e => (e.id === id ? { ...e, enabled: !e.enabled } : e)));
    },
    [effects, onEffectsChange]
  );

  const handleDuplicateEffect = useCallback(
    effect => {
      const duplicated = {
        ...effect,
        id: `${effect.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        params: { ...effect.params }
      };
      const index = effects.findIndex(e => e.id === effect.id);
      const newEffects = [...effects];
      newEffects.splice(index + 1, 0, duplicated);
      onEffectsChange(newEffects);
    },
    [effects, onEffectsChange]
  );

  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = useCallback(id => {
    setDraggedId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
  }, []);

  const handleDragOver = useCallback(
    (e, targetId) => {
      e.preventDefault();
      if (!draggedId || draggedId === targetId) return;

      const dragIndex = effects.findIndex(eff => eff.id === draggedId);
      const dropIndex = effects.findIndex(eff => eff.id === targetId);

      if (dragIndex === -1 || dropIndex === -1 || dragIndex === dropIndex) return;

      const newEffects = [...effects];
      const [removed] = newEffects.splice(dragIndex, 1);
      newEffects.splice(dropIndex, 0, removed);

      onEffectsChange(newEffects);
    },
    [draggedId, effects, onEffectsChange]
  );

  const handleLoadPreset = useCallback(
    presetKey => {
      const preset = PRESETS[presetKey];
      if (!preset) return;

      const newEffects = preset.effects.map(e => ({
        ...createEffect(e.type),
        enabled: e.enabled,
        params: { ...e.params }
      }));

      onEffectsChange(newEffects);
      toaster.create({
        title: `Applied "${preset.name}" preset`,
        type: 'success',
        duration: 2000
      });
    },
    [onEffectsChange]
  );

  const handleRandomizeEffects = useCallback(() => {
    // Helper to get random value in range
    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(rand(min, max + 1));
    const randBool = () => Math.random() > 0.5;
    const randChoice = arr => arr[Math.floor(Math.random() * arr.length)];
    const randColor = () =>
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');

    // All available effect types (excluding some that need custom maps)
    const availableTypes = [
      EFFECT_TYPES.NOISE,
      EFFECT_TYPES.DITHER,
      EFFECT_TYPES.HALFTONE,
      EFFECT_TYPES.DOT_DITHER,
      EFFECT_TYPES.ASCII,
      EFFECT_TYPES.CHROMATIC,
      EFFECT_TYPES.VIGNETTE,
      EFFECT_TYPES.SCANLINES,
      EFFECT_TYPES.PIXELATE,
      EFFECT_TYPES.BLUR,
      EFFECT_TYPES.DISTORTION,
      EFFECT_TYPES.POSTERIZE,
      EFFECT_TYPES.EDGE,
      EFFECT_TYPES.GRAIN,
      EFFECT_TYPES.COLOR_GRADE,
      EFFECT_TYPES.GLITCH,
      EFFECT_TYPES.CRT,
      EFFECT_TYPES.DUOTONE,
      EFFECT_TYPES.KUWAHARA,
      EFFECT_TYPES.RIPPLE,
      EFFECT_TYPES.LIGHT_LEAK,
      EFFECT_TYPES.BLOOM,
      EFFECT_TYPES.RADIAL_BLUR,
      EFFECT_TYPES.TILT_SHIFT,
      EFFECT_TYPES.EXPOSURE,
      EFFECT_TYPES.VIBRANCE
    ];

    // Randomize params for each effect type - using tamer values to keep image recognizable
    const randomizeParams = type => {
      switch (type) {
        case EFFECT_TYPES.NOISE:
          return {
            intensity: rand(0.05, 0.2),
            scale: rand(0.8, 1.5),
            monochrome: randBool(),
            blendMode: randChoice(['overlay', 'soft-light'])
          };
        case EFFECT_TYPES.DITHER:
          return {
            method: randChoice(['bayer2x2', 'bayer4x4', 'bayer8x8']),
            levels: randInt(3, 6),
            threshold: rand(0.4, 0.6),
            scale: rand(0.8, 1.5)
          };
        case EFFECT_TYPES.HALFTONE:
          return {
            gridSize: randInt(4, 12),
            dotScale: rand(0.7, 1.2),
            angle: randInt(0, 90),
            shape: randChoice(['circle', 'square', 'diamond']),
            softness: rand(0.3, 0.6),
            contrast: rand(-0.1, 0.2),
            invert: false,
            colorMode: randChoice(['original', 'monochrome']),
            dotColor: '#000000',
            backgroundColor: '#ffffff',
            mixOriginal: rand(0.1, 0.3)
          };
        case EFFECT_TYPES.DOT_DITHER:
          return {
            scale: randInt(1, 3),
            threshold: rand(0.4, 0.6),
            invert: false
          };
        case EFFECT_TYPES.ASCII:
          return {
            charset: randChoice([' .:-=+*#%@', ' .-+*#']),
            cellSize: randInt(4, 8),
            colorMode: 'original',
            invert: false,
            contrast: rand(1.1, 1.4),
            brightness: rand(1.1, 1.3)
          };
        case EFFECT_TYPES.CHROMATIC:
          return {
            intensity: rand(0.002, 0.008),
            angle: randInt(0, 360),
            radial: randBool()
          };
        case EFFECT_TYPES.VIGNETTE:
          return {
            intensity: rand(0.2, 0.5),
            size: rand(0.4, 0.6),
            softness: rand(0.4, 0.7),
            color: '#000000'
          };
        case EFFECT_TYPES.SCANLINES:
          return {
            spacing: randInt(2, 5),
            thickness: randInt(1, 2),
            opacity: rand(0.1, 0.3),
            horizontal: randBool(),
            offset: randInt(0, 5)
          };
        case EFFECT_TYPES.PIXELATE:
          return {
            size: randInt(2, 8),
            maintainAspect: true
          };
        case EFFECT_TYPES.BLUR:
          return {
            radius: rand(0.5, 2),
            type: 'gaussian',
            angle: 0
          };
        case EFFECT_TYPES.DISTORTION:
          return {
            type: randChoice(['wave', 'bulge']),
            amplitude: rand(3, 10),
            frequency: rand(3, 8),
            centerX: 0.5,
            centerY: 0.5
          };
        case EFFECT_TYPES.POSTERIZE:
          return {
            levels: randInt(4, 8),
            preserveHue: true
          };
        case EFFECT_TYPES.EDGE:
          return {
            strength: rand(0.5, 1.2),
            threshold: rand(0.1, 0.25),
            invert: false,
            colorize: true
          };
        case EFFECT_TYPES.GRAIN:
          return {
            intensity: rand(0.05, 0.15),
            size: rand(1, 2),
            luminanceResponse: rand(0.3, 0.6),
            colored: false
          };
        case EFFECT_TYPES.COLOR_GRADE:
          return {
            brightness: rand(-0.1, 0.1),
            contrast: rand(-0.15, 0.15),
            saturation: rand(-0.15, 0.2),
            temperature: rand(-0.15, 0.15),
            tint: rand(-0.1, 0.1),
            shadowInfluence: rand(0, 0.15),
            highlightInfluence: rand(0, 0.15)
          };
        case EFFECT_TYPES.GLITCH:
          return {
            intensity: rand(0.1, 0.3),
            sliceCount: randInt(3, 10),
            rgbShift: rand(0.005, 0.02),
            angle: randInt(0, 15),
            seed: randInt(0, 1000),
            blockSize: rand(0.03, 0.1),
            colorShift: randBool()
          };
        case EFFECT_TYPES.CRT:
          return {
            curvature: rand(0.05, 0.2),
            scanlineIntensity: rand(0.1, 0.3),
            scanlineCount: randInt(300, 500),
            vignetteIntensity: rand(0.1, 0.3),
            brightness: rand(1.0, 1.15),
            rgbOffset: rand(0.001, 0.003),
            flickerIntensity: rand(0.01, 0.03),
            staticNoise: rand(0.01, 0.05)
          };
        case EFFECT_TYPES.DUOTONE: {
          // Use lighter color pairs that keep image visible
          const duotonePairs = [
            { shadow: '#1a1a2e', highlight: '#eeeeff' },
            { shadow: '#2d132c', highlight: '#ffeef4' },
            { shadow: '#1a2639', highlight: '#f0f4ff' },
            { shadow: '#2c3e50', highlight: '#ecf0f1' },
            { shadow: '#1e3d59', highlight: '#f5f0e1' },
            { shadow: '#3d1a1a', highlight: '#fff5f5' }
          ];
          const pair = randChoice(duotonePairs);
          return {
            shadowColor: pair.shadow,
            highlightColor: pair.highlight,
            contrast: rand(0.95, 1.05),
            intensity: rand(0.6, 0.8)
          };
        }
        case EFFECT_TYPES.KUWAHARA:
          return {
            radius: randInt(2, 4),
            sharpness: rand(0.4, 0.7)
          };
        case EFFECT_TYPES.BARREL:
          return {
            amount: rand(0.05, 0.2),
            centerX: 0.5,
            centerY: 0.5,
            zoom: rand(0.95, 1.05)
          };
        case EFFECT_TYPES.RIPPLE:
          return {
            amplitude: rand(0.005, 0.02),
            wavelength: rand(30, 60),
            speed: rand(0.5, 1.5),
            centerX: 0.5,
            centerY: 0.5,
            damping: rand(0.3, 0.6)
          };
        case EFFECT_TYPES.LIGHT_LEAK:
          return {
            color1: randColor(),
            color2: randColor(),
            position: rand(0.2, 0.4),
            angle: randInt(0, 360),
            size: rand(0.4, 0.6),
            intensity: rand(0.2, 0.4),
            softness: rand(0.5, 0.8),
            blendMode: 'screen'
          };
        case EFFECT_TYPES.BLOOM:
          return {
            radius: randInt(4, 10),
            intensity: rand(0.3, 0.6),
            threshold: rand(0.5, 0.7),
            softThreshold: rand(0.4, 0.6),
            blendMode: 'screen'
          };
        case EFFECT_TYPES.RADIAL_BLUR:
          return {
            intensity: rand(0.05, 0.15),
            centerX: 0.5,
            centerY: 0.5,
            samples: randInt(16, 32),
            zoom: false
          };
        case EFFECT_TYPES.MOSAIC:
          return {
            cellSize: randInt(15, 30),
            irregularity: rand(0.3, 0.6),
            edgeThickness: rand(0.01, 0.03),
            edgeColor: '#000000',
            colorVariation: rand(0.05, 0.1)
          };
        case EFFECT_TYPES.TILT_SHIFT:
          return {
            focusPosition: 0.5,
            focusWidth: rand(0.2, 0.4),
            blurRadius: randInt(4, 10),
            angle: 0,
            gradientSmooth: rand(0.3, 0.5)
          };
        case EFFECT_TYPES.EXPOSURE:
          return {
            exposure: rand(-0.25, 0.25),
            highlights: rand(-0.15, 0.15),
            shadows: rand(-0.15, 0.15),
            blacks: rand(-0.1, 0.1),
            whites: rand(-0.1, 0.1)
          };
        case EFFECT_TYPES.VIBRANCE:
          return {
            vibrance: rand(-0.15, 0.3),
            saturation: rand(-0.15, 0.15)
          };
        default:
          return {};
      }
    };

    // Generate 2-8 random effects, weighted towards fewer effects
    // Using exponential distribution: more likely to get 2-4, less likely to get 6-8
    const getWeightedCount = () => {
      const r = Math.random();
      // Weights: 2=30%, 3=25%, 4=20%, 5=12%, 6=7%, 7=4%, 8=2%
      if (r < 0.3) return 2;
      if (r < 0.55) return 3;
      if (r < 0.75) return 4;
      if (r < 0.87) return 5;
      if (r < 0.94) return 6;
      if (r < 0.98) return 7;
      return 8;
    };

    const numEffects = getWeightedCount();
    const shuffled = [...availableTypes].sort(() => Math.random() - 0.5);
    const selectedTypes = shuffled.slice(0, numEffects);

    const randomEffects = selectedTypes.map(type => {
      const effect = createEffect(type);
      return {
        ...effect,
        params: { ...effect.params, ...randomizeParams(type) }
      };
    });

    onEffectsChange(randomEffects);
    onSeedChange(Math.floor(Math.random() * 100000));
    toaster.create({
      title: `Applied ${numEffects} random effects`,
      type: 'success',
      duration: 2000
    });
  }, [onEffectsChange, onSeedChange]);

  // Randomize parameters of currently applied effects
  const handleRandomizeParams = useCallback(() => {
    if (effects.length === 0) {
      toaster.create({
        title: 'No effects to randomize',
        type: 'info',
        duration: 2000
      });
      return;
    }

    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(rand(min, max + 1));
    const randBool = () => Math.random() > 0.5;
    const randChoice = arr => arr[Math.floor(Math.random() * arr.length)];
    const randColor = () =>
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');

    const randomizeParams = type => {
      switch (type) {
        case EFFECT_TYPES.NOISE:
          return {
            intensity: rand(0.05, 0.4),
            scale: rand(0.5, 2),
            monochrome: randBool(),
            blendMode: randChoice(['overlay', 'soft-light', 'multiply', 'screen'])
          };
        case EFFECT_TYPES.DITHER:
          return {
            method: randChoice(['bayer2x2', 'bayer4x4', 'bayer8x8']),
            levels: randInt(2, 8),
            threshold: rand(0.3, 0.7),
            scale: rand(0.5, 2)
          };
        case EFFECT_TYPES.HALFTONE:
          return {
            gridSize: randInt(4, 16),
            dotScale: rand(0.5, 1.5),
            angle: randInt(0, 90),
            shape: randChoice(['circle', 'square', 'diamond', 'line', 'ellipse', 'cross', 'ring']),
            softness: rand(0.2, 0.8),
            contrast: rand(-0.3, 0.3),
            invert: randBool(),
            colorMode: randChoice(['original', 'monochrome', 'duotone', 'cmyk']),
            mixOriginal: rand(0, 0.3)
          };
        case EFFECT_TYPES.DOT_DITHER:
          return {
            scale: randInt(1, 4),
            threshold: rand(0.3, 0.7),
            animated: randBool(),
            animationSpeed: rand(0.5, 2),
            invert: randBool()
          };
        case EFFECT_TYPES.CHROMATIC:
          return {
            intensity: rand(0.002, 0.02),
            angle: randInt(0, 360),
            radial: randBool()
          };
        case EFFECT_TYPES.VIGNETTE:
          return {
            intensity: rand(0.2, 0.8),
            size: rand(0.3, 0.7),
            softness: rand(0.3, 0.8),
            color: randBool() ? '#000000' : randColor()
          };
        case EFFECT_TYPES.SCANLINES:
          return {
            intensity: rand(0.1, 0.5),
            count: randInt(100, 400),
            speed: rand(0, 2)
          };
        case EFFECT_TYPES.PIXELATE:
          return {
            size: randInt(2, 16)
          };
        case EFFECT_TYPES.BLUR:
          return {
            radius: rand(1, 8),
            quality: randChoice(['low', 'medium', 'high'])
          };
        case EFFECT_TYPES.DISTORTION:
          return {
            intensity: rand(0.01, 0.1),
            scale: rand(1, 10),
            speed: rand(0.5, 3)
          };
        case EFFECT_TYPES.POSTERIZE:
          return {
            levels: randInt(2, 8)
          };
        case EFFECT_TYPES.EDGE:
          return {
            intensity: rand(0.5, 2),
            threshold: rand(0.05, 0.3),
            invert: randBool(),
            colorize: randBool()
          };
        case EFFECT_TYPES.GRAIN:
          return {
            intensity: rand(0.1, 0.5),
            size: rand(1, 3),
            speed: rand(0.5, 2)
          };
        case EFFECT_TYPES.COLOR_GRADE:
          return {
            temperature: rand(-0.5, 0.5),
            tint: rand(-0.3, 0.3),
            saturation: rand(0.5, 1.5),
            contrast: rand(0.8, 1.3),
            brightness: rand(0.9, 1.1)
          };
        case EFFECT_TYPES.GLITCH:
          return {
            intensity: rand(0.02, 0.15),
            speed: rand(0.5, 3),
            blockSize: rand(0.02, 0.1)
          };
        case EFFECT_TYPES.CRT:
          return {
            curvature: rand(0.5, 3),
            scanlineIntensity: rand(0.1, 0.4),
            vignetteIntensity: rand(0.2, 0.5),
            brightness: rand(1, 1.3),
            flickerIntensity: rand(0, 0.05)
          };
        case EFFECT_TYPES.DUOTONE:
          return {
            shadowColor: randColor(),
            highlightColor: randColor(),
            contrast: rand(0.8, 1.2)
          };
        case EFFECT_TYPES.KUWAHARA:
          return {
            radius: randInt(2, 6)
          };
        case EFFECT_TYPES.RIPPLE:
          return {
            amplitude: rand(0.005, 0.03),
            frequency: rand(5, 20),
            speed: rand(0.5, 3),
            centerX: rand(0.3, 0.7),
            centerY: rand(0.3, 0.7)
          };
        case EFFECT_TYPES.LIGHT_LEAK:
          return {
            intensity: rand(0.2, 0.6),
            color: randColor(),
            position: rand(0, 1),
            size: rand(0.3, 0.8)
          };
        case EFFECT_TYPES.BLOOM:
          return {
            intensity: rand(0.3, 1),
            threshold: rand(0.5, 0.9),
            radius: rand(2, 8)
          };
        case EFFECT_TYPES.RADIAL_BLUR:
          return {
            intensity: rand(0.01, 0.05),
            centerX: rand(0.3, 0.7),
            centerY: rand(0.3, 0.7)
          };
        case EFFECT_TYPES.TILT_SHIFT:
          return {
            blur: rand(2, 8),
            position: rand(0.3, 0.7),
            size: rand(0.1, 0.3),
            angle: randInt(0, 180)
          };
        case EFFECT_TYPES.EXPOSURE:
          return {
            exposure: rand(-1, 1),
            gamma: rand(0.8, 1.2)
          };
        case EFFECT_TYPES.VIBRANCE:
          return {
            vibrance: rand(0, 1),
            saturation: rand(0.8, 1.2)
          };
        default:
          return {};
      }
    };

    const updatedEffects = effects.map(effect => ({
      ...effect,
      params: { ...effect.params, ...randomizeParams(effect.type) }
    }));

    onEffectsChange(updatedEffects);
    toaster.create({
      title: `Randomized ${effects.length} effect parameters`,
      type: 'success',
      duration: 2000
    });
  }, [effects, onEffectsChange]);

  const presetInputRef = useRef(null);

  const handleExportPreset = useCallback(() => {
    const preset = {
      name: 'Custom Preset',
      version: 1,
      effects: effects.map(e => ({
        type: e.type,
        enabled: e.enabled,
        params: e.params
      }))
    };

    const blob = new Blob([JSON.stringify(preset, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texture-lab-preset.json';
    a.click();
    URL.revokeObjectURL(url);

    toaster.create({
      title: 'Preset saved',
      type: 'success',
      duration: 2000
    });
  }, [effects]);

  const handleImportPreset = useCallback(
    e => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = event => {
        try {
          const preset = JSON.parse(event.target.result);

          if (!preset.effects || !Array.isArray(preset.effects)) {
            throw new Error('Invalid preset format');
          }

          const newEffects = preset.effects.map(e => ({
            ...createEffect(e.type),
            enabled: e.enabled !== false,
            params: { ...e.params }
          }));

          onEffectsChange(newEffects);
          toaster.create({
            title: `Loaded "${preset.name || 'Custom'}" preset`,
            type: 'success',
            duration: 2000
          });
        } catch (err) {
          toaster.create({
            title: 'Failed to load preset',
            description: 'Invalid preset file format',
            type: 'error',
            duration: 3000
          });
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [onEffectsChange]
  );

  return (
    <Flex direction="column" h="100%" minH={0}>
      {toolSelector && (
        <Box mb={4} flexShrink={0}>
          {toolSelector}
        </Box>
      )}

      <Box
        flex={1}
        overflowY="auto"
        minH={0}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}
      >
        <SectionHeader>Media Source</SectionHeader>
        <Flex direction="column" gap={2} mb={4}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png,image/jpeg,image/webp,video/mp4,video/webm,video/ogg"
            style={{ display: 'none' }}
          />
          <Flex gap={2}>
            <ToggleButton
              icon={Upload}
              label="Upload"
              onClick={() => fileInputRef.current?.click()}
              flex={1}
              disabled={isExporting}
            />
            <ToggleButton
              icon={ImageIcon}
              label="Sample"
              onClick={() =>
                onMediaLoad(
                  'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  'url'
                )
              }
              flex={1}
              disabled={isExporting}
            />
            {(image || video) && !isExporting && <ToggleButton icon={X} label="Clear" onClick={onClearMedia} />}
          </Flex>
          <Flex gap={2}>
            <Input
              placeholder="Paste image or video URL..."
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              size="sm"
              bg="var(--bg-elevated)"
              border="1px solid var(--border-primary)"
              borderRadius="var(--radius-sm)"
              color="var(--text-primary)"
              fontSize="12px"
              flex={1}
              _placeholder={{ color: 'var(--color-accent)' }}
              _focus={{ borderColor: 'var(--color-primary)', boxShadow: 'none' }}
              onKeyDown={e => e.key === 'Enter' && !isExporting && handleLoadUrl()}
              disabled={isExporting}
            />
            <ToggleButton
              icon={Link}
              onClick={handleLoadUrl}
              disabled={!urlInput.trim() || isLoadingUrl || isExporting}
            />
          </Flex>

          {corsError && (
            <Box bg="rgba(255,100,100,0.1)" p={2} borderRadius="6px" border="1px solid rgba(255,100,100,0.3)">
              <Text fontSize="11px" color="#ff6b6b">
                ⚠️ CORS blocked. Export/copy disabled. Re-upload the media locally to enable.
              </Text>
            </Box>
          )}
        </Flex>

        <PresetsPanel onLoadPreset={handleLoadPreset} />

        <Flex align="center" justify="space-between" mb={3}>
          <Text fontSize="11px" color="var(--text-muted)" fontWeight={600} textTransform="uppercase" letterSpacing="0.5px">
            Effects ({effects.length})
          </Text>
          <Flex gap={1}>
            <ToggleButton icon={Dices} onClick={handleRandomizeEffects} title="Randomize effects" />
            <ToggleButton icon={Shuffle} onClick={handleRandomizeParams} title="Randomize parameters" />
          </Flex>
        </Flex>

        <AddEffectPanel onAddEffect={handleAddEffect} />

        <Flex direction="column" gap={2} mb={4}>
          {effects.map(effect => (
            <EffectCard
              key={effect.id}
              effect={effect}
              onUpdate={handleUpdateEffect}
              onDelete={handleDeleteEffect}
              onToggle={handleToggleEffect}
              onDuplicate={handleDuplicateEffect}
              isDragging={draggedId === effect.id}
              onDragStart={() => handleDragStart(effect.id)}
              onDragEnd={handleDragEnd}
              onDragOver={e => handleDragOver(e, effect.id)}
              isExpanded={expandedEffectId === effect.id}
              onExpandToggle={() => setExpandedEffectId(expandedEffectId === effect.id ? null : effect.id)}
            />
          ))}

          {effects.length === 0 && (
            <Box p={4} bg="var(--bg-elevated)" border="1px dashed var(--border-primary)" borderRadius="var(--radius-sm)" textAlign="center">
              <Text fontSize="12px" color="var(--text-muted)">
                No effects added. Click &ldquo;Add Effect&rdquo; to get started.
              </Text>
            </Box>
          )}
        </Flex>
      </Box>

      <Box pt={4}>
        <Flex gap={2} mb={3}>
          <Flex
            as="button"
            flex={1}
            align="center"
            justify="center"
            gap={2}
            bg="var(--bg-elevated)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-sm)"
            py={2}
            cursor={effects.length === 0 ? 'not-allowed' : 'pointer'}
            opacity={effects.length === 0 ? 0.5 : 1}
            onClick={effects.length === 0 ? undefined : handleExportPreset}
            transition="all 0.15s"
            _hover={{ borderColor: effects.length === 0 ? 'var(--border-primary)' : 'var(--color-primary)' }}
          >
            <Icon as={FileDown} boxSize={3.5} color="var(--text-muted)" />
            <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
              Save Preset
            </Text>
          </Flex>
          <Flex
            as="button"
            flex={1}
            align="center"
            justify="center"
            gap={2}
            bg="var(--bg-elevated)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-sm)"
            py={2}
            cursor="pointer"
            onClick={() => presetInputRef.current?.click()}
            transition="all 0.15s"
            _hover={{ borderColor: 'var(--color-primary)' }}
          >
            <Icon as={FileUp} boxSize={3.5} color="var(--text-muted)" />
            <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
              Load Preset
            </Text>
          </Flex>
          <input
            type="file"
            ref={presetInputRef}
            onChange={handleImportPreset}
            accept="application/json"
            style={{ display: 'none' }}
          />
        </Flex>

        <ExportSettingsPanel
          mediaType={mediaType}
          exportFormat={exportFormat}
          exportQuality={exportQuality}
          exportScale={exportScale}
          previewQuality={previewQuality}
          onExportFormatChange={onExportFormatChange}
          onExportQualityChange={onExportQualityChange}
          onExportScaleChange={onExportScaleChange}
          onPreviewQualityChange={onPreviewQualityChange}
        />

        <Flex gap={2} mb={2} mt={3}>
          {mediaType !== 'video' && (
            <Flex
              as="button"
              flex={1}
              align="center"
              justify="center"
              gap={2}
              bg="var(--bg-elevated)"
              border="1px solid var(--border-primary)"
              borderRadius="var(--radius-sm)"
              py={2}
              cursor={corsError || !image ? 'not-allowed' : 'pointer'}
              opacity={corsError || !image ? 0.5 : 1}
              onClick={corsError || !image ? undefined : onCopyToClipboard}
              transition="all 0.15s"
              _hover={{ borderColor: corsError || !image ? 'var(--border-primary)' : 'var(--color-primary)' }}
            >
              <Icon as={Copy} boxSize={4} color="var(--text-muted)" />
              <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
                Copy
              </Text>
            </Flex>
          )}
          <Flex
            as="button"
            flex={1}
            align="center"
            justify="center"
            gap={2}
            bg="var(--bg-elevated)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-sm)"
            py={2}
            cursor={isExporting ? 'not-allowed' : 'pointer'}
            opacity={isExporting ? 0.5 : 1}
            onClick={isExporting ? undefined : onReset}
            transition="all 0.15s"
            _hover={{ borderColor: isExporting ? 'var(--border-primary)' : 'var(--color-primary)' }}
          >
            <Icon as={RotateCcw} boxSize={4} color="var(--text-muted)" />
            <Text fontSize="12px" color="var(--text-muted)" fontWeight={500}>
              Reset
            </Text>
          </Flex>
        </Flex>

        <Flex
          as="button"
          align="center"
          justify="center"
          bg="var(--color-primary)"
          borderRadius="var(--radius-sm)"
          h="44px"
          w="100%"
          cursor={corsError || (!image && !video) || isExporting ? 'not-allowed' : 'pointer'}
          opacity={corsError || (!image && !video) ? 0.5 : 1}
          onClick={corsError || (!image && !video) || isExporting ? undefined : onExport}
          transition="all 0.15s"
          _hover={{ bg: corsError || (!image && !video) || isExporting ? 'var(--color-primary)' : '#b96dfa' }}
          overflow="hidden"
          position="relative"
        >
          <Box
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            width={isExporting ? `${Math.max(0, Math.min(100, exportProgress))}%` : '0%'}
            bg="rgba(255, 255, 255, 0.2)"
            transition="width 0.15s linear"
            pointerEvents="none"
            zIndex={0}
          />
          <Flex
            align="center"
            justify={isExporting ? 'space-between' : 'center'}
            w="100%"
            px={4}
            position="relative"
            zIndex={1}
          >
            <Flex align="center" gap={2}>
              <Box
                as="span"
                css={
                  isExporting
                    ? {
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' }
                        }
                      }
                    : undefined
                }
              >
                <Icon as={Download} boxSize={4} color="#fff" />
              </Box>
              <Text fontSize="14px" color="#fff" fontWeight={600}>
                {isExporting
                  ? exportStatus || 'Exporting...'
                  : mediaType === 'video'
                    ? 'Export Video'
                    : `Export ${exportFormat.toUpperCase()}`}
              </Text>
            </Flex>

            <Text
              fontSize="14px"
              color="#fff"
              fontWeight={600}
              fontFamily="mono"
              opacity={isExporting ? 1 : 0}
              w={isExporting ? 'auto' : 0}
              overflow="hidden"
              transition="opacity 0.15s"
            >
              {Math.round(exportProgress)}%
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
