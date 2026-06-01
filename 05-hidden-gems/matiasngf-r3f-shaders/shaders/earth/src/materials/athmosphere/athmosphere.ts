import { BackSide, ShaderMaterial, Vector3 } from "three";
import { lightDirection } from "../globals";

const AthmosphereVertexShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 wPos;

void main() {
  vUv = uv;
  vNormal = normal;

  wPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const AthmosphereFragmentShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 wPos;

uniform vec3 lightDirection;

float valueRemap(float value, float min, float max, float newMin, float newMax) {
  return newMin + (newMax - newMin) * (value - min) / (max - min);
}

void main() {

  //setup
  vec3 vLightDirection = normalize(lightDirection);
  vec3 normal = normalize(vNormal);
  vec3 lightColor = vec3(1.0, 1.0, 1.0);
  vec3 viewDirection = normalize(cameraPosition - wPos);

  //lambert
  float rawLambert = dot(normal, vLightDirection);
  float lambert = clamp(rawLambert, 0.0, 1.0);

  // sun light
  float rawSunLight = valueRemap(rawLambert, 0.0, 0.2, 0.0, 1.0);
  float sunLight = clamp(rawSunLight, 0.0, 1.0);

  // athmosphere
  float fresnel = dot(-normal, viewDirection);
  fresnel = pow(clamp(valueRemap(fresnel, 0.0, 0.15, 0.0, 1.0), 0.0, 1.0), 2.0);
  vec3 athmosphereColor = vec3(0.459,0.647,1.);

  gl_FragColor = vec4(vec3(athmosphereColor), 1.0);
  gl_FragColor.a = fresnel * sunLight;
  // gl_FragColor = vec4(vec3(sunLight), 1.0);
}
`;

export const AthmosphereMaterial = new ShaderMaterial({
  side: BackSide,
  uniforms: {
    // dayMap: {value: eathDayTexture},
    // nightMap: {value: nightTexture},
    // cloudMap: {value: cloudTexture},
    lightDirection: { value: lightDirection },
  },
  vertexShader: AthmosphereVertexShader,
  fragmentShader: AthmosphereFragmentShader,
  transparent: true,
});