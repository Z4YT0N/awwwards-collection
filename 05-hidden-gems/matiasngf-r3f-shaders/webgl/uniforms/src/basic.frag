#version 300 es
precision highp float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

in vec2 vUv;
in vec2 vAspectUv;

out vec4 fragColor;

uniform vec3 uColor;
uniform float uAspect;
uniform float uSize;
uniform float uTime;

vec2 translate(vec2 a, vec2 b) {
  return a - b;
}

float sphere(vec2 p, float size) {
  float sdf = length(p) - size;
  float inside = clamp(-sdf / fwidth(sdf), 0.0, 1.0);
  return inside;
}

void main() {
  float nx = snoise3(vec3(vAspectUv * 10.0, uTime * 0.0001));
  float ny = snoise3(vec3((vAspectUv + 11.124) * 10.0, uTime * 0.0001));

  float vNoiseScale = 0.01;

  vec2 p = vAspectUv;
  p = translate(p, vec2(0.5, 0.5));

  p = translate(p, vec2(nx, ny) * vNoiseScale);

  vec3 color = vec3(0.0);

  float sphereFact = sphere(p, uSize);

  color = mix(color, uColor, sphereFact);

  fragColor = vec4(color, 1.0);
}
