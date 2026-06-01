// ─── WebGL Shader Sources ────────────────────────────────────────────────────
export const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  uniform float u_flipY;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    // When u_flipY is -1.0, we flip the texture Y coordinate
    // This corrects for the difference between image coordinates (top-left origin)
    // and WebGL coordinates (bottom-left origin)
    v_texCoord = vec2(a_texCoord.x, u_flipY < 0.0 ? 1.0 - a_texCoord.y : a_texCoord.y);
  }
`;

// ─── Passthrough Shader ──────────────────────────────────────────────────────
export const PASSTHROUGH_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  varying vec2 v_texCoord;
  
  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
  }
`;

// ─── Film Grain / Noise Shader ───────────────────────────────────────────────
export const NOISE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_scale;
  uniform float u_seed;
  uniform bool u_monochrome;
  uniform int u_blendMode;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  // High-quality hash function for noise generation
  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  
  // 2D noise function with smooth interpolation
  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    // Smoothstep for smoother interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    // Four corners
    float a = hash12(i);
    float b = hash12(i + vec2(1.0, 0.0));
    float c = hash12(i + vec2(0.0, 1.0));
    float d = hash12(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  
  // Multi-octave noise for more natural film grain texture
  float filmGrain(vec2 uv, float seed) {
    float grain = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    
    for (int i = 0; i < 3; i++) {
      grain += amplitude * noise2D(uv * frequency + seed);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return grain / 1.75; // Normalize to 0-1 range
  }
  
  // Blend modes
  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }
  
  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }
  
  vec3 blendMultiply(vec3 base, vec3 blend) {
    return base * blend;
  }
  
  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }
  
  vec3 applyBlend(vec3 base, vec3 blend, int mode) {
    if (mode == 0) return blendOverlay(base, blend);
    if (mode == 1) return blendSoftLight(base, blend);
    if (mode == 2) return blendMultiply(base, blend);
    if (mode == 3) return blendScreen(base, blend);
    return base;
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Calculate grain coordinates with proper scaling
    vec2 grainCoord = v_texCoord * u_resolution / u_scale;
    
    vec3 grain;
    if (u_monochrome) {
      float g = filmGrain(grainCoord, u_seed);
      grain = vec3(g);
    } else {
      grain = vec3(
        filmGrain(grainCoord, u_seed),
        filmGrain(grainCoord, u_seed + 100.0),
        filmGrain(grainCoord, u_seed + 200.0)
      );
    }
    
    // Apply blend mode
    vec3 blended = applyBlend(color.rgb, grain, u_blendMode);
    
    // Mix based on intensity
    color.rgb = mix(color.rgb, blended, u_intensity);
    
    gl_FragColor = color;
  }
`;

// ─── Chromatic Aberration Shader ─────────────────────────────────────────────
export const CHROMATIC_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_angle;
  uniform bool u_radial;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  #define SAMPLES 8
  
  // Attempt to approximate spectral colors across samples
  vec3 spectralWeight(float t) {
    // t goes from -1 (red end) to +1 (blue end)
    // Approximate prism dispersion: red shifts one way, blue the other
    float r = smoothstep(0.0, 0.7, -t + 0.5);
    float g = 1.0 - abs(t) * 0.8;
    float b = smoothstep(0.0, 0.7, t + 0.5);
    return vec3(r, g, b);
  }
  
  void main() {
    vec2 center = vec2(0.5);
    vec2 dir;
    
    if (u_radial) {
      dir = normalize(v_texCoord - center + 0.0001) * u_intensity;
    } else {
      float angle = u_angle * PI / 180.0;
      dir = vec2(cos(angle), sin(angle)) * u_intensity;
    }
    
    // Multi-sample spectral dispersion
    vec3 color = vec3(0.0);
    vec3 totalWeight = vec3(0.0);
    
    for (int i = 0; i < SAMPLES; i++) {
      float t = (float(i) / float(SAMPLES - 1)) * 2.0 - 1.0; // -1 to +1
      vec2 offset = dir * t;
      vec3 sampleColor = texture2D(u_image, v_texCoord + offset).rgb;
      vec3 w = spectralWeight(t);
      color += sampleColor * w;
      totalWeight += w;
    }
    
    color /= totalWeight;
    float a = texture2D(u_image, v_texCoord).a;
    
    gl_FragColor = vec4(color, a);
  }
`;

// ─── Vignette Shader ─────────────────────────────────────────────────────────
export const VIGNETTE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_size;
  uniform float u_softness;
  uniform vec3 u_color;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    vec2 center = vec2(0.5);
    float dist = distance(v_texCoord, center);
    
    // Calculate vignette
    float radius = u_size;
    float soft = u_softness * 0.5 + 0.001;
    float vignette = smoothstep(radius, radius - soft, dist);
    
    // Apply vignette
    color.rgb = mix(u_color, color.rgb, mix(1.0, vignette, u_intensity));
    
    gl_FragColor = color;
  }
`;

// ─── Scanlines Shader ────────────────────────────────────────────────────────
export const SCANLINES_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_spacing;
  uniform float u_thickness;
  uniform float u_opacity;
  uniform bool u_horizontal;
  uniform float u_offset;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    vec2 pos = v_texCoord * u_resolution;
    float coord = u_horizontal ? pos.y : pos.x;
    coord += u_offset;
    
    float line = mod(coord, u_spacing);
    float scanline = step(u_thickness, line);
    
    color.rgb *= mix(1.0 - u_opacity, 1.0, scanline);
    
    gl_FragColor = color;
  }
`;

// ─── Pixelate Shader ─────────────────────────────────────────────────────────
export const PIXELATE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_size;
  uniform bool u_maintainAspect;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec2 pixelSize;
    
    if (u_maintainAspect) {
      // Square pixels: use u_size as pixel count along the shorter axis
      float minDim = min(u_resolution.x, u_resolution.y);
      float ps = u_size / minDim;
      pixelSize = vec2(ps);
    } else {
      // Stretch to fill: same number of divisions on each axis
      pixelSize = vec2(u_size) / u_resolution;
    }
    
    vec2 coord = floor(v_texCoord / pixelSize + 0.5) * pixelSize;
    
    gl_FragColor = texture2D(u_image, coord);
  }
