import {
  VERTEX_SHADER,
  NOISE_FRAGMENT_SHADER,
  DITHER_FRAGMENT_SHADER,
  HALFTONE_FRAGMENT_SHADER,
  ASCII_FRAGMENT_SHADER,
  OVERLAY_FRAGMENT_SHADER,
  PASSTHROUGH_FRAGMENT_SHADER,
  CHROMATIC_FRAGMENT_SHADER,
  VIGNETTE_FRAGMENT_SHADER,
  SCANLINES_FRAGMENT_SHADER,
  PIXELATE_FRAGMENT_SHADER,
  BLUR_FRAGMENT_SHADER,
  DISTORTION_FRAGMENT_SHADER,
  POSTERIZE_FRAGMENT_SHADER,
  EDGE_FRAGMENT_SHADER,
  GRAIN_FRAGMENT_SHADER,
  COLOR_GRADE_FRAGMENT_SHADER,
  GLITCH_FRAGMENT_SHADER,
  CRT_FRAGMENT_SHADER,
  DUOTONE_FRAGMENT_SHADER,
  KUWAHARA_FRAGMENT_SHADER,
  BARREL_FRAGMENT_SHADER,
  RIPPLE_FRAGMENT_SHADER,
  DISPLACEMENT_FRAGMENT_SHADER,
  LIGHT_LEAK_FRAGMENT_SHADER,
  BLOOM_FRAGMENT_SHADER,
  RADIAL_BLUR_FRAGMENT_SHADER,
  MOSAIC_FRAGMENT_SHADER,
  TILT_SHIFT_FRAGMENT_SHADER,
  EXPOSURE_FRAGMENT_SHADER,
  VIBRANCE_FRAGMENT_SHADER,
  DOT_DITHER_FRAGMENT_SHADER
} from './shaders';
import { EFFECT_TYPES, BLEND_MODES, DITHER_METHODS, ASCII_PRESETS } from './types';

