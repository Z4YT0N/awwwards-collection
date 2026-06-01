precision highp float;
attribute vec2 uvNorm;

uniform float aspectRatio;
uniform vec2 resolution;
uniform float u_time;
uniform float u_shadow_power;
uniform float u_darken_top;
uniform vec3 u_baseColor;
uniform vec4 u_active_colors;

struct Global {
  vec2 noiseFreq;
  float noiseSpeed;
};
uniform Global u_global;

struct VertDeform {
  float incline;
  float offsetTop;
  float offsetBottom;
  vec2 noiseFreq;
  float noiseAmp;
  float noiseSpeed;
  float noiseFlow;
  float noiseSeed;
};
uniform VertDeform u_vertDeform;

struct WaveLayers {
  vec3 color;
  vec2 noiseFreq;
  float noiseSpeed;
  float noiseFlow;
  float noiseSeed;
  float noiseFloor;
  float noiseCeil;
};
uniform WaveLayers u_waveLayers[3];
const int u_waveLayers_length = 3;

varying vec3 v_color;

#include "noise.glsl"
#include "blend.glsl"

void main() {

  float time = u_time * u_global.noiseSpeed;
  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  float tilt = resolution.y / 2.0 * uvNorm.y;
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  // Vertex color, to be passed to fragment shader

  if (u_active_colors[0] == 1.) {
      v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
      if (u_active_colors[i + 1] == 1.) {
        WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
            noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  // Finish

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}