`;

// ─── Blur Shader ─────────────────────────────────────────────────────────────
export const BLUR_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_radius;
  uniform int u_type; // 0 = gaussian, 1 = radial, 2 = motion
  uniform float u_angle;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  vec4 gaussianBlur(vec2 uv, float radius) {
    vec4 color = vec4(0.0);
    vec2 texelSize = 1.0 / u_resolution;
    float total = 0.0;
    float sigma = max(radius * 0.5, 0.5);
    float invSigma2 = -0.5 / (sigma * sigma);
    
    for (int x = -7; x <= 7; x++) {
      for (int y = -7; y <= 7; y++) {
        float dist2 = float(x*x + y*y);
        if (dist2 > radius * radius) continue;
        float weight = exp(dist2 * invSigma2);
        vec2 offset = vec2(float(x), float(y)) * texelSize;
        color += texture2D(u_image, uv + offset) * weight;
        total += weight;
      }
    }
    
    return color / total;
  }
  
  vec4 radialBlur(vec2 uv, float radius) {
    vec4 color = vec4(0.0);
    vec2 center = vec2(0.5);
    vec2 dir = uv - center;
    float total = 0.0;
    
    const float samples = 20.0;
    for (float i = 0.0; i < 20.0; i++) {
      float t = i / samples * radius * 0.01;
      float weight = 1.0 - i / samples;
      color += texture2D(u_image, uv - dir * t) * weight;
      total += weight;
    }
    
    return color / total;
  }
  
  vec4 motionBlur(vec2 uv, float radius, float angle) {
    vec4 color = vec4(0.0);
    vec2 dir = vec2(cos(angle * PI / 180.0), sin(angle * PI / 180.0));
    vec2 texelSize = 1.0 / u_resolution;
    float total = 0.0;
    float sigma = max(radius * 0.5, 0.5);
    float invSigma2 = -0.5 / (sigma * sigma);
    
    for (float i = -7.0; i <= 7.0; i++) {
      float dist2 = i * i;
      if (dist2 > radius * radius) continue;
      float weight = exp(dist2 * invSigma2);
      vec2 offset = dir * texelSize * i * radius / 7.0;
      color += texture2D(u_image, uv + offset) * weight;
      total += weight;
    }
    
    return color / total;
  }
  
  void main() {
    if (u_type == 0) {
      gl_FragColor = gaussianBlur(v_texCoord, u_radius);
    } else if (u_type == 1) {
      gl_FragColor = radialBlur(v_texCoord, u_radius);
    } else {
      gl_FragColor = motionBlur(v_texCoord, u_radius, u_angle);
    }
  }
`;

// ─── Distortion Shader ───────────────────────────────────────────────────────
export const DISTORTION_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform int u_type; // 0 = wave, 1 = swirl, 2 = bulge
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform vec2 u_center;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  vec2 waveDistortion(vec2 uv) {
    vec2 offset;
    offset.x = sin(uv.y * u_frequency * PI * 2.0) * u_amplitude / u_resolution.x;
    offset.y = sin(uv.x * u_frequency * PI * 2.0) * u_amplitude / u_resolution.y;
    return uv + offset;
  }
  
  vec2 swirlDistortion(vec2 uv) {
    vec2 centered = uv - u_center;
    float dist = length(centered);
    float angle = atan(centered.y, centered.x);
    
    float swirl = u_amplitude * 0.1 * (1.0 - dist);
    swirl = max(0.0, swirl);
    angle += swirl;
    
    return u_center + vec2(cos(angle), sin(angle)) * dist;
  }
  
  vec2 bulgeDistortion(vec2 uv) {
    vec2 centered = uv - u_center;
    float dist = length(centered);
    float radius = 0.5;
    
    if (dist < radius) {
      float percent = dist / radius;
      float bulge = sin(percent * PI * 0.5);
      float amount = 1.0 + u_amplitude * 0.01 * (1.0 - bulge);
      centered *= amount;
    }
    
    return u_center + centered;
  }
  
  void main() {
    vec2 distorted;
    
    if (u_type == 0) {
      distorted = waveDistortion(v_texCoord);
    } else if (u_type == 1) {
      distorted = swirlDistortion(v_texCoord);
    } else {
      distorted = bulgeDistortion(v_texCoord);
    }
    
    // Clamp to valid texture coordinates
    distorted = clamp(distorted, 0.0, 1.0);
    
    gl_FragColor = texture2D(u_image, distorted);
  }
`;

// ─── Posterize Shader ────────────────────────────────────────────────────────
export const POSTERIZE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform int u_levels;
  uniform bool u_preserveHue;
  
  varying vec2 v_texCoord;
  
  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }
  
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    float lvl = float(u_levels);
    
    if (u_preserveHue) {
      vec3 hsv = rgb2hsv(color.rgb);
      hsv.z = floor(hsv.z * lvl + 0.5) / lvl;
      hsv.y = floor(hsv.y * lvl + 0.5) / lvl;
      color.rgb = hsv2rgb(hsv);
    } else {
      color.rgb = floor(color.rgb * lvl + 0.5) / lvl;
    }
    
    gl_FragColor = color;
  }
`;