function generateCharacterAtlas(charset, cellSize = 16) {
  const canvas = document.createElement('canvas');
  const charCount = charset.length;
  canvas.width = cellSize * charCount;
  canvas.height = cellSize;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.font = `${cellSize * 0.9}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < charCount; i++) {
    const x = i * cellSize + cellSize / 2;
    const y = cellSize / 2;
    ctx.fillText(charset[i], x, y);
  }

  return canvas;
}

export class WebGLRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!this.gl) {
      throw new Error('WebGL not supported');
    }

    this.programs = {};
    this.textures = {};
    this.framebuffers = [];
    this.quadBuffer = null;
    this.texCoordBuffer = null;
    this.currentCharset = null;

    this._initBuffers();
    this._initPrograms();
  }

  _initBuffers() {
    const gl = this.gl;

    this.quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
  }

  _compileShader(source, type) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${error}`);
    }

    return shader;
  }

  _createProgram(vertexSource, fragmentSource) {
    const gl = this.gl;

    const vertexShader = this._compileShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = this._compileShader(fragmentSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const error = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Program link error: ${error}`);
    }

    program.attributes = {
      position: gl.getAttribLocation(program, 'a_position'),
      texCoord: gl.getAttribLocation(program, 'a_texCoord')
    };

    program.uniforms = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      program.uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }

    return program;
  }

  _initPrograms() {
    this.programs.passthrough = this._createProgram(VERTEX_SHADER, PASSTHROUGH_FRAGMENT_SHADER);
    this.programs.noise = this._createProgram(VERTEX_SHADER, NOISE_FRAGMENT_SHADER);
    this.programs.dither = this._createProgram(VERTEX_SHADER, DITHER_FRAGMENT_SHADER);
    this.programs.halftone = this._createProgram(VERTEX_SHADER, HALFTONE_FRAGMENT_SHADER);
    this.programs.ascii = this._createProgram(VERTEX_SHADER, ASCII_FRAGMENT_SHADER);
    this.programs.overlay = this._createProgram(VERTEX_SHADER, OVERLAY_FRAGMENT_SHADER);
    this.programs.chromatic = this._createProgram(VERTEX_SHADER, CHROMATIC_FRAGMENT_SHADER);
    this.programs.vignette = this._createProgram(VERTEX_SHADER, VIGNETTE_FRAGMENT_SHADER);
    this.programs.scanlines = this._createProgram(VERTEX_SHADER, SCANLINES_FRAGMENT_SHADER);
    this.programs.pixelate = this._createProgram(VERTEX_SHADER, PIXELATE_FRAGMENT_SHADER);
    this.programs.blur = this._createProgram(VERTEX_SHADER, BLUR_FRAGMENT_SHADER);
    this.programs.distortion = this._createProgram(VERTEX_SHADER, DISTORTION_FRAGMENT_SHADER);
    this.programs.posterize = this._createProgram(VERTEX_SHADER, POSTERIZE_FRAGMENT_SHADER);
    this.programs.edge = this._createProgram(VERTEX_SHADER, EDGE_FRAGMENT_SHADER);
    this.programs.grain = this._createProgram(VERTEX_SHADER, GRAIN_FRAGMENT_SHADER);
    this.programs.colorGrade = this._createProgram(VERTEX_SHADER, COLOR_GRADE_FRAGMENT_SHADER);
    this.programs.glitch = this._createProgram(VERTEX_SHADER, GLITCH_FRAGMENT_SHADER);
    this.programs.crt = this._createProgram(VERTEX_SHADER, CRT_FRAGMENT_SHADER);
    this.programs.duotone = this._createProgram(VERTEX_SHADER, DUOTONE_FRAGMENT_SHADER);
    this.programs.kuwahara = this._createProgram(VERTEX_SHADER, KUWAHARA_FRAGMENT_SHADER);
    this.programs.barrel = this._createProgram(VERTEX_SHADER, BARREL_FRAGMENT_SHADER);
    this.programs.ripple = this._createProgram(VERTEX_SHADER, RIPPLE_FRAGMENT_SHADER);
    this.programs.displacement = this._createProgram(VERTEX_SHADER, DISPLACEMENT_FRAGMENT_SHADER);
    this.programs.lightLeak = this._createProgram(VERTEX_SHADER, LIGHT_LEAK_FRAGMENT_SHADER);
    this.programs.bloom = this._createProgram(VERTEX_SHADER, BLOOM_FRAGMENT_SHADER);
    this.programs.radialBlur = this._createProgram(VERTEX_SHADER, RADIAL_BLUR_FRAGMENT_SHADER);
    this.programs.mosaic = this._createProgram(VERTEX_SHADER, MOSAIC_FRAGMENT_SHADER);
    this.programs.tiltShift = this._createProgram(VERTEX_SHADER, TILT_SHIFT_FRAGMENT_SHADER);
    this.programs.exposure = this._createProgram(VERTEX_SHADER, EXPOSURE_FRAGMENT_SHADER);
    this.programs.vibrance = this._createProgram(VERTEX_SHADER, VIBRANCE_FRAGMENT_SHADER);
    this.programs.dotDither = this._createProgram(VERTEX_SHADER, DOT_DITHER_FRAGMENT_SHADER);
  }

  _createTexture(source) {
    const gl = this.gl;
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    if (source) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    }

    return texture;
  }

  _createFramebuffer(width, height) {
    const gl = this.gl;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    return { framebuffer, texture, width, height };
  }

  _useProgram(program, flipY = 1.0) {
    const gl = this.gl;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    gl.enableVertexAttribArray(program.attributes.position);
    gl.vertexAttribPointer(program.attributes.position, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.enableVertexAttribArray(program.attributes.texCoord);
    gl.vertexAttribPointer(program.attributes.texCoord, 2, gl.FLOAT, false, 0, 0);

    if (program.uniforms.u_flipY !== undefined) {
      gl.uniform1f(program.uniforms.u_flipY, flipY);
    }
  }

  _blendModeToInt(mode) {
    switch (mode) {
      case BLEND_MODES.OVERLAY:
        return 0;
      case BLEND_MODES.SOFT_LIGHT:
        return 1;
      case BLEND_MODES.MULTIPLY:
        return 2;
      case BLEND_MODES.SCREEN:
        return 3;
      default:
        return 0;
    }
  }

  _ditherMethodToInt(method) {
    switch (method) {
      case DITHER_METHODS.BAYER_2X2:
        return 0;
      case DITHER_METHODS.BAYER_4X4:
        return 1;
      case DITHER_METHODS.BAYER_8X8:
        return 2;
      default:
        return 1;
    }
  }

  setImage(image) {
    if (this.textures.source) {
      this.gl.deleteTexture(this.textures.source);
      this.textures.source = null;
    }
    if (image) {
      this.textures.source = this._createTexture(image);
      this.imageWidth = image.width || image.videoWidth;
      this.imageHeight = image.height || image.videoHeight;
    } else {
      this.imageWidth = 0;
      this.imageHeight = 0;
      const gl = this.gl;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }

  updateVideoFrame(video) {
    if (!this.textures.source || !video) return;
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.textures.source);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  }

  setOverlayTexture(image) {
    if (this.textures.overlay) {
      this.gl.deleteTexture(this.textures.overlay);
    }
    if (image) {
      this.textures.overlay = this._createTexture(image);
    } else {
      this.textures.overlay = null;
    }
  }

  _updateCharacterAtlas(charset) {
    if (this.currentCharset === charset) return;

    this.currentCharset = charset;
    const atlasCanvas = generateCharacterAtlas(charset, 32);

    if (this.textures.charAtlas) {
      this.gl.deleteTexture(this.textures.charAtlas);
    }
    this.textures.charAtlas = this._createTexture(atlasCanvas);
  }

  render(effects, seed, targetWidth, targetHeight) {
    const gl = this.gl;

    if (!this.textures.source) return;

    const width = targetWidth || this.imageWidth;
    const height = targetHeight || this.imageHeight;

    // Calculate what the draft preview resolution would be (max 1000px on longest side)
    // This is the "reference" resolution that the user designs at
    let referenceWidth = this.imageWidth;
    if (this.imageWidth > 1000 || this.imageHeight > 1000) {
      const previewScale = Math.min(1000 / this.imageWidth, 1000 / this.imageHeight);
      referenceWidth = Math.round(this.imageWidth * previewScale);
    }

    // Scale pixel-based effects relative to the preview reference
    // At preview resolution: renderScale = 1.0 (no change)
    // At export resolution: renderScale > 1.0 (scale up to maintain visual appearance)
    const renderScale = referenceWidth > 0 ? width / referenceWidth : 1;

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    gl.viewport(0, 0, width, height);

    if (
      this.framebuffers.length !== 2 ||
      this.framebuffers[0].width !== width ||
      this.framebuffers[0].height !== height
    ) {
      this.framebuffers.forEach(fb => {
        gl.deleteFramebuffer(fb.framebuffer);
        gl.deleteTexture(fb.texture);
      });
      this.framebuffers = [this._createFramebuffer(width, height), this._createFramebuffer(width, height)];
    }

    let inputTexture = this.textures.source;
    let currentFB = 0;
    let isReadingFromSource = true;

    const enabledEffects = effects.filter(e => e.enabled);

    if (enabledEffects.length === 0) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      this._useProgram(this.programs.passthrough, -1.0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, inputTexture);
      gl.uniform1i(this.programs.passthrough.uniforms.u_image, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      return;
    }

    for (let i = 0; i < enabledEffects.length; i++) {
      const effect = enabledEffects[i];
      const isLast = i === enabledEffects.length - 1;

      if (isLast) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[currentFB].framebuffer);
      }

      const flipY = isReadingFromSource ? -1.0 : 1.0;

      this._renderEffect(effect, inputTexture, width, height, seed, flipY, renderScale);

      if (!isLast) {
        inputTexture = this.framebuffers[currentFB].texture;
        currentFB = 1 - currentFB;
        isReadingFromSource = false;
      }
    }
  }

  _renderEffect(effect, inputTexture, width, height, seed, flipY = 1.0, renderScale = 1.0) {
    switch (effect.type) {
      case EFFECT_TYPES.NOISE:
        this._renderNoise(effect.params, inputTexture, width, height, seed, flipY);
        break;
      case EFFECT_TYPES.DITHER:
        this._renderDither(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.HALFTONE:
        this._renderHalftone(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.ASCII:
        this._renderAscii(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.OVERLAY:
        this._renderOverlay(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.CHROMATIC:
        this._renderChromatic(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.VIGNETTE:
        this._renderVignette(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.SCANLINES:
        this._renderScanlines(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.PIXELATE:
        this._renderPixelate(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.BLUR:
        this._renderBlur(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.DISTORTION:
        this._renderDistortion(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.POSTERIZE:
        this._renderPosterize(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.EDGE:
        this._renderEdge(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.GRAIN:
        this._renderGrain(effect.params, inputTexture, width, height, seed, flipY, renderScale);
        break;
      case EFFECT_TYPES.COLOR_GRADE:
        this._renderColorGrade(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.GLITCH:
        this._renderGlitch(effect.params, inputTexture, width, height, seed, flipY);
        break;
      case EFFECT_TYPES.CRT:
        this._renderCRT(effect.params, inputTexture, width, height, seed, flipY);
        break;
      case EFFECT_TYPES.DUOTONE:
        this._renderDuotone(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.KUWAHARA:
        this._renderKuwahara(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.BARREL:
        this._renderBarrel(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.RIPPLE:
        this._renderRipple(effect.params, inputTexture, width, height, seed, flipY);
        break;
      case EFFECT_TYPES.DISPLACEMENT:
        this._renderDisplacement(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.LIGHT_LEAK:
        this._renderLightLeak(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.BLOOM:
        this._renderBloom(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.RADIAL_BLUR:
        this._renderRadialBlur(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.MOSAIC:
        this._renderMosaic(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.TILT_SHIFT:
        this._renderTiltShift(effect.params, inputTexture, width, height, flipY, renderScale);
        break;
      case EFFECT_TYPES.EXPOSURE:
        this._renderExposure(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.VIBRANCE:
        this._renderVibrance(effect.params, inputTexture, width, height, flipY);
        break;
      case EFFECT_TYPES.DOT_DITHER:
        this._renderDotDither(effect.params, inputTexture, width, height, seed, flipY, renderScale);
        break;
      default:
        this._renderPassthrough(inputTexture, flipY);
    }
  }

  _renderPassthrough(inputTexture, flipY = 1.0) {
    const gl = this.gl;
    this._useProgram(this.programs.passthrough, flipY);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);
    gl.uniform1i(this.programs.passthrough.uniforms.u_image, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderNoise(params, inputTexture, width, height, seed, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.noise;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_scale, params.scale);
    gl.uniform1f(program.uniforms.u_seed, seed);
    gl.uniform1i(program.uniforms.u_monochrome, params.monochrome ? 1 : 0);
    gl.uniform1i(program.uniforms.u_blendMode, this._blendModeToInt(params.blendMode));
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderDither(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.dither;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_method, this._ditherMethodToInt(params.method));
    gl.uniform1i(program.uniforms.u_levels, params.levels);
    gl.uniform1f(program.uniforms.u_threshold, params.threshold);
    gl.uniform2f(program.uniforms.u_resolution, width, height);
    gl.uniform1f(program.uniforms.u_scale, params.scale || 1.0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderHalftone(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.halftone;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const dotColor = this._hexToRgb(params.dotColor || '#000000');
    const bgColor = this._hexToRgb(params.backgroundColor || '#ffffff');

    // Map shape to int
    const shapeMap = {
      circle: 0,
      square: 1,
      diamond: 2,
      line: 3,
      ellipse: 4,
      cross: 5,
      ring: 6
    };
    const shapeInt = shapeMap[params.shape] || 0;

    // Map color mode to int
    const colorModeMap = {
      original: 0,
      monochrome: 1,
      duotone: 2,
      cmyk: 3
    };
    const colorModeInt = colorModeMap[params.colorMode] || 0;

    // Scale gridSize proportionally to render resolution so export matches preview
    const scaledGridSize = (params.gridSize || 8) * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_gridSize, scaledGridSize);
    gl.uniform1f(program.uniforms.u_dotScale, params.dotScale || 1.0);
    gl.uniform1f(program.uniforms.u_angle, params.angle || 45);
    gl.uniform1i(program.uniforms.u_shape, shapeInt);
    gl.uniform1f(program.uniforms.u_softness, params.softness || 0.5);
    gl.uniform1f(program.uniforms.u_contrast, params.contrast || 0);
    gl.uniform1i(program.uniforms.u_invert, params.invert ? 1 : 0);
    gl.uniform1i(program.uniforms.u_colorMode, colorModeInt);
    gl.uniform3f(program.uniforms.u_dotColor, dotColor[0], dotColor[1], dotColor[2]);
    gl.uniform3f(program.uniforms.u_backgroundColor, bgColor[0], bgColor[1], bgColor[2]);
    gl.uniform1f(program.uniforms.u_mixOriginal, params.mixOriginal || 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderAscii(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.ascii;

    const charset = params.charset || ASCII_PRESETS.STANDARD;
    this._updateCharacterAtlas(charset);

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.textures.charAtlas);

    // Scale cellSize proportionally to render resolution so export matches preview
    const scaledCellSize = params.cellSize * renderScale;

    const charColor = this._hexToRgb(params.charColor || '#ffffff');
    const bgColorRgb = this._hexToRgb(params.backgroundColor || '#000000');

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_charAtlas, 1);
    gl.uniform1f(program.uniforms.u_cellSize, scaledCellSize);
    gl.uniform1i(program.uniforms.u_color, params.color ? 1 : 0);
    gl.uniform1i(program.uniforms.u_invert, params.invert ? 1 : 0);
    gl.uniform1i(program.uniforms.u_charCount, charset.length);
    gl.uniform2f(program.uniforms.u_resolution, width, height);
    gl.uniform1f(program.uniforms.u_brightness, params.brightness ?? 1.0);
    gl.uniform1f(program.uniforms.u_contrast, params.contrast ?? 1.0);
    gl.uniform1f(program.uniforms.u_gamma, params.gamma ?? 1.0);
    gl.uniform1f(program.uniforms.u_charBrightness, params.charBrightness ?? 1.0);
    gl.uniform3f(program.uniforms.u_charColor, charColor[0], charColor[1], charColor[2]);
    gl.uniform3f(program.uniforms.u_backgroundColor, bgColorRgb[0], bgColorRgb[1], bgColorRgb[2]);
    gl.uniform1f(program.uniforms.u_backgroundBlend, params.backgroundBlend ?? 1.0);
    gl.uniform1f(program.uniforms.u_edgeEnhance, params.edgeEnhance ?? 0.0);
    gl.uniform1f(program.uniforms.u_cellGap, params.cellGap ?? 0.0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderOverlay(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.overlay;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.textures.overlay || inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_overlay, 1);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_scale, params.scale);
    gl.uniform1f(program.uniforms.u_rotation, params.rotation);
    gl.uniform1i(program.uniforms.u_blendMode, this._blendModeToInt(params.blendMode));
    gl.uniform2f(program.uniforms.u_resolution, width, height);
    gl.uniform1i(program.uniforms.u_hasOverlay, this.textures.overlay ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderChromatic(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.chromatic;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_angle, params.angle);
    gl.uniform1i(program.uniforms.u_radial, params.radial ? 1 : 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderVignette(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.vignette;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const color = this._hexToRgb(params.color);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_size, params.size);
    gl.uniform1f(program.uniforms.u_softness, params.softness);
    gl.uniform3f(program.uniforms.u_color, color[0], color[1], color[2]);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderScanlines(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.scanlines;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Scale spacing proportionally to render resolution so export matches preview
    const scaledSpacing = params.spacing * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_spacing, scaledSpacing);
    gl.uniform1f(program.uniforms.u_thickness, params.thickness);
    gl.uniform1f(program.uniforms.u_opacity, params.opacity);
    gl.uniform1i(program.uniforms.u_horizontal, params.horizontal ? 1 : 0);
    gl.uniform1f(program.uniforms.u_offset, params.offset);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderPixelate(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.pixelate;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Scale size proportionally to render resolution so export matches preview
    const scaledSize = params.size * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_size, scaledSize);
    gl.uniform1i(program.uniforms.u_maintainAspect, params.maintainAspect ? 1 : 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderBlur(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.blur;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const typeMap = { gaussian: 0, radial: 1, motion: 2 };

    // Scale radius proportionally to render resolution so export matches preview
    const scaledRadius = params.radius * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_radius, scaledRadius);
    gl.uniform1i(program.uniforms.u_type, typeMap[params.type] ?? 0);
    gl.uniform1f(program.uniforms.u_angle, params.angle);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderDistortion(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.distortion;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const typeMap = { wave: 0, swirl: 1, bulge: 2 };

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_type, typeMap[params.type] ?? 0);
    gl.uniform1f(program.uniforms.u_amplitude, params.amplitude);
    gl.uniform1f(program.uniforms.u_frequency, params.frequency);
    gl.uniform2f(program.uniforms.u_center, params.centerX, params.centerY);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderPosterize(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.posterize;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_levels, params.levels);
    gl.uniform1i(program.uniforms.u_preserveHue, params.preserveHue ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderEdge(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.edge;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_strength, params.strength);
    gl.uniform1f(program.uniforms.u_threshold, params.threshold);
    gl.uniform1i(program.uniforms.u_invert, params.invert ? 1 : 0);
    gl.uniform1i(program.uniforms.u_colorize, params.colorize ? 1 : 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderGrain(params, inputTexture, width, height, seed, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.grain;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Scale grain size proportionally to render resolution so export matches preview
    const scaledSize = params.size * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_size, scaledSize);
    gl.uniform1f(program.uniforms.u_luminanceResponse, params.luminanceResponse);
    gl.uniform1i(program.uniforms.u_colored, params.colored ? 1 : 0);
    gl.uniform1f(program.uniforms.u_seed, seed);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderColorGrade(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.colorGrade;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const shadows = this._hexToRgb(params.shadows);
    const highlights = this._hexToRgb(params.highlights);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_brightness, params.brightness);
    gl.uniform1f(program.uniforms.u_contrast, params.contrast);
    gl.uniform1f(program.uniforms.u_saturation, params.saturation);
    gl.uniform1f(program.uniforms.u_temperature, params.temperature);
    gl.uniform1f(program.uniforms.u_tint, params.tint);
    gl.uniform3f(program.uniforms.u_shadows, shadows[0], shadows[1], shadows[2]);
    gl.uniform3f(program.uniforms.u_highlights, highlights[0], highlights[1], highlights[2]);
    gl.uniform1f(program.uniforms.u_shadowInfluence, params.shadowInfluence);
    gl.uniform1f(program.uniforms.u_highlightInfluence, params.highlightInfluence);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderGlitch(params, inputTexture, width, height, seed, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.glitch;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_sliceCount, params.sliceCount);
    gl.uniform1f(program.uniforms.u_rgbShift, params.rgbShift);
    gl.uniform1f(program.uniforms.u_angle, params.angle);
    gl.uniform1f(program.uniforms.u_seed, seed + (params.seed || 0));
    gl.uniform1f(program.uniforms.u_blockSize, params.blockSize);
    gl.uniform1i(program.uniforms.u_colorShift, params.colorShift ? 1 : 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderCRT(params, inputTexture, width, height, seed, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.crt;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_curvature, params.curvature);
    gl.uniform1f(program.uniforms.u_scanlineIntensity, params.scanlineIntensity);
    gl.uniform1f(program.uniforms.u_scanlineCount, params.scanlineCount);
    gl.uniform1f(program.uniforms.u_vignetteIntensity, params.vignetteIntensity);
    gl.uniform1f(program.uniforms.u_brightness, params.brightness);
    gl.uniform1f(program.uniforms.u_rgbOffset, params.rgbOffset);
    gl.uniform1f(program.uniforms.u_flickerIntensity, params.flickerIntensity);
    gl.uniform1f(program.uniforms.u_staticNoise, params.staticNoise);
    gl.uniform1f(program.uniforms.u_seed, seed);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderDuotone(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.duotone;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const shadowColor = this._hexToRgb(params.shadowColor);
    const highlightColor = this._hexToRgb(params.highlightColor);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform3f(program.uniforms.u_shadowColor, shadowColor[0], shadowColor[1], shadowColor[2]);
    gl.uniform3f(program.uniforms.u_highlightColor, highlightColor[0], highlightColor[1], highlightColor[2]);
    gl.uniform1f(program.uniforms.u_contrast, params.contrast);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderKuwahara(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.kuwahara;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Scale radius proportionally to render resolution so export matches preview
    // Keep the cap at 5 for performance but scale first
    const scaledRadius = Math.min(Math.round(params.radius * renderScale), 5);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_radius, scaledRadius);
    gl.uniform1f(program.uniforms.u_sharpness, params.sharpness);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderBarrel(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.barrel;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_amount, params.amount);
    gl.uniform2f(program.uniforms.u_center, params.centerX, params.centerY);
    gl.uniform1f(program.uniforms.u_zoom, params.zoom);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderRipple(params, inputTexture, width, height, seed, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.ripple;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Use seed as a pseudo-time for static preview
    const time = seed * 0.01;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_amplitude, params.amplitude);
    gl.uniform1f(program.uniforms.u_wavelength, params.wavelength);
    gl.uniform1f(program.uniforms.u_speed, params.speed);
    gl.uniform2f(program.uniforms.u_center, params.centerX, params.centerY);
    gl.uniform1f(program.uniforms.u_damping, params.damping);
    gl.uniform1f(program.uniforms.u_time, time);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderDisplacement(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.displacement;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.textures.displacementMap || inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1i(program.uniforms.u_displacementMap, 1);
    gl.uniform1f(program.uniforms.u_scaleX, params.scaleX);
    gl.uniform1f(program.uniforms.u_scaleY, params.scaleY);
    gl.uniform1i(program.uniforms.u_useRedGreen, params.useRedGreen ? 1 : 0);
    gl.uniform1i(program.uniforms.u_hasDisplacementMap, this.textures.displacementMap ? 1 : 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderLightLeak(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.lightLeak;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const color1 = this._hexToRgb(params.color1);
    const color2 = this._hexToRgb(params.color2);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform3f(program.uniforms.u_color1, color1[0], color1[1], color1[2]);
    gl.uniform3f(program.uniforms.u_color2, color2[0], color2[1], color2[2]);
    gl.uniform1f(program.uniforms.u_position, params.position);
    gl.uniform1f(program.uniforms.u_angle, params.angle);
    gl.uniform1f(program.uniforms.u_size, params.size);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_softness, params.softness);
    gl.uniform1i(program.uniforms.u_blendMode, this._blendModeToInt(params.blendMode));
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderBloom(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.bloom;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Scale radius proportionally to render resolution so export matches preview
    const scaledRadius = params.radius * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_radius, scaledRadius);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform1f(program.uniforms.u_threshold, params.threshold);
    gl.uniform1f(program.uniforms.u_softThreshold, params.softThreshold);
    gl.uniform1i(program.uniforms.u_blendMode, this._blendModeToInt(params.blendMode));
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderRadialBlur(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.radialBlur;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_intensity, params.intensity);
    gl.uniform2f(program.uniforms.u_center, params.centerX, params.centerY);
    gl.uniform1i(program.uniforms.u_samples, params.samples);
    gl.uniform1i(program.uniforms.u_zoom, params.zoom ? 1 : 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderMosaic(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.mosaic;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    const edgeColor = this._hexToRgb(params.edgeColor);

    // Scale cellSize and edgeThickness proportionally to render resolution so export matches preview
    const scaledCellSize = params.cellSize * renderScale;
    const scaledEdgeThickness = params.edgeThickness * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_cellSize, scaledCellSize);
    gl.uniform1f(program.uniforms.u_irregularity, params.irregularity);
    gl.uniform1f(program.uniforms.u_edgeThickness, scaledEdgeThickness);
    gl.uniform3f(program.uniforms.u_edgeColor, edgeColor[0], edgeColor[1], edgeColor[2]);
    gl.uniform1f(program.uniforms.u_colorVariation, params.colorVariation);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderTiltShift(params, inputTexture, width, height, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.tiltShift;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    // Scale blurRadius proportionally to render resolution so export matches preview
    const scaledBlurRadius = params.blurRadius * renderScale;

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_focusPosition, params.focusPosition);
    gl.uniform1f(program.uniforms.u_focusWidth, params.focusWidth);
    gl.uniform1f(program.uniforms.u_blurRadius, scaledBlurRadius);
    gl.uniform1f(program.uniforms.u_angle, params.angle);
    gl.uniform1f(program.uniforms.u_gradientSmooth, params.gradientSmooth);
    gl.uniform2f(program.uniforms.u_resolution, width, height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderExposure(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.exposure;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_exposure, params.exposure);
    gl.uniform1f(program.uniforms.u_highlights, params.highlights);
    gl.uniform1f(program.uniforms.u_shadows, params.shadows);
    gl.uniform1f(program.uniforms.u_blacks, params.blacks);
    gl.uniform1f(program.uniforms.u_whites, params.whites);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderVibrance(params, inputTexture, width, height, flipY = 1.0) {
    const gl = this.gl;
    const program = this.programs.vibrance;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform1f(program.uniforms.u_vibrance, params.vibrance);
    gl.uniform1f(program.uniforms.u_saturation, params.saturation);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  _renderDotDither(params, inputTexture, width, height, seed, flipY = 1.0, renderScale = 1.0) {
    const gl = this.gl;
    const program = this.programs.dotDither;

    this._useProgram(program, flipY);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);

    gl.uniform1i(program.uniforms.u_image, 0);
    gl.uniform2f(program.uniforms.u_resolution, width, height);
    gl.uniform1f(program.uniforms.u_scale, (params.scale || 1.0) * renderScale);
    gl.uniform1f(program.uniforms.u_threshold, params.threshold || 0.5);
    gl.uniform1i(program.uniforms.u_animated, params.animated ? 1 : 0);
    gl.uniform1f(program.uniforms.u_time, seed);
    gl.uniform1f(program.uniforms.u_animationSpeed, params.animationSpeed || 1.0);
    gl.uniform1i(program.uniforms.u_invert, params.invert ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  setDisplacementMap(image) {
    if (this.textures.displacementMap) {
      this.gl.deleteTexture(this.textures.displacementMap);
    }
    if (image) {
      this.textures.displacementMap = this._createTexture(image);
    } else {
      this.textures.displacementMap = null;
    }
  }

  _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000');
    if (!result) return [0, 0, 0];
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
  }

  destroy() {
    const gl = this.gl;

    Object.values(this.programs).forEach(program => gl.deleteProgram(program));
    Object.values(this.textures).forEach(texture => {
      if (texture) gl.deleteTexture(texture);
    });
    this.framebuffers.forEach(fb => {
      gl.deleteFramebuffer(fb.framebuffer);
      gl.deleteTexture(fb.texture);
    });

    if (this.quadBuffer) gl.deleteBuffer(this.quadBuffer);
    if (this.texCoordBuffer) gl.deleteBuffer(this.texCoordBuffer);
  }
}

export class CPURenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imageData = null;
  }

  setImage(image) {
    this.image = image;
    if (image) {
      this.imageWidth = image.width;
      this.imageHeight = image.height;
    } else {
      this.imageWidth = 0;
      this.imageHeight = 0;
    }
  }

  setOverlayTexture(image) {
    this.overlayImage = image;
  }

  render(effects, seed, targetWidth, targetHeight) {
    if (!this.image) return;

    const width = targetWidth || this.imageWidth;
    const height = targetHeight || this.imageHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx.drawImage(this.image, 0, 0, width, height);

    const enabledEffects = effects.filter(e => e.enabled);
    if (enabledEffects.length === 0) return;

    this.imageData = this.ctx.getImageData(0, 0, width, height);
    const data = this.imageData.data;

    for (const effect of enabledEffects) {
      switch (effect.type) {
        case EFFECT_TYPES.NOISE:
          this._applyNoise(data, width, height, effect.params, seed);
          break;
        case EFFECT_TYPES.DITHER:
          this._applyDither(data, width, height, effect.params);
          break;
        case EFFECT_TYPES.HALFTONE:
          this._applyHalftone(data, width, height, effect.params);
          break;
        case EFFECT_TYPES.ASCII:
          this._applyAscii(width, height, effect.params);
          return;
        case EFFECT_TYPES.OVERLAY:
          break;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  _hash(x, y, seed) {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return n - Math.floor(n);
  }

  _applyNoise(data, width, height, params, seed) {
    const intensity = params.intensity;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % width;
      const y = Math.floor(i / 4 / width);

      let noise;
      if (params.monochrome) {
        noise = this._hash(x / params.scale, y / params.scale, seed);
        noise = (noise - 0.5) * 2 * intensity * 255;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      } else {
        data[i] = Math.max(
          0,
          Math.min(255, data[i] + (this._hash(x / params.scale, y / params.scale, seed) - 0.5) * 2 * intensity * 255)
        );
        data[i + 1] = Math.max(
          0,
          Math.min(
            255,
            data[i + 1] + (this._hash(x / params.scale, y / params.scale, seed + 100) - 0.5) * 2 * intensity * 255
          )
        );
        data[i + 2] = Math.max(
          0,
          Math.min(
            255,
            data[i + 2] + (this._hash(x / params.scale, y / params.scale, seed + 200) - 0.5) * 2 * intensity * 255
          )
        );
      }
    }
  }

  _getBayerValue(x, y, size) {
    if (size === 2) {
      const matrix = [
        [0, 2],
        [3, 1]
      ];
      return matrix[y % 2][x % 2] / 4;
    } else if (size === 4) {
      const matrix = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
      ];
      return matrix[y % 4][x % 4] / 16;
    } else {
      const base = this._getBayerValue(Math.floor(x / 2), Math.floor(y / 2), 4);
      const sub = this._getBayerValue(x, y, 2);
      return base * 0.25 + sub;
    }
  }

  _applyDither(data, width, height, params) {
    const levels = params.levels;
    const threshold = params.threshold;
    const methodSize =
      params.method === DITHER_METHODS.BAYER_2X2 ? 2 : params.method === DITHER_METHODS.BAYER_4X4 ? 4 : 8;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % width;
      const y = Math.floor(i / 4 / width);

      const bayer = this._getBayerValue(x, y, methodSize) - 0.5;
      const spread = threshold / levels;

      for (let c = 0; c < 3; c++) {
        const val = data[i + c] / 255 + bayer * spread;
        const quantized = Math.round(val * (levels - 1)) / (levels - 1);
        data[i + c] = Math.max(0, Math.min(255, quantized * 255));
      }
    }
  }

  _applyHalftone(data, width, height, params) {
    const dotSize = params.dotSize;
    const angle = (params.angle * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const output = new Uint8ClampedArray(data.length);
    output.fill(255);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const rx = cos * x - sin * y;
        const ry = sin * x + cos * y;

        const cellX = Math.floor(rx / dotSize) * dotSize + dotSize / 2;
        const cellY = Math.floor(ry / dotSize) * dotSize + dotSize / 2;

        const dist = Math.sqrt(Math.pow(rx - cellX, 2) + Math.pow(ry - cellY, 2));
        const origX = Math.round(cos * cellX + sin * cellY);
        const origY = Math.round(-sin * cellX + cos * cellY);
        const idx = (Math.max(0, Math.min(height - 1, origY)) * width + Math.max(0, Math.min(width - 1, origX))) * 4;

        const brightness = (data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114) / 255;
        const radius = dotSize * 0.5 * Math.sqrt(brightness);

        const i = (y * width + x) * 4;
        if (dist < radius) {
          if (params.monochrome) {
            output[i] = output[i + 1] = output[i + 2] = 0;
          } else {
            output[i] = data[idx];
            output[i + 1] = data[idx + 1];
            output[i + 2] = data[idx + 2];
          }
        }
        output[i + 3] = 255;
      }
    }

    for (let i = 0; i < data.length; i++) {
      data[i] = output[i];
    }
  }

  _applyAscii(width, height, params) {
    const cellSize = params.cellSize;
    const charset = params.charset || ASCII_PRESETS.STANDARD;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    this.ctx.fillStyle = params.showBackground ? params.backgroundColor : '#000';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.font = `${cellSize}px monospace`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(this.image, 0, 0, width, height);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        const imgData = tempCtx.getImageData(col * cellSize, row * cellSize, cellSize, cellSize).data;
        let totalR = 0,
          totalG = 0,
          totalB = 0,
          count = 0;

        for (let i = 0; i < imgData.length; i += 4) {
          totalR += imgData[i];
          totalG += imgData[i + 1];
          totalB += imgData[i + 2];
          count++;
        }

        const avgR = totalR / count;
        const avgG = totalG / count;
        const avgB = totalB / count;
        const brightness = (avgR * 0.299 + avgG * 0.587 + avgB * 0.114) / 255;

        let charIndex = Math.round(brightness * (charset.length - 1));
        if (params.invert) charIndex = charset.length - 1 - charIndex;
        charIndex = Math.max(0, Math.min(charset.length - 1, charIndex));

        const char = charset[charIndex];

        if (params.color) {
          this.ctx.fillStyle = `rgb(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)})`;
        } else {
          this.ctx.fillStyle = '#fff';
        }

        this.ctx.fillText(char, x, y);
      }
    }

    this.imageData = this.ctx.getImageData(0, 0, width, height);
  }

  destroy() {
    this.image = null;
    this.overlayImage = null;
    this.imageData = null;
  }
}

export function createRenderer(canvas) {
  try {
    return new WebGLRenderer(canvas);
  } catch (e) {
    console.warn('WebGL not available, falling back to CPU renderer:', e);
    return new CPURenderer(canvas);
  }
}
