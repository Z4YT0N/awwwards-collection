export const EFFECT_TYPES = {
  NOISE: 'noise',
  DITHER: 'dither',
  HALFTONE: 'halftone',
  ASCII: 'ascii',
  OVERLAY: 'overlay',
  CHROMATIC: 'chromatic',
  VIGNETTE: 'vignette',
  SCANLINES: 'scanlines',
  PIXELATE: 'pixelate',
  BLUR: 'blur',
  DISTORTION: 'distortion',
  POSTERIZE: 'posterize',
  EDGE: 'edge',
  GRAIN: 'grain',
  COLOR_GRADE: 'color-grade',
  GLITCH: 'glitch',
  CRT: 'crt',
  DUOTONE: 'duotone',
  KUWAHARA: 'kuwahara',
  BARREL: 'barrel',
  RIPPLE: 'ripple',
  DISPLACEMENT: 'displacement',
  LIGHT_LEAK: 'light-leak',
  BLOOM: 'bloom',
  RADIAL_BLUR: 'radial-blur',
  MOSAIC: 'mosaic',
  TILT_SHIFT: 'tilt-shift',
  EXPOSURE: 'exposure',
  VIBRANCE: 'vibrance',
  DOT_DITHER: 'dot-dither'
};

export const BLEND_MODES = {
  OVERLAY: 'overlay',
  SOFT_LIGHT: 'soft-light',
  MULTIPLY: 'multiply',
  SCREEN: 'screen'
};

export const DITHER_METHODS = {
  BAYER_2X2: 'bayer2x2',
  BAYER_4X4: 'bayer4x4',
  BAYER_8X8: 'bayer8x8'
};

export const ASCII_PRESETS = {
  STANDARD: ' .:-=+*#%@',
  BLOCKS: ' ░▒▓█',
  SIMPLE: ' .-+*#',
  DETAILED: " .':;!ilI1%@#"
};

export const OVERLAY_TEXTURES = {
  PAPER: 'paper',
  FILM_GRAIN: 'film-grain',
  CANVAS: 'canvas',
  DUST: 'dust',
  CUSTOM: 'custom'
};

export const DEFAULT_NOISE_PARAMS = {
  intensity: 0.15,
  scale: 1.0,
  monochrome: true,
  blendMode: BLEND_MODES.OVERLAY
};

export const DEFAULT_DITHER_PARAMS = {
  method: DITHER_METHODS.BAYER_4X4,
  levels: 4,
  threshold: 0.5,
  scale: 1.0
};

export const HALFTONE_SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  DIAMOND: 'diamond',
  LINE: 'line',
  ELLIPSE: 'ellipse',
  CROSS: 'cross',
  RING: 'ring'
};

export const DEFAULT_HALFTONE_PARAMS = {
  gridSize: 8,
  dotScale: 1.0,
  angle: 45,
  shape: HALFTONE_SHAPES.CIRCLE,
  softness: 0.5,
  contrast: 0,
  invert: false,
  colorMode: 'original', // 'original', 'monochrome', 'duotone', 'cmyk'
  dotColor: '#000000',
  backgroundColor: '#ffffff',
  mixOriginal: 0.0
};

export const DEFAULT_ASCII_PARAMS = {
  charset: ASCII_PRESETS.STANDARD,
  cellSize: 8,
  color: true,
  invert: false,
  brightness: 1.0,
  contrast: 1.0,
  gamma: 1.0,
  charBrightness: 1.0,
  charColor: '#ffffff',
  backgroundColor: '#000000',
  backgroundBlend: 1.0,
  edgeEnhance: 0.0,
  cellGap: 0.0
};

export const DEFAULT_OVERLAY_PARAMS = {
  texture: OVERLAY_TEXTURES.PAPER,
  intensity: 0.3,
  scale: 1.0,
  rotation: 0,
  blendMode: BLEND_MODES.OVERLAY,
  customTextureUrl: null
};

export const DEFAULT_CHROMATIC_PARAMS = {
  intensity: 0.008,
  angle: 0,
  radial: true
};

export const DEFAULT_VIGNETTE_PARAMS = {
  intensity: 0.5,
  size: 0.5,
  softness: 0.5,
  color: '#000000'
};

export const DEFAULT_SCANLINES_PARAMS = {
  spacing: 4,
  thickness: 1,
  opacity: 0.3,
  horizontal: true,
  offset: 0
};

export const DEFAULT_PIXELATE_PARAMS = {
  size: 8,
  maintainAspect: true
};

export const DEFAULT_BLUR_PARAMS = {
  radius: 3,
  type: 'gaussian', // 'gaussian' | 'radial' | 'motion'
  angle: 0
};

