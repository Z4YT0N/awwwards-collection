uniform float time;
uniform float positionZ;
uniform sampler2D texture;
uniform float scale;
uniform float colorSpeed;

varying vec2 vUvCoords;

void main() {

  vec4 outColor = texture2D( texture, vUvCoords);
  outColor.r += sin(time*0.1+colorSpeed);
  outColor.g += cos(time*0.1+colorSpeed);

  gl_FragColor = outColor;
  // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
