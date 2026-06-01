#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;

out vec2 vUv;
out vec2 vAspectUv;

uniform float uAspect;

void main() {
  vUv = uv;
  vAspectUv = uv;
  vAspectUv.x = (vAspectUv.x - 0.5) * uAspect + 0.5;
  gl_Position = vec4(position, 1.0);
}