export const DEFAULT_DISTORTION_PARAMS = {
  type: 'wave', // 'wave' | 'swirl' | 'bulge'
  amplitude: 5,
  frequency: 5,
  centerX: 0.5,
  centerY: 0.5
};

export const DEFAULT_POSTERIZE_PARAMS = {
  levels: 4,
  preserveHue: false
};

export const DEFAULT_EDGE_PARAMS = {
  strength: 1.0,
  threshold: 0.05,
  invert: false,
  colorize: false
};

export const DEFAULT_GRAIN_PARAMS = {
  intensity: 0.15,
  size: 1.5,
  luminanceResponse: 0.5,
  colored: false
};

export const DEFAULT_COLOR_GRADE_PARAMS = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  temperature: 0,
  tint: 0,
  shadows: '#000000',
  highlights: '#ffffff',
  shadowInfluence: 0,
  highlightInfluence: 0
};

export const DEFAULT_GLITCH_PARAMS = {
  intensity: 0.5,
  sliceCount: 10,
  rgbShift: 0.02,
  angle: 0,
  seed: 0,
  blockSize: 0.1,
  colorShift: true
};

export const DEFAULT_CRT_PARAMS = {
  curvature: 0.3,
  scanlineIntensity: 0.3,
  scanlineCount: 400,
  vignetteIntensity: 0.3,
  brightness: 1.1,
  rgbOffset: 0.002,
  flickerIntensity: 0.03,
  staticNoise: 0.05
};

export const DEFAULT_DUOTONE_PARAMS = {
  shadowColor: '#1a0533',
  highlightColor: '#f5c542',
  contrast: 1.0,
  intensity: 1.0
};

export const DEFAULT_KUWAHARA_PARAMS = {
  radius: 4,
  sharpness: 0.5
};

export const DEFAULT_BARREL_PARAMS = {
  amount: 0.3,
  centerX: 0.5,
  centerY: 0.5,
  zoom: 1.0
};

export const DEFAULT_RIPPLE_PARAMS = {
  amplitude: 0.02,
  wavelength: 50,
  speed: 1.0,
  centerX: 0.5,
  centerY: 0.5,
  damping: 0.5
};

export const DEFAULT_DISPLACEMENT_PARAMS = {
  scaleX: 0.05,
  scaleY: 0.05,
  useRedGreen: true,
  customMapUrl: null
};

export const DEFAULT_LIGHT_LEAK_PARAMS = {
  color1: '#ff6b35',
  color2: '#f7931e',
  position: 0.3,
  angle: 45,
  size: 0.6,
  intensity: 0.6,
  softness: 0.8,
  blendMode: BLEND_MODES.SCREEN
};

export const DEFAULT_BLOOM_PARAMS = {
  radius: 6,
  intensity: 0.8,
  threshold: 0.5,
  softThreshold: 0.5,
  blendMode: BLEND_MODES.SCREEN
};

export const DEFAULT_RADIAL_BLUR_PARAMS = {
  intensity: 0.3,
  centerX: 0.5,
  centerY: 0.5,
  samples: 32,
  zoom: true // true = zoom blur, false = spin blur
};

export const DEFAULT_MOSAIC_PARAMS = {
  cellSize: 20,
  irregularity: 0.5,
  edgeThickness: 0.04,
  edgeColor: '#1a1a1a',
  colorVariation: 0.05
};

export const DEFAULT_TILT_SHIFT_PARAMS = {
  focusPosition: 0.5,
  focusWidth: 0.2,
  blurRadius: 8,
  angle: 0,
  gradientSmooth: 0.3
};

export const DEFAULT_EXPOSURE_PARAMS = {
  exposure: 0,
  highlights: 0,
  shadows: 0,
  blacks: 0,
  whites: 0
};

export const DEFAULT_VIBRANCE_PARAMS = {
  vibrance: 0.3,
  saturation: 0
};

export const DEFAULT_DOT_DITHER_PARAMS = {
  scale: 1.0,
  threshold: 0.5,
  animated: false,
  animationSpeed: 1.0,
  invert: false
};

