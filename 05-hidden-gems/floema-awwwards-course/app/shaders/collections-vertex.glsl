#define PI 3.141592653589793238462643383279502884

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec4 uPosition;
varying vec2 vUv;

void main()
{
  vUv = uv;

  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  uPosition = newPosition;

  gl_Position = projectionMatrix * newPosition;
}
