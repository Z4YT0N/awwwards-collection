#define PI 3.141592653589793238462643383279502884

attribute vec3 position;
attribute vec2 uv;

uniform float uSpeed;
uniform vec2 uViewportSizes;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main()
{
  vUv = uv;

  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  newPosition.z -= (sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) + sin(newPosition.x / uViewportSizes.x * PI + PI / 2.0)) * abs(uSpeed);

  gl_Position = projectionMatrix * newPosition;
}