export const createEffect = type => {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  switch (type) {
    case EFFECT_TYPES.NOISE:
      return { id, type, enabled: true, params: { ...DEFAULT_NOISE_PARAMS } };
    case EFFECT_TYPES.DITHER:
      return { id, type, enabled: true, params: { ...DEFAULT_DITHER_PARAMS } };
    case EFFECT_TYPES.HALFTONE:
      return { id, type, enabled: true, params: { ...DEFAULT_HALFTONE_PARAMS } };
    case EFFECT_TYPES.ASCII:
      return { id, type, enabled: true, params: { ...DEFAULT_ASCII_PARAMS } };
    case EFFECT_TYPES.OVERLAY:
      return { id, type, enabled: true, params: { ...DEFAULT_OVERLAY_PARAMS } };
    case EFFECT_TYPES.CHROMATIC:
      return { id, type, enabled: true, params: { ...DEFAULT_CHROMATIC_PARAMS } };
    case EFFECT_TYPES.VIGNETTE:
      return { id, type, enabled: true, params: { ...DEFAULT_VIGNETTE_PARAMS } };
    case EFFECT_TYPES.SCANLINES:
      return { id, type, enabled: true, params: { ...DEFAULT_SCANLINES_PARAMS } };
    case EFFECT_TYPES.PIXELATE:
      return { id, type, enabled: true, params: { ...DEFAULT_PIXELATE_PARAMS } };
    case EFFECT_TYPES.BLUR:
      return { id, type, enabled: true, params: { ...DEFAULT_BLUR_PARAMS } };
    case EFFECT_TYPES.DISTORTION:
      return { id, type, enabled: true, params: { ...DEFAULT_DISTORTION_PARAMS } };
    case EFFECT_TYPES.POSTERIZE:
      return { id, type, enabled: true, params: { ...DEFAULT_POSTERIZE_PARAMS } };
    case EFFECT_TYPES.EDGE:
      return { id, type, enabled: true, params: { ...DEFAULT_EDGE_PARAMS } };
    case EFFECT_TYPES.GRAIN:
      return { id, type, enabled: true, params: { ...DEFAULT_GRAIN_PARAMS } };
    case EFFECT_TYPES.COLOR_GRADE:
      return { id, type, enabled: true, params: { ...DEFAULT_COLOR_GRADE_PARAMS } };
    case EFFECT_TYPES.GLITCH:
      return { id, type, enabled: true, params: { ...DEFAULT_GLITCH_PARAMS } };
    case EFFECT_TYPES.CRT:
      return { id, type, enabled: true, params: { ...DEFAULT_CRT_PARAMS } };
    case EFFECT_TYPES.DUOTONE:
      return { id, type, enabled: true, params: { ...DEFAULT_DUOTONE_PARAMS } };
    case EFFECT_TYPES.KUWAHARA:
      return { id, type, enabled: true, params: { ...DEFAULT_KUWAHARA_PARAMS } };
    case EFFECT_TYPES.BARREL:
      return { id, type, enabled: true, params: { ...DEFAULT_BARREL_PARAMS } };
    case EFFECT_TYPES.RIPPLE:
      return { id, type, enabled: true, params: { ...DEFAULT_RIPPLE_PARAMS } };
    case EFFECT_TYPES.DISPLACEMENT:
      return { id, type, enabled: true, params: { ...DEFAULT_DISPLACEMENT_PARAMS } };
    case EFFECT_TYPES.LIGHT_LEAK:
      return { id, type, enabled: true, params: { ...DEFAULT_LIGHT_LEAK_PARAMS } };
    case EFFECT_TYPES.BLOOM:
      return { id, type, enabled: true, params: { ...DEFAULT_BLOOM_PARAMS } };
    case EFFECT_TYPES.RADIAL_BLUR:
      return { id, type, enabled: true, params: { ...DEFAULT_RADIAL_BLUR_PARAMS } };
    case EFFECT_TYPES.MOSAIC:
      return { id, type, enabled: true, params: { ...DEFAULT_MOSAIC_PARAMS } };
    case EFFECT_TYPES.TILT_SHIFT:
      return { id, type, enabled: true, params: { ...DEFAULT_TILT_SHIFT_PARAMS } };
    case EFFECT_TYPES.EXPOSURE:
      return { id, type, enabled: true, params: { ...DEFAULT_EXPOSURE_PARAMS } };
    case EFFECT_TYPES.VIBRANCE:
      return { id, type, enabled: true, params: { ...DEFAULT_VIBRANCE_PARAMS } };
    case EFFECT_TYPES.DOT_DITHER:
      return { id, type, enabled: true, params: { ...DEFAULT_DOT_DITHER_PARAMS } };
    default:
      throw new Error(`Unknown effect type: ${type}`);
  }
};

