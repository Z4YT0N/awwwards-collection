uniform float time;
uniform float positionZ;
uniform sampler2D texture;
uniform float progress;
uniform float colorProgress;
uniform float sinOffset;

varying vec2 vUvCoords;

void main() {

  vec4 outColor = texture2D( texture, vUvCoords );
  outColor.r += (sin(time*0.01 + sinOffset) * (2.5-progress*1.5)) * colorProgress;
  outColor.g += (cos(time*0.01 + sinOffset) * (2.5-progress*1.5)) * colorProgress;

  outColor *= positionZ;

  gl_FragColor = outColor;
  // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
