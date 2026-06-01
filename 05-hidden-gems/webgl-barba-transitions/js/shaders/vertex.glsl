uniform float time;
uniform float uProgress;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec4 uCorners;

varying vec2 vUv;
varying vec2 vSize;

void main() {
  float PI = 3.1415926;
  float sine = sin(PI * uProgress);
  float waves = sine * 0.1 * sin(5. * length(uv) + uProgress * 5.);

  vec4 defaultState = modelMatrix * vec4( position, 1.0 );
  vec4 fullScreenState = vec4( position, 1.0 );
  fullScreenState.x *= uResolution.x;
  fullScreenState.y *= uResolution.y;
  fullScreenState.z += uCorners.x;

  // 2 corners transition
  // float cornersProgress = mix(uCorners.x, uCorners.y, uv.x);

  // 4 corners transition
  // float cornersProgress = mix(
  //   mix(uCorners.z, uCorners.w, uv.x),
  //   mix(uCorners.x, uCorners.y, uv.x),
  //   uv.y
  // );

  float cornersProgress = mix(
    mix(uCorners.y, uCorners.x, uv.x),
    mix(uCorners.w, uCorners.z, uv.x),
    uv.y
  );

  vec4 finalState = mix(defaultState, fullScreenState, cornersProgress);
  // vec4 finalState = mix(defaultState, fullScreenState, uProgress + waves);

  vSize = mix(uQuadSize, uResolution, cornersProgress);

  gl_Position = projectionMatrix * viewMatrix * finalState;

  vUv = uv;
}