export const PRESETS = {
  'analog-film': {
    name: 'Analog Film',
    effects: [
      {
        type: EFFECT_TYPES.EXPOSURE,
        enabled: true,
        params: { ...DEFAULT_EXPOSURE_PARAMS, exposure: 0.05, highlights: -0.15, shadows: 0.15, blacks: 0.05 }
      },
      {
        type: EFFECT_TYPES.COLOR_GRADE,
        enabled: true,
        params: { ...DEFAULT_COLOR_GRADE_PARAMS, saturation: -0.15, temperature: 0.08, contrast: -0.05 }
      },
      { type: EFFECT_TYPES.GRAIN, enabled: true, params: { ...DEFAULT_GRAIN_PARAMS, intensity: 0.14, size: 1.5 } },
      {
        type: EFFECT_TYPES.VIGNETTE,
        enabled: true,
        params: { ...DEFAULT_VIGNETTE_PARAMS, intensity: 0.3, size: 0.55, softness: 0.9 }
      }
    ]
  },
  'film-noir': {
    name: 'Film Noir',
    effects: [
      {
        type: EFFECT_TYPES.EXPOSURE,
        enabled: true,
        params: { ...DEFAULT_EXPOSURE_PARAMS, exposure: -0.1, highlights: -0.25, shadows: -0.2, blacks: -0.1, whites: 0.15 }
      },
      {
        type: EFFECT_TYPES.COLOR_GRADE,
        enabled: true,
        params: { ...DEFAULT_COLOR_GRADE_PARAMS, saturation: -1, contrast: 0.35 }
      },
      { type: EFFECT_TYPES.GRAIN, enabled: true, params: { ...DEFAULT_GRAIN_PARAMS, intensity: 0.1, size: 1.3 } },
      {
        type: EFFECT_TYPES.VIGNETTE,
        enabled: true,
        params: { ...DEFAULT_VIGNETTE_PARAMS, intensity: 0.65, size: 0.4, softness: 0.85 }
      }
    ]
  },
  'lo-fi': {
    name: 'Lo-Fi',
    effects: [
      {
        type: EFFECT_TYPES.VIBRANCE,
        enabled: true,
        params: { ...DEFAULT_VIBRANCE_PARAMS, vibrance: -0.3, saturation: -0.2 }
      },
      {
        type: EFFECT_TYPES.DITHER,
        enabled: true,
        params: { ...DEFAULT_DITHER_PARAMS, method: DITHER_METHODS.BAYER_4X4, levels: 3, threshold: 0.6, scale: 2.0 }
      },
      {
        type: EFFECT_TYPES.NOISE,
        enabled: true,
        params: { ...DEFAULT_NOISE_PARAMS, intensity: 0.1, monochrome: true }
      },
      {
        type: EFFECT_TYPES.VIGNETTE,
        enabled: true,
        params: { ...DEFAULT_VIGNETTE_PARAMS, intensity: 0.45, size: 0.4, softness: 0.65 }
      }
    ]
  },
  newsprint: {
    name: 'Newsprint',
    effects: [
      {
        type: EFFECT_TYPES.COLOR_GRADE,
        enabled: true,
        params: { ...DEFAULT_COLOR_GRADE_PARAMS, saturation: -0.85, temperature: 0.08 }
      },
      {
        type: EFFECT_TYPES.HALFTONE,
        enabled: true,
        params: {
          ...DEFAULT_HALFTONE_PARAMS,
          gridSize: 5,
          colorMode: 'monochrome',
          angle: 45,
          contrast: 0.15,
          softness: 0.3,
          dotColor: '#1a1a1a',
          backgroundColor: '#f0ece4'
        }
      },
      {
        type: EFFECT_TYPES.NOISE,
        enabled: true,
        params: { ...DEFAULT_NOISE_PARAMS, intensity: 0.05, monochrome: true, blendMode: BLEND_MODES.OVERLAY }
      }
    ]
  },
  'retro-crt': {
    name: 'Retro CRT',
    effects: [
      {
        type: EFFECT_TYPES.CRT,
        enabled: true,
        params: {
          ...DEFAULT_CRT_PARAMS,
          curvature: 0.3,
          scanlineIntensity: 0.3,
          scanlineCount: 300,
          vignetteIntensity: 0.4,
          rgbOffset: 0.002
        }
      },
      {
        type: EFFECT_TYPES.CHROMATIC,
        enabled: true,
        params: { ...DEFAULT_CHROMATIC_PARAMS, intensity: 0.003, radial: true }
      }
    ]
  },
  glitch: {
    name: 'Glitch',
    effects: [
      {
        type: EFFECT_TYPES.GLITCH,
        enabled: true,
        params: { ...DEFAULT_GLITCH_PARAMS, intensity: 0.35, sliceCount: 18, rgbShift: 0.015, colorShift: true }
      },
      {
        type: EFFECT_TYPES.CHROMATIC,
        enabled: true,
        params: { ...DEFAULT_CHROMATIC_PARAMS, intensity: 0.01, angle: 0 }
      },
      {
        type: EFFECT_TYPES.SCANLINES,
        enabled: true,
        params: { ...DEFAULT_SCANLINES_PARAMS, spacing: 5, thickness: 2, opacity: 0.12 }
      }
    ]
  },
  dreamy: {
    name: 'Dreamy',
    effects: [
      {
        type: EFFECT_TYPES.BLOOM,
        enabled: true,
        params: { ...DEFAULT_BLOOM_PARAMS, radius: 6, intensity: 1.2, threshold: 0.4, softThreshold: 0.6 }
      },
      {
        type: EFFECT_TYPES.EXPOSURE,
        enabled: true,
        params: { ...DEFAULT_EXPOSURE_PARAMS, exposure: 0.15, highlights: 0.2, shadows: 0.1 }
      },
      {
        type: EFFECT_TYPES.VIGNETTE,
        enabled: true,
        params: { ...DEFAULT_VIGNETTE_PARAMS, intensity: 0.3, size: 0.5, softness: 0.9 }
      }
    ]
  },
  risograph: {
    name: 'Risograph',
    effects: [
      {
        type: EFFECT_TYPES.VIBRANCE,
        enabled: true,
        params: { ...DEFAULT_VIBRANCE_PARAMS, vibrance: 0.25, saturation: 0.1 }
      },
      { type: EFFECT_TYPES.POSTERIZE, enabled: true, params: { ...DEFAULT_POSTERIZE_PARAMS, levels: 6 } },
      {
        type: EFFECT_TYPES.HALFTONE,
        enabled: true,
        params: {
          ...DEFAULT_HALFTONE_PARAMS,
          gridSize: 4,
          colorMode: 'original',
          shape: 'circle',
          softness: 0.4,
          dotScale: 0.9
        }
      },
      { type: EFFECT_TYPES.CHROMATIC, enabled: true, params: { ...DEFAULT_CHROMATIC_PARAMS, intensity: 0.003 } },
      {
        type: EFFECT_TYPES.OVERLAY,
        enabled: true,
        params: { ...DEFAULT_OVERLAY_PARAMS, texture: OVERLAY_TEXTURES.PAPER, intensity: 0.12 }
      },
      { type: EFFECT_TYPES.GRAIN, enabled: true, params: { ...DEFAULT_GRAIN_PARAMS, intensity: 0.05, size: 1.2 } }
    ]
  },
  'pixel-art': {
    name: 'Pixel Art',
    effects: [
      { type: EFFECT_TYPES.PIXELATE, enabled: true, params: { ...DEFAULT_PIXELATE_PARAMS, size: 8 } },
      { type: EFFECT_TYPES.POSTERIZE, enabled: true, params: { ...DEFAULT_POSTERIZE_PARAMS, levels: 10 } },
      {
        type: EFFECT_TYPES.VIBRANCE,
        enabled: true,
        params: { ...DEFAULT_VIBRANCE_PARAMS, vibrance: 0.35, saturation: 0.15 }
      },
      {
        type: EFFECT_TYPES.EXPOSURE,
        enabled: true,
        params: { ...DEFAULT_EXPOSURE_PARAMS, contrast: 0.12 }
      }
    ]
  },
  'oil-paint': {
    name: 'Oil Paint',
    effects: [
      {
        type: EFFECT_TYPES.KUWAHARA,
        enabled: true,
        params: { ...DEFAULT_KUWAHARA_PARAMS, radius: 4 }
      },
      {
        type: EFFECT_TYPES.VIBRANCE,
        enabled: true,
        params: { ...DEFAULT_VIBRANCE_PARAMS, vibrance: 0.3, saturation: 0.1 }
      },
      {
        type: EFFECT_TYPES.EXPOSURE,
        enabled: true,
        params: { ...DEFAULT_EXPOSURE_PARAMS, contrast: 0.15 }
      }
    ]
  }
};

export const createInitialState = () => ({
  image: null,
  imageUrl: null,
  video: null,
  videoUrl: null,
  mediaType: null,
  corsError: false,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  effects: [],
  seed: Math.floor(Math.random() * 100000),
  previewQuality: 'draft',
  viewMode: 'preview',
  exportFormat: 'png',
  exportQuality: 0.92,
  exportScale: 1,
  isExporting: false,
  exportProgress: 0,
  exportStatus: ''
});

export const EXPORT_SCALES = [1, 2, 4];
export const MAX_EXPORT_DIMENSION = 8192;
