varying vec2 vUv;
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform vec2 u_prevMouse;

void main() {
  vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
  vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);
  vec2 mouseDirection = u_mouse - u_prevMouse;
  vec2 pixelToMouse = centerOfPixel - u_mouse;
  float dist = length(pixelToMouse);
  float strength = smoothstep(0.3, 0.0, dist);
  vec2 uvOffset = strength * -mouseDirection * 0.35;
  vec4 color = texture2D(u_texture, vUv - uvOffset);
  gl_FragColor = color;
}