// ─── Edge Detection Shader ───────────────────────────────────────────────────
export const EDGE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_strength;
  uniform float u_threshold;
  uniform bool u_invert;
  uniform bool u_colorize;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec2 texel = 1.0 / u_resolution;
    vec4 color = texture2D(u_image, v_texCoord);
    
    float tl = dot(texture2D(u_image, v_texCoord + vec2(-1.0, -1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float t  = dot(texture2D(u_image, v_texCoord + vec2( 0.0, -1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float tr = dot(texture2D(u_image, v_texCoord + vec2( 1.0, -1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float l  = dot(texture2D(u_image, v_texCoord + vec2(-1.0,  0.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float r  = dot(texture2D(u_image, v_texCoord + vec2( 1.0,  0.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float bl = dot(texture2D(u_image, v_texCoord + vec2(-1.0,  1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float b  = dot(texture2D(u_image, v_texCoord + vec2( 0.0,  1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float br = dot(texture2D(u_image, v_texCoord + vec2( 1.0,  1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    
    float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
    float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
    
    float edge = sqrt(gx*gx + gy*gy) * u_strength;
    edge = smoothstep(u_threshold, u_threshold + 0.1, edge);
    
    if (u_invert) edge = 1.0 - edge;
    
    vec3 result;
    if (u_colorize) {
      result = color.rgb * edge;
    } else {
      result = vec3(edge);
    }
    
    gl_FragColor = vec4(result, color.a);
  }
`;

// ─── Film Grain Shader ────────────────────────────────
export const GRAIN_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_size;
  uniform float u_luminanceResponse;
  uniform bool u_colored;
  uniform float u_seed;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  
  float grain(vec2 uv, float seed) {
    return hash(uv + seed) * 2.0 - 1.0;
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    float response = mix(1.0, 1.0 - luma, u_luminanceResponse);
    
    vec2 grainUV = v_texCoord * u_resolution / u_size;
    
    vec3 grainValue;
    if (u_colored) {
      grainValue = vec3(
        grain(grainUV, u_seed),
        grain(grainUV, u_seed + 100.0),
        grain(grainUV, u_seed + 200.0)
      );
    } else {
      float g = grain(grainUV, u_seed);
      grainValue = vec3(g);
    }
    
    color.rgb += grainValue * u_intensity * response;
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    
    gl_FragColor = color;
  }
`;

// ─── Color Grading Shader ────────────────────────────────────────────────────
export const COLOR_GRADE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_brightness;
  uniform float u_contrast;
  uniform float u_saturation;
  uniform float u_temperature;
  uniform float u_tint;
  uniform vec3 u_shadows;
  uniform vec3 u_highlights;
  uniform float u_shadowInfluence;
  uniform float u_highlightInfluence;
  
  varying vec2 v_texCoord;
  
  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }
  
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Brightness: multiplicative feels more natural than additive
    color.rgb *= 1.0 + u_brightness;
    
    // Contrast: pivot around midpoint
    color.rgb = (color.rgb - 0.5) * (1.0 + u_contrast) + 0.5;
    
    // Saturation
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(luma), color.rgb, 1.0 + u_saturation);
    
    // Temperature: shift red-blue balance
    color.r += u_temperature * 0.1;
    color.b -= u_temperature * 0.1;
    
    // Tint: shift green-magenta balance
    color.g += u_tint * 0.1;
    
    // Recalculate luma after adjustments for accurate shadow/highlight masks
    luma = dot(clamp(color.rgb, 0.0, 1.0), vec3(0.299, 0.587, 0.114));
    
    // Shadow tinting: mix toward shadow color in dark areas
    float shadowMask = 1.0 - smoothstep(0.0, 0.5, luma);
    color.rgb = mix(color.rgb, mix(color.rgb, u_shadows * luma * 2.0, 0.5), shadowMask * u_shadowInfluence);
    
    // Highlight tinting: mix toward highlight color in bright areas
    float highlightMask = smoothstep(0.5, 1.0, luma);
    color.rgb = mix(color.rgb, mix(color.rgb, u_highlights * luma, 0.5), highlightMask * u_highlightInfluence);
    
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    
    gl_FragColor = color;
  }
`;

// ─── Ordered Dithering Shader ────────────────────────────────────────────────
export const DITHER_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform int u_method;
  uniform int u_levels;
  uniform float u_threshold;
  uniform vec2 u_resolution;
  uniform float u_scale;
  
  varying vec2 v_texCoord;
  
  float bayer2(vec2 pos) {
    pos = floor(pos);
    float x = mod(pos.x, 2.0);
    float y = mod(pos.y, 2.0);
    return mod(x + y * 2.0, 4.0) / 4.0 + 1.0 / 8.0;
  }
  
  float bayer4(vec2 pos) {
    pos = floor(pos);
    return bayer2(pos * 0.5) * 0.25 + bayer2(pos);
  }
  
  float bayer8(vec2 pos) {
    pos = floor(pos);
    return bayer4(pos * 0.5) * 0.25 + bayer2(pos);
  }
  
  float getBayerThreshold(vec2 pos, int method) {
    if (method == 0) return bayer2(pos) - 0.5;
    if (method == 1) return bayer4(pos) - 0.5;
    return bayer8(pos) - 0.5;
  }
  
  vec3 quantize(vec3 color, int levels) {
    float lvl = float(levels - 1);
    return floor(color * lvl + 0.5) / lvl;
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    vec2 pixelPos = v_texCoord * u_resolution / u_scale;
    
    float threshold = getBayerThreshold(pixelPos, u_method);
    
    float spread = u_threshold / float(u_levels);
    vec3 dithered = color.rgb + threshold * spread;
    
    vec3 result = quantize(dithered, u_levels);
    
    gl_FragColor = vec4(clamp(result, 0.0, 1.0), color.a);
  }
`;

// ─── Halftone Shader ─────────────────────────────────────────────────────────
export const HALFTONE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_gridSize;
  uniform float u_dotScale;
  uniform float u_angle;
  uniform int u_shape;
  uniform float u_softness;
  uniform float u_contrast;
  uniform bool u_invert;
  uniform int u_colorMode;
  uniform vec3 u_dotColor;
  uniform vec3 u_backgroundColor;
  uniform float u_mixOriginal;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  #define SHAPE_CIRCLE 0
  #define SHAPE_SQUARE 1
  #define SHAPE_DIAMOND 2
  #define SHAPE_LINE 3
  #define SHAPE_ELLIPSE 4
  #define SHAPE_CROSS 5
  #define SHAPE_RING 6
  
  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }
  
  // Shape distance functions (return 0 at center, 1 at edge)
  float sdCircle(vec2 p) {
    return length(p) * 2.0;
  }
  
  float sdSquare(vec2 p) {
    vec2 d = abs(p);
    return max(d.x, d.y) * 2.0;
  }
  
  float sdDiamond(vec2 p) {
    vec2 d = abs(p);
    return (d.x + d.y);
  }
  
  float sdLine(vec2 p) {
    return abs(p.y) * 2.0;
  }
  
  float sdEllipse(vec2 p) {
    return length(p * vec2(1.0, 1.6)) * 2.0;
  }
  
  float sdCross(vec2 p) {
    vec2 d = abs(p);
    return min(d.x, d.y) * 4.0;
  }
  
  float sdRing(vec2 p) {
    float d = length(p) * 2.0;
    return abs(d - 0.7) * 3.0;
  }
  
  float getShape(vec2 p, int shape) {
    if (shape == SHAPE_CIRCLE) return sdCircle(p);
    if (shape == SHAPE_SQUARE) return sdSquare(p);
    if (shape == SHAPE_DIAMOND) return sdDiamond(p);
    if (shape == SHAPE_LINE) return sdLine(p);
    if (shape == SHAPE_ELLIPSE) return sdEllipse(p);
    if (shape == SHAPE_CROSS) return sdCross(p);
    if (shape == SHAPE_RING) return sdRing(p);
    return sdCircle(p);
  }
  
  // CMYK conversion
  vec4 rgb2cmyk(vec3 rgb) {
    float k = 1.0 - max(max(rgb.r, rgb.g), rgb.b);
    float invK = 1.0 / (1.0 - k + 0.0001);
    float c = (1.0 - rgb.r - k) * invK;
    float m = (1.0 - rgb.g - k) * invK;
    float y = (1.0 - rgb.b - k) * invK;
    return vec4(c, m, y, k);
  }
  
  vec3 cmyk2rgb(vec4 cmyk) {
    float invK = 1.0 - cmyk.w;
    return vec3(
      (1.0 - cmyk.x) * invK,
      (1.0 - cmyk.y) * invK,
      (1.0 - cmyk.z) * invK
    );
  }
  
  float halftonePattern(vec2 pos, float intensity, float angle, int shape, float softness, float dotScale) {
    // Rotate the coordinate space
    vec2 rotated = rotate2D(pos, angle);
    
    // Get position within cell (-0.5 to 0.5)
    vec2 cell = fract(rotated) - 0.5;
    
    // Calculate shape distance
    float shapeDist = getShape(cell, shape);
    
    // The dot size is based on intensity - darker areas = bigger dots
    float dotSize = sqrt(intensity) * dotScale;
    
    // Antialiased edge
    float aa = softness * 0.15 + 0.02;
    float pattern = smoothstep(dotSize + aa, dotSize - aa, shapeDist);
    
    return pattern;
  }
  
  void main() {
    vec4 originalColor = texture2D(u_image, v_texCoord);
    
    // Calculate grid coordinates
    float aspectRatio = u_resolution.x / u_resolution.y;
    vec2 gridCoord = v_texCoord * vec2(u_resolution.x / u_gridSize, u_resolution.y / u_gridSize);
    
    // Sample color at cell center for more accurate color representation
    vec2 cellSize = u_gridSize / u_resolution;
    vec2 cellCenter = (floor(v_texCoord / cellSize) + 0.5) * cellSize;
    vec4 sampledColor = texture2D(u_image, cellCenter);
    
    // Apply contrast
    vec3 adjusted = sampledColor.rgb;
    adjusted = (adjusted - 0.5) * (1.0 + u_contrast) + 0.5;
    adjusted = clamp(adjusted, 0.0, 1.0);
    
    float angleRad = u_angle * PI / 180.0;
    
    vec3 result;
    
    if (u_colorMode == 0) {
      // Original colors mode - use image colors
      float r = halftonePattern(gridCoord, adjusted.r, angleRad, u_shape, u_softness, u_dotScale);
      float g = halftonePattern(gridCoord, adjusted.g, angleRad + 0.52, u_shape, u_softness, u_dotScale);
      float b = halftonePattern(gridCoord, adjusted.b, angleRad + 1.05, u_shape, u_softness, u_dotScale);
      
      if (u_invert) {
        result = vec3(1.0 - r, 1.0 - g, 1.0 - b);
      } else {
        result = vec3(r, g, b);
      }
    } else if (u_colorMode == 1) {
      // Monochrome mode
      float luma = dot(adjusted, vec3(0.299, 0.587, 0.114));
      float pattern = halftonePattern(gridCoord, luma, angleRad, u_shape, u_softness, u_dotScale);
      
      if (u_invert) pattern = 1.0 - pattern;
      
      result = mix(u_backgroundColor, u_dotColor, pattern);
    } else if (u_colorMode == 2) {
      // Duotone mode - single pattern with custom colors
      float luma = dot(adjusted, vec3(0.299, 0.587, 0.114));
      float pattern = halftonePattern(gridCoord, luma, angleRad, u_shape, u_softness, u_dotScale);
      
      if (u_invert) pattern = 1.0 - pattern;
      
      result = mix(u_backgroundColor, u_dotColor, pattern);
    } else {
      // CMYK mode
      vec4 cmyk = rgb2cmyk(adjusted);
      
      // Traditional CMYK halftone angles
      float cAngle = angleRad + 0.26;  // ~15°
      float mAngle = angleRad + 1.31;  // ~75°
      float yAngle = angleRad;         // 0°
      float kAngle = angleRad + 0.79;  // ~45°
      
      float c = halftonePattern(gridCoord, cmyk.x, cAngle, u_shape, u_softness, u_dotScale);
      float m = halftonePattern(gridCoord, cmyk.y, mAngle, u_shape, u_softness, u_dotScale);
      float y = halftonePattern(gridCoord, cmyk.z, yAngle, u_shape, u_softness, u_dotScale);
      float k = halftonePattern(gridCoord, cmyk.w, kAngle, u_shape, u_softness, u_dotScale);
      
      if (u_invert) {
        c = 1.0 - c;
        m = 1.0 - m;
        y = 1.0 - y;
        k = 1.0 - k;
      }
      
      result = cmyk2rgb(vec4(c, m, y, k));
    }
    
    // Mix with original color if desired
    result = mix(result, originalColor.rgb, u_mixOriginal);
    
    gl_FragColor = vec4(result, originalColor.a);
  }
`;

// ─── ASCII Art Shader ────────────────────────────────────────────────────────
export const ASCII_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform sampler2D u_charAtlas;
  uniform float u_cellSize;
  uniform bool u_color;
  uniform bool u_invert;
  uniform int u_charCount;
  uniform vec2 u_resolution;
  uniform float u_brightness;
  uniform float u_contrast;
  uniform float u_gamma;
  uniform float u_charBrightness;
  uniform vec3 u_charColor;
  uniform vec3 u_backgroundColor;
  uniform float u_backgroundBlend;
  uniform float u_edgeEnhance;
  uniform float u_cellGap;
  
  varying vec2 v_texCoord;
  
  float getEdge(vec2 uv, vec2 texelSize) {
    float tl = dot(texture2D(u_image, uv + vec2(-1.0, -1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float t  = dot(texture2D(u_image, uv + vec2( 0.0, -1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float tr = dot(texture2D(u_image, uv + vec2( 1.0, -1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float l  = dot(texture2D(u_image, uv + vec2(-1.0,  0.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float r  = dot(texture2D(u_image, uv + vec2( 1.0,  0.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float bl = dot(texture2D(u_image, uv + vec2(-1.0,  1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float b  = dot(texture2D(u_image, uv + vec2( 0.0,  1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float br = dot(texture2D(u_image, uv + vec2( 1.0,  1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    
    float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
    float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
    
    return sqrt(gx*gx + gy*gy);
  }
  
  void main() {
    vec2 cellCount = floor(u_resolution / u_cellSize);
    vec2 cellIndex = floor(v_texCoord * cellCount);
    vec2 cellUV = fract(v_texCoord * cellCount);
    
    // Cell gap - discard pixels in gap region
    if (u_cellGap > 0.0) {
      float halfGap = u_cellGap * 0.5;
      if (cellUV.x < halfGap || cellUV.x > 1.0 - halfGap ||
          cellUV.y < halfGap || cellUV.y > 1.0 - halfGap) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
      }
      // Remap cellUV to fill remaining space
      cellUV = (cellUV - halfGap) / (1.0 - u_cellGap);
    }
    
    vec2 sampleUV = (cellIndex + 0.5) / cellCount;
    vec4 sampleColor = texture2D(u_image, sampleUV);
    
    vec3 adjustedColor = sampleColor.rgb;
    adjustedColor = (adjustedColor - 0.5) * u_contrast + 0.5;
    adjustedColor = adjustedColor * u_brightness;
    adjustedColor = clamp(adjustedColor, 0.0, 1.0);
    
    float luma = dot(adjustedColor, vec3(0.299, 0.587, 0.114));
    
    // Apply gamma curve for tone mapping
    luma = pow(luma, 1.0 / u_gamma);
    
    if (u_edgeEnhance > 0.0) {
      vec2 texelSize = 1.0 / u_resolution;
      float edge = getEdge(sampleUV, texelSize);
      luma = mix(luma, luma + edge * 0.5, u_edgeEnhance);
      luma = clamp(luma, 0.0, 1.0);
    }
    
    if (u_invert) luma = 1.0 - luma;
    
    float charIdx = floor(luma * float(u_charCount - 1) + 0.5);
    charIdx = clamp(charIdx, 0.0, float(u_charCount - 1));
    
    vec2 atlasUV = vec2(
      (charIdx + cellUV.x) / float(u_charCount),
      1.0 - cellUV.y
    );
    
    vec4 charSample = texture2D(u_charAtlas, atlasUV);
    float charAlpha = clamp(charSample.r * u_charBrightness, 0.0, 1.0);
    
    // Character color: use original image color or custom char color
    vec3 charColor;
    if (u_color) {
      charColor = adjustedColor * charAlpha;
    } else {
      charColor = u_charColor * charAlpha;
    }
    
    // Background: blend between backgroundColor and original image
    vec3 bgColor = mix(u_backgroundColor, sampleColor.rgb, u_backgroundBlend);
    
    // Composite: character on top of background
    vec3 finalColor = mix(bgColor, charColor, charAlpha);
    
    gl_FragColor = vec4(finalColor, sampleColor.a);
  }
`;

// ─── Overlay/Texture Shader ──────────────────────────────────────────────────
export const OVERLAY_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform sampler2D u_overlay;
  uniform float u_intensity;
  uniform float u_scale;
  uniform float u_rotation;
  uniform int u_blendMode;
  uniform vec2 u_resolution;
  uniform bool u_hasOverlay;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }
  
  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }
  
  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }
  
  vec3 blendMultiply(vec3 base, vec3 blend) {
    return base * blend;
  }
  
  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }
  
  vec3 applyBlend(vec3 base, vec3 blend, int mode) {
    if (mode == 0) return blendOverlay(base, blend);
    if (mode == 1) return blendSoftLight(base, blend);
    if (mode == 2) return blendMultiply(base, blend);
    if (mode == 3) return blendScreen(base, blend);
    return base;
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    if (u_hasOverlay) {
      // Calculate overlay coordinates with rotation and scale
      vec2 center = vec2(0.5);
      vec2 overlayCoord = v_texCoord - center;
      overlayCoord = rotate2D(overlayCoord, u_rotation * PI / 180.0);
      overlayCoord = overlayCoord / u_scale + center;
      overlayCoord = fract(overlayCoord); // Tile the texture
      
      vec4 overlay = texture2D(u_overlay, overlayCoord);
      vec3 blended = applyBlend(color.rgb, overlay.rgb, u_blendMode);
      color.rgb = mix(color.rgb, blended, u_intensity * overlay.a);
    }
    
    gl_FragColor = color;
  }
`;

// ─── Glitch / RGB Split Shader ───────────────────────────────────────────────
export const GLITCH_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_sliceCount;
  uniform float u_rgbShift;
  uniform float u_angle;
  uniform float u_seed;
  uniform float u_blockSize;
  uniform bool u_colorShift;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }
  
  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Slice-based displacement
    float sliceY = floor(uv.y * u_sliceCount);
    float sliceRand = hash(sliceY + u_seed);
    float sliceActive = step(1.0 - u_intensity, sliceRand);
    
    // Calculate displacement for this slice
    float displacement = (hash(sliceY * 2.0 + u_seed) - 0.5) * 2.0 * u_intensity * 0.1;
    displacement *= sliceActive;
    
    // Block-based glitch
    vec2 blockPos = floor(uv / u_blockSize);
    float blockRand = hash2(blockPos + vec2(u_seed));
    float blockActive = step(1.0 - u_intensity * 0.3, blockRand);
    vec2 blockDisp = vec2(
      (hash2(blockPos + vec2(u_seed, 0.0)) - 0.5) * 0.1,
      (hash2(blockPos + vec2(0.0, u_seed)) - 0.5) * 0.05
    ) * blockActive * u_intensity;
    
    // Apply displacement based on angle
    float angleRad = u_angle * PI / 180.0;
    vec2 dir = vec2(cos(angleRad), sin(angleRad));
    vec2 displaced = uv + dir * displacement + blockDisp;
    
    // RGB channel separation
    vec2 rgbOffset = dir * u_rgbShift * u_intensity;
    
    float r, g, b, a;
    if (u_colorShift) {
      r = texture2D(u_image, displaced + rgbOffset).r;
      g = texture2D(u_image, displaced).g;
      b = texture2D(u_image, displaced - rgbOffset).b;
    } else {
      vec3 col = texture2D(u_image, displaced).rgb;
      r = col.r;
      g = col.g;
      b = col.b;
    }
    a = texture2D(u_image, displaced).a;
    
    // Occasional color corruption
    float corrupt = step(1.0 - u_intensity * 0.1, hash2(blockPos + vec2(u_seed * 2.0)));
    if (corrupt > 0.5) {
      float swap = hash(sliceY + u_seed * 3.0);
      if (swap < 0.33) {
        float temp = r; r = g; g = b; b = temp;
      } else if (swap < 0.66) {
        float temp = r; r = b; b = temp;
      }
    }
    
    gl_FragColor = vec4(r, g, b, a);
  }
`;

// ─── CRT / Retro Monitor Shader ──────────────────────────────────────────────
export const CRT_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_curvature;
  uniform float u_scanlineIntensity;
  uniform float u_scanlineCount;
  uniform float u_vignetteIntensity;
  uniform float u_brightness;
  uniform float u_rgbOffset;
  uniform float u_flickerIntensity;
  uniform float u_staticNoise;
  uniform float u_seed;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  vec2 curveUV(vec2 uv, float amount) {
    uv = uv * 2.0 - 1.0;
    vec2 offset = abs(uv.yx) / vec2(6.0, 4.0);
    uv = uv + uv * offset * offset * amount;
    uv = uv * 0.5 + 0.5;
    return uv;
  }
  
  void main() {
    // Apply screen curvature
    vec2 uv = curveUV(v_texCoord, u_curvature);
    
    // Check if we're outside the curved screen - use transparent
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }
    
    // Sample center for alpha
    vec4 centerSample = texture2D(u_image, uv);
    
    // RGB phosphor offset (chromatic aberration)
    vec2 rgbOff = vec2(u_rgbOffset, 0.0);
    float r = texture2D(u_image, uv + rgbOff).r;
    float g = texture2D(u_image, uv).g;
    float b = texture2D(u_image, uv - rgbOff).b;
    vec3 color = vec3(r, g, b);
    
    // Scanlines
    float scanline = sin(uv.y * u_scanlineCount * PI * 2.0) * 0.5 + 0.5;
    scanline = pow(scanline, 1.5);
    color *= 1.0 - u_scanlineIntensity * (1.0 - scanline);
    
    // RGB phosphor pattern (subtle vertical stripes)
    float phosphor = mod(floor(uv.x * u_resolution.x), 3.0);
    vec3 phosphorMask = vec3(
      phosphor == 0.0 ? 1.0 : 0.7,
      phosphor == 1.0 ? 1.0 : 0.7,
      phosphor == 2.0 ? 1.0 : 0.7
    );
    color *= mix(vec3(1.0), phosphorMask, u_scanlineIntensity * 0.3);
    
    // Vignette
    vec2 vigUV = uv * (1.0 - uv.yx);
    float vig = vigUV.x * vigUV.y * 15.0;
    vig = pow(vig, u_vignetteIntensity * 0.5);
    color *= vig;
    
    // Flicker
    float flicker = 1.0 + (hash(vec2(u_seed, 0.0)) - 0.5) * u_flickerIntensity;
    color *= flicker;
    
    // Static noise
    float noise = (hash(uv * u_resolution + u_seed) - 0.5) * u_staticNoise;
    color += noise;
    
    // Brightness adjustment
    color *= u_brightness;
    
    // Preserve original alpha for transparency support
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), centerSample.a);
  }
`;

// ─── Duotone / Gradient Map Shader ───────────────────────────────────────────
export const DUOTONE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform vec3 u_shadowColor;
  uniform vec3 u_highlightColor;
  uniform float u_contrast;
  uniform float u_intensity;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Calculate luminance
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Apply contrast adjustment
    luma = (luma - 0.5) * u_contrast + 0.5;
    luma = clamp(luma, 0.0, 1.0);
    
    // Map to duotone gradient
    vec3 duotone = mix(u_shadowColor, u_highlightColor, luma);
    
    // Blend with original based on intensity
    vec3 result = mix(color.rgb, duotone, u_intensity);
    
    gl_FragColor = vec4(result, color.a);
  }
`;

// ─── Kuwahara (Oil Paint) Filter Shader ──────────────────────────────────────
export const KUWAHARA_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform int u_radius;
  uniform float u_sharpness;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec2 texelSize = 1.0 / u_resolution;
    int r = u_radius;
    
    // We divide the kernel into 4 overlapping quadrants
    // and find the one with minimum variance
    vec3 sum[4];
    vec3 sumSq[4];
    int count[4];
    
    for (int i = 0; i < 4; i++) {
      sum[i] = vec3(0.0);
      sumSq[i] = vec3(0.0);
      count[i] = 0;
    }
    
    // Sample the four quadrants
    for (int dy = -5; dy <= 5; dy++) {
      for (int dx = -5; dx <= 5; dx++) {
        if (abs(float(dx)) > float(r) || abs(float(dy)) > float(r)) continue;
        
        vec2 offset = vec2(float(dx), float(dy)) * texelSize;
        vec3 sample = texture2D(u_image, v_texCoord + offset).rgb;
        
        // Determine which quadrant(s) this sample belongs to
        // Using overlapping regions for smoother results
        if (dx <= 0 && dy <= 0) { sum[0] += sample; sumSq[0] += sample * sample; count[0]++; }
        if (dx >= 0 && dy <= 0) { sum[1] += sample; sumSq[1] += sample * sample; count[1]++; }
        if (dx <= 0 && dy >= 0) { sum[2] += sample; sumSq[2] += sample * sample; count[2]++; }
        if (dx >= 0 && dy >= 0) { sum[3] += sample; sumSq[3] += sample * sample; count[3]++; }
      }
    }
    
    // Find the quadrant with minimum variance
    float minVariance = 1e10;
    vec3 result = vec3(0.0);
    
    for (int i = 0; i < 4; i++) {
      if (count[i] > 0) {
        vec3 mean = sum[i] / float(count[i]);
        vec3 variance = sumSq[i] / float(count[i]) - mean * mean;
        float totalVariance = variance.r + variance.g + variance.b;
        
        if (totalVariance < minVariance) {
          minVariance = totalVariance;
          result = mean;
        }
      }
    }
    
    // Blend with original based on sharpness
    vec4 original = texture2D(u_image, v_texCoord);
    result = mix(original.rgb, result, 1.0 - u_sharpness * 0.5);
    
    gl_FragColor = vec4(result, original.a);
  }
`;

// ─── Barrel / Pincushion Distortion Shader ───────────────────────────────────
export const BARREL_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_amount;
  uniform vec2 u_center;
  uniform float u_zoom;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  void main() {
    // Center the coordinates
    vec2 uv = v_texCoord - u_center;
    
    // Correct for aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    // Calculate distance from center
    float r = length(uv);
    float r2 = r * r;
    
    // Apply barrel/pincushion distortion
    // Positive amount = barrel (bulge outward)
    // Negative amount = pincushion (pinch inward)
    float distortion = 1.0 + r2 * u_amount;
    
    // Apply distortion and zoom
    vec2 distorted = uv * distortion / u_zoom;
    
    // Restore aspect ratio and center
    distorted.x /= aspect;
    distorted += u_center;
    
    // Sample with boundary check - use transparent for out-of-bounds
    if (distorted.x < 0.0 || distorted.x > 1.0 || distorted.y < 0.0 || distorted.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    } else {
      gl_FragColor = texture2D(u_image, distorted);
    }
  }
`;

// ─── Ripple / Water Effect Shader ────────────────────────────────────────────
export const RIPPLE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_amplitude;
  uniform float u_wavelength;
  uniform float u_speed;
  uniform vec2 u_center;
  uniform float u_damping;
  uniform float u_time;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Calculate distance from center
    vec2 toCenter = uv - u_center;
    float aspect = u_resolution.x / u_resolution.y;
    toCenter.x *= aspect;
    float dist = length(toCenter);
    
    // Calculate ripple phase
    float phase = dist * u_wavelength - u_time * u_speed;
    
    // Calculate displacement with damping
    float damping = exp(-dist * u_damping * 5.0);
    float displacement = sin(phase * PI * 2.0) * u_amplitude * damping;
    
    // Displace perpendicular to the direction from center
    vec2 direction = normalize(toCenter + 0.0001);
    direction.x /= aspect;
    vec2 displaced = uv + direction * displacement;
    
    // Clamp to valid range
    displaced = clamp(displaced, 0.0, 1.0);
    
    gl_FragColor = texture2D(u_image, displaced);
  }
`;

// ─── Displacement Map Shader ─────────────────────────────────────────────────
export const DISPLACEMENT_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform sampler2D u_displacementMap;
  uniform float u_scaleX;
  uniform float u_scaleY;
  uniform bool u_useRedGreen;
  uniform bool u_hasDisplacementMap;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  // Procedural noise for when no map is provided
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 displacement;
    
    if (u_hasDisplacementMap) {
      vec4 dispSample = texture2D(u_displacementMap, v_texCoord);
      if (u_useRedGreen) {
        displacement = (dispSample.rg - 0.5) * 2.0;
      } else {
        float luma = dot(dispSample.rgb, vec3(0.299, 0.587, 0.114));
        displacement = vec2(luma - 0.5) * 2.0;
      }
    } else {
      // Procedural displacement
      vec2 noiseCoord = v_texCoord * 8.0;
      displacement = vec2(
        fbm(noiseCoord) - 0.5,
        fbm(noiseCoord + vec2(100.0)) - 0.5
      );
    }
    
    vec2 displaced = v_texCoord + displacement * vec2(u_scaleX, u_scaleY);
    displaced = clamp(displaced, 0.0, 1.0);
    
    gl_FragColor = texture2D(u_image, displaced);
  }
`;

// ─── Light Leak / Lens Flare Shader ──────────────────────────────────────────
export const LIGHT_LEAK_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_position;
  uniform float u_angle;
  uniform float u_size;
  uniform float u_intensity;
  uniform float u_softness;
  uniform int u_blendMode;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }
  
  vec3 blendAdd(vec3 base, vec3 blend) {
    return min(base + blend, vec3(1.0));
  }
  
  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }
  
  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Create directional gradient
    float angleRad = u_angle * PI / 180.0;
    vec2 dir = vec2(cos(angleRad), sin(angleRad));
    
    // Calculate position along the gradient direction
    vec2 uv = v_texCoord - 0.5;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    float projection = dot(uv, dir);
    float offset = (projection + u_position - 0.5) / u_size;
    
    // Create soft gradient
    float t = 1.0 - smoothstep(0.0, u_softness, abs(offset));
    t = pow(t, 2.0 - u_softness);
    
    // Interpolate between colors
    float colorT = smoothstep(-0.5, 0.5, offset);
    vec3 leakColor = mix(u_color1, u_color2, colorT);
    
    // Apply intensity
    vec3 leak = leakColor * t * u_intensity;
    
    // Blend with original
    vec3 result;
    if (u_blendMode == 0) result = blendOverlay(color.rgb, leak);
    else if (u_blendMode == 1) result = blendSoftLight(color.rgb, leak);
    else if (u_blendMode == 2) result = blendAdd(color.rgb, leak);
    else result = blendScreen(color.rgb, leak);
    
    // Mix based on leak presence
    result = mix(color.rgb, result, t);
    
    gl_FragColor = vec4(result, color.a);
  }
`;

// ─── Bloom Post-Processing Shader ────────────────────────────────────────────
export const BLOOM_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_radius;
  uniform float u_intensity;
  uniform float u_threshold;
  uniform float u_softThreshold;
  uniform int u_blendMode;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }
  
  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }
  
  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }
  
  // Extract bright pixels with soft knee
  vec3 extractBright(vec3 color, float threshold, float softKnee) {
    float brightness = max(max(color.r, color.g), color.b);
    float knee = threshold * softKnee;
    float soft = brightness - threshold + knee;
    soft = clamp(soft, 0.0, 2.0 * knee);
    soft = soft * soft / (4.0 * knee + 0.00001);
    float contribution = max(soft, brightness - threshold);
    contribution /= max(brightness, 0.00001);
    return color * max(contribution, 0.0);
  }
  
  void main() {
    vec4 originalColor = texture2D(u_image, v_texCoord);
    vec2 texelSize = 1.0 / u_resolution;
    
    // Extract and blur bright areas
    vec3 bloom = vec3(0.0);
    float totalWeight = 0.0;
    
    float r = u_radius;
    
    // Two-pass Gaussian approximation in a single pass
    // Use a 13x13 kernel for better performance while maintaining quality
    for (int y = -6; y <= 6; y++) {
      for (int x = -6; x <= 6; x++) {
        float fx = float(x);
        float fy = float(y);
        float dist = sqrt(fx * fx + fy * fy);
        
        // Skip samples outside radius
        if (dist > r) continue;
        
        // Gaussian weight
        float sigma = max(r * 0.4, 0.5);
        float weight = exp(-(dist * dist) / (2.0 * sigma * sigma));
        
        vec2 offset = vec2(fx, fy) * texelSize;
        vec3 sampleColor = texture2D(u_image, v_texCoord + offset).rgb;
        
        // Extract only the bright parts of each sample
        vec3 brightSample = extractBright(sampleColor, u_threshold, u_softThreshold);
        
        bloom += brightSample * weight;
        totalWeight += weight;
      }
    }
    
    if (totalWeight > 0.0) {
      bloom /= totalWeight;
    }
    
    // Apply intensity
    bloom *= u_intensity;
    
    // Blend bloom with original image (additive-style blending)
    vec3 result;
    if (u_blendMode == 0) {
      // Screen (default - bright and natural)
      result = blendScreen(originalColor.rgb, bloom);
    } else if (u_blendMode == 1) {
      // Overlay
      result = blendOverlay(originalColor.rgb, bloom);
    } else if (u_blendMode == 2) {
      // Soft Light
      result = blendSoftLight(originalColor.rgb, bloom);
    } else {
      // Add (pure additive)
      result = originalColor.rgb + bloom;
    }
    
    gl_FragColor = vec4(clamp(result, 0.0, 1.0), originalColor.a);
  }
`;

// ─── Radial/Zoom Blur Shader ─────────────────────────────────────────────────
export const RADIAL_BLUR_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform vec2 u_center;
  uniform int u_samples;
  uniform bool u_zoom;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  void main() {
    vec2 uv = v_texCoord;
    vec2 center = u_center;
    
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    if (u_zoom) {
      // Zoom blur - samples along ray from center
      vec2 dir = uv - center;
      
      for (int i = 0; i < 64; i++) {
        if (i >= u_samples) break;
        
        float t = float(i) / float(u_samples - 1);
        float scale = 1.0 - u_intensity * t;
        
        vec2 sampleUV = center + dir * scale;
        
        if (sampleUV.x >= 0.0 && sampleUV.x <= 1.0 && sampleUV.y >= 0.0 && sampleUV.y <= 1.0) {
          float weight = 1.0 - t * 0.5;
          color += texture2D(u_image, sampleUV) * weight;
          total += weight;
        }
      }
    } else {
      // Spin blur - samples along circular arc
      vec2 dir = uv - center;
      float dist = length(dir);
      float baseAngle = atan(dir.y, dir.x);
      
      for (int i = 0; i < 64; i++) {
        if (i >= u_samples) break;
        
        float t = (float(i) / float(u_samples - 1) - 0.5) * 2.0;
        float angle = baseAngle + t * u_intensity * dist;
        
        vec2 sampleUV = center + vec2(cos(angle), sin(angle)) * dist;
        
        if (sampleUV.x >= 0.0 && sampleUV.x <= 1.0 && sampleUV.y >= 0.0 && sampleUV.y <= 1.0) {
          float weight = 1.0 - abs(t) * 0.3;
          color += texture2D(u_image, sampleUV) * weight;
          total += weight;
        }
      }
    }
    
    if (total > 0.0) {
      color /= total;
    } else {
      color = texture2D(u_image, uv);
    }
    
    gl_FragColor = color;
  }
`;

// ─── Mosaic / Stained Glass Shader ───────────────────────────────────────────
export const MOSAIC_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_cellSize;
  uniform float u_irregularity;
  uniform float u_edgeThickness;
  uniform vec3 u_edgeColor;
  uniform float u_colorVariation;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  // Simple hash functions for Voronoi
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  
  float hash1(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  void main() {
    vec2 uv = v_texCoord;
    vec2 pixelCoord = uv * u_resolution;
    
    // Calculate cell coordinates
    float cellPx = u_cellSize;
    vec2 cellCoord = pixelCoord / cellPx;
    vec2 cellBase = floor(cellCoord);
    
    // Find closest Voronoi cell center
    float minDist = 10.0;
    float secondDist = 10.0;
    vec2 closestCell = cellBase;
    
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = cellBase + vec2(float(x), float(y));
        vec2 point = neighbor + mix(vec2(0.5), hash2(neighbor), u_irregularity);
        
        float dist = length(cellCoord - point);
        
        if (dist < minDist) {
          secondDist = minDist;
          minDist = dist;
          closestCell = neighbor;
        } else if (dist < secondDist) {
          secondDist = dist;
        }
      }
    }
    
    // Sample color from cell center
    vec2 cellCenter = (closestCell + 0.5) * cellPx / u_resolution;
    cellCenter = clamp(cellCenter, 0.0, 1.0);
    vec4 cellSample = texture2D(u_image, cellCenter);
    vec3 cellColor = cellSample.rgb;
    
    // Add slight color variation per cell
    float variation = (hash1(closestCell) - 0.5) * u_colorVariation;
    cellColor = clamp(cellColor + variation, 0.0, 1.0);
    
    // Calculate edge
    float edge = secondDist - minDist;
    float edgeMask = smoothstep(0.0, u_edgeThickness, edge);
    
    // Mix cell color with edge color
    vec3 result = mix(u_edgeColor, cellColor, edgeMask);
    
    // Preserve original alpha for transparency support
    gl_FragColor = vec4(result, cellSample.a);
  }
`;

// ─── Tilt Shift Shader ───────────────────────────────────────────────────────
export const TILT_SHIFT_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_focusPosition;
  uniform float u_focusWidth;
  uniform float u_blurRadius;
  uniform float u_angle;
  uniform float u_gradientSmooth;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  #define PI 3.14159265359
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Rotate coordinates for angled tilt shift
    float angleRad = u_angle * PI / 180.0;
    vec2 center = vec2(0.5);
    vec2 rotatedUV = uv - center;
    float cosA = cos(angleRad);
    float sinA = sin(angleRad);
    float rotatedY = -rotatedUV.x * sinA + rotatedUV.y * cosA;
    rotatedY += 0.5;
    
    // Calculate blur amount based on distance from focus band
    float distFromFocus = abs(rotatedY - u_focusPosition);
    float focusHalf = u_focusWidth * 0.5;
    float blurAmount = smoothstep(focusHalf, focusHalf + u_gradientSmooth, distFromFocus);
    
    // Apply Gaussian blur based on blur amount
    vec3 color = vec3(0.0);
    float total = 0.0;
    
    float radius = u_blurRadius * blurAmount;
    
    if (radius < 0.5) {
      // No blur needed
      gl_FragColor = texture2D(u_image, uv);
      return;
    }
    
    vec2 texelSize = 1.0 / u_resolution;
    
    // Optimized blur - sample in a circular pattern
    for (int y = -8; y <= 8; y++) {
      for (int x = -8; x <= 8; x++) {
        float fx = float(x);
        float fy = float(y);
        float dist = sqrt(fx * fx + fy * fy);
        
        if (dist > radius) continue;
        
        float sigma = radius * 0.4;
        float weight = exp(-(dist * dist) / (2.0 * sigma * sigma));
        
        vec2 offset = vec2(fx, fy) * texelSize;
        color += texture2D(u_image, uv + offset).rgb * weight;
        total += weight;
      }
    }
    
    if (total > 0.0) {
      color /= total;
    }
    
    // Preserve original alpha for transparency support
    vec4 centerSample = texture2D(u_image, uv);
    gl_FragColor = vec4(color, centerSample.a);
  }
`;

// ─── Exposure Shader ─────────────────────────────────────────────────────────
export const EXPOSURE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_exposure;
  uniform float u_highlights;
  uniform float u_shadows;
  uniform float u_blacks;
  uniform float u_whites;
  
  varying vec2 v_texCoord;
  
  // Attempt to recover highlights and shadows
  vec3 adjustTones(vec3 color, float highlights, float shadows, float blacks, float whites) {
    // Calculate luminance
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    
    // Highlights adjustment (affects bright areas)
    float highlightMask = smoothstep(0.5, 1.0, luma);
    color = mix(color, color * (1.0 + highlights), highlightMask);
    
    // Shadows adjustment (affects dark areas)
    float shadowMask = 1.0 - smoothstep(0.0, 0.5, luma);
    color = mix(color, color * (1.0 + shadows * 2.0), shadowMask);
    
    // Blacks - crush or lift the darkest values
    color = max(color + blacks * 0.1, 0.0);
    
    // Whites - clip or extend the brightest values
    color = min(color + whites * 0.1, 1.0 + whites * 0.1);
    
    return color;
  }
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Apply exposure (EV stops)
    vec3 result = color.rgb * pow(2.0, u_exposure);
    
    // Apply tonal adjustments
    result = adjustTones(result, u_highlights, u_shadows, u_blacks, u_whites);
    
    gl_FragColor = vec4(clamp(result, 0.0, 1.0), color.a);
  }
`;

// ─── Vibrance Shader ─────────────────────────────────────────────────────────
export const VIBRANCE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform float u_vibrance;
  uniform float u_saturation;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    
    // Calculate saturation info
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float maxChannel = max(max(color.r, color.g), color.b);
    float minChannel = min(min(color.r, color.g), color.b);
    float saturation = (maxChannel - minChannel) / (maxChannel + 0.001);
    
    // Vibrance: boost saturation more for less-saturated pixels
    // This protects already-saturated colors (like skin tones)
    float vibranceAmount = u_vibrance * (1.0 - saturation);
    vibranceAmount = max(vibranceAmount, -saturation); // Don't oversaturate
    
    vec3 result = mix(vec3(luma), color.rgb, 1.0 + vibranceAmount);
    
    // Standard saturation on top
    result = mix(vec3(luma), result, 1.0 + u_saturation);
    
    gl_FragColor = vec4(clamp(result, 0.0, 1.0), color.a);
  }
`;

// ─── Dot Dither Shader ───────────────────────────────────────────────────────
// Blue noise stippling dithering - creates proper dot patterns
export const DOT_DITHER_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform float u_threshold;
  uniform float u_scale;
  uniform bool u_animated;
  uniform float u_time;
  uniform float u_animationSpeed;
  uniform bool u_invert;
  
  varying vec2 v_texCoord;
  
  // Checkerboard noise to decorrelate pattern between tiles
  float stepnoise0(vec2 p, float size) {
    vec2 pp = floor(p / size) * size;
    float r = fract(sin(dot(pp, vec2(1.0, -7.131))) * 43758.5453);
    return r;
  }
  
  // Stippling mask - creates the dot pattern
  float mask(vec2 p, float time) {
    const float SEED1 = 1.705;
    const float DMUL = 8.12235325;
    
    // Add per-tile random offset to break up regularity
    float tileNoise = stepnoise0(p, 5.5);
    p += (tileNoise - 0.5) * DMUL;
    
    // Animation: shift the pattern over time
    if (time > 0.0) {
      p += vec2(sin(time * 0.7), cos(time * 0.9)) * 2.0;
    }
    
    // Create stippling pattern
    float f = fract(p.x * SEED1 + p.y / (SEED1 + 0.15555));
    f *= 1.03; // Avoid zero-stipple in plain white
    
    // Tone mapping for proper dot distribution
    return (pow(f, 150.0) + 1.3 * f) / 2.3;
  }
  
  void main() {
    vec2 fragCoord = v_texCoord * u_resolution;
    vec4 originalColor = texture2D(u_image, v_texCoord);
    
    // Get luminance
    float luminance = dot(originalColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    
    // Apply threshold adjustment
    luminance = luminance + (u_threshold - 0.5);
    luminance = clamp(luminance, 0.0, 1.0);
    
    // Scale controls dot density - larger scale = bigger dots / less dense
    // We floor to create pixel-sized dots that scale together
    float dotSize = max(1.0, floor(u_scale));
    vec2 scaledCoord = floor(fragCoord / dotSize);
    
    // Get animation time
    float time = u_animated ? u_time * u_animationSpeed : 0.0;
    
    // Get stippling mask value
    float maskVal = mask(scaledCoord, time);
    
    // Compare luminance against mask to get final bit
    float finalBit = step(maskVal, luminance);
    
    if (u_invert) {
      finalBit = 1.0 - finalBit;
    }
    
    gl_FragColor = vec4(vec3(finalBit), originalColor.a);
  }
`